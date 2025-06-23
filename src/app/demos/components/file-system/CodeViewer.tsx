'use client'

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { FeatureFile, CodeSection } from '../../config/types'

interface CodeViewerProps {
  features: FeatureFile[]
  fileContents: Record<string, string>
  selectedFeature?: FeatureFile | null
}

export function CodeViewer({ features, fileContents, selectedFeature }: CodeViewerProps) {
  const [activeFeature, setActiveFeature] = useState<FeatureFile | null>(null)
  const [activeSection, setActiveSection] = useState<CodeSection | null>(null)

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

  const highlightCode = (code: string, patterns: string[] = []) => {
    if (patterns.length === 0) return code

    let highlightedCode = code
    patterns.forEach(pattern => {
      // パターンから正規表現を作成
      const regex = new RegExp(pattern.slice(1, -1), 'gm')
      highlightedCode = highlightedCode.replace(regex, (match) => {
        return `<mark style="background-color: rgba(255, 255, 0, 0.3); padding: 0 2px;">${match}</mark>`
      })
    })
    
    return highlightedCode
  }

  if (!activeFeature) {
    return (
      <div className="bg-gray-700 rounded p-4 h-full flex items-center justify-center">
        <p className="text-gray-400">機能を選択してコードを表示</p>
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
            </div>
            
            <SyntaxHighlighter
              language="typescript"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: '6px',
                fontSize: '12px',
                lineHeight: '1.4'
              }}
              wrapLongLines={true}
            >
              {activeSection.code}
            </SyntaxHighlighter>
          </div>
        ) : (
          // ファイル内容を直接表示
          <div>
            {activeFeature.files.map(filePath => (
              <div key={filePath} className="mb-4">
                <h4 className="text-md font-medium text-white mb-2">📁 {filePath}</h4>
                <SyntaxHighlighter
                  language="typescript"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '6px',
                    fontSize: '12px',
                    lineHeight: '1.4'
                  }}
                  wrapLongLines={true}
                >
                  {fileContents[filePath] || '// ファイル内容が見つかりません'}
                </SyntaxHighlighter>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}