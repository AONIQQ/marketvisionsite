'use client'

declare global {
  interface Window {
    Calendly: any;
  }
}

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'

export default function BookingPage() {
  const [isCalendlyReady, setIsCalendlyReady] = useState(false)
  const calendlyContainerRef = useRef<HTMLDivElement>(null)

  const initCalendly = () => {
    if (typeof window !== 'undefined' && window.Calendly && calendlyContainerRef.current) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/d/cmcz-dzg-467',
        parentElement: calendlyContainerRef.current,
        prefill: {},
        utm: {}
      })
      setIsCalendlyReady(true)
    }
  }

  useEffect(() => {
    if (window.Calendly) {
      initCalendly()
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="beforeInteractive"
        onLoad={initCalendly}
        onError={(e) => console.error('Error loading Calendly script:', e)}
      />
      <header className="px-4 lg:px-6 h-16 flex items-center justify-center bg-black/20 backdrop-blur-lg">
        <nav className="flex justify-between items-center w-full max-w-7xl">
          <Link href="/" className="text-2xl font-bold text-white flex items-center">
            <ChevronLeft className="mr-2" /> Market Vision
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div 
          className="w-full max-w-4xl bg-white/10 p-8 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center">Apply To Use Market Vision</h1>
          <p className="text-lg mb-8 text-center">
            Fill out the form below to get started.
          </p>
          <div 
            ref={calendlyContainerRef}
            className="w-full aspect-[3/2] min-h-[500px] relative bg-white/5 rounded-lg overflow-hidden"
          >
            {!isCalendlyReady && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            )}
          </div>
        </motion.div>
      </main>
      <footer className="py-6 text-center bg-black/20 backdrop-blur-lg">
        <p className="text-sm text-gray-400">© 2024 Market Vision. All rights reserved.</p>
      </footer>
    </div>
  )
}