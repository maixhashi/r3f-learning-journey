'use client'

import Link from 'next/link'

const curriculum = [
  {
    id: 'hello-scene',
    title: 'Hello Scene',
    japaneseTitle: 'ハローシーン',
    description: 'Scene / Camera / Renderer と requestAnimationFrame の最小構成',
    status: 'completed' as const,
  },
  {
    id: 'mesh-anatomy',
    title: 'Mesh Anatomy',
    japaneseTitle: 'メッシュの解剖',
    description: 'Mesh = Geometry + Material、Object3D 階層',
    status: 'planned' as const,
  },
  {
    id: 'transforms',
    title: 'Transforms',
    japaneseTitle: 'トランスフォーム',
    description: 'position / rotation / scale と Group',
    status: 'planned' as const,
  },
  {
    id: 'geometries',
    title: 'Geometries',
    japaneseTitle: 'ジオメトリ',
    description: '組み込みジオメトリと BufferGeometry のイメージ',
    status: 'planned' as const,
  },
  {
    id: 'materials',
    title: 'Materials',
    japaneseTitle: 'マテリアル',
    description: 'Basic / Standard / Physical と PBR パラメータ',
    status: 'planned' as const,
  },
  {
    id: 'lights-and-shadows',
    title: 'Lights and Shadows',
    japaneseTitle: 'ライトと影',
    description: 'Ambient / Directional / Point と shadow map',
    status: 'planned' as const,
  },
  {
    id: 'cameras',
    title: 'Cameras',
    japaneseTitle: 'カメラ',
    description: 'Perspective と Orthographic、fov / near / far',
    status: 'planned' as const,
  },
  {
    id: 'animation-loop',
    title: 'Animation Loop',
    japaneseTitle: 'アニメーションループ',
    description: 'デルタタイムとオブジェクト更新（useFrame の正体）',
    status: 'planned' as const,
  },
  {
    id: 'raycasting',
    title: 'Raycasting',
    japaneseTitle: 'レイキャスト',
    description: 'Raycaster とポインタ交差',
    status: 'planned' as const,
  },
  {
    id: 'textures-uv',
    title: 'Textures and UV',
    japaneseTitle: 'テクスチャと UV',
    description: 'TextureLoader と UV の直感',
    status: 'planned' as const,
  },
  {
    id: 'gltf-basics',
    title: 'GLTF Basics',
    japaneseTitle: 'GLTF 基礎',
    description: 'GLTFLoader と読み込み後のシーングラフ',
    status: 'planned' as const,
  },
  {
    id: 'dispose-lifecycle',
    title: 'Dispose Lifecycle',
    japaneseTitle: '破棄ライフサイクル',
    description: 'geometry / material / texture の dispose',
    status: 'planned' as const,
  },
]

function CurriculumCard({ demo }: { demo: (typeof curriculum)[0] }) {
  const isCompleted = demo.status === 'completed'

  const card = (
    <div
      className={`relative bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 ${
        isCompleted
          ? 'hover:bg-white/20 transform hover:scale-105'
          : 'opacity-60 cursor-not-allowed'
      }`}
    >
      <div
        className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
          isCompleted
            ? 'bg-green-500/20 text-green-300 border border-green-400/30'
            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
        }`}
      >
        {isCompleted ? 'Complete' : 'Planned'}
      </div>
      <h3 className="text-xl font-bold text-white mb-1 pr-20">
        {demo.title}{' '}
        <span className="text-gray-300 text-base font-normal">({demo.japaneseTitle})</span>
      </h3>
      <p className="text-gray-300 text-sm">{demo.description}</p>
    </div>
  )

  if (!isCompleted) {
    return card
  }

  return <Link href={`/demos/three-fundamentals/${demo.id}`}>{card}</Link>
}

export default function ThreeFundamentalsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Link href="/demos" className="inline-block mb-6 text-blue-300 hover:text-blue-200">
            ← デモ一覧に戻る
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">Three.js Fundamentals</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            素の Three.js（imperative）で Scene / Camera / Renderer を学ぶ前半トラック。
            完了後に R3F デモへ進みます。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {curriculum.map((demo) => (
            <CurriculumCard key={demo.id} demo={demo} />
          ))}
        </div>
      </div>
    </main>
  )
}
