'use client'

import { useEffect, useState } from 'react'
import { FeatureFile } from '../../config/types'

interface FeatureSelectorProps {
  features: FeatureFile[]
  selectedFeature?: FeatureFile | null
  onFeatureSelect?: (feature: FeatureFile) => void
}

export function FeatureSelector({ features, selectedFeature, onFeatureSelect }: FeatureSelectorProps) {
  const [internalSelectedFeature, setInternalSelectedFeature] = useState<string | null>(null)

  // 外部からの選択状態を反映
  useEffect(() => {
    if (selectedFeature) {
      setInternalSelectedFeature(selectedFeature.id)
    }
  }, [selectedFeature])

  const handleFeatureClick = (feature: FeatureFile) => {
    setInternalSelectedFeature(feature.id)
    onFeatureSelect?.(feature)
  }

  return (
    <div className="bg-gray-800 text-white text-sm">
      <div className="p-2 bg-gray-700 font-bold">Features</div>
      <div className="max-h-64 overflow-y-auto">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`p-2 cursor-pointer hover:bg-gray-700 border-b border-gray-600 transition-colors duration-200 ${
              internalSelectedFeature === feature.id ? 'bg-blue-600' : ''
            }`}
            onClick={() => handleFeatureClick(feature)}
          >
            <div className="font-semibold text-blue-300">{feature.name}</div>
            <div className="text-xs text-gray-400 mb-1">{feature.description}</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">Files:</span>
              {feature.files.map((file, fileIndex) => (
                <span key={`${feature.id}-file-${fileIndex}`} className="text-yellow-400">
                  📄 {file.split('/').pop()}
                </span>
              ))}
              {feature.codeSections && (
                <span className="text-green-400">
                  ({feature.codeSections.length} sections)
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
