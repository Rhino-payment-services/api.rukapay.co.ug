'use client'

import { useState, useCallback } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CollapsibleCardProps {
  title: string
  description: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

const CollapsibleCard = ({ 
  title, 
  description, 
  icon, 
  children, 
  defaultOpen = false,
  className = '' 
}: CollapsibleCardProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const modeKey = title.toUpperCase().replace(/\s+/g, '_')

  return (
    <div className={`card overflow-hidden ${className}`}>
      {/* Header - Always Visible */}
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={handleToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div key={`icon-${modeKey}`}>
              {icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600 mt-1">{description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
              {modeKey}
            </span>
            <div key={`chevron-${modeKey}`}>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div 
          key={`content-${modeKey}`}
          className="animate-in slide-in-from-top-2 duration-300"
        >
          <div className="px-6 pb-6 border-t border-gray-100">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default CollapsibleCard
