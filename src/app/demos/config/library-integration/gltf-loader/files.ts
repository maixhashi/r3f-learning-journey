import { FileNode } from '../../types'

export const gltfLoaderFiles: FileNode[] = [
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
                    name: 'gltf-loader',
                    type: 'folder',
                    children: [
                      { name: 'page.tsx', type: 'file' },
                      {
                        name: 'components',
                        type: 'folder',
                        children: [
                          { name: 'GLTFLoaderDemo.tsx', type: 'file' }
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
      },
      {
        name: 'public',
        type: 'folder',
        children: [
          {
            name: 'models',
            type: 'folder',
            children: [
              { name: 'duck.glb', type: 'file' }
            ]
          }
        ]
      }
    ]
  }
]