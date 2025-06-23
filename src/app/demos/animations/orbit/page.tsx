'use client'

import { DemoLayout } from '../../components/common'
import { OrbitAnimation } from './components/OrbitAnimation'
import { orbitFiles, orbitFeatures, orbitFileContents } from '../../config/animations/orbit'

export default function OrbitDemo() {
  return (
    <DemoLayout 
      title="Orbit Animation Demo" 
      description="複数オブジェクトの軌道アニメーションのデモ"
      files={orbitFiles}
      features={orbitFeatures}
      fileContents={orbitFileContents}
    >
      <OrbitAnimation />
    </DemoLayout>
  )
}