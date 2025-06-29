import { FeatureFile } from '../../types'

export const gltfLoaderFeatures: FeatureFile[] = [
  {
    id: 'gltf-loading',
    name: "GLTFファイルの読み込み",
    description: "useGLTFフックを使用した3Dモデルの読み込みと表示",
    files: ["src/app/demos/library-integration/gltf-loader/components/GLTFLoaderDemo.tsx"],
    codeSections: [
      {
        title: "useGLTFによるモデル読み込み",
        description: "React Three DreiのuseGLTFフックでGLTFファイルを読み込み",
        fileName: "GLTFLoaderDemo.tsx",
        code: `function GLTFModel() {
  // デフォルトのGLTFファイルを読み込み
  // ダウンロード元: https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/Duck/glTF-Binary
  const { scene } = useGLTF('/models/duck.glb')
  
  return (
    <group>
      <primitive 
        object={scene} 
        scale={[2, 2, 2]} 
        position={[0, -1, 0]}
        castShadow
        receiveShadow
      />
    </group>
  )
}

// GLTFファイルをプリロード（パフォーマンス向上）
useGLTF.preload('/models/duck.glb')`,
        highlights: [
          {
            id: "use-gltf",
            startLine: 4,
            endLine: 4,
            startColumn: 2,
            endColumn: 45,
            tooltip: {
              title: "useGLTF",
              description: "React Three DreiのフックでGLTFファイルを読み込みます。scene、nodes、materials、animationsなどを取得できます。",
              documentationUrl: "https://threejs.org/docs/#examples/en/loaders/GLTFLoader",
              r3fDocumentationUrl: "https://github.com/pmndrs/drei#usegltf"
            }
          },
          {
            id: "primitive",
            startLine: 8,
            endLine: 14,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "primitive",
              description: "Three.jsのオブジェクトをReact Three Fiberで直接使用するためのコンポーネントです。GLTFのsceneオブジェクトをそのまま表示できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/objects#primitive"
            }
          },
          {
            id: "preload",
            startLine: 19,
            endLine: 19,
            startColumn: 0,
            endColumn: 35,
            tooltip: {
              title: "preload",
              description: "GLTFファイルを事前に読み込むことで、コンポーネントがマウントされた時の読み込み時間を短縮できます。",
              documentationUrl: "https://threejs.org/docs/#examples/en/loaders/GLTFLoader",
              r3fDocumentationUrl: "https://github.com/pmndrs/drei#usegltf"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'suspense-loading',
    name: "Suspenseによるローディング",
    description: "React SuspenseでGLTFモデルの読み込み状態を管理",
    files: ["src/app/demos/library-integration/gltf-loader/components/GLTFLoaderDemo.tsx"],
    codeSections: [
      {
        title: "Suspenseとフォールバック",
        description: "非同期読み込み中に表示するローディング画面の実装",
        fileName: "GLTFLoaderDemo.tsx",
        code: `// ローディングコンポーネント
function LoadingFallback() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#666666" wireframe />
      </mesh>
      <Text position={[0, -2, 0]} fontSize={0.5} color="white" anchorX="center">
        Loading GLTF Model...
      </Text>
    </group>
  )
}

export function GLTFLoaderDemo() {
  return (
    <group>
      <Suspense fallback={<LoadingFallback />}>
        <GLTFModel />
      </Suspense>
      
      {/* 情報テキスト */}
      <Text position={[0, -3, 0]} fontSize={0.3} color="white" anchorX="center">
        GLTF Model: Duck
      </Text>
      <Text position={[0, -3.5, 0]} fontSize={0.2} color="gray" anchorX="center">
        Source: Khronos glTF Sample Models
      </Text>
    </group>
  )
}`,
        highlights: [
          {
            id: "suspense",
            startLine: 17,
            endLine: 19,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "Suspense",
              description: "Reactの機能で、非同期処理（GLTFファイルの読み込み）が完了するまでfallbackコンポーネントを表示します。",
              documentationUrl: "https://react.dev/reference/react/Suspense",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models#suspense"
            }
          },
          {
            id: "fallback",
            startLine: 17,
            endLine: 17,
            startColumn: 15,
            endColumn: 45,
            tooltip: {
              title: "fallback",
              description: "Suspenseのfallback propで指定されたコンポーネントが、非同期処理中に表示されます。ローディング画面として機能します。",
              documentationUrl: "https://react.dev/reference/react/Suspense#suspense",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models#suspense"
            }
          },
          {
            id: "wireframe",
            startLine: 6,
            endLine: 6,
            startColumn: 8,
            endColumn: 55,
            tooltip: {
              title: "wireframe",
              description: "マテリアルのwireframe属性をtrueにすると、オブジェクトをワイヤーフレーム表示できます。ローディング中の視覚効果として使用。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.wireframe",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/objects#materials"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'gltf-optimization',
    name: "GLTFファイルの最適化",
    description: "GLTFファイルの最適化とベストプラクティス",
    files: ["src/app/demos/library-integration/gltf-loader/components/GLTFLoaderDemo.tsx"],
    codeSections: [
      {
        title: "パフォーマンス最適化",
        description: "GLTFファイルの効率的な読み込みと使用方法",
        fileName: "OptimizedGLTF.tsx",
        code: `// 最適化されたGLTFローダーの例
function OptimizedGLTFModel() {
  const { scene, nodes, materials } = useGLTF('/models/duck.glb')
  
  // 特定のメッシュのみを使用
  const duckMesh = nodes.Duck as THREE.Mesh
  
  return (
    <group>
      {/* 元のsceneを使用する場合 */}
      <primitive object={scene.clone()} />
      
      {/* 特定のメッシュのみを使用する場合（推奨） */}
      <mesh
        geometry={duckMesh.geometry}
        material={materials.DuckMaterial}
        scale={[2, 2, 2]}
        position={[2, 0, 0]}
        castShadow
        receiveShadow
      />
    </group>
  )
}

// 複数のGLTFファイルをプリロード
const modelPaths = ['/models/duck.glb', '/models/other.glb']
modelPaths.forEach(path => useGLTF.preload(path))

// メモリ使用量を削減するためのクリーンアップ
useEffect(() => {
  return () => {
    // コンポーネントのアンマウント時にキャッシュをクリア
    useGLTF.clear('/models/duck.glb')
  }
}, [])`,
        highlights: [
            {
                id: "nodes-materials",
                startLine: 3,
                endLine: 3,
                startColumn: 2,
                endColumn: 55,
                tooltip: {
                  title: "nodes & materials",
                  description: "GLTFファイルから個別のノード（メッシュ）とマテリアルを取得できます。これにより、特定の部分のみを使用したり、カスタマイズが可能になります。",
                  documentationUrl: "https://threejs.org/docs/#examples/en/loaders/GLTFLoader",
                  r3fDocumentationUrl: "https://github.com/pmndrs/drei#usegltf"
                }
              },
              {
                id: "clone",
                startLine: 9,
                endLine: 9,
                startColumn: 6,
                endColumn: 40,
                tooltip: {
                  title: "clone()",
                  description: "同じモデルを複数回使用する場合は、clone()メソッドでオブジェクトを複製します。これにより、それぞれ独立して操作できます。",
                  documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D.clone",
                  r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/objects#cloning-objects"
                }
              },
              {
                id: "cleanup",
                startLine: 25,
                endLine: 29,
                startColumn: 0,
                endColumn: 4,
                tooltip: {
                  title: "メモリクリーンアップ",
                  description: "useGLTF.clear()でキャッシュされたGLTFファイルをメモリから削除できます。メモリリークを防ぐために重要です。",
                  documentationUrl: "https://threejs.org/docs/#examples/en/loaders/GLTFLoader",
                  r3fDocumentationUrl: "https://github.com/pmndrs/drei#usegltf"
                }
              }
            ]
          }
        ]
      },
      {
        id: 'gltf-file-format',
        name: "GLTFファイル形式について",
        description: "GLTFファイル形式の特徴と使用方法",
        files: ["src/app/demos/library-integration/gltf-loader/components/GLTFLoaderDemo.tsx"],
        codeSections: [
          {
            title: "GLTFファイル形式の理解",
            description: "GLTF 2.0の特徴とファイル形式の違い",
            fileName: "GLTFInfo.tsx",
            code: `/*
    GLTF (GL Transmission Format) について
    
    1. ファイル形式の種類:
       - .gltf: JSON形式（テキスト）+ 外部バイナリファイル
       - .glb: バイナリ形式（すべてが1ファイルに含まれる）
    
    2. 含まれる情報:
       - ジオメトリ（頂点、面）
       - マテリアル（色、テクスチャ）
       - アニメーション
       - ライティング情報
       - カメラ情報
    
    3. 推奨される使用場面:
       - Webでの3Dモデル表示
       - リアルタイムレンダリング
       - VR/AR アプリケーション
    
    4. サンプルモデルのダウンロード元:
       Khronos Group glTF Sample Models
       https://github.com/KhronosGroup/glTF-Sample-Models
    
    5. 使用例:
    */
    
    // 基本的な読み込み
    const { scene } = useGLTF('/models/model.glb')
    
    // 詳細な情報を取得
    const { scene, nodes, materials, animations } = useGLTF('/models/model.glb')
    
    // アニメーション付きモデルの場合
    const { scene, animations } = useGLTF('/models/animated-model.glb')
    const { actions } = useAnimations(animations, scene)`,
            highlights: [
              {
                id: "gltf-vs-glb",
                startLine: 4,
                endLine: 7,
                startColumn: 0,
                endColumn: 50,
                tooltip: {
                  title: "GLTF vs GLB",
                  description: ".gltfは複数ファイル、.glbは単一ファイルです。Webでは.glbが推奨されます（HTTP リクエスト数が少ない）。",
                  documentationUrl: "https://www.khronos.org/gltf/",
                  r3fDocumentationUrl: "https://github.com/pmndrs/drei#usegltf"
                }
              },
              {
                id: "sample-models",
                startLine: 18,
                endLine: 19,
                startColumn: 0,
                endColumn: 60,
                tooltip: {
                  title: "サンプルモデル",
                  description: "Khronos GroupがGLTF形式の標準的なサンプルモデルを提供しています。学習や開発に自由に使用できます。",
                  documentationUrl: "https://github.com/KhronosGroup/glTF-Sample-Models",
                  r3fDocumentationUrl: "https://github.com/pmndrs/drei#usegltf"
                }
              }
            ]
          }
        ]
      }
    ]
    