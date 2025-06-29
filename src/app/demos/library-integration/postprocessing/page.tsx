'use client'

import { DemoLayout } from '../../components/common'
import { PostprocessingDemo } from './components/PostprocessingDemo'
import { postprocessingFiles, postprocessingFeatures, postprocessingFileContents } from '../../config/library-integration/postprocessing'

export default function PostprocessingDemoPage() {
  return (
    <DemoLayout 
      title="Postprocessing Effects Demo" 
      description="@react-three/postprocessingを使ったブルーム・グロー効果のデモ"
      files={postprocessingFiles}
      features={postprocessingFeatures}
      fileContents={postprocessingFileContents}
    >
      <PostprocessingDemo />
    </DemoLayout>
  )
}