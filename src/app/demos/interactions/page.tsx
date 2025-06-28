'use client'

import Link from 'next/link'

// インタラクションデモの定義
const interactionDemos = [
  {
    id: 'click',
    title: 'Click Events',
    japaneseTitle: 'クリックイベント',
    description: 'オブジェクトのクリック検出と反応'
  },
  {
    id: 'hover',
    title: 'Hover Effects',
    japaneseTitle: 'ホバーエフェクト',
    description: 'マウスオーバー時の色変化やスケール変更'
  },
  {
    id: 'dnd-position',
    title: 'Drag & Drop (Position)',
    japaneseTitle: 'ドラッグ&ドロップによる位置変更',
    description: 'オブジェクトのドラッグによる移動操作'
  },
  {
    id: 'dnd-scale',
    title: 'Drag & Drop (Scale)',
    japaneseTitle: 'ドラッグ&ドロップによる寸法変更',
    description: 'オブジェクトのドラッグによる寸法変更操作'
  },
  {
    id: 'raycasting',
    title: 'Raycasting',
    japaneseTitle: 'レイキャスティング',
    description: 'マウス位置からのレイキャストによる詳細な当たり判定'
  },
  {
    id: 'keyboard-controls',
    title: 'Keyboard Controls',
    japaneseTitle: 'キーボード操作',
    description: 'キーボード入力によるオブジェクト制御'
  },
  {
    id: 'camera-controls',
    title: 'Camera Controls',
    japaneseTitle: 'カメラ操作',
    description: 'OrbitControlsを使ったカメラの回転・ズーム操作'
  },
  {
    id: 'multi-selection',
    title: 'Multi Selection',
    japaneseTitle: '複数選択',
    description: '複数オブジェクトの選択と一括操作'
  },
  {
    id: 'gesture-controls',
    title: 'Gesture Controls',
    japaneseTitle: 'ジェスチャー操作',
    description: 'タッチデバイスでのピンチ・スワイプ操作'
  }
]

// 各インタラクションのカードコンポーネント
function InteractionCard({ demo }: { demo: typeof interactionDemos[0] }) {
  return (
    <Link href={`/demos/interactions/${demo.id}`}>
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

export default function InteractionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900">
      <div className="container mx-auto px-4 py-16">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <Link href="/demos" className="inline-block mb-6 text-blue-300 hover:text-blue-200">
            ← デモ一覧に戻る
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">Interaction Demos</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            React Three Fiberを使った様々なインタラクション技法のデモ集
          </p>
        </div>

        {/* インタラクションデモグリッド */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {interactionDemos.map((demo) => (
            <InteractionCard key={demo.id} demo={demo} />
          ))}
        </div>

        {/* 学習のヒント */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">💡 インタラクション学習のポイント</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <h4 className="font-medium text-white mb-2">基本概念</h4>
                <ul className="space-y-1">
                  <li>• Raycastingの仕組み</li>
                  <li>• イベントハンドリング</li>
                  <li>• 状態管理</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">実装のコツ</h4>
                <ul className="space-y-1">
                  <li>• パフォーマンス最適化</li>
                  <li>• ユーザビリティ向上</li>
                  <li>• レスポンシブ対応</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}