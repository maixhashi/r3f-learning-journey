'use client'

import { useState } from 'react'
import { FileNode } from '../../config/types'

interface FileExplorerProps {
  files: FileNode[]
}

export function FileExplorer({ files }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'app', 'demos']))

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedFolders(newExpanded)
  }

  const renderFileNode = (node: FileNode, path: string = '', depth: number = 0) => {
    const currentPath = path ? `${path}/${node.name}` : node.name
    const isExpanded = expandedFolders.has(currentPath)

    return (
      <div key={currentPath} style={{ marginLeft: `${depth * 16}px` }}>
        <div 
          className={`flex items-center py-1 px-2 rounded cursor-pointer hover:bg-gray-700 ${
            node.type === 'folder' ? 'text-blue-400' : 'text-gray-300'
          }`}
          onClick={() => node.type === 'folder' && toggleFolder(currentPath)}
        >
          {node.type === 'folder' && (
            <span className="mr-1 text-xs">
              {isExpanded ? '📂' : '📁'}
            </span>
          )}
          {node.type === 'file' && (
            <span className="mr-1 text-xs">📄</span>
          )}
          <span className="text-sm">{node.name}</span>
        </div>
        
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => 
              renderFileNode(child, currentPath, depth + 1)
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-gray-700 rounded p-3">
      <h3 className="text-sm font-semibold mb-2 text-gray-200">File Explorer</h3>
      <div className="text-xs">
        {files.map(file => renderFileNode(file))}
      </div>
    </div>
  )
}