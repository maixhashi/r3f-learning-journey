'use client'

import { useState } from 'react'
import { FeatureFile } from '../../config/types'

interface FeatureSelectorProps {
  features: FeatureFile[]
  onFeatureSelect?: (feature: FeatureFile) => void
}

export function FeatureSelector({ features, onFeatureSelect }: FeatureSelectorProps) {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const handleFeatureClick = (feature: FeatureFile) => {
    setSelectedFeature(feature.id)
    onFeatureSelect?.(feature)
  }

  return (
    <div className="bg-gray-700 rounded p-3">
      <h3 className="text-sm font-semibold mb-2 text-gray-200">Features</h3>
      <div className="space-y-2">
        {features.map(feature => (
          <div
            key={feature.id}
            className={`p-2 rounded cursor-pointer transition-colors ${
              selectedFeature === feature.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
            }`}
            onClick={() => handleFeatureClick(feature)}
          >
            <div className="text-sm font-medium">{feature.name}</div>
            <div className="text-xs text-gray-300 mt-1">{feature.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}