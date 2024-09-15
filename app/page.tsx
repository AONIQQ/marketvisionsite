'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { ChevronRight, DollarSign, BarChart, Users, TrendingUp, ChevronUp, Video, Percent, ArrowRight, ChevronDown, Heart, PhoneCall, CheckCircle, XCircle, Menu } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import Link from "next/link"

export default function MarketVision() {
  const [adSpend, setAdSpend] = useState(5000)
  const [revenue, setRevenue] = useState(25000)
  const [clientProfit, setClientProfit] = useState(15000)
  const [activeLayer, setActiveLayer] = useState<number | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const calculateProfits = (sliderValue: number) => {
    const minSpend = 1000
    const maxSpend = 500000
    const scale = Math.log(maxSpend / minSpend)
    const spend = Math.round(Math.exp(sliderValue / 100 * scale) * minSpend)

    const generatedRevenue = spend * 5 // Assuming 5X ROAS
    const clientTake = generatedRevenue - spend // Assuming 2X return for the company

    setAdSpend(spend)
    setRevenue(generatedRevenue)
    setClientProfit(clientTake)
  }

  const handleInputChange = (value: string, type: 'adSpend' | 'revenue' | 'clientProfit') => {
    const numValue = parseInt(value.replace(/,/g, ''), 10)
    if (isNaN(numValue)) return

    switch (type) {
      case 'adSpend':
        setAdSpend(numValue)
        setRevenue(numValue * 5)
        setClientProfit(numValue * 3)
        break
      case 'revenue':
        setRevenue(numValue)
        setAdSpend(Math.round(numValue / 5))
        setClientProfit(Math.round(numValue * 0.6))
        break
      case 'clientProfit':
        setClientProfit(numValue)
        setAdSpend(Math.round(numValue / 3))
        setRevenue(Math.round((numValue / 3) * 5))
        break
    }
  }

  useEffect(() => {
    calculateProfits(28.54) // Initial value to set slider at 5k
  }, [])

  const caseStudyData = [
    { month: "Oct 2022", revenue: 0 },
    { month: "Nov 2022", revenue: 37500 },
    { month: "Dec 2022", revenue: 47500 },
    { month: "Jan 2023", revenue: 47500 },
    { month: "Feb 2023", revenue: 62500 },
    { month: "Mar 2023", revenue: 102500 },
    { month: "Apr 2023", revenue: 122500 },
    { month: "May 2023", revenue: 132500 },
    { month: "Jun 2023", revenue: 177500 },
    { month: "Jul 2023", revenue: 192500 },
    { month: "Aug 2023", revenue: 215000, marketVisionStart: true },
    { month: "Sep 2023", revenue: 265000 },
    { month: "Oct 2023", revenue: 302500 },
    { month: "Nov 2023", revenue: 347500 },
    { month: "Dec 2023", revenue: 370000 },
    { month: "Jan 2024", revenue: 392500 },
    { month: "Feb 2024", revenue: 407500 },
    { month: "Mar 2024", revenue: 441250 },
    { month: "Apr 2024", revenue: 531250 },
    { month: "May 2024", revenue: 553750 },
    { month: "Jun 2024", revenue: 576250 },
    { month: "Jul 2024", revenue: 583750 },
  ]

  const keyImprovements = [
    { label: "Average Monthly Revenue Growth", value: "243%", icon: TrendingUp },
    { label: "Average Monthly Profit Growth", value: "202%", icon: ChevronUp },
    { label: "Profit Per Video Growth", value: "451%", icon: BarChart },
    { label: "Decrease in TikToks Recorded", value: "54%", icon: Video },
  ]

  const results = [
    { label: "Annual Revenue", before: "$145K", after: "$423K" },
    { label: "Average Monthly Profit", before: "$14.5K", after: "$29.4K" },
    { label: "TikToks Published Per Month", before: "30 Videos", after: "14 Videos" },
    { label: "Profit Per TikTok", before: "$488", after: "$2,200" },
  ]

  const sliderMarks = [
    { value: 0, label: '1k' },
    { value: 11.14, label: '2k' },
    { value: 22.28, label: '4k' },
    { value: 33.42, label: '8k' },
    { value: 44.56, label: '16k' },
    { value: 55.70, label: '32k' },
    { value: 66.84, label: '64k' },
    { value: 77.98, label: '128k' },
    { value: 89.12, label: '256k' },
    { value: 100, label: '500k' },
  ]

  const layers = [
    {
      title: "Cold Outreach Ads",
      description: "Most people correctly begin by running ads to cold traffic to introduce new people to their service.",
      icon: Users,
      color: "from-purple-600 to-indigo-600"
    },
    {
      title: "?? :O ??",
      description: "",
      icon: Heart,
      color: "from-indigo-600 to-purple-600"
    },
    {
      title: "BUY MY THING!!",
      description: "But then they try to force these people who don't know them to book a call and buy their service...",
      icon: PhoneCall,
      color: "from-purple-600 to-indigo-600"
    }
  ]

  const layers2 = [
    {
      title: "Layer One - Discovery",
      description: "Run ads to brand new viewers to grow your audience predictably, without needing to make 3 TikToks per day or going viral.",
      icon: Users,
      color: "from-purple-600 to-indigo-600"
    },
    {
      title: "Layer Two - Nurturing",
      description: "Increase the Know, Like, Trust factor of your viewers, educate them about your offer and pre-sell them to buy.",
      icon: Heart,
      color: "from-indigo-600 to-purple-600"
    },
    {
      title: "Layer Three - Book Sales Calls",
      description: "Encourage pre-sold viewers to book a call with you to purchase your high-ticket program.",
      icon: PhoneCall,
      color: "from-purple-600 to-indigo-600"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
    <header className="px-4 lg:px-6 h-16 flex items-center justify-center bg-black/20 backdrop-blur-lg">
      <nav className="flex justify-between items-center w-full max-w-7xl">
        <div className="text-2xl font-bold text-white">Market Vision</div>
        <div className="sm:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div className="hidden sm:flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:text-white transition-colors" href="#how-it-works">
            How It Works
          </a>
          <a className="text-sm font-medium hover:text-white transition-colors" href="#case-study">
            Track Record
          </a>
          <a className="text-sm font-medium hover:text-white transition-colors" href="/book">
            Apply To Work With Us
          </a>
        </div>
      </nav>
    </header>
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="sm:hidden absolute top-16 left-0 right-0 bg-purple-800/90 backdrop-blur-lg z-50"
        >
          <div className="flex flex-col items-center py-4">
            <a className="text-sm font-medium hover:text-white transition-colors py-2" href="#how-it-works" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </a>
            <a className="text-sm font-medium hover:text-white transition-colors py-2" href="#case-study" onClick={() => setIsMenuOpen(false)}>
              Case Study
            </a>
            <a className="text-sm font-medium hover:text-white transition-colors py-2" href="/book" onClick={() => setIsMenuOpen(false)}>
              Book A Call
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    <main className="flex-1 flex flex-col items-center">
      <section className="w-full min-h-[calc(100vh-4rem)] py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col justify-center items-center bg-[url('/texture-bg.png')] bg-cover bg-center relative">
        <div className="container px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center space-y-8 text-center">
            <motion.h1 
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              We Will Double Your Monthly Revenue in 90 Days With Our Triple Layer TikTok Ad System
            </motion.h1>
            <motion.p 
              className="mx-auto max-w-[700px] text-xl md:text-2xl text-gray-200 drop-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Without you covering ad costs, posting three times a day on TikTok, or going viral.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full max-w-md"
            >
              <Link href="/book" className="w-full">
                <Button className="w-full py-6 text-xl bg-white text-purple-900 hover:bg-gray-200 transition-colors shadow-lg">
                  Apply To Work With Us <ChevronRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-8 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-sm font-medium mb-2">Learn More</p>
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"></path>
          </svg>
        </motion.div>
      </section>
      <section id="why-ads-fail" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black/30 to-transparent flex justify-center">
        <div className="container px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col items-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center text-white">
              Why Most People Fail At Running Ads
            </h2>
            <div className="flex flex-col lg:flex-row gap-8 w-full">
              <div className="lg:w-1/2 w-full bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl">
                <div className="space-y-4 relative">
                  {layers.map((layer, index) => (
                    <motion.div 
                      key={index}
                      className={`bg-gradient-to-r ${layer.color} p-4 rounded-lg ${index === 1 ? 'opacity-30' : ''}`}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: index === 1 ? 0.3 : 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <h4 className="text-lg font-semibold mb-2 flex items-center">
                        <layer.icon className="h-6 w-6 mr-2" />
                        {layer.title}
                      </h4>
                      <p className="text-sm">{layer.description}</p>
                    </motion.div>
                  ))}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  >
                    <div className="bg-red-500 text-white px-2.5 py-2.5 rounded-full font-bold">
                      People Skip This! :(
                    </div>
                  </motion.div>
                </div>
                <motion.div 
                  className="mt-4 p-4 bg-red-500/20 rounded-lg border-2 border-red-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                >
                  <p className="text-sm font-bold flex items-center">
                    <XCircle className="h-5 w-5 mr-2 text-red-500" />
                    Problem: The prospect likely will not buy your service or even show up to your sales call.
                  </p>
                  <p className="text-sm mt-2">RESULT: Your ad money goes down the drain.</p>
                </motion.div>
              </div>
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl mb-12 lg:mb-0 lg:w-1/2">
                <CardContent className="p-6 space-y-4">
                  <p className="text-base text-gray-200">
                    Many people think running ads is simple—just throw money at it and wait for sales. But most ads fail because they try to get people who have never heard of them to book a call and buy their program immediately.
                  </p>
                  <p className="text-base text-gray-200">
                    It doesn&apos;t work like that. Think of it like dating—you wouldn&apos;t propose marriage on the first date. Ads need to build a relationship step by step, nurturing trust until the big decision feels natural.
                  </p>
                  <p className="text-base text-gray-200">
                    The process isn&apos;t complicated, but it has to be done just the right way.
                  </p>
                  <div className="text-center mt-6">
                <Link href="/book" className="w-full">
                  <Button className="py-6 text-xl bg-white text-purple-900 hover:bg-gray-200 transition-colors shadow-lg">
                    Apply To Work With Us <ChevronRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black/30 to-transparent flex justify-center">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-white">
            How the Triple-Layer TT Ads System Works
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 space-y-8">
              <div className="w-full bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl">
                <div className="space-y-4">
                  {layers2.map((layer, index) => (
                    <motion.div 
                      key={index}
                      className={`bg-gradient-to-r ${layer.color} p-4 rounded-lg ${index === 1 ? 'opacity-30' : ''}`}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: index === 1 ? 1 : 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <h4 className="text-lg font-semibold mb-2 flex items-center">
                        <layer.icon className="h-6 w-6 mr-2" />
                        {layer.title}
                      </h4>
                      <p className="text-sm">{layer.description}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div 
                  className="mt-4 p-4 bg-green-500/20 rounded-lg border-2 border-green-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                >
                  <p className="text-sm font-bold flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    Congrats. Your prospect is pre-sold and ready to buy.
                  </p>
                  <p className="text-sm mt-2">Outcome: You double your business with half the effort.</p>
                </motion.div>
              </div>
            </div>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl mb-12 lg:mb-0 lg:w-1/2">
              <CardContent className="p-6 space-y-4">
                <p className="text-base text-gray-200">
                  You&apos;ve had videos go viral, but eventually, TikTok stops pushing them. With ads, we can keep that content in front of people and drive the actions we want. No need to keep pushing out three tiktoks per day and hoping they go viral.
                </p>
                <p className="text-base text-gray-200">
                  But you can&apos;t expect someone to see an ad once and buy immediately—it&apos;s about pacing the relationship so by the time they get on the call, they&apos;re already sold on working with you.
                </p>
                <div className="text-center mt-6">
                <Link href="/book" className="w-full">
                  <Button className="py-6 text-xl bg-white text-purple-900 hover:bg-gray-200 transition-colors shadow-lg">
                    Apply To Work With Us <ChevronRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

        <section id="case-study" className="w-full py-12 md:py-24 lg:py-32 flex justify-center bg-gradient-to-b from-transparent to-black/30">
      <div className="container px-4 md:px-6 max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-white">
          What Happened When We Plugged In Market Vision To Our Other Business
        </h2>
        <div className="bg-white/10 p-6 rounded-lg mb-8 backdrop-blur-sm border border-white/20 shadow-xl">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={caseStudyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
              <XAxis dataKey="month" stroke="#ffffff" padding={{ left: 30, right: 30 }} />
              <YAxis stroke="#ffffff" tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e1e1e', border: 'none' }}
                itemStyle={{ color: '#ffffff' }}
                formatter={(value) => [`$${value.toLocaleString()}`, "Cumulative Revenue"]}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#4ade80" strokeWidth={3} name="Cumulative Revenue" />
              <ReferenceLine x="Aug 2023" stroke="red" label={{ value: "Market Vision Start", position: 'top', fill: '#ffffff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 border-2 border-white/20 shadow-xl overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-white text-center">Key Improvements</h3>
              <div className="grid grid-cols-2 gap-6">
                {keyImprovements.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 p-6 rounded-lg flex flex-col items-center justify-center h-full"
                  >
                    <item.icon className="h-16 w-16 text-white mb-4" />
                    <p className="text-lg font-semibold text-white text-center mb-2">{item.label}</p>
                    <p className="text-4xl font-bold text-green-400">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 border-2 border-white/20 shadow-xl overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-white text-center">Results</h3>
              <div className="space-y-4">
                {results.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 p-4 rounded-lg"
                  >
                    <p className="text-lg font-semibold text-white mb-2 text-center">{item.label}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <p className="text-lg font-bold text-red-500 mb-1">Before</p>
                        <p className="text-3xl font-bold text-white">{item.before}</p>
                      </div>
                      <ArrowRight className="h-16 w-16 text-green-400 mx-4" />
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-500 mb-1">After</p>
                        <p className="text-3xl font-bold text-white">
                          {item.after}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black/30 to-transparent flex justify-center">
          <div className="container px-4 md:px-6 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-white">
              100% Money-Back Guarantee
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
                <CardContent className="p-6 space-y-6">
                  <p className="text-lg text-gray-200">
                  Before jumping into paid ads, it&apos;s crucial to refine your business using organic marketing first. This ensures that your offer resonates with your audience, your messaging grabs attention, and you know how to confidently close sales over the phone.                   </p>
                  <p className="text-lg text-gray-200">
                  Once you&apos;ve done this groundwork, we can plug in our proven ad system, front your ad-spend, and guarantee results with a 100% money-back guarantee.
                  </p>
                  <p className="text-lg text-gray-200">
                  We require your business to meet certain metrics so that we can guarantee success. Apply below to see if our system may work for you. 
                  </p>
                  <div className="text-center">
                  <Link href="/book" className="w-full">
                  <Button className="py-6 text-xl bg-white text-purple-900 hover:bg-gray-200 transition-colors shadow-lg">
                    Apply To Work With Us <ChevronRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
                </div>
                </CardContent>
              </Card>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-center">Will you be accepted to Market Vision?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Offer', 'Marketing', 'Sales'].map((aspect, index) => (
                    <div key={index} className="bg-white/20 p-4 rounded-lg text-center">
                      <motion.h4 
                        className="text-xl font-semibold mb-2 text-purple-300"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        {aspect}
                      </motion.h4>
                      <p className="text-base">
                        {aspect === 'Offer' && 'You serve a specific avatar solving their problem for a price of $5000 or higher.'}
                        {aspect === 'Marketing' && 'You have dialed in your organic TikTok content to generate leads, though consistency might still be a challenge.'}
                        {aspect === 'Sales' && 'You or your sales reps maintain a 25% close rate. You may be satisfied with your process or exploring ways to improve it.'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black/30 to-transparent flex justify-center">
          <div className="container px-4 md:px-6 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-white">
              Pricing and Profit Calculator
            </h2>
            <Card className="bg-gradient-to-br from-purple-800 to-indigo-800 max-w-3xl mx-auto border-2 border-white/20 shadow-xl mb-12">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-center text-white">See What&apos;s Possible For Your Business</h3>
                <p className="text-lg text-gray-200 mb-6">
                  Use the profit tool below to get an estimate on how you can grow your business with Market Vision.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-800 to-indigo-800 max-w-3xl mx-auto border-2 border-white/20 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-center text-white">Profit Calculator</h3>
                <p className="mb-6 text-center">Adjust the slider or input values to see potential profits based on ad spend:</p>
                <div className="relative mb-2 h-10">
                  {sliderMarks.map((mark, index) => (
                    <span 
                      key={index} 
                      className="absolute text-sm font-bold text-white"
                      style={{left: `${mark.value}%`, transform: 'translateX(-50%)'}}
                    >
                      {mark.label}
                    </span>
                  ))}
                </div>
                <div className="mb-6 mt-8">
                  <Slider
                    min={0}
                    max={100}
                    step={0.01}
                    value={[Math.log(adSpend / 1000) / Math.log(500) * 100]}
                    onValueChange={(value) => calculateProfits(value[0])}
                    className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-white"
                  />
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mt-2"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <p className="font-bold text-white mb-2">Ad Spend</p>
                    <Input
                      type="text"
                      value={`$${adSpend.toLocaleString()}`}
                      onChange={(e) => handleInputChange(e.target.value.replace('$', ''), 'adSpend')}
                      className="text-2xl text-center bg-transparent border-none focus:ring-0"
                    />
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <p className="font-bold text-white mb-2">Total Revenue</p>
                    <Input
                      type="text"
                      value={`$${revenue.toLocaleString()}`}
                      onChange={(e) => handleInputChange(e.target.value.replace('$', ''), 'revenue')}
                      className="text-2xl text-center bg-transparent border-none focus:ring-0"
                    />
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <p className="font-bold text-white mb-2">Your Profit</p>
                    <Input
                      type="text"
                      value={`$${clientProfit.toLocaleString()}`}
                      onChange={(e) => handleInputChange(e.target.value.replace('$', ''), 'clientProfit')}
                      className="text-2xl text-center bg-transparent border-none focus:ring-0"
                    />
                  </div>
                </div>
                <p className="text-sm text-center mb-6">
                  *Assuming a 5X return on ad spend. Actual results may vary.
                </p>
                <div className="text-center">
                  <Link href="/book">
                    <Button className="bg-white text-purple-900 hover:bg-gray-200 transition-colors shadow-lg">
                      Apply To Work With Us <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section> */}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white/10 justify-center bg-black/20 backdrop-blur-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-7xl">
          <p className="text-xs text-gray-400">© 2024 Market Vision. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <a className="text-xs hover:text-white transition-colors text-gray-400" href="#">
              Terms of Service
            </a>
            <a className="text-xs hover:text-white transition-colors text-gray-400" href="#">
              Privacy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
