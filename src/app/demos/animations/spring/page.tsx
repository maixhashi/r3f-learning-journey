'use client'

import { DemoLayout } from '../../components/common'
import { SpringAnimation } from './components/SpringAnimation'
import { springFiles, springFeatures, springFileContents } from '../../config/animations/spring'

export default function SpringDemo() {
  return (
    <DemoLayout 
      title="Spring Animation Demo" 
      description="react-springを使った物理ベースのスプリングアニメーションのデモ"
      files={springFiles}
      features={springFeatures}
      fileContents={springFileContents}
    >
      <SpringAnimation />
    </DemoLayout>
  )
}