'use client'

import Link from 'next/link'

export default function D3ThreeJSIntegrationPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* ナビゲーション */}
        <div className="mb-6">
          <Link 
            href="/demos/library-integration" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            ライブラリ統合デモに戻る
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">D3.js + Three.js Integration Demos</h1>
          <p className="text-gray-300">D3.jsのデータ処理と3Dビジュアライゼーションの融合デモ集</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* データドリブン3D基礎 */}
          <Link href="/demos/library-integration/d3-threejs/data-driven-3d">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">データドリブン3D基礎</h3>
                <p className="text-gray-400 text-sm mb-4">
                  D3.jsのデータバインディングと3Dオブジェクト生成の基本概念
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  データバインディング
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  スケール関数
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  動的オブジェクト生成
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  色スケール適用
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* 3Dバーチャート */}
          <Link href="/demos/library-integration/d3-threejs/3d-bar-chart">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1-2H8l-1 2H5V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">3Dバーチャート</h3>
                <p className="text-gray-400 text-sm mb-4">
                  実用的なデータ可視化としての3D棒グラフ実装
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  売上データ可視化
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  インタラクティブホバー
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  データ更新アニメーション
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  軸ラベル・グリッド
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る → (準備中)
                </span>
              </div>
            </div>
          </Link>

          {/* 3Dスキャッタープロット */}
          <Link href="/demos/library-integration/d3-threejs/scatter-plot">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h.01a1 1 0 100-2H7zM10 7a1 1 0 011 1v.01a1 1 0 11-2 0V8a1 1 0 011-1zm2 2a1 1 0 000 2h.01a1 1 0 100-2H12z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">3Dスキャッタープロット</h3>
                <p className="text-gray-400 text-sm mb-4">
                  多次元データの3D空間での散布図表現
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  3次元データプロット
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  クラスタリング表示
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  データフィルタリング
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  統計情報表示
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る → (準備中)
                </span>
              </div>
            </div>
          </Link>

          {/* 3Dネットワークグラフ */}
          <Link href="/demos/library-integration/d3-threejs/network-graph">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">3Dネットワークグラフ</h3>
                <p className="text-gray-400 text-sm mb-4">
                  ノード・リンク構造の3D空間での可視化
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Force Simulation
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ノードドラッグ操作
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  関係性の可視化
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  階層レイアウト
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る → (準備中)
                </span>
              </div>
            </div>
          </Link>

          {/* 時系列3Dサーフェス */}
          <Link href="/demos/library-integration/d3-threejs/time-series-surface">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">時系列3Dサーフェス</h3>
                <p className="text-gray-400 text-sm mb-4">
                  時間軸を含む3Dサーフェスでの時系列データ表現
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  時系列データ処理
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  3Dサーフェス生成
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  時間スライダー
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  アニメーション再生
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る → (準備中)
                </span>
              </div>
            </div>
          </Link>

          {/* データ変換・補間 */}
          <Link href="/demos/library-integration/d3-threejs/data-interpolation">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">データ変換・補間</h3>
                <p className="text-gray-400 text-sm mb-4">
                  D3.jsの強力なデータ変換機能と3Dアニメーション
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  データ補間
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  トランジション
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  イージング関数
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  モーフィング
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る → (準備中)
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* フッター情報 */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">D3.js + Three.js統合について</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              D3.jsの強力なデータ処理・変換機能とThree.jsの3D描画機能を組み合わせることで、
              従来の2Dデータ可視化を超えた表現力豊かな3Dビジュアライゼーションを実現できます。
              これらのデモでは、実際のデータを使用した実用的な可視化パターンを学習できます。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">データドリブン</h3>
              <p className="text-gray-400 text-sm">
                実際のデータを使用した実用的な可視化パターンを学習
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">インタラクティブ</h3>
              <p className="text-gray-400 text-sm">
                ユーザー操作に応答する動的な3Dビジュアライゼーション
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">アニメーション</h3>
              <p className="text-gray-400 text-sm">
                滑らかなトランジションと時間軸を活用した表現
              </p>
            </div>
          </div>

          {/* 技術スタック */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-6 text-center">使用技術</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-blue-400 font-medium">D3.js</span>
                <span className="text-gray-400 text-sm ml-2">データ処理・変換</span>
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-green-400 font-medium">Three.js</span>
                <span className="text-gray-400 text-sm ml-2">3D描画エンジン</span>
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-purple-400 font-medium">React Three Fiber</span>
                <span className="text-gray-400 text-sm ml-2">React統合</span>
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-yellow-400 font-medium">TypeScript</span>
                <span className="text-gray-400 text-sm ml-2">型安全性</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
