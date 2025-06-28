import { FileNode } from '../../types'

export const reactSpringFiles: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'app',
        type: 'folder',
        children: [
          {
            name: 'demos',
            type: 'folder',
            children: [
              {
                name: 'library-integration',
                type: 'folder',
                children: [
                  {
                    name: 'react-spring',
                    type: 'folder',
                    children: [
                      { name: 'page.tsx', type: 'file' },
                      {
                        name: 'components',
                        type: 'folder',
                        children: [
                          { name: 'ReactSpringDemo.tsx', type: 'file' }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]