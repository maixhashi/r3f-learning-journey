'use client'

import Link from 'next/link'

export default function LevaIntegrationPage() {
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
          <h1 className="text-3xl font-bold mb-2">Leva GUI Control Integration Demos</h1>
          <p className="text-gray-300">Levaライブラリを使用したリアルタイムGUIコントロールの実装例集</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* リアルタイムパラメータ制御 */}
          <Link href="/demos/library-integration/leva/realtime-params-control">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">リアルタイムパラメータ制御</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Levaの基本機能を使用した3Dオブジェクトのリアルタイム制御
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  基本的なコントロール
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
                  リアルタイム反映
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る →
                </span>
              </div>
            </div>
          </Link>

          {/* 高度なGUIコントロール */}
          <Link href="/demos/library-integration/leva/advanced-controls">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">高度なGUIコントロール</h3>
                <p className="text-gray-400 text-sm mb-4">
                  カスタムコントロール、監視機能、プリセット管理の実装
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  カスタムコントロール
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  値の監視・ログ
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  プリセット管理
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  条件付き表示
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る → (準備中)
                </span>
              </div>
            </div>
          </Link>

          {/* アニメーションタイムライン */}
          <Link href="/demos/library-integration/leva/animation-timeline">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">アニメーションタイムライン</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Levaを使用したアニメーションタイムラインとキーフレーム制御
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  タイムライン制御
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  キーフレーム設定
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  再生・停止・巻き戻し
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  イージング設定
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る → (準備中)
                </span>
              </div>
            </div>
          </Link>

          {/* マテリアルエディタ */}
          <Link href="/demos/library-integration/leva/material-editor">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">マテリアルエディタ</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Levaを使用したインタラクティブなマテリアル編集システム
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  マテリアルプロパティ
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  テクスチャ設定
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  シェーダーパラメータ
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  プリセット保存
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る → (準備中)
                </span>
              </div>
            </div>
          </Link>

          {/* シーンコンポーザー */}
          <Link href="/demos/library-integration/leva/scene-composer">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">シーンコンポーザー</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Levaを使用した複雑な3Dシーンの構築と管理システム
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  オブジェクト階層管理
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  ライティング設定
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  カメラ制御
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  シーン保存・読み込み
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-blue-400 text-sm font-medium">
                  デモを見る → (準備中)
                </span>
              </div>
            </div>
          </Link>

          {/* パフォーマンスモニター */}
          <Link href="/demos/library-integration/leva/performance-monitor">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">パフォーマンスモニター</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Levaを使用したリアルタイムパフォーマンス監視とデバッグ
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  FPS・メモリ監視
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  レンダリング統計
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  デバッグ情報表示
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  パフォーマンス最適化
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

        {/* Levaについての詳細説明 */}
        <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">🎛️ Levaとは？</h2>
              <p className="text-gray-300">
                React Three Fiberアプリケーション用の強力なGUIコントロールライブラリ
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">主な特徴</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  直感的なGUIコントロール生成
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  リアルタイムパラメータ調整
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  フォルダによる整理機能
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  プリセット保存・読み込み
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">対応する入力タイプ</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  数値（スライダー・入力フィールド）
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  色（カラーピッカー）
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  ブール値（チェックボックス）
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  選択肢（ドロップダウン）
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 学習ガイド */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center">📚 学習ガイド</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <h3 className="font-semibold text-green-400">基本操作を学ぶ</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                まずはリアルタイムパラメータ制御デモで基本的な使い方を学習しましょう。
              </p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• useControlsフックの使用方法</li>
                <li>• 基本的な入力タイプ</li>
                <li>• フォルダによる整理</li>
                <li>• 値の監視とリアルタイム反映</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <h3 className="font-semibold text-yellow-400">応用機能を習得</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                マテリアルエディタやアニメーションタイムラインで応用技術を学習。
              </p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• カスタムコントロールの作成</li>
                <li>• プリセット管理システム</li>
                <li>• 高度な監視機能</li>
                <li>• 条件付きコントロール表示</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-red-600/20 to-purple-600/20 border border-red-500/30 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <h3 className="font-semibold text-red-400">実践的な開発</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                シーンコンポーザーやパフォーマンスモニターで実践的なスキルを身につけます。
              </p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• 複雑なシーン構築</li>
                <li>• パフォーマンス最適化</li>
                <li>• デバッグ技術</li>
                <li>• プロダクション環境での活用</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 技術情報 */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center">🔧 技術情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">インストールと基本設定</h3>
              <div className="bg-gray-900 rounded p-4 mb-4">
                <code className="text-green-400 text-sm block mb-2">npm install leva</code>
                <code className="text-green-400 text-sm block">yarn add leva</code>
              </div>
              <p className="text-gray-300 text-sm">
                Levaは軽量で高性能なGUIライブラリです。React Three Fiberプロジェクトに簡単に統合できます。
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">基本的な使用例</h3>
              <div className="bg-gray-900 rounded p-4 mb-4">
                <code className="text-sm text-gray-300">
                  <div className="text-blue-400">import</div> {`{ useControls }`} <div className="text-blue-400">from</div> <div className="text-green-400">'leva'</div>
                  <br /><br />
                  <div className="text-blue-400">const</div> {`{ color, scale }`} = <div className="text-yellow-400">useControls</div>({`{`}
                  <br />
                  &nbsp;&nbsp;color: <div className="text-green-400">'#ff6b6b'</div>,
                  <br />
                  &nbsp;&nbsp;scale: {`{ value: 1, min: 0.1, max: 3 }`}
                  <br />
                  {`}`})
                </code>
              </div>
              <p className="text-gray-300 text-sm">
                useControlsフックを使用することで、自動的にGUIコントロールが生成されます。
              </p>
            </div>
          </div>
        </div>

        {/* 進捗状況 */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">実装進捗</h3>
            <div className="text-2xl font-bold text-green-300">
              1 / 6
            </div>
            <p className="text-gray-300 text-sm mb-4">デモ完了</p>
            
            {/* 進捗バー */}
            <div className="w-48 bg-gray-700 rounded-full h-2 mx-auto mb-4">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: '16.67%' }}
              ></div>
            </div>
            
            <p className="text-xs text-gray-400">
              残り5つのデモを順次実装予定です
            </p>
          </div>
        </div>

        {/* 関連リソース */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center">🔗 関連リソース</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a 
              href="https://github.com/pmndrs/leva" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors duration-200"
            >
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-white">GitHub</span>
              </div>
              <p className="text-xs text-gray-400">
                Levaの公式リポジトリとドキュメント
              </p>
            </a>
            
            <a 
              href="https://leva.pmnd.rs/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors duration-200"
            >
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-white">公式ドキュメント</span>
              </div>
              <p className="text-xs text-gray-400">
                詳細なAPIリファレンスと使用例
              </p>
            </a>
            
            <a 
              href="https://docs.pmnd.rs/react-three-fiber" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors duration-200"
            >
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-white">R3F ドキュメント</span>
              </div>
              <p className="text-xs text-gray-400">
                React Three Fiberの公式ドキュメント
              </p>
            </a>
            
            <a 
              href="https://codesandbox.io/examples/package/leva" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors duration-200"
            >
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-white">CodeSandbox</span>
              </div>
              <p className="text-xs text-gray-400">
                インタラクティブなサンプルコード
              </p>
            </a>
          </div>
        </div>

        {/* 次のステップ */}
        <div className="mt-12 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-xl p-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-4">🚀 次のステップ</h2>
            <p className="text-gray-300 mb-6">
              Levaの基本をマスターしたら、他のライブラリとの組み合わせも試してみましょう！
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/demos/library-integration/react-spring"
                className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 text-green-300 rounded-lg transition-all duration-200"
              >
                React Spring と組み合わせる
              </Link>
              <Link 
                href="/demos/library-integration/cannon"
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-300 rounded-lg transition-all duration-200"
              >
                物理エンジンと組み合わせる
              </Link>
              <Link 
                href="/demos/library-integration/postprocessing"
                className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-300 rounded-lg transition-all duration-200"
              >
                ポストプロセッシングと組み合わせる
              </Link>
            </div>
          </div>
        </div>

        {/* フィードバック */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">💬 フィードバックをお聞かせください</h3>
          <p className="text-gray-400 text-sm mb-4">
            このデモについてのご意見やご要望があれば、ぜひお聞かせください。
            より良い学習体験を提供するために、皆様のフィードバックを活用させていただきます。
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-300 rounded-lg transition-all duration-200">
              👍 役に立った
            </button>
            <button className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/30 text-yellow-300 rounded-lg transition-all duration-200">
              💡 改善提案
            </button>
            <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-300 rounded-lg transition-all duration-200">
              🐛 問題を報告
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
