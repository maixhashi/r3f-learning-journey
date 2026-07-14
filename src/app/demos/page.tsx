import Link from 'next/link'

const demos = [
  {
    id: 'three-fundamentals',
    title: 'Three.js Fundamentals',
    description: '素の Three.js 基礎（Scene / Camera / Renderer）',
    icon: '🧊',
    status: 'in-progress',
    features: ['Scene', 'Camera', 'WebGLRenderer', 'requestAnimationFrame']
  },
  {
    id: 'basic-shapes',
    title: 'Basic Shapes',
    description: '基本的な3D図形（Box, Sphere, Cylinder等）の表示',
    icon: '📐',
    status: 'completed',
    features: ['基本ジオメトリ', 'マテリアル', 'ライティング', 'インタラクティブ設定']
  },
  {
    id: 'animations',
    title: 'Animations',
    description: 'useFrameを使ったアニメーション実装',
    icon: '🎬',
    status: 'completed',
    features: ['回転アニメーション', '移動', 'スケーリング', 'イージング']
  },
  {
    id: 'materials',
    title: 'Materials',
    description: '様々なマテリアルとテクスチャの表現',
    icon: '🎨',
    status: 'planned',
    features: ['Standard Material', 'Physical Material', 'テクスチャマッピング', 'PBR']
  },
  {
    id: 'lighting',
    title: 'Lighting',
    description: '照明の種類と設定による表現の変化',
    icon: '💡',
    status: 'planned',
    features: ['Ambient Light', 'Directional Light', 'Point Light', 'Shadows']
  },
  {
    id: 'interactions',
    title: 'Interactions',
    description: 'マウス・キーボードインタラクション',
    icon: '🖱️',
    status: 'completed',
    features: ['Raycasting', 'Click Events', 'Hover Effects', 'Drag & Drop']
  },
  {
    id: 'models',
    title: '3D Models',
    description: 'GLTF/GLBファイルの読み込みと表示',
    icon: '🏗️',
    status: 'planned',
    features: ['GLTF Loader', 'アニメーション', 'テクスチャ', 'Mixamo']
  },
  {
    id: 'library-integration',
    title: 'Library Integration',
    description: '外部ライブラリとの統合（Leva、React Spring等）',
    icon: '🔧',
    status: 'completed',
    features: ['Leva GUI', 'React Spring', 'Physics Engine', 'Post Processing']
  }
]

function DemoCard({ demo }: { demo: typeof demos[0] }) {
  const isLinked = demo.status === 'completed' || demo.status === 'in-progress'
  const badgeLabel =
    demo.status === 'completed' ? 'Complete' : demo.status === 'in-progress' ? 'In Progress' : 'Planned'
  const badgeClass =
    demo.status === 'completed'
      ? 'bg-green-500/20 text-green-300 border border-green-400/30'
      : demo.status === 'in-progress'
        ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
        : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'

  return (
    <div className={`relative bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 ${
      isLinked
        ? 'hover:bg-white/20 transform hover:scale-105'
        : 'opacity-60 cursor-not-allowed'
    }`}>
      <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
        {badgeLabel}
      </div>

      <div className="text-4xl mb-4">{demo.icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{demo.title}</h3>
      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
        {demo.description}
      </p>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-400 mb-2">主な機能:</h4>
        <div className="flex flex-wrap gap-1">
          {demo.features.map((feature) => (
            <span
              key={feature}
              className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {isLinked ? (
        <Link href={`/demos/${demo.id}`} className="block">
          <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-300 py-2 px-4 rounded-lg transition-all duration-200">
            デモを見る →
          </button>
        </Link>
      ) : (
        <button className="w-full bg-gray-500/20 border border-gray-400/30 text-gray-400 py-2 px-4 rounded-lg cursor-not-allowed">
          準備中...
        </button>
      )}
    </div>
  )
}

export default function DemosIndex() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6 text-blue-300 hover:text-blue-200">
            ← ホームに戻る
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">Demos</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Three.js 基礎から R3F まで、機能別に分かれたデモで段階的に学習できます。
          </p>
        </div>

        {/* デモグリッド */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {demos.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </div>

        {/* 進捗情報 */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">学習進捗</h3>
            <div className="text-2xl font-bold text-green-300">
              {demos.filter(d => d.status === 'completed' || d.status === 'in-progress').length} / {demos.length}
            </div>
            <p className="text-gray-300 text-sm">デモ完了</p>
          </div>
        </div>

        {/* 新機能ハイライト */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">NEW</span>
              </div>
              <h3 className="text-xl font-bold text-white">Library Integration</h3>
            </div>
            <p className="text-gray-300 mb-4">
              外部ライブラリとReact Three Fiberの統合デモが追加されました！
              Levaを使用したリアルタイムGUIコントロールで3Dシーンを自由に操作できます。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                🎛️ Leva GUI Controls
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                ⚡ Real-time Updates
              </span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                📁 Organized Folders
              </span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                🎨 Multiple Input Types
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}