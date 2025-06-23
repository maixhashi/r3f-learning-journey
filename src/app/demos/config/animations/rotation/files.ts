import { FileNode } from '../../types'

export const rotationFiles: FileNode[] = [
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
                name: 'animations',
                type: 'folder',
                children: [
                  {
                    name: 'rotation',
                    type: 'folder',
                    children: [
                      { name: 'page.tsx', type: 'file' },
                      {
                        name: 'components',
                        type: 'folder',
                        children: [
                          { name: 'RotationAnimation.tsx', type: 'file' }
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