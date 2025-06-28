'use client'

import { DemoLayout } from '../../components/common'
import { LevaControlDemo } from './components/LevaControlDemo'
import { levaFiles, levaFeatures, levaFileContents } from '../../config/library-integration/leva'

export default function LevaDemo() {
  return (
    <DemoLayout 
      title="Leva GUI Control Demo" 
      description="Levaライブラリを使用したリアルタイムGUIコントロールのデモ"
      files={levaFiles}
      features={levaFeatures}
      fileContents={levaFileContents}
    >
      <LevaControlDemo />
    </DemoLayout>
  )
}