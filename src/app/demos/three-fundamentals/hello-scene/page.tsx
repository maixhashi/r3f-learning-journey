'use client'

import { ThreeDemoLayout } from '../../components/common'
import { createHelloScene } from './components/createHelloScene'
import {
  helloSceneFiles,
  helloSceneFeatures,
  helloSceneFileContents,
} from '../../config/three-fundamentals/hello-scene'

export default function HelloSceneDemo() {
  return (
    <ThreeDemoLayout
      title="Hello Scene"
      description="Scene / PerspectiveCamera / WebGLRenderer と requestAnimationFrame の最小構成"
      files={helloSceneFiles}
      features={helloSceneFeatures}
      fileContents={helloSceneFileContents}
      createScene={createHelloScene}
    />
  )
}
