'use client'

import Link from 'next/link'

// 3Dシェイプデモの定義
const shapesDemos = [
  {
    id: 'box',
    title: 'Box',
    japaneseTitle: '立方体',
    description: '立方体の3D表示'
  },
  {
    id: 'sphere',
    title: 'Sphere',
    japaneseTitle: '球体',
    description: '球体の3D表示'
  },
  {
    id: 'cylinder',
    title: 'Cylinder',
    japaneseTitle: '円柱',
    description: '円柱の3D表示'
  },
  {
    id: 'cone',
    title: 'Cone',
    japaneseTitle: '円錐',
    description: '円錐の3D表示'
  },
  {
    id: 'torus',
    title: 'Torus',
    japaneseTitle: 'トーラス',
    description: 'トーラスの3D表示'
  },
  {
    id: 'plane',
    title: 'Plane',
    japaneseTitle: '平面',
    description: '平面の3D表示'
  }
]

// 各シェイプのカードコンポーネント
function ShapeCard({ demo }: { demo: typeof shapesDemos[0] }) {
  return (
    <Link href={`/demos/${demo.id}`}>
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

export default function BasicShapesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-4 py-16">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <Link href="/demos" className="inline-block mb-6 text-blue-300 hover:text-blue-200">
            ← デモ一覧に戻る
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">3D Demos</h1>
        </div>

        {/* シェイプデモグリッド */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {shapesDemos.map((demo) => (
            <ShapeCard key={demo.id} demo={demo} />
          ))}
        </div>
      </div>
    </main>
  )
}
