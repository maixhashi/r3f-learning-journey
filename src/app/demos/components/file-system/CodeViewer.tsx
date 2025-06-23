'use client'

import { useState, useEffect, useRef } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { FeatureFile, CodeSection, CodeHighlight } from '../../config/types'
import { CodeTooltip } from './CodeTooltip'

interface CodeViewerProps {
  features: FeatureFile[]
  fileContents: Record<string, string>
  selectedFeature?: FeatureFile | null
  selectedFile?: string | null
}

export function CodeViewer({ features, fileContents, selectedFeature, selectedFile }: CodeViewerProps) {
  const [activeFeature, setActiveFeature] = useState<FeatureFile | null>(null)
  const [activeSection, setActiveSection] = useState<CodeSection | null>(null)
  const [tooltipState, setTooltipState] = useState<{
    highlight: CodeHighlight | null
    isVisible: boolean
    position: { x: number; y: number }
  }>({
    highlight: null,
    isVisible: false,
    position: { x: 0, y: 0 }
  })

  useEffect(() => {
    if (selectedFeature) {
      setActiveFeature(selectedFeature)
      if (selectedFeature.codeSections && selectedFeature.codeSections.length > 0) {
        setActiveSection(selectedFeature.codeSections[0])
      }
    } else if (features.length > 0) {
      setActiveFeature(features[0])
      if (features[0].codeSections && features[0].codeSections.length > 0) {
        setActiveSection(features[0].codeSections[0])
      }
    }
  }, [selectedFeature, features])

  // ファイル拡張子から言語を推測する関数
  const getLanguageFromFileName = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'ts':
      case 'tsx':
        return 'typescript'
      case 'js':
      case 'jsx':
        return 'javascript'
      case 'css':
        return 'css'
      case 'html':
        return 'html'
      case 'json':
        return 'json'
      default:
        return 'typescript'
    }
  }

  // ハイライト行を計算する関数
  const getHighlightLines = (highlights: CodeHighlight[] = []): number[] => {
    const lines: number[] = []
    highlights.forEach(highlight => {
      for (let i = highlight.startLine; i <= highlight.endLine; i++) {
        lines.push(i)
      }
    })
    return [...new Set(lines)].sort((a, b) => a - b)
  }

  // 行のプロパティを設定する関数
  const getLineProps = (lineNumber: number, highlights: CodeHighlight[] = []) => {
    const lineHighlight = highlights.find(h => 
      lineNumber >= h.startLine && lineNumber <= h.endLine
    )
    
    if (lineHighlight) {
      return {
        style: {
          backgroundColor: 'rgba(255, 255, 0, 0.1)',
          borderLeft: '3px solid #fbbf24',
          paddingLeft: '0.5rem',
          display: 'block',
          width: '100%',
          cursor: 'pointer'
        },
        onClick: (event: React.MouseEvent) => {
          const rect = (event.target as HTMLElement).getBoundingClientRect()
          setTooltipState({
            highlight: lineHighlight,
            isVisible: true,
            position: {
              x: rect.right + 10,
              y: rect.top
            }
          })
        },
        'data-highlight-id': lineHighlight.id
      }
    }

    return {
      style: {
        backgroundColor: 'transparent',
        borderLeft: '3px solid transparent',
        paddingLeft: '0.5rem',
        display: 'block',
        width: '100%'
      }
    }
  }

  const closeTooltip = () => {
    setTooltipState(prev => ({ ...prev, isVisible: false }))
  }

  // 選択されたファイルの内容を直接表示する場合
  if (selectedFile && !activeFeature) {
    const fileContent = fileContents[selectedFile]
    if (fileContent) {
      return (
        <div className="bg-gray-700 rounded p-4 h-full flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">📁 {selectedFile}</h3>
            <p className="text-sm text-gray-300">選択されたファイルの内容</p>
          </div>
          
          <div className="flex-1 overflow-auto">
            <SyntaxHighlighter
              language={getLanguageFromFileName(selectedFile)}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: '6px',
                fontSize: '12px',
                lineHeight: '1.4'
              }}
              showLineNumbers={true}
              wrapLines={true}
            >
              {fileContent}
            </SyntaxHighlighter>
          </div>
        </div>
      )
    }
  }

  if (!activeFeature) {
    return (
      <div className="bg-gray-700 rounded p-4 h-full flex items-center justify-center">
        <p className="text-gray-400">機能またはファイルを選択してコードを表示</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-700 rounded p-4 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">{activeFeature.name}</h3>
        <p className="text-sm text-gray-300 mb-3">{activeFeature.description}</p>
        
        {/* セクション選択タブ */}
        {activeFeature.codeSections && activeFeature.codeSections.length > 1 && (
          <div className="flex space-x-2 mb-3">
            {activeFeature.codeSections.map((section, index) => (
              <button
                key={index}
                className={`px-3 py-1 text-xs rounded ${
                    activeSection === section
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                }`}
                onClick={() => setActiveSection(section)}
              >
                {section.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        {activeSection ? (
          <div>
            <div className="mb-3">
              <h4 className="text-md font-medium text-white mb-1">{activeSection.title}</h4>
              <p className="text-sm text-gray-400">{activeSection.description}</p>
              <p className="text-xs text-blue-400 mt-1">📁 {activeSection.fileName}</p>
              {activeSection.highlights && activeSection.highlights.length > 0 && (
                <p className="text-xs text-yellow-400 mt-1">
                  💡 {activeSection.highlights.length} つのハイライト部分をクリックして詳細を表示
                </p>
              )}
            </div>
            
            <SyntaxHighlighter
              language={getLanguageFromFileName(activeSection.fileName)}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: '6px',
                fontSize: '12px',
                lineHeight: '1.4'
              }}
              showLineNumbers={true}
              wrapLines={true}
              lineProps={(lineNumber) => getLineProps(lineNumber, activeSection.highlights)}
            >
              {activeSection.code}
            </SyntaxHighlighter>
          </div>
        ) : (
          // ファイル内容を直接表示（選択されたファイルがある場合はそれを優先）
          <div>
            {selectedFile && fileContents[selectedFile] ? (
              <div className="mb-4">
                <h4 className="text-md font-medium text-white mb-2">📁 {selectedFile}</h4>
                <SyntaxHighlighter
                  language={getLanguageFromFileName(selectedFile)}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '6px',
                    fontSize: '12px',
                    lineHeight: '1.4'
                  }}
                  showLineNumbers={true}
                  wrapLines={true}
                >
                  {fileContents[selectedFile]}
                </SyntaxHighlighter>
              </div>
            ) : (
              // 機能に関連するすべてのファイルを表示
              activeFeature.files.map(filePath => (
                <div key={filePath} className="mb-4">
                  <h4 className="text-md font-medium text-white mb-2">📁 {filePath}</h4>
                  <SyntaxHighlighter
                    language={getLanguageFromFileName(filePath)}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '6px',
                      fontSize: '12px',
                      lineHeight: '1.4'
                    }}
                    showLineNumbers={true}
                    wrapLines={true}
                  >
                    {fileContents[filePath] || '// ファイル内容が見つかりません'}
                  </SyntaxHighlighter>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ツールチップ */}
      {tooltipState.highlight && (
        <CodeTooltip
          highlight={tooltipState.highlight}
          isVisible={tooltipState.isVisible}
          position={tooltipState.position}
          onClose={closeTooltip}
        />
      )}
    </div>
  )
}
