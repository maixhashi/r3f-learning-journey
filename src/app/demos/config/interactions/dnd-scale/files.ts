import { FileNode } from '../../types'

export const dndScaleFiles: FileNode[] = [
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
                name: 'interactions',
                type: 'folder',
                children: [
                  {
                    name: 'dnd-scale',
                    type: 'folder',
                    children: [
                      { name: 'page.tsx', type: 'file' },
                      {
                        name: 'components',
                        type: 'folder',
                        children: [
                          { name: 'DndScaleInteractionWithControls.tsx', type: 'file' }
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
                      { name: 'DemoLayoutWithControls.tsx', type: 'file' },
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