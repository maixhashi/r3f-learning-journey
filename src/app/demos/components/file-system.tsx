'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export interface FileNode {
  name: string
  type: 'file' | 'folder'
  content?: string
  language?: string
  children?: FileNode[]
}

export interface CodeSection {
  fileName: string
  title: string
  description: string
  code: string
  highlightPatterns?: string[] // キーワードパターンでハイライト
  highlightLines?: number[] // 後方互換性のため残す
}

export interface FeatureFile {
  id: string
  name: string
  description: string
  files: string[]
  codeSections?: CodeSection[]
  codeSnippet?: string
  highlightLines?: number[]
}

// より高度で正確なパターンマッチング関数
function findHighlightLinesAdvanced(code: string, patterns: string[]): number[] {
  if (!patterns || patterns.length === 0) return []
  
  const lines = code.split('\n')
  const highlightLines: number[] = []
  
  lines.forEach((line, index) => {
    const lineNumber = index + 1
    const trimmedLine = line.trim()
    
    patterns.forEach(pattern => {
      let matched = false
      
      try {
        // 正規表現として解釈を試行
        if (pattern.startsWith('/') && pattern.endsWith('/')) {
          const regexContent = pattern.slice(1, -1)
          const regex = new RegExp(regexContent, 'i')
          matched = regex.test(line)
        } else {
          // 通常の文字列マッチング
          matched = line.includes(pattern)
        }
        
        if (matched) {
          highlightLines.push(lineNumber)
          
          // デバッグログ（開発時のみ）
          if (process.env.NODE_ENV === 'development') {
            console.log(`Pattern "${pattern}" matched line ${lineNumber}: "${trimmedLine}"`)
          }
        }
      } catch (error) {
        // 正規表現が無効な場合は通常の文字列マッチング
        if (line.includes(pattern)) {
          highlightLines.push(lineNumber)
        }
        console.warn(`Invalid regex pattern: ${pattern}`, error)
      }
    })
  })
  
  return [...new Set(highlightLines)].sort((a, b) => a - b)
}

