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

          {/* 将来の拡張用プレースホルダー */}
          <div className="bg-gray-800 rounded-lg p-6 opacity-50">
            <div className="mb-4">
              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zM9 9a1 1 0 011-1v-2.5a.5.5 0 011 0V8a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-500">React Spring</h3>
              <p className="text-gray-500 text-sm mb-4">
                React Springを使用したアニメーションライブラリ統合（準備中）
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                スプリングアニメーション
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                物理ベースモーション
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                インタラクティブアニメーション
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <span className="text-gray-500 text-sm">
                Coming Soon...
              </span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 opacity-50">
            <div className="mb-4">
              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-500">Cannon.js Physics</h3>
              <p className="text-gray-500 text-sm mb-4">
                物理エンジンCannon.jsとの統合デモ（準備中）
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                物理シミュレーション
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                衝突検出
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                重力・摩擦シミュレーション
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <span className="text-gray-500 text-sm">
                Coming Soon...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
