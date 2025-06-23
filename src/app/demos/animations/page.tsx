'use client'

import Link from 'next/link'

// アニメーションデモの定義
const animationDemos = [
  {
    id: 'rotation',
    title: 'Rotation',
    japaneseTitle: '回転アニメーション',
    description: 'useFrameを使った基本的な回転アニメーション'
  },
  {
    id: 'oscillation',
    title: 'Oscillation',
    japaneseTitle: '振動アニメーション',
    description: 'sin波を使った上下・左右の振動アニメーション'
  },
  {
    id: 'scaling',
    title: 'Scaling',
    japaneseTitle: 'スケールアニメーション',
    description: 'オブジェクトの拡大縮小アニメーション'
  },
  {
    id: 'orbit',
    title: 'Orbit',
    japaneseTitle: '軌道アニメーション',
    description: '円軌道や楕円軌道での移動アニメーション'
  },
  {
    id: 'spring',
    title: 'Spring',
    japaneseTitle: 'スプリングアニメーション',
    description: 'react-springを使った物理的なアニメーション'
  },
  {
    id: 'morphing',
    title: 'Morphing',
    japaneseTitle: 'モーフィングアニメーション',
    description: 'ジオメトリの形状変化アニメーション'
  }
]

// 各アニメーションのカードコンポーネント
function AnimationCard({ demo }: { demo: typeof animationDemos[0] }) {
  return (
    <Link href={`/demos/animations/${demo.id}`}>
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-white/20 transform hover:scale-105">
        <h3 className="text-xl font-bold text-white mb-1">
          {demo.title} <span className="text-gray-300">({demo.japaneseTitle})</span>
        </h3>
        <p className="text-gray-300 text-sm">
          {demo.description}
        </p>
      </div>
    </Link>
  )
}

export default function AnimationsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <div className="container mx-auto px-4 py-16">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <Link href="/demos" className="inline-block mb-6 text-blue-300 hover:text-blue-200">
            ← デモ一覧に戻る
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">Animation Demos</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            React Three Fiberを使った様々なアニメーション技法のデモ集
          </p>
        </div>

        {/* アニメーションデモグリッド */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {animationDemos.map((demo) => (
            <AnimationCard key={demo.id} demo={demo} />
          ))}
        </div>
      </div>
    </main>
  )
}