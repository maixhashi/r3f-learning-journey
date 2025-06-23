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
  highlightPatterns?: string[]
  highlightLines?: number[]
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