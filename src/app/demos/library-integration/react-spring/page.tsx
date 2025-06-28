'use client'

import { DemoLayout } from '../../components/common'
import { ReactSpringDemo } from './components/ReactSpringDemo'
import { reactSpringFiles, reactSpringFeatures, reactSpringFileContents } from '../../config/library-integration/react-spring'

export default function ReactSpringPage() {
  return (
    <DemoLayout 
      title="React Spring Integration Demo" 
      description="React Springを使用したスムーズなアニメーションと通常のイベント処理との比較"
      files={reactSpringFiles}
      features={reactSpringFeatures}
      fileContents={reactSpringFileContents}
    >
      <ReactSpringDemo />
    </DemoLayout>
  )
}