"use client"

import { useState, useEffect, useCallback } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Calendar, Code, Briefcase, ChevronRight, ChevronLeft, Menu, X, Star } from "lucide-react"

export default function Component() {
  const [currentReview, setCurrentReview] = useState(0)
  const [expandedReviews, setExpandedReviews] = useState<boolean[]>(Array(5).fill(false))
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const reviews = [
    {
      text: "I have had the pleasure of working with Andrew, the founder of Aoniqq, on multiple Web3 and Web2 projects for over a year now. Throughout our collaborations, Andrew has consistently demonstrated competence, trustworthiness, professionalism, discipline, punctuality, open-mindedness, quick learning ability, and excellent problem-solving skills. His extensive experience is further bolstered by his ability to know when to delegate or call in experts to fill any gaps. In challenging situations, Andrew has shown his ability to perform under pressure and in harsh conditions without slipping up. His technical expertise combined with his ability to work with and manage a team of developers makes him a great resource. For the sake of providing a more specific and helpful review, I&apos;d like to share one of my recent positive experiences with Aoniqq. Aoniqq single-handedly saved a Web3 project launch that was being severely mismanaged by a team of supposedly professional developers. The other developers not only failed to do their job correctly but were also an absolute nightmare to work with when corrections were needed. Aoniqq solved the technical issues while also successfully navigating the complicated communication issues with the original dev team to ensure that they provided what was needed for the corrections to be completed. I felt safe trusting Aoniqq to take charge of the process, and they executed flawlessly, leading to a smooth launch for the project. Being able to trust Aoniqq to handle the development side of a project completely allows my team and me to focus our energy on our areas of specialization, opening us up to the most success and growth possible. The peace of mind provided by such confident delegation is priceless. If anyone requires further validation of any claims or would like to learn more about the quality of work I&apos;ve seen from Andrew and Aoniqq, I would be happy to serve as a reference.",
      author: "Ryan | Founder | Pylon Enterprises"
    },
    {
      text: "I recently had the pleasure of working with Aoniqq on a project and was extremely impressed with their expertise. Their team of developers were not only highly skilled, but also very responsive and efficient in meeting our deadlines. One of the things I appreciated most about Aoniqq was their ability to understand our business needs and provide tailored solutions. Their automation scripting skills saved us a lot of time and allowed us to streamline our processes. I highly recommend Aoniqq for anyone in need of the services they offer. Their attention to detail, expertise, and customer service are top-notch. Aoniqq truly exceeded our expectations. We will not hesitate to recommend Aoniqq in the future.",
      author: "Josh | CEO | Express Solutions"
    },
    {
      text: "After months of working with Aoniqq, I can say without pause, that they are one of the most reliable service providers with whom we have worked. What started with generative art coding services has blossomed into Aoniqq providing overall smart contract consulting and project management. They have taken on the increased scope professionally. They have taken the initiative to research new trends as they emerge in the space. And, they have properly -and timely! - communicated things along the way. We consider Aoniqq to be a true partner in the project.",
      author: "Justin | Founder | Bodega Blocks"
    },
    {
      text: "Aoniqq was recommended to the team by an advisor helping out on the project after we had issues with our previous development team. The level of professionalism we received from the team at Aoniqq was something we haven&apos;t experienced in web3 before, and it came at the perfect time. Their team was actively engaged in the whole process and their technical knowledge from start to finish allowed us to focus on the growth of the project.",
      author: "Alex | Founder | All For One"
    },
    {
      text: "The team at Aoniqq helped us program all of the contracts and code for our NFT drop and much much more. Andrew from the team came to every meeting and had excellent ideas. Despite changing direction multiple times as the project developed, their team never complained, and their team didn&apos;t flinch when the work doubled and then tripled. Highly professional, and especially trustworthy team. Can&apos;t wait to work together in the future.",
      author: "Max | CEO | Unreal Assets"
    }
  ]

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const toggleExpandReview = (index: number) => {
    setExpandedReviews(prev => {
      const newExpanded = [...prev]
      newExpanded[index] = !newExpanded[index]
      return newExpanded
    })
  }

  const truncateText = (text: string, sentences: number) => {
    const sentenceArray = text.match(/[^.!?]+[.!?]+/g) || []
    return sentenceArray.slice(0, sentences).join(' ')
  }

  const openCalendly = useCallback(() => {
    setIsCalendlyOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeCalendly = useCallback(() => {
    setIsCalendlyOpen(false)
    document.body.style.overflow = 'auto'
  }, [])

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const href = event.currentTarget.getAttribute('href')
    if (href) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCalendly()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [closeCalendly])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#000033] to-[#000066] text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="relative w-36 h-12">
        <div className="relative w-36 h-12">
  <Image
    src="/images/LargeSideLogo.png"
    alt="Aoniqq Logo"
    fill
    className="object-contain"
    sizes="(max-width: 768px) 144px, 144px"
    priority
  />
</div>
        </div>
        <nav className="hidden md:flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:text-blue-400 transition-colors" href="#services" onClick={handleNavClick}>
            Services
          </a>
          <a className="text-sm font-medium hover:text-blue-400 transition-colors" href="#testimonials" onClick={handleNavClick}>
            Testimonials
          </a>
          <a className="text-sm font-medium hover:text-blue-400 transition-colors" href="#contact" onClick={handleNavClick}>
            Contact
          </a>
        </nav>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
  <SheetTrigger asChild>
    <Button variant="outline" size="icon" className="md:hidden">
      <Menu className="h-6 w-6" />
      <span className="sr-only">Open menu</span>
    </Button>
  </SheetTrigger>
  <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#000033] border-l border-blue-400/20">
    <nav className="flex flex-col gap-4 mt-8">
      <a className="text-lg font-medium hover:text-blue-400 transition-colors" href="#services" onClick={handleNavClick}>
        Services
      </a>
      <a className="text-lg font-medium hover:text-blue-400 transition-colors" href="#testimonials" onClick={handleNavClick}>
        Testimonials
      </a>
      <a className="text-lg font-medium hover:text-blue-400 transition-colors" href="#contact" onClick={handleNavClick}>
        Contact
      </a>
    </nav>
  </SheetContent>
</Sheet>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Welcome to <span style={{ color: '#3337f2' }}>Aoniqq</span>
                </h1>
              </div>
              <p className="mx-auto max-w-[1000px] text-gray-300 text-lg lg:text-xl">
                At Aoniqq, our goal is for you to know that the technicalities of your project are in capable hands. We take the weight of technical development off your shoulders, allowing you to focus on the core aspects of your business. As we have served many industries, we are able to offer a comprehensive approach towards providing solutions to complex problems and roadblocks that businesses across a variety of sectors are facing.
              </p>
              <p className="mx-auto max-w-[1000px] text-gray-300 text-lg lg:text-xl">
                We understand that every business and project is unique, which is why we take a tailored approach to each partnership. Our team of experts works closely with our clients to develop a personalized plan that meets their specific needs, rather than taking a one-size-fits-all approach. We strive for excellent communication and are always open for feedback on how we can better serve you and your business.
              </p>
              <p className="mx-auto max-w-[1000px] text-gray-300 text-lg lg:text-xl">
                Please schedule a call at your convenience via the button below so we can see if we&apos;re a good fit.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xl py-6 px-10 mt-6" onClick={openCalendly}>
                Schedule a Free Consultation
              </Button>
            </div>
          </div>
        </section>
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-black/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Our Core Services</h2>
            <p className="text-center text-gray-300 mb-8">Kindly initiate contact to detail your requirements, and we will evaluate our capacity to assist you.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-blue-900/20 text-white border-blue-400/20 hover:border-blue-400/50 transition-colors">
                <CardContent className="flex flex-col items-center p-6">
                  <Code className="h-12 w-12 mb-4 text-blue-400" />
                  <h3 className="text-xl font-bold mb-2 text-center">Full Stack Development</h3>
                  <p className="text-center text-gray-300">We have built the technical aspects of various projects in different industries from the ground up, and are always researching and learning new technologies to make seamless platforms.</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-900/20 text-white border-blue-400/20 hover:border-blue-400/50 transition-colors">
                <CardContent className="flex flex-col items-center p-6">
                  <Briefcase className="h-12 w-12 mb-4 text-blue-400" />
                  <h3 className="text-xl font-bold mb-2 text-center">Website Development</h3>
                  <p className="text-center text-gray-300">We have a rich history in creating fast, responsive, and aesthetic websites for small businesses, ecommerce professionals, startups, foundations, politicians, and many others. We offer quick turnaround times and unlimited revisions.</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-900/20 text-white border-blue-400/20 hover:border-blue-400/50 transition-colors">
                <CardContent className="flex flex-col items-center p-6">
                  <Calendar className="h-12 w-12 mb-4 text-blue-400" />
                  <h3 className="text-xl font-bold mb-2 text-center">Project Management and Consulting</h3>
                  <p className="text-center text-gray-300">Our constant pursuit of new information and trends as well as our track record of success in multiple arenas makes us an excellent resource to provide consultation on or manage your project.</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xl py-6 px-10" onClick={openCalendly}>
                Schedule a Free Consultation
              </Button>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Client Reviews</h2>
            <div className="relative">
              <div className="overflow-hidden px-4 md:px-12">
                <Card className="bg-blue-900/20 text-white border-blue-400/20">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="mb-4 text-lg">
                      {expandedReviews[currentReview] 
                        ? reviews[currentReview].text 
                        : truncateText(reviews[currentReview].text, 4)}
                    </p>
                    {!expandedReviews[currentReview] && reviews[currentReview].text.length > truncateText(reviews[currentReview].text, 4).length && (
                      <Button 
                        onClick={() => toggleExpandReview(currentReview)}
                        variant="link"
                        className="p-0 h-auto font-normal text-blue-400 hover:text-blue-300"
                      >
                        Read more...
                      </Button>
                    )}
                    {expandedReviews[currentReview] && (
                      <Button 
                        onClick={() => toggleExpandReview(currentReview)}
                        variant="link"
                        className="p-0 h-auto font-normal text-blue-400 hover:text-blue-300"
                      >
                        Show less
                      </Button>
                    )}
                    <p className="font-bold text-blue-400 mt-4">{reviews[currentReview].author}</p>
                  </CardContent>
                </Card>
              </div>
              <Button 
                className="absolute left-0 md:left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-2 md:p-3"
                onClick={prevReview}
              >
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Previous review</span>
              </Button>
              <Button 
                className="absolute right-0 md:right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-2 md:p-3"
                onClick={nextReview}
              >
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Next review</span>
              </Button>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-black/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl">
                Get in touch with us to discuss your project needs via email, text, call, or by booking a meeting via the button below.
              </p>
              <div className="space-y-2 text-gray-300">
                <p>1007 N Orange St</p>
                <p>Wilmington, DE, 19801</p>
                <p>info@aoniqq.com</p>
                <p>605-884-6550</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xl py-6 px-10 mt-6" onClick={openCalendly}>
                Schedule a Free Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-400">© 2024 Aoniqq LLC. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:text-blue-400 transition-colors text-gray-400" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:text-blue-400 transition-colors text-gray-400" href="#">
            Privacy Policy
          </a>
        </nav>
      </footer>
      {isCalendlyOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeCalendly}>
          <div className="relative w-[90%] h-[90%] bg-gradient-to-br from-[#000033] to-[#000066] rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <Button
              className="absolute top-2 right-2 bg-transparent hover:bg-blue-700 text-white z-10"
              onClick={closeCalendly}
            >
              <X className="h-8 w-8" />
            </Button>
            <div className="p-4 text-center bg-gradient-to-r from-[#000033] to-[#000066]">
              <h2 className="text-2xl font-bold mb-2 text-white">Schedule a Free Consultation</h2>
              <p className="text-lg text-gray-300">Book a time below, or shoot us an email (info@aoniqq.com) or text (605-884-6550) to discuss your needs with our experts.</p>
            </div>
            <div className="h-[calc(100%-5rem)] overflow-y-auto">
              <iframe
                src="https://calendly.com/aoniqq/consulation?hide_gdpr_banner=1&background_color=000033&text_color=ffffff&primary_color=3337f2"
                width="100%"
                height="100%"
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}