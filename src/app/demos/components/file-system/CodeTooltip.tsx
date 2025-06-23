'use client'

import { useState, useRef, useEffect } from 'react'
import { CodeHighlight } from '../../config/types'

interface CodeTooltipProps {
  highlight: CodeHighlight
  isVisible: boolean
  position: { x: number; y: number }
  onClose: () => void
}

interface LinkPreview {
  url: string
  title: string
  description: string
  type: 'r3f' | 'threejs'
}

export function CodeTooltip({ highlight, isVisible, position, onClose }: CodeTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [linkPreview, setLinkPreview] = useState<LinkPreview | null>(null)

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

  const getLinkInfo = (url: string): { type: 'r3f' | 'threejs'; icon: string; label: string } => {
    if (url.includes('r3f.docs.pmnd.rs') || url.includes('docs.pmnd.rs')) {
      return { type: 'r3f', icon: '⚛️', label: 'React Three Fiber' }
    }
    return { type: 'threejs', icon: '🎯', label: 'Three.js' }
  }

  const generateLinkPreview = (url: string): LinkPreview => {
    const linkInfo = getLinkInfo(url)
    
    if (linkInfo.type === 'r3f') {
      return {
        url,
        title: 'React Three Fiber Documentation',
        description: 'React renderer for Three.js - declarative 3D graphics in React',
        type: 'r3f'
      }
    } else {
      return {
        url,
        title: 'Three.js Documentation',
        description: 'JavaScript 3D library for creating and displaying 3D graphics',
        type: 'threejs'
      }
    }
  }

  const handleLinkHover = (url: string) => {
    setHoveredLink(url)
    setLinkPreview(generateLinkPreview(url))
  }

  const handleLinkLeave = () => {
    setHoveredLink(null)
    setLinkPreview(null)
  }

  if (!isVisible) return null

  const documentationLinks = [
    ...(highlight.tooltip.documentationUrl ? [highlight.tooltip.documentationUrl] : []),
    ...(highlight.tooltip.r3fDocumentationUrl ? [highlight.tooltip.r3fDocumentationUrl] : [])
  ]

  return (
    <>
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
            className="text-gray-400 hover:text-white ml-2 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
          {highlight.tooltip.description}
        </p>
        
        {documentationLinks.length > 0 && (
          <div className="flex flex-col space-y-2">
            {documentationLinks.map((url, index) => {
              const linkInfo = getLinkInfo(url)
              return (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center text-sm transition-all duration-200 hover:scale-105 w-fit ${
                    linkInfo.type === 'r3f' 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-green-400 hover:text-green-300'
                  }`}
                  onMouseEnter={() => handleLinkHover(url)}
                  onMouseLeave={handleLinkLeave}
                >
                  <span className="mr-1">{linkInfo.icon}</span>
                  {linkInfo.label}ドキュメント
                  <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              )
            })}
          </div>
        )}
      </div>

      {/* Link Preview Card */}
      {linkPreview && hoveredLink && (
        <div
          className="fixed z-60 bg-gray-900 border border-gray-500 rounded-lg shadow-2xl p-4 max-w-sm animate-in fade-in duration-200"
          style={{
            left: Math.min(position.x + 420, window.innerWidth - 350),
            top: Math.min(position.y, window.innerHeight - 150),
          }}
        >
          <div className="flex items-center mb-2">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              linkPreview.type === 'r3f' ? 'bg-blue-400' : 'bg-green-400'
            }`} />
            <h5 className="text-white font-medium text-sm">{linkPreview.title}</h5>
          </div>
          
          <p className="text-gray-400 text-xs mb-2 leading-relaxed">
            {linkPreview.description}
          </p>
          
          <div className="flex items-center text-xs text-gray-500">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
            </svg>
            {new URL(linkPreview.url).hostname}
          </div>
        </div>
      )}
    </>
  )
}