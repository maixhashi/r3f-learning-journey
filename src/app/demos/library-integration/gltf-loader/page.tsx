'use client'

import { DemoLayout } from '../../components/common'
import { GLTFLoaderDemo } from './components/GLTFLoaderDemo'
import { gltfLoaderFiles, gltfLoaderFeatures, gltfLoaderFileContents } from '../../config/library-integration/gltf-loader'

export default function GLTFLoaderPage() {
  return (
    <DemoLayout 
      title="GLTF Loader Demo" 
      description="GLTFモデルの読み込みと表示のデモ"
      files={gltfLoaderFiles}
      features={gltfLoaderFeatures}
      fileContents={gltfLoaderFileContents}
    >
      <GLTFLoaderDemo />
    </DemoLayout>
  )
}