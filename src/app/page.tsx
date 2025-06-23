import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            R3F Learning Journey
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            React Three Fiberを使った3Dグラフィックスの学習プロジェクト。
            基本的な図形から高度なインタラクションまで段階的に学習できます。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Playground */}
          <Link href="/playground" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">🎮</div>
              <h2 className="text-2xl font-bold text-white mb-3">Playground</h2>
              <p className="text-gray-300">
                全ての機能を一つの画面で試せる統合環境。
                設定を変更しながらリアルタイムで3Dシーンを調整できます。
              </p>
              <div className="mt-4 text-blue-300 group-hover:text-blue-200">
                実験場へ →
              </div>
            </div>
          </Link>

          {/* Demos */}
          <Link href="/demos" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-white mb-3">Demos</h2>
              <p className="text-gray-300">
                機能別に分かれた個別デモページ。
                各機能に特化したサンプルで段階的に学習できます。
              </p>
              <div className="mt-4 text-green-300 group-hover:text-green-200">
                デモ一覧へ →
              </div>
            </div>
          </Link>
        </div>

        {/* 技術情報 */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">使用技術</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Next.js 14',
              'React Three Fiber',
              'Three.js',
              'TypeScript',
              'Tailwind CSS'
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}