// デバッグ用の詳細ハイライト情報表示
function DebugHighlightInfo({ 
  content, 
  patterns, 
  computedLines,
  displayFileName 
}: {
  content: string
  patterns?: string[]
  computedLines: number[]
  displayFileName: string | null
}) {
  const [showDebug, setShowDebug] = useState(false)
  
  if (!patterns || patterns.length === 0) return null
  
  const lines = content.split('\n')
  const matchDetails = patterns.map(pattern => {
    const matches: { line: number, content: string, matched: boolean }[] = []
    
    lines.forEach((line, index) => {
      const lineNumber = index + 1
      let matched = false
      
      if (pattern.startsWith('/') && pattern.endsWith('/')) {
        try {
          const regex = new RegExp(pattern.slice(1, -1), 'i')
          matched = regex.test(line)
        } catch (e) {
          matched = line.includes(pattern)
        }
      } else {
        matched = line.includes(pattern)
      }
      
      if (matched) {
        matches.push({ line: lineNumber, content: line.trim(), matched })
      }
    })
    
    return { pattern, matches }
  })
  
  return (
    <div className="bg-gray-800 border-t border-gray-600 p-2">
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="text-xs text-blue-400 hover:text-blue-300"
      >
        {showDebug ? '🔽' : '▶️'} Debug Highlight Info
      </button>
      
      {showDebug && (
        <div className="mt-2 text-xs space-y-2">
          <div className="text-yellow-300">
            File comment added: {displayFileName ? 'Yes (+1 offset)' : 'No'}
          </div>
          <div className="text-green-300">
            Final highlight lines: [{computedLines.join(', ')}]
          </div>
          
          {matchDetails.map((detail, index) => (
            <div key={index} className="border-l-2 border-gray-600 pl-2">
              <div className="text-blue-300 font-mono">Pattern: {detail.pattern}</div>
              {detail.matches.map((match, matchIndex) => (
                <div key={matchIndex} className="text-gray-300 ml-2">
                  Line {match.line}: <span className="text-white">{match.content}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// コードセクション選択コンポーネント
function CodeSectionSelector({
  sections,
  selectedSection,
  onSectionSelect
}: {
  sections: CodeSection[]
  selectedSection: number
  onSectionSelect: (index: number) => void
}) {
  return (
    <div className="bg-gray-800 border-b border-gray-600 p-2">
      <div className="flex flex-wrap gap-2">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => onSectionSelect(index)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              selectedSection === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>
    </div>
  )
}

// ファイルエクスプローラーコンポーネント
export function FileExplorer({ 
  files, 
  selectedFile, 
  onFileSelect 
}: {
  files: FileNode[]
  selectedFile: string | null
  onFileSelect: (fileName: string) => void
}) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'app', 'demos']))

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName)
    } else {
      newExpanded.add(folderName)
    }
    setExpandedFolders(newExpanded)
  }

  const renderFileNode = (node: FileNode, depth = 0, path = '') => {
    const currentPath = path ? `${path}/${node.name}` : node.name
    const isExpanded = expandedFolders.has(currentPath)
    const isSelected = selectedFile === currentPath

    return (
      <div key={currentPath}>
        <div 
          className={`flex items-center py-1 px-2 cursor-pointer hover:bg-gray-700 ${
            isSelected ? 'bg-blue-600' : ''
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(currentPath)
            } else {
              onFileSelect(currentPath)
            }
          }}
        >
          {node.type === 'folder' ? (
            <>
              <span className="mr-2 text-xs">
                {isExpanded ? '📂' : '📁'}
              </span>
              <span className="text-yellow-300">{node.name}</span>
            </>
          ) : (
            <>
              <span className="mr-2 text-xs">📄</span>
              <span className="text-blue-300">{node.name}</span>
            </>
          )}
        </div>
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderFileNode(child, depth + 1, currentPath))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-gray-800 text-white text-sm font-mono">
      <div className="p-2 bg-gray-700 font-bold">Files</div>
      <div className="max-h-64 overflow-y-auto">
        {files.map(file => renderFileNode(file))}
      </div>
    </div>
  )
}

// 機能選択コンポーネント
export function FeatureSelector({ 
  features, 
  onFeatureSelect,
  selectedFeature
}: {
  features: FeatureFile[]
  onFeatureSelect: (feature: FeatureFile) => void
  selectedFeature?: string | null
}) {
  return (
    <div className="bg-gray-800 text-white text-sm">
      <div className="p-2 bg-gray-700 font-bold">Features</div>
      <div className="max-h-64 overflow-y-auto">
        {features.map(feature => (
          <div
            key={feature.id}
            className={`p-2 cursor-pointer hover:bg-gray-700 border-b border-gray-600 ${
              selectedFeature === feature.id ? 'bg-gray-700' : ''
            }`}
            onClick={() => onFeatureSelect(feature)}
          >
            <div className="font-semibold text-blue-300">{feature.name}</div>
            <div className="text-xs text-gray-400 mb-1">{feature.description}</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">Files:</span>
              {feature.files.map((file, index) => (
                <span key={index} className="text-yellow-400">
                  📄 {file.split('/').pop()}
                </span>
              ))}
              {feature.codeSections && (
                <span className="text-green-400">
                  ({feature.codeSections.length} sections)
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// コードビューア
export function CodeViewer({ 
  fileName, 
  content,
  highlightLines,
  description,
  sections,
  selectedSection,
  onSectionSelect,
  language = 'typescript' 
}: {
  fileName: string | null
  content: string
  highlightLines?: number[]
  description?: string
  sections?: CodeSection[]
  selectedSection?: number
  onSectionSelect?: (index: number) => void
  language?: string
}) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: '#1e1e1e',
      margin: 0,
      padding: '1rem',
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: '#1e1e1e',
    }
  }

  // 現在のセクションからファイル名を取得
  const getCurrentFileName = () => {
    if (sections && selectedSection !== undefined && sections[selectedSection]) {
      return sections[selectedSection].fileName
    }
    return null
  }

  // 現在のセクションの情報を取得
  const getCurrentSectionInfo = () => {
    if (sections && selectedSection !== undefined && sections[selectedSection]) {
      return sections[selectedSection]
    }
    return null
  }

  // 表示するファイル名を決定
  const getDisplayFileName = () => {
    const currentFileName = getCurrentFileName()
    if (currentFileName) {
      return currentFileName
    }
    
    if (fileName && fileName.includes(' - ') && fileName.includes('Code Example')) {
      return null
    }
    
    if (fileName && !fileName.startsWith('feature:')) {
      return fileName
    }
    
    return null
  }

  // ハイライト行を計算
  const getHighlightLines = (): number[] => {
    // セクションがある場合は、現在のセクションのパターンを使用
    if (sections && selectedSection !== undefined && sections[selectedSection]) {
      const currentSection = sections[selectedSection]
      
      // highlightPatterns が指定されている場合は自動検出
      if (currentSection.highlightPatterns) {
        const baseHighlights = findHighlightLinesAdvanced(content, currentSection.highlightPatterns)
        
        // ファイル名コメントが追加される場合は、行番号を1つずらす
        if (displayFileName) {
          return baseHighlights.map(line => line + 1)
        }
        
        return baseHighlights
      }
      
      // 従来の highlightLines も使用可能
      if (currentSection.highlightLines) {
        // ファイル名コメントが追加される場合は、行番号を1つずらす
        if (displayFileName) {
          return currentSection.highlightLines.map(line => line + 1)
        }
        return currentSection.highlightLines
      }
    }
    
    // フォールバック: 従来の highlightLines
    if (highlightLines) {
      if (displayFileName) {
        return highlightLines.map(line => line + 1)
      }
      return highlightLines
    }
    
    return []
  }

  const currentSection = getCurrentSectionInfo()
  const displayFileName = getDisplayFileName()
  const computedHighlightLines = getHighlightLines()

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* ヘッダー */}
      <div className="flex justify-between items-center p-3 bg-gray-700 text-white text-sm border-b border-gray-600">
        <div className="flex flex-col">
          <span className="font-mono text-blue-300">
            {fileName || 'Select a file or feature'}
          </span>
          {description && (
            <span className="text-xs text-gray-400 mt-1">{description}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
        {computedHighlightLines.length > 0 && (
            <div className="text-xs">
              <span className="text-green-400">
                {computedHighlightLines.length} highlights
              </span>
              <span className="text-gray-400 ml-2">
                Lines: {computedHighlightLines.slice(0, 5).join(', ')}
                {computedHighlightLines.length > 5 && '...'}
              </span>
            </div>
          )}
          {fileName && (
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
            >
              Copy
            </button>
          )}
        </div>
      </div>

      {/* コードセクション選択 */}
      {sections && sections.length > 1 && onSectionSelect && selectedSection !== undefined && (
        <CodeSectionSelector
          sections={sections}
          selectedSection={selectedSection}
          onSectionSelect={onSectionSelect}
        />
      )}

      {/* デバッグ情報 */}
      {currentSection?.highlightPatterns && (
        <DebugHighlightInfo
          content={content}
          patterns={currentSection.highlightPatterns}
          computedLines={computedHighlightLines}
          displayFileName={displayFileName}
        />
      )}

      {/* ファイル名表示 */}
      {displayFileName && (
        <div className="px-4 py-2 bg-gray-800 text-gray-400 text-xs font-mono border-b border-gray-600">
          // {displayFileName}
        </div>
      )}

      {/* コード表示 */}
      <div className="flex-1 overflow-auto">
        <SyntaxHighlighter
          language={language}
          style={customStyle}
          showLineNumbers={true}
          wrapLines={true}
          lineProps={(lineNumber) => {
            const shouldHighlight = computedHighlightLines.includes(lineNumber)
            return {
              style: {
                backgroundColor: shouldHighlight ? 'rgba(255, 255, 0, 0.1)' : 'transparent',
                borderLeft: shouldHighlight ? '3px solid #fbbf24' : '3px solid transparent',
                paddingLeft: '0.5rem',
                display: 'block',
                width: '100%'
              }
            }
          }}
          customStyle={{
            margin: 0,
            background: '#1e1e1e',
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}
        >
          {displayFileName ? `// ${displayFileName}\n${content}` : content}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
