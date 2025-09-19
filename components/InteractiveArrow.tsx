'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface InteractiveArrowProps {
  className?: string
  delay?: number
}

const InteractiveArrow = ({ className = '', delay = 0 }: InteractiveArrowProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${delay * 1000}ms`,
        animation: 'fadeInSlide 0.5s ease-out forwards'
      }}
    >
      {/* Animated background circle */}
      <div
        className={`absolute inset-0 bg-primary-100 rounded-full transition-all duration-300 ${
          isHovered ? 'scale-120 opacity-30' : 'scale-100 opacity-0'
        }`}
      />
      
      {/* Pulsing ring effect */}
      <div
        className={`absolute inset-0 border-2 border-primary-300 rounded-full transition-all duration-300 ${
          isHovered ? 'animate-pulse-scale' : 'opacity-0'
        }`}
      />
      
      {/* Main arrow */}
      <div
        className={`relative z-10 flex items-center justify-center w-12 h-12 bg-white border-2 border-primary-200 rounded-full shadow-lg transition-all duration-300 ${
          isHovered ? 'scale-110 rotate-1' : 'scale-100 rotate-0'
        }`}
      >
        <div
          className={`transition-transform duration-300 ${
            isHovered ? 'translate-x-0.5' : 'translate-x-0'
          }`}
        >
          <ArrowRight className="h-5 w-5 text-primary-600" />
        </div>
      </div>
      
      {/* Floating particles */}
      {isHovered && (
        <>
          <div className="absolute top-2 right-2 w-1 h-1 bg-primary-400 rounded-full animate-float-up" />
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-primary-400 rounded-full animate-float-down" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 left-1 w-1 h-1 bg-primary-400 rounded-full animate-float-left" style={{ animationDelay: '0.25s' }} />
        </>
      )}

      <style jsx>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes float-up {
          0%, 100% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
        
        @keyframes float-down {
          0%, 100% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            transform: translateY(10px);
            opacity: 1;
          }
        }
        
        @keyframes float-left {
          0%, 100% {
            transform: translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateX(-10px);
            opacity: 1;
          }
        }
        
        .animate-float-up {
          animation: float-up 1s infinite;
        }
        
        .animate-float-down {
          animation: float-down 1s infinite;
        }
        
        .animate-float-left {
          animation: float-left 1s infinite;
        }
        
        .animate-pulse-scale {
          animation: pulse-scale 1.5s infinite;
        }
      `}</style>
    </div>
  )
}

export default InteractiveArrow
