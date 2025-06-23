export interface FileNode {
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  path?: string
}

export interface CodeSection {
  title: string
  description: string
  fileName: string
  code: string
  highlights?: CodeHighlight[]
}

export interface CodeHighlight {
  id: string
  startLine: number
  endLine: number
  startColumn?: number
  endColumn?: number
  tooltip: {
    title: string
    description: string
    documentationUrl?: string
    r3fDocumentationUrl?: string
  }
}

export interface FeatureFile {
  name: string
  description: string
  files: string[]
  codeSections?: CodeSection[]
}