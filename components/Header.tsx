'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    {
      name: 'Partner API',
      href: '/apis/partner',
    },
    {
      name: 'Transaction Modes',
      href: '/transaction-modes',
    },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/rukapay_logo.png"
                alt="Rukapay"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-primary-950">Rukapay API Docs</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-950 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

              {/* CTA Button */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <button
                    disabled
                    className="text-gray-400 font-medium px-4 py-2 rounded-lg cursor-not-allowed"
                  >
                    Sandbox
                  </button>
                  <span className="absolute -top-2 -right-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                    Coming Soon
                  </span>
                </div>
                <Link
                  href="/get-started"
                  className="inline-flex items-center px-6 py-2 bg-primary-950 text-white rounded-lg font-medium hover:bg-primary-800 transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-950"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
            <div className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block font-medium text-gray-900 hover:text-primary-950"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <div className="relative px-4 py-2">
                      <button
                        disabled
                        className="text-gray-400 cursor-not-allowed"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sandbox
                      </button>
                      <span className="absolute -top-1 -right-1 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                        Coming Soon
                      </span>
                    </div>
                    <Link
                      href="/get-started"
                      className="inline-flex items-center px-6 py-2 bg-primary-950 text-white rounded-lg font-medium hover:bg-primary-800 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
