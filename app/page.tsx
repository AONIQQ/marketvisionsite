'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { ChevronRight, DollarSign, BarChart, Users, TrendingUp, ChevronUp, Video, Percent, ArrowRight, ChevronDown, Heart, PhoneCall, CheckCircle, XCircle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Link from "next/link"

export default function MarketVision() {
  const [adSpend, setAdSpend] = useState(5000)
  const [revenue, setRevenue] = useState(25000)
  const [clientProfit, setClientProfit] = useState(15000)
  const [activeLayer, setActiveLayer] = useState<number | null>(null)

  const calculateProfits = (sliderValue: number) => {
    const minSpend = 1000
    const maxSpend = 500000
    const scale = Math.log(maxSpend / minSpend)
    const spend = Math.round(Math.exp(sliderValue / 100 * scale) * minSpend)

    const generatedRevenue = spend * 5 // Assuming 5X ROAS
    const clientTake = generatedRevenue - spend * 2 // Assuming 2X return for the company

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
    { month: 'Jan', beforeRevenue: 14500, afterRevenue: 35250 },
    { month: 'Feb', beforeRevenue: 15000, afterRevenue: 37500 },
    { month: 'Mar', beforeRevenue: 13800, afterRevenue: 34500 },
    { month: 'Apr', beforeRevenue: 16200, afterRevenue: 40500 },
    { month: 'May', beforeRevenue: 14900, afterRevenue: 37250 },
    { month: 'Jun', beforeRevenue: 15500, afterRevenue: 38750 },
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
    { label: "Close Rate", before: "31%", after: "37%" },
    { label: "Videos Per Month", before: "30", after: "14" },
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
      title: "Layer One - Gain Followers",
      description: "Reach A New Audience Without Making 3 TikToks Per Day And Needing To Go Viral",
      icon: Users,
      color: "from-purple-600 to-indigo-600"
    },
    {
      title: "Layer Two - Force Nurturing",
      description: "Ensure Followers See Your Nurturing Content, Build The &quot;Know, Like, Trust&quot; Factor Faster",
      icon: Heart,
      color: "from-indigo-600 to-purple-600"
    },
    {
      title: "Layer Three - Book Sales Calls",
      description: "Re-Target Nurtured Followers Who Are Ready To Buy with a lead magnet (book, webinar, etc)",
      icon: PhoneCall,
      color: "from-purple-600 to-indigo-600"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-center bg-black/20 backdrop-blur-lg">
        <nav className="flex justify-between items-center w-full max-w-7xl">
          <div className="text-2xl font-bold text-white">Market Vision</div>
          <div className="flex gap-4 sm:gap-6">
            <a className="text-sm font-medium hover:text-white transition-colors" href="#how-it-works">
              How It Works
            </a>
            <a className="text-sm font-medium hover:text-white transition-colors" href="#case-study">
              Case Study
            </a>
            <a className="text-sm font-medium hover:text-white transition-colors" href="#pricing">
              Pricing
            </a>
          </div>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center bg-[url('/texture-bg.png')] bg-cover bg-center">
          <div className="container px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.h1 
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Grow Your Coaching Business to $634K+ with Market Vision
              </motion.h1>
              <motion.p 
                className="mx-auto max-w-[700px] text-gray-200 md:text-xl drop-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Scale your coaching business without posting 3 TikToks a day, going viral, or spending your own money on ads.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/book">
                  <Button className="bg-white text-purple-900 hover:bg-gray-200 transition-colors shadow-lg">
                    Book a Free Discovery Call
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black/30 to-transparent flex justify-center">
          <div className="container px-4 md:px-6 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-white">
              Why You Shouldn&apos;t Start With Ads Right Away
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
                <CardContent className="p-6 space-y-6">
                  <p className="text-lg text-gray-200">
                    Before jumping into paid ads, it&apos;s crucial to first refine your business using organic marketing. This helps you understand what offer truly resonates with your audience, what messaging grabs their attention, and how to confidently close sales over the phone.
                  </p>
                  <p className="text-lg text-gray-200">
                    By doing this groundwork, once you start running ads, you&apos;ll know the business fundamentals are solid. If the ads don&apos;t convert, we&apos;ll know it&apos;s an issue with the ad system—not your offer, marketing, or sales process. 
                    <motion.span 
                      className="font-bold text-white"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      Therefore, if the system doesn&apos;t work, I take full responsibility and you won&apos;t pay me a cent.
                    </motion.span>
                  </p>
                  <p className="text-lg text-gray-200">
                    But if you launch ads too early, before you&apos;ve nailed down these details, and they don&apos;t work, you&apos;re left guessing. Is your offer off? Are you not communicating its value clearly? Or are you struggling with closing on the phone? Without clarity, it&apos;s nearly impossible to identify what went wrong, and that can cost you time and money.
                  </p>
                </CardContent>
              </Card>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-center">Three Key Parts Of Your Business</h3>
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
                        {aspect === 'Offer' && 'What you help people with, what problem you solve, what value you provide, what results you deliver - for a specific price'}
                        {aspect === 'Marketing' && 'How you attract clients, what channels you use, what messaging grabs attention, what content you create'}
                        {aspect === 'Sales' && 'How you close deals, what your process is, how you guide people through the sales process'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why-ads-fail" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black/30 to-transparent flex justify-center">
          <div className="container px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center space-y-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center text-white">
                Why Most Ads For Good Offers Fail
              </h2>
              <div className="max-w-2xl text-center space-y-4">
                <p className="text-lg text-gray-200">
                  Many try to get people who have never heard of them to book a call and buy their program immediately. But think of this like dating - you wouldn&apos;t propose marriage on the first date!
                </p>
                <p className="text-lg text-gray-200">
                  Just like in dating, it&apos;s about pacing the relationship—building a connection step by step until the big decision feels natural.
                </p>
              </div>
              <div className="w-full max-w-3xl bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 shadow-xl">
                <div className="space-y-6 relative">
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
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                      This Layer Is Often Skipped 
                    </div>
                  </motion.div>
                </div>
                <motion.div 
                  className="mt-6 p-4 bg-red-500/20 rounded-lg border-2 border-red-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                >
                  <p className="text-sm font-bold flex items-center">
                    <XCircle className="h-5 w-5 mr-2 text-red-500" />
                    Client Has No Idea Who You Are Or What You Do
                  </p>
                  <p className="text-sm mt-2">Definitely Does Not Close, May Not Even Show!</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black/30 to-transparent flex justify-center">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-white">
              How the Triple-Layer TT Ads System Works
            </h2>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl mb-12">
              <CardContent className="p-6 space-y-6">
                <p className="text-lg text-gray-200">
                  You&apos;ve had videos go viral, but eventually, TikTok stops pushing them. With ads, we can keep that content in front of people and drive the actions we want. Creating fresh content is still important, but the pressure to constantly churn out new TikToks is reduced. We don&apos;t need to rely on the algorithm to go viral anymore. Instead, we can use your existing TikToks to continue attracting customers. From there, we create new TikToks that may not explode in views, but convert into paying customers when paired with paid ads. And that&apos;s what really matters—getting customers, not chasing vanity metrics.
                </p>
                <p className="text-lg text-gray-200">
                  The key with ads is doing it with a &quot;triple layer system&quot;. First, we get new people to follow your content. Then, we show them basic videos to build familiarity, followed by more advanced ones to deepen their understanding. From there, we might guide them to your YouTube channel or offer a free book—building trust gradually. Eventually, we invite them to book a sales call.
                </p>
                <p className="text-lg text-gray-200">
                 You can&apos;t expect someone to see your ad once and immediately commit to buying. It takes time to build trust and rapport. First, they need to get familiar with your brand, then engage with your content, and eventually, they&apos;ll feel confident enough to buy. Just like in dating, it&apos;s about pacing—building the relationship step by step until the decision to buy feels natural.
                </p>
                <p className="text-lg text-gray-200">
                  This nurturing process can take months or even over a year. The better your content, the faster it moves. But expecting someone to spend $5K or $10K right away is unrealistic—unless you&apos;re using high-pressure or manipulative tactics, which is like being pushy in a relationship. By the time they get on the call, they already know who you are, what you do, and how you can help them. The call then becomes about answering their questions and taking their payment—they&apos;re already sold on working with you.
                </p>
              </CardContent>
            </Card>
            <div className="max-w-3xl mx-auto space-y-8">
              {layers.map((layer, index) => (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-r ${layer.color} rounded-lg shadow-lg overflow-hidden cursor-pointer`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveLayer(activeLayer === index ? null : index)}
                >
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <layer.icon className="h-8 w-8 text-white"  />
                      <h3 className="text-xl font-semibold text-white">{layer.title}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: activeLayer === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {activeLayer === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-white">{layer.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="mt-12 p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-6 w-6 text-white" />
                <h3 className="text-xl font-semibold text-white">Confirm & Close New Client</h3>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="case-study" className="w-full py-12 md:py-24 lg:py-32 flex justify-center bg-gradient-to-b from-transparent to-black/30">
          <div className="container px-4 md:px-6 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-white">
              Wall Street Vision Case Study
            </h2>
            <div className="bg-white/10 p-6 rounded-lg mb-8 backdrop-blur-sm border border-white/20 shadow-xl">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={caseStudyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                  <XAxis dataKey="month" stroke="#ffffff" padding={{ left: 30, right: 30 }} />
                  <YAxis stroke="#ffffff" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1e1e', border: 'none' }}
                    itemStyle={{ color: '#ffffff' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="beforeRevenue" stroke="#ff4d4d" strokeWidth={3} name="Before Market Vision" />
                  <Line 
                    type="monotone" 
                    dataKey="afterRevenue" 
                    stroke="#4ade80" 
                    strokeWidth={4} 
                    name="After Market Vision"
                    dot={false}
                    animationBegin={300}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 border-2 border-white/20 shadow-xl overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-white text-center">Key Improvements</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {keyImprovements.map((item, index) => (
                      <motion.div 
                        key={index}
                        className="bg-white/10 p-6 rounded-lg flex flex-col items-center justify-center h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <item.icon className="h-16 w-16 text-white mb-4" />
                        <p className="text-lg font-semibold text-white text-center mb-2">{item.label}</p>
                        <motion.p 
                          className="text-5xl font-bold text-green-400"
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {item.value}
                        </motion.p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 border-2 border-white/20 shadow-xl overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-white text-center">Results</h3>
                  <div className="space-y-4">
                    {results.map((item, index) => (
                      <motion.div 
                        key={index}
                        className="bg-white/10 p-4 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
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
                            <motion.p 
                              className="text-3xl font-bold text-white"
                              initial={{ scale: 1 }}
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {item.after}
                            </motion.p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black/30 to-transparent flex justify-center">
          <div className="container px-4 md:px-6 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-white">
              Pricing and Profit Calculator
            </h2>
            <Card className="bg-gradient-to-br from-purple-800 to-indigo-800 max-w-3xl mx-auto border-2 border-white/20 shadow-xl mb-12">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-center text-white">Our Unique Pricing Model</h3>
                <p className="text-lg text-gray-200 mb-6">
                  Designed for coaches and consultants who are generating at least $30K-$50K per month through organic TikTok content marketing and want to scale with ads without the risk, effort, and knowledge of how to do it.
                </p>
                <h4 className="text-xl font-semibold mb-4 text-white">Here&apos;s how it works:</h4>
                <ul className="list-disc list-inside space-y-4 text-gray-200 mb-6">
                  <li><strong>No Upfront Ad Cost:</strong> We use our own money to run ads for clients, and you only pay if the ads are successful.</li>
                  <li><strong>Initial Fee:</strong> A $3K startup fee is required for ad account setup, strategy development, and initial ad testing capital. This can be paid with Affirm (0% APR: $500 per month for 6 months).</li>
                  <li><strong>Selective Criteria:</strong> We are selective in accepting clients, requiring at least $100K in revenue in a four month span, and maintaining an average close rate of 30% and an average 60% show rate to ensure the offer is proven and the math of business works.</li>
                  <li><strong>Profit Share:</strong> If the ads generate returns above 3X for the month, we take 2X the return on our ad spend plus the ad spend back. If lower than 3X, we only take our ad spend back. For example, if we spend $10K and generate $50K, we take back $10K spend plus $10K return, leaving you with $30K.</li>
                </ul>
                <p className="text-lg text-gray-200 mb-6">
                  Use the profit tool below to see what this looks like at different levels. Remember, Market Vision fronts all money for ads, so this is risk-free for you, beyond your initial $3K investment.
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
                      Book a Free Discovery Call <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
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