import { FileNode } from '../../types'

export const helloSceneFiles: FileNode[] = [
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
                name: 'three-fundamentals',
                type: 'folder',
                children: [
                  {
                    name: 'hello-scene',
                    type: 'folder',
                    children: [
                      { name: 'page.tsx', type: 'file' },
                      {
                        name: 'components',
                        type: 'folder',
                        children: [
                          { name: 'createHelloScene.ts', type: 'file' },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: 'components',
                type: 'folder',
                children: [
                  {
                    name: 'common',
                    type: 'folder',
                    children: [
                      { name: 'ThreeDemoLayout.tsx', type: 'file' },
                      { name: 'index.ts', type: 'file' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
