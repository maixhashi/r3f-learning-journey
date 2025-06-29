import { FileNode } from '../../types'

export const cannonFiles: FileNode[] = [
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
                    name: 'cannon',
                    type: 'folder',
                    children: [
                      { name: 'page.tsx', type: 'file' },
                      {
                        name: 'components',
                        type: 'folder',
                        children: [
                          { name: 'CannonPhysics.tsx', type: 'file' }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                name: 'components',
                type: 'folder',
                children: [
                  {
                    name: 'common',
                    type: 'folder',
                    children: [
                      { name: 'DemoLayout.tsx', type: 'file' },
                      { name: 'Lighting.tsx', type: 'file' },
                      { name: 'index.ts', type: 'file' }
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