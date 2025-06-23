'use client'

import { useState, useRef, useEffect } from 'react'
import { CodeHighlight } from '../../config/types'

interface CodeTooltipProps {
  highlight: CodeHighlight
  isVisible: boolean
  position: { x: number; y: number }
  onClose: () => void
}

export function CodeTooltip({ highlight, isVisible, position, onClose }: CodeTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 bg-gray-800 border border-gray-600 rounded-lg shadow-xl p-4 max-w-md"
      style={{
        left: Math.min(position.x, window.innerWidth - 400),
        top: Math.min(position.y, window.innerHeight - 200),
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-white font-semibold text-sm">{highlight.tooltip.title}</h4>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white ml-2"
        >
          ✕
        </button>
      </div>
      
      <p className="text-gray-300 text-sm mb-3 leading-relaxed">
        {highlight.tooltip.description}
      </p>
      
      {highlight.tooltip.documentationUrl && (
        <a
          href={highlight.tooltip.documentationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm"
        >
          📖 公式ドキュメント
          <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      )}
    </div>
  )
}