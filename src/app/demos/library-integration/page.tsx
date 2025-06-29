'use client'

import Link from 'next/link'

export default function LibraryIntegrationPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* ナビゲーション */}
        <div className="mb-6">
          <Link 
            href="/demos" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            デモ一覧に戻る
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Library Integration Demos</h1>
          <p className="text-gray-300">外部ライブラリとReact Three Fiberの統合デモ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Leva GUI Control Demo */}
          <Link href="/demos/library-integration/leva">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Leva GUI Control</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Levaライブラリを使用したリアルタイムGUIコントロールパネルのデモ
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  リアルタイムパラメータ制御
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  フォルダ組織化
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  多様な入力タイプ
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  3Dオブジェクト制御
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* React Spring Demo */}
          <Link href="/demos/library-integration/react-spring">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">React Spring</h3>
                <p className="text-gray-400 text-sm mb-4">
                  React Springを使用したスムーズなアニメーションとトランジション
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  スプリングアニメーション
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  物理ベースモーション
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  インタラクティブアニメーション
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  チェーンアニメーション
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* Cannon.js Physics Demo */}
          <Link href="/demos/library-integration/cannon">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Cannon.js Physics</h3>
                <p className="text-gray-400 text-sm mb-4">
                  物理エンジンCannon.jsを使用したリアルな物理シミュレーション
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  重力・摩擦シミュレーション
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  衝突検出・反応
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  剛体物理演算
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  制約・ジョイント
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* Three.js Postprocessing Demo */}
          <Link href="/demos/library-integration/postprocessing">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Postprocessing</h3>
                <p className="text-gray-400 text-sm mb-4">
                  ポストプロセッシングエフェクトによる高品質な視覚効果
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ブルーム・グロー効果
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  被写界深度（DOF）
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  SSAO・SSR
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  カラーグレーディング
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* GLTF Loader Demo */}
          <Link href="/demos/library-integration/gltf-loader">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">GLTF Loader</h3>
                <p className="text-gray-400 text-sm mb-4">
                  GLTFモデルの読み込みとアニメーション再生
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  3Dモデル読み込み
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  アニメーション制御
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  マテリアル・テクスチャ
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  モーフターゲット
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* Framer Motion 3D Demo */}
          <Link href="/demos/library-integration/framer-motion-3d">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Framer Motion 3D</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Framer Motionと3Dオブジェクトの連携アニメーション
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  クリックイベント連動
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  レイアウトアニメーション
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ドラッグ&ドロップ
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  バリアント制御
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* Zustand State Management Demo */}
          <Link href="/demos/library-integration/zustand">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Zustand State</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Zustandを使用したグローバル状態管理と3D連携
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  グローバル状態管理
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  リアクティブ更新
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  永続化ストレージ
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  複数コンポーネント連携
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* React Query + 3D Demo */}
          <Link href="/demos/library-integration/react-query">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">React Query</h3>
                <p className="text-gray-400 text-sm mb-4">
                  React Queryでデータフェッチと3Dビジュアライゼーション
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  データフェッチング
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  キャッシュ管理
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  リアルタイム更新
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ローディング状態
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* Three.js Rapier Physics Demo */}
          <Link href="/demos/library-integration/rapier">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Rapier Physics</h3>
                <p className="text-gray-400 text-sm mb-4">
                  高性能物理エンジンRapierを使用した物理シミュレーション
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  高性能物理演算
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  流体シミュレーション
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ソフトボディ
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  クロスシミュレーション
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* Drei Helpers Demo */}
          <Link href="/demos/library-integration/drei">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Drei Helpers</h3>
                <p className="text-gray-400 text-sm mb-4">
                  React Three Dreiの便利なヘルパーコンポーネント集
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  OrbitControls・カメラ制御
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Environment・HDR背景
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Text・3Dテキスト
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Stats・パフォーマンス監視
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* React Hook Form + 3D Demo */}
          <Link href="/demos/library-integration/react-hook-form">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm10-8a1 1 0 00-1 1v4a1 1 0 102 0V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">React Hook Form</h3>
                <p className="text-gray-400 text-sm mb-4">
                  フォーム入力と3Dオブジェクトのリアルタイム連携
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  フォーム状態管理
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  バリデーション連携
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  リアルタイム反映
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  3Dプレビュー
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* D3.js + Three.js Demo */}
          <Link href="/demos/library-integration/d3-threejs">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">D3.js + Three.js</h3>
                <p className="text-gray-400 text-sm mb-4">
                  D3.jsのデータ処理と3Dビジュアライゼーションの融合
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  データドリブン3D
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  スケール・軸変換
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  インタラクティブチャート
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  アニメーション遷移
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* WebGL Shaders Demo */}
          <Link href="/demos/library-integration/shaders">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom Shaders</h3>
                <p className="text-gray-400 text-sm mb-4">
                  カスタムシェーダーによる高度な視覚効果とマテリアル
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  フラグメントシェーダー
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  バーテックスシェーダー
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ノイズ・パターン生成
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  リアルタイムエフェクト
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* WebXR/VR Demo */}
          <Link href="/demos/library-integration/webxr">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-rose-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">WebXR/VR</h3>
                <p className="text-gray-400 text-sm mb-4">
                  WebXR APIを使用したVR/AR体験の実装
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  VR/ARヘッドセット対応
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ハンドトラッキング
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  空間インタラクション
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  没入型体験
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* Tone.js Audio Demo */}
          <Link href="/demos/library-integration/tonejs">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-lime-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.895-4.21-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.984 5.984 0 01-.757 2.828 1 1 0 01-1.415-1.414A3.987 3.987 0 0013 12a3.988 3.988 0 00-.172-1.414 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Tone.js Audio</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Tone.jsを使用した3Dオーディオビジュアライゼーション
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  リアルタイム音声解析
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  周波数スペクトラム
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  音楽連動アニメーション
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  3D空間オーディオ
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* GSAP Animation Demo */}
          <Link href="/demos/library-integration/gsap">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-sky-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">GSAP Animation</h3>
                <p className="text-gray-400 text-sm mb-4">
                  GSAPを使用した高性能3Dアニメーションライブラリ
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  タイムライン制御
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  イージング関数
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  モーフィングアニメーション
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  スクロール連動
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* Socket.io Multiplayer Demo */}
          <Link href="/demos/library-integration/socketio">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-fuchsia-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm10-8a1 1 0 00-1 1v6a1 1 0 102 0V5a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Socket.io Multiplayer</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Socket.ioを使用したリアルタイムマルチプレイヤー3D体験
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  リアルタイム同期
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  マルチユーザー対応
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  共有3D空間
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  チャット機能
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* Tailwind CSS + 3D Demo */}
          <Link href="/demos/library-integration/tailwind-3d">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Tailwind CSS + 3D</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Tailwind CSSと3Dコンポーネントの統合UI/UXデザイン
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  レスポンシブ3D
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ダークモード対応
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  アニメーション統合
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  モダンUI/UX
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* Storybook Integration Demo */}
          <Link href="/demos/library-integration/storybook">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Storybook Integration</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Storybookを使用した3Dコンポーネントの開発・テスト環境
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  コンポーネントカタログ
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  インタラクティブドキュメント
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ビジュアルテスト
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  アドオン統合
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* React Testing Library Demo */}
          <Link href="/demos/library-integration/testing-library">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Testing Library</h3>
                <p className="text-gray-400 text-sm mb-4">
                  React Testing Libraryを使用した3Dコンポーネントのテスト
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ユニットテスト
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  インテグレーションテスト
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  モックとスタブ
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  スナップショットテスト
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* Playwright E2E Demo */}
          <Link href="/demos/library-integration/playwright">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Playwright E2E</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Playwrightを使用した3Dアプリケーションのエンドツーエンドテスト
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ブラウザ自動化
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ビジュアル回帰テスト
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  パフォーマンステスト
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  クロスブラウザテスト
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* TypeScript Integration Demo */}
          <Link href="/demos/library-integration/typescript">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">TypeScript Integration</h3>
                <p className="text-gray-400 text-sm mb-4">
                  TypeScriptを使用した型安全な3D開発のベストプラクティス
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  型定義とインターフェース
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ジェネリクス活用
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  型推論とアサーション
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  デコレータパターン
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* Vite Build Tool Demo */}
          <Link href="/demos/library-integration/vite">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Vite Build Tool</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Viteを使用した高速な3D開発環境とビルド最適化
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  高速HMR
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ESモジュール対応
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  プラグインエコシステム
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  バンドル最適化
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* PWA Integration Demo */}
          <Link href="/demos/library-integration/pwa">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">PWA Integration</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Progressive Web Appとして動作する3Dアプリケーション
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  オフライン対応
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  インストール可能
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  プッシュ通知
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  バックグラウンド同期
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

        </div>

        {/* フッター情報 */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">ライブラリ統合について</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              React Three Fiberは豊富なエコシステムを持ち、様々な外部ライブラリとの統合が可能です。
              これらのデモでは、実際のプロジェクトで使用される一般的なライブラリとの連携方法を学ぶことができます。
              各デモには詳細な実装例とベストプラクティスが含まれています。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">実装例</h3>
              <p className="text-gray-400 text-sm">
                実際のコードと詳細な解説で、ライブラリ統合の方法を学習
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">ベストプラクティス</h3>
              <p className="text-gray-400 text-sm">
                パフォーマンスと保守性を考慮した実装パターンを紹介
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">豊富なライブラリ</h3>
              <p className="text-gray-400 text-sm">
                アニメーション、物理演算、UI、テストなど幅広い分野をカバー
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
