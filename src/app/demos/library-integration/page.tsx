'use client'

import Link from 'next/link'

const libraryIntegrationDemos = [
  {
    id: 'leva',
    title: 'Leva GUI Control',
    description: 'Levaライブラリを使用したリアルタイムGUIコントロールパネルのデモ',
    icon: {
      bgColor: 'bg-blue-600',
      svg: (
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      )
    },
    status: 'available',
    features: ['リアルタイムパラメータ制御', 'フォルダ組織化', '多様な入力タイプ', '3Dオブジェクト制御']
  },
  {
    id: 'react-spring',
    title: 'React Spring',
    description: 'React Springを使用したスムーズなアニメーションとトランジション',
    icon: {
      bgColor: 'bg-green-600',
      svg: (
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
      )
    },
    status: 'available',
    features: ['スプリングアニメーション', '物理ベースモーション', 'インタラクティブアニメーション', 'チェーンアニメーション']
  },
  {
    id: 'cannon',
    title: 'Cannon.js Physics',
    description: '物理エンジンCannon.jsを使用したリアルな物理シミュレーション',
    icon: {
      bgColor: 'bg-red-600',
      svg: (
        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['重力・摩擦シミュレーション', '衝突検出・反応', '剛体物理演算', '制約・ジョイント']
  },
  {
    id: 'postprocessing',
    title: 'Postprocessing',
    description: 'ポストプロセッシングエフェクトによる高品質な視覚効果',
    icon: {
      bgColor: 'bg-purple-600',
      svg: (
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['ブルーム・グロー効果', '被写界深度（DOF）', 'SSAO・SSR', 'カラーグレーディング']
  },
  {
    id: 'gltf-loader',
    title: 'GLTF Loader',
    description: 'GLTFモデルの読み込みとアニメーション再生',
    icon: {
      bgColor: 'bg-yellow-600',
      svg: (
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['3Dモデル読み込み', 'アニメーション制御', 'マテリアル・テクスチャ', 'モーフターゲット']
  },
  {
    id: 'framer-motion-3d',
    title: 'Framer Motion 3D',
    description: 'Framer Motionと3Dオブジェクトの連携アニメーション',
    icon: {
      bgColor: 'bg-pink-600',
      svg: (
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['クリックイベント連動', 'レイアウトアニメーション', 'ドラッグ&ドロップ', 'バリアント制御']
  },
  {
    id: 'zustand',
    title: 'Zustand State',
    description: 'Zustandを使用したグローバル状態管理と3D連携',
    icon: {
      bgColor: 'bg-indigo-600',
      svg: (
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['グローバル状態管理', 'リアクティブ更新', '永続化ストレージ', '複数コンポーネント連携']
  },
  {
    id: 'react-query',
    title: 'React Query',
    description: 'React Queryでデータフェッチと3Dビジュアライゼーション',
    icon: {
      bgColor: 'bg-cyan-600',
      svg: (
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['データフェッチング', 'キャッシュ管理', 'リアルタイム更新', 'ローディング状態']
  },
  {
    id: 'rapier',
    title: 'Rapier Physics',
    description: '高性能物理エンジンRapierを使用した物理シミュレーション',
    icon: {
      bgColor: 'bg-orange-600',
      svg: (
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['高性能物理演算', '流体シミュレーション', 'ソフトボディ', 'クロスシミュレーション']
  },
  {
    id: 'drei',
    title: 'Drei Helpers',
    description: 'React Three Dreiの便利なヘルパーコンポーネント集',
    icon: {
      bgColor: 'bg-teal-600',
      svg: (
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['OrbitControls・カメラ制御', 'Environment・HDR背景', 'Text・3Dテキスト', 'Stats・パフォーマンス監視']
  },
  {
    id: 'react-hook-form',
    title: 'React Hook Form',
    description: 'フォーム入力と3Dオブジェクトのリアルタイム連携',
    icon: {
      bgColor: 'bg-emerald-600',
      svg: (
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm10-8a1 1 0 00-1 1v4a1 1 0 102 0V9a1 1 0 00-1-1z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['フォーム状態管理', 'バリデーション連携', 'リアルタイム反映', '3Dプレビュー']
  },
  {
    id: 'd3-threejs',
    title: 'D3.js + Three.js',
    description: 'D3.jsのデータ処理と3Dビジュアライゼーションの融合',
    icon: {
      bgColor: 'bg-amber-600',
      svg: (
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      )
    },
    status: 'available',
    features: ['データドリブン3D', 'スケール・軸変換', 'インタラクティブチャート', 'アニメーション遷移']
  },
  {
    id: 'shaders',
    title: 'Custom Shaders',
    description: 'カスタムシェーダーによる高度な視覚効果とマテリアル',
    icon: {
      bgColor: 'bg-violet-600',
      svg: (
        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['フラグメントシェーダー', 'バーテックスシェーダー', 'ノイズ・パターン生成', 'リアルタイムエフェクト']
  },
  {
    id: 'webxr',
    title: 'WebXR/VR',
    description: 'WebXR APIを使用したVR/AR体験の実装',
    icon: {
      bgColor: 'bg-rose-600',
      svg: (
        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['VR/ARヘッドセット対応', 'ハンドトラッキング', '空間インタラクション', '没入型体験']
  },
  {
    id: 'tonejs',
    title: 'Tone.js Audio',
    description: 'Tone.jsを使用した3Dオーディオビジュアライゼーション',
    icon: {
      bgColor: 'bg-lime-600',
      svg: (
        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.895-4.21-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.984 5.984 0 01-.757 2.828 1 1 0 01-1.415-1.414A3.987 3.987 0 0013 12a3.988 3.988 0 00-.172-1.414 1 1 0 010-1.415z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['リアルタイム音声解析', '周波数スペクトラム', '音楽連動アニメーション', '3D空間オーディオ']
  },
  {
    id: 'gsap',
    title: 'GSAP Animation',
    description: 'GSAPを使用した高性能3Dアニメーションライブラリ',
    icon: {
      bgColor: 'bg-sky-600',
      svg: (
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['タイムライン制御', 'イージング関数', 'モーフィングアニメーション', 'スクロール連動']
  },
  {
    id: 'socketio',
    title: 'Socket.io Multiplayer',
    description: 'Socket.ioを使用したリアルタイムマルチプレイヤー3D体験',
    icon: {
      bgColor: 'bg-fuchsia-600',
      svg: (
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm10-8a1 1 0 00-1 1v6a1 1 0 102 0V5a1 1 0 00-1-1z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['リアルタイム同期', 'マルチユーザー対応', '共有3D空間', 'チャット機能']
  },
  {
    id: 'tailwind-3d',
    title: 'Tailwind CSS + 3D',
    description: 'Tailwind CSSと3Dコンポーネントの統合UI/UXデザイン',
    icon: {
      bgColor: 'bg-slate-600',
      svg: (
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['レスポンシブ3D', 'ダークモード対応', 'アニメーション統合', 'モダンUI/UX']
  },
  {
    id: 'storybook',
    title: 'Storybook Integration',
    description: 'Storybookを使用した3Dコンポーネントの開発・テスト環境',
    icon: {
      bgColor: 'bg-red-500',
      svg: (
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['コンポーネントカタログ', 'インタラクティブドキュメント', 'ビジュアルテスト', 'アドオン統合']
  },
  {
    id: 'testing-library',
    title: 'Testing Library',
    description: 'React Testing Libraryを使用した3Dコンポーネントのテスト',
    icon: {
      bgColor: 'bg-green-500',
      svg: (
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['ユニットテスト', 'インテグレーションテスト', 'モックとスタブ', 'スナップショットテスト']
  },
  {
    id: 'playwright',
    title: 'Playwright E2E',
    description: 'Playwrightを使用した3Dアプリケーションのエンドツーエンドテスト',
    icon: {
      bgColor: 'bg-blue-500',
      svg: (
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['ブラウザ自動化', 'ビジュアル回帰テスト', 'パフォーマンステスト', 'クロスブラウザテスト']
  },
  {
    id: 'typescript',
    title: 'TypeScript Integration',
    description: 'TypeScriptを使用した型安全な3D開発のベストプラクティス',
    icon: {
      bgColor: 'bg-blue-700',
      svg: (
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['型定義とインターフェース', 'ジェネリクス活用', '型推論とアサーション', 'デコレータパターン']
  },
  {
    id: 'vite',
    title: 'Vite Build Tool',
    description: 'Viteを使用した高速な3D開発環境とビルド最適化',
    icon: {
      bgColor: 'bg-yellow-500',
      svg: (
        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['高速HMR', 'ESモジュール対応', 'プラグインエコシステム', 'バンドル最適化']
  },
  {
    id: 'pwa',
    title: 'PWA Integration',
    description: 'Progressive Web Appとして動作する3Dアプリケーション',
    icon: {
      bgColor: 'bg-purple-500',
      svg: (
        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
      )
    },
    status: 'planned',
    features: ['オフライン対応', 'インストール可能', 'プッシュ通知', 'バックグラウンド同期']
  }
]

const benefits = [
  {
    title: '実装例',
    description: '実際のコードと詳細な解説で、ライブラリ統合の方法を学習',
    icon: {
      bgColor: 'bg-blue-600',
      svg: (
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      )
    }
  },
  {
    title: 'ベストプラクティス',
    description: 'パフォーマンスと保守性を考慮した実装パターンを紹介',
    icon: {
      bgColor: 'bg-green-600',
      svg: (
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      )
    }
  },
  {
    title: '豊富なライブラリ',
    description: 'アニメーション、物理演算、UI、テストなど幅広い分野をカバー',
    icon: {
      bgColor: 'bg-purple-600',
      svg: (
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      )
    }
  }
]

function DemoCard({ demo }: { demo: typeof libraryIntegrationDemos[0] }) {
  const isAvailable = demo.status === 'available'
  
  return (
    <div className={`bg-gray-800 rounded-lg p-6 transition-colors duration-200 ${
      isAvailable ? 'hover:bg-gray-700 cursor-pointer' : 'opacity-75'
    }`}>
      <div className="mb-4">
        <div className={`w-12 h-12 ${demo.icon.bgColor} rounded-lg flex items-center justify-center mb-3`}>
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            {demo.icon.svg}
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">{demo.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{demo.description}</p>
      </div>
      
      <div className="space-y-2">
        {demo.features.map((feature) => (
          <div key={feature} className="flex items-center text-sm text-gray-300">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {feature}
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <span className="text-blue-400 text-sm font-medium">
          {isAvailable ? 'デモを見る →' : 'デモを見る → (準備中)'}
        </span>
      </div>
    </div>
  )
}

export default function LibraryIntegrationPage() {
  const availableDemos = libraryIntegrationDemos.filter(demo => demo.status === 'available')
  const plannedDemos = libraryIntegrationDemos.filter(demo => demo.status === 'planned')

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

        {/* 利用可能なデモ */}
        {availableDemos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-green-400">🚀 利用可能なデモ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableDemos.map((demo) => (
                <Link key={demo.id} href={`/demos/library-integration/${demo.id}`}>
                  <DemoCard demo={demo} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 準備中のデモ */}
        {plannedDemos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">🔨 準備中のデモ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plannedDemos.map((demo) => (
                <DemoCard key={demo.id} demo={demo} />
              ))}
            </div>
          </div>
        )}

        {/* 新機能ハイライト */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">NEW</span>
              </div>
              <h3 className="text-xl font-bold text-white">D3.js + Three.js Integration</h3>
            </div>
            <p className="text-gray-300 mb-4">
              D3.jsのデータ処理と3Dビジュアライゼーションの融合デモが追加されました！
              データドリブンな3D可視化で新しい表現の可能性を探索できます。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                📊 データドリブン3D
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                📈 インタラクティブチャート
              </span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                🎨 スケール・軸変換
              </span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                ⚡ アニメーション遷移
              </span>
            </div>
          </div>
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
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className={`w-16 h-16 ${benefit.icon.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    {benefit.icon.svg}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* 進捗情報 */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">実装進捗</h3>
              <div className="text-2xl font-bold text-green-300">
                {availableDemos.length} / {libraryIntegrationDemos.length}
              </div>
              <p className="text-gray-300 text-sm">デモ完了</p>
              
              {/* 進捗バー */}
              <div className="w-48 bg-gray-700 rounded-full h-2 mt-4 mx-auto">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(availableDemos.length / libraryIntegrationDemos.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* カテゴリ別統計 */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-6 text-center">カテゴリ別デモ数</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { category: 'アニメーション', count: libraryIntegrationDemos.filter(d => ['react-spring', 'framer-motion-3d', 'gsap'].includes(d.id)).length, color: 'text-green-400' },
                { category: '物理演算', count: libraryIntegrationDemos.filter(d => ['cannon', 'rapier'].includes(d.id)).length, color: 'text-red-400' },
                { category: 'UI/UX', count: libraryIntegrationDemos.filter(d => ['leva', 'react-hook-form', 'tailwind-3d'].includes(d.id)).length, color: 'text-blue-400' },
                { category: 'データ処理', count: libraryIntegrationDemos.filter(d => ['d3-threejs', 'react-query', 'zustand'].includes(d.id)).length, color: 'text-purple-400' },
                { category: '視覚効果', count: libraryIntegrationDemos.filter(d => ['postprocessing', 'shaders', 'tonejs'].includes(d.id)).length, color: 'text-yellow-400' },
                { category: '開発ツール', count: libraryIntegrationDemos.filter(d => ['storybook', 'testing-library', 'playwright', 'typescript', 'vite'].includes(d.id)).length, color: 'text-cyan-400' },
                { category: '3Dモデル', count: libraryIntegrationDemos.filter(d => ['gltf-loader', 'drei'].includes(d.id)).length, color: 'text-orange-400' },
                { category: 'その他', count: libraryIntegrationDemos.filter(d => ['webxr', 'socketio', 'pwa'].includes(d.id)).length, color: 'text-pink-400' }
              ].map((stat) => (
                <div key={stat.category} className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.count}</div>
                  <div className="text-gray-400 text-sm">{stat.category}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 推奨学習パス */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-6 text-center">推奨学習パス</h3>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 mb-2">🌱 初級者向け</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Leva GUI Control</li>
                    <li>• Drei Helpers</li>
                    <li>• React Hook Form</li>
                    <li>• Tailwind CSS + 3D</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-400 mb-2">🚀 中級者向け</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• React Spring</li>
                    <li>• D3.js + Three.js</li>
                    <li>• GLTF Loader</li>
                    <li>• Postprocessing</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-600/20 to-purple-600/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-400 mb-2">⚡ 上級者向け</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Custom Shaders</li>
                    <li>• Physics Engines</li>
                    <li>• WebXR/VR</li>
                    <li>• Socket.io Multiplayer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
