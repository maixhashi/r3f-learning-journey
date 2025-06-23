'use client'

import { useState } from 'react'
import { FileNode } from '../../config/types'

interface FileExplorerProps {
  files: FileNode[]
  selectedFile?: string | null
  onFileSelect?: (fileName: string) => void
}

export function FileExplorer({ files, selectedFile, onFileSelect }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(['src', 'app', 'demos'])
  )

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
              onFileSelect?.(currentPath)
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