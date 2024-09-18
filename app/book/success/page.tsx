'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ChevronLeft, Calendar, Clock, Video } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function BookingSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-center bg-black/20 backdrop-blur-lg">
        <nav className="flex justify-between items-center w-full max-w-7xl">
          <Link href="/" className="text-2xl font-bold text-white flex items-center">
            <ChevronLeft className="mr-2" /> Market Vision
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div 
          className="w-full max-w-2xl bg-white/10 p-8 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-xl mb-8">
            We&apos;re excited to meet with you and discuss how we can grow your coaching business.
          </p>
          <div className="bg-white/20 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Discovery Call Details</h2>
            <div className="flex justify-center space-x-8">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-purple-300" />
                <span>Date: [Dynamic Date]</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-6 h-6 mr-2 text-purple-300" />
                <span>Time: [Dynamic Time]</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <Video className="w-6 h-6 mr-2 text-purple-300" />
              <span>Via: Zoom</span>
            </div>
          </div>
          <p className="mb-6">
            We&apos;ve sent a calendar invite to your email. If you need to make any changes, please contact us.
          </p>
          <Link href="/">
            <Button className="bg-white text-purple-900 hover:bg-gray-200 transition-colors shadow-lg">
              Return to Homepage
            </Button>
          </Link>
        </motion.div>
      </main>
      <footer className="py-6 text-center bg-black/20 backdrop-blur-lg">
        <p className="text-sm text-gray-400">© 2024 Market Vision. All rights reserved.</p>
  <p className="text-sm text-gray-400 underline cursor-pointer" onClick={() => window.open('https://www.aoniqq.com/websitecreation', '_blank')}>
            Site by Aoniqq LLC
          </p>
      </footer>
    </div>
  )
}
