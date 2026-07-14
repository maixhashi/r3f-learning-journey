import { FeatureFile } from '../../types'

export const helloSceneFeatures: FeatureFile[] = [
  {
    id: 'hello-scene-core',
    name: 'Hello Scene の骨格',
    description:
      'Scene / PerspectiveCamera / WebGLRenderer を組み立て、requestAnimationFrame で描画し、dispose で破棄する最小構成',
    files: [
      'src/app/demos/three-fundamentals/hello-scene/components/createHelloScene.ts',
      'src/app/demos/three-fundamentals/hello-scene/page.tsx',
    ],
    codeSections: [
      {
        title: 'Renderer / Scene / Camera',
        description: 'キャンバスに描画するための三要素',
        fileName: 'createHelloScene.ts',
        code: `const renderer = new WebGLRenderer({ canvas, antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(width, height, false)
renderer.setClearColor(new Color('#1f2937'))

const scene = new Scene()

const camera = new PerspectiveCamera(60, width / height, 0.1, 100)
camera.position.set(3, 3, 3)
camera.lookAt(0, 0, 0)`,
        highlights: [
          {
            id: 'webgl-renderer',
            startLine: 1,
            endLine: 1,
            startColumn: 1,
            endColumn: 60,
            tooltip: {
              title: 'WebGLRenderer',
              description:
                'WebGL コンテキストを持ち、scene と camera を使って canvas に描画するレンダラです。',
              documentationUrl:
                'https://threejs.org/docs/#api/en/renderers/WebGLRenderer',
            },
          },
          {
            id: 'scene',
            startLine: 6,
            endLine: 6,
            startColumn: 1,
            endColumn: 28,
            tooltip: {
              title: 'Scene',
              description:
                'オブジェクト・ライト・カメラを配置するシーングラフのルートです。',
              documentationUrl: 'https://threejs.org/docs/#api/en/scenes/Scene',
            },
          },
          {
            id: 'perspective-camera',
            startLine: 8,
            endLine: 10,
            startColumn: 1,
            endColumn: 28,
            tooltip: {
              title: 'PerspectiveCamera',
              description:
                '透視投影カメラ。fov / aspect / near / far で視体積を定義します。',
              documentationUrl:
                'https://threejs.org/docs/#api/en/cameras/PerspectiveCamera',
            },
          },
        ],
      },
      {
        title: 'Animation loop',
        description: 'requestAnimationFrame で毎フレーム更新・描画する',
        fileName: 'createHelloScene.ts',
        code: `const tick = () => {
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.015
  renderer.render(scene, camera)
  frameId = requestAnimationFrame(tick)
}
frameId = requestAnimationFrame(tick)`,
        highlights: [
          {
            id: 'raf',
            startLine: 5,
            endLine: 5,
            startColumn: 3,
            endColumn: 45,
            tooltip: {
              title: 'requestAnimationFrame',
              description:
                'ブラウザの描画タイミングに合わせてループする API。R3F の useFrame の裏でも同様の仕組みが動いています。',
              documentationUrl:
                'https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame',
            },
          },
          {
            id: 'render',
            startLine: 4,
            endLine: 4,
            startColumn: 3,
            endColumn: 36,
            tooltip: {
              title: 'renderer.render',
              description: '指定した camera から scene を canvas に描画します。',
              documentationUrl:
                'https://threejs.org/docs/#api/en/renderers/WebGLRenderer.render',
            },
          },
        ],
      },
      {
        title: 'Dispose',
        description: 'アンマウント時に GPU リソースと rAF を解放する',
        fileName: 'createHelloScene.ts',
        code: `return () => {
  cancelAnimationFrame(frameId)
  observer?.disconnect()
  geometry.dispose()
  material.dispose()
  renderer.dispose()
}`,
        highlights: [
          {
            id: 'dispose',
            startLine: 1,
            endLine: 7,
            startColumn: 1,
            endColumn: 2,
            tooltip: {
              title: 'dispose',
              description:
                'geometry / material / renderer は明示的に dispose しないと GPU メモリが残り続けます。createScene は必ずクリーンアップ関数を返します。',
              documentationUrl:
                'https://threejs.org/docs/#api/en/core/BufferGeometry.dispose',
            },
          },
        ],
      },
    ],
  },
]
