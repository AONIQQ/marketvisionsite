'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Calendar, ChevronRight, ChevronLeft, Menu, X, Star, ArrowRight, DollarSign } from "lucide-react"
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export default function WebsiteCreation() {
  const [currentReview, setCurrentReview] = useState(0)
  const [expandedReviews, setExpandedReviews] = useState<boolean[]>(Array(5).fill(false))
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
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

  const openContactForm = useCallback(() => {
    setIsContactFormOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeContactForm = useCallback(() => {
    setIsContactFormOpen(false)
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
        closeContactForm()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [closeContactForm])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#000033] via-[#000066] to-[#0000CC] text-white">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-opacity-80 bg-[#000033]">
        <Link href="/" passHref legacyBehavior>
          <motion.a 
            className="relative w-36 h-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/LargeSideLogo.png"
              alt="Aoniqq Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 144px, 144px"
              priority
            />
          </motion.a>
        </Link>
        <nav className="hidden md:flex gap-4 sm:gap-6">
          {['Portfolio', 'Testimonials', 'Pricing', 'Contact'].map((item, index) => (
            <motion.a
              key={item}
              className="text-sm font-medium hover:text-blue-400 transition-colors relative"
              href={`#${item.toLowerCase()}`}
              onClick={handleNavClick}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {item}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          ))}
        </nav>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#000033] border-l border-blue-400/20">
            <div className="flex justify-end mb-4">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col gap-4">
              {['Portfolio', 'Testimonials', 'Pricing', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  className="text-lg font-medium hover:text-blue-400 transition-colors"
                  href={`#${item.toLowerCase()}`}
                  onClick={handleNavClick}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1">
        <section className="w-full min-h-screen flex items-center justify-center py-6 md:py-12 lg:py-24 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col items-center space-y-4 md:space-y-6 text-center">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
                  Get a fully customized website
                </span>
                <br />
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 inline-block">
                  in 24 hours
                </span>
              </motion.h1>
              <motion.p 
                className="mx-auto max-w-[1000px] text-gray-300 text-base sm:text-lg md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="font-bold text-white text-shadow-glow animate-pulse">
                  Don&apos;t waste valuable time and money on low quality design, poor communication, and long turnaround times. Functional website delivered in 24 hours or your money back
                </span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col items-center"
              >
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-lg sm:text-xl md:text-2xl py-4 sm:py-6 px-6 sm:px-8 md:px-10 mt-4 sm:mt-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200" 
                  onClick={openContactForm}
                >
                  Submit Inquiry
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.span>
                </Button>
                <motion.p
                  className="mt-4 text-sm sm:text-base md:text-lg text-gray-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Submit an inquiry to explore how we can help you save time & money on your website
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 bg-black/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Some of Our Most Recent Portfolio Websites
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  src: "/images/fastrack.png",
                  alt: "Fastrack Website",
                  title: "Fastrack",
                  description: "A training business in the education sector.",
                  url: "https://www.fastrack.school"
                },
                {
                  src: "/images/WSV.png",
                  alt: "Wall Street Vision Website",
                  title: "Wall Street Vision",
                  description: "A stock trading program.",
                  url: "https://www.Wallstreetvision.net"
                },
                {
                  src: "/images/Weaksauce.png",
                  alt: "Weaksauce Website",
                  title: "Weaksauce",
                  description: "A Hot Sauce Brand.",
                  url: "https://www.weaksaucephilly.com"
                },
                {
                  src: "/images/DPE.png",
                  alt: "DPE Foundation Website",
                  title: "DPE Foundation",
                  description: "A Nonprofit Organization.",
                  url: "https://www.dpefoundation.org"
                },
                {
                  src: "/images/Votepicozzi.png",
                  alt: "VotePicozzi Website",
                  title: "VotePicozzi",
                  description: "A political campaign website.",
                  url: "https://www.Votepicozzi.com"
                },
                {
                  src: "/images/Remotetutoring.png",
                  alt: "Remote Tutoring Website",
                  title: "Remote Tutoring",
                  description: "A chemistry tutoring business.",
                  url: "https://www.remotetutoring.com"
                }
              ].map((project, index) => (
                <motion.a 
                  key={index} 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-900/20 rounded-lg overflow-hidden block cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative w-full pt-[56.25%]">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=300&width=400"
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300">{project.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Client Reviews
            </motion.h2>
            <div className="relative">
              <div className="overflow-hidden px-4 md:px-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentReview}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
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
                  </motion.div>
                </AnimatePresence>
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

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-black/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Pricing
            </motion.h2>
            <motion.div
              className="bg-blue-900/20 rounded-lg p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">$1,000 - $3,000</h3>
              <p className="text-lg md:text-xl mb-6">Our pricing is based on the complexity of the website you need, the number of pages, and the level of copywriting you need. We are happy to discuss custom pricing for more complex projects, or more urgent projects.</p>
              <div className="flex items-center justify-center mb-6">
                <p className="text-lg md:text-xl font-semibold">
                  Get your website tomorrow for as little as $0 up front with 0% APR financing via Affirm
                </p>
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-lg md:text-xl py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200" 
                onClick={openContactForm}
              >
                Submit Inquiry
              </Button>
            </motion.div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Frequently Asked Questions
            </motion.h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How is this possible in 24 hours?</AccordionTrigger>
                <AccordionContent>
                  We&apos;ve found an optimal balance between AI & human developers and copywriters to maximize efficiency while retaining quality.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What if you deliver the website late?</AccordionTrigger>
                <AccordionContent>
                  We understand time is your most valuable resource, so we won&apos;t deliver late. If we do, we will offer you a full refund.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How long have you been creating websites?</AccordionTrigger>
                <AccordionContent>
                  We&apos;ve been designing, coding, and customizing websites for over 5 years.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How do you ensure the quality of the website with a 24 hour turnaround?</AccordionTrigger>
                <AccordionContent>
                  Our team of developers and copywriters work together to ensure the website is of the highest quality, and a final quality assurance review is done before delivery.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How many pages are included?</AccordionTrigger>
                <AccordionContent>
                  Our core offer includes 2 pages. However, we can discuss adding more pages for an additional fee on our discovery call.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Are revisions offered?</AccordionTrigger>
                <AccordionContent>
                  Yes, we will ensure you&apos;re 100% satisfied with the finished website before project completion.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-black/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.h2 
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p 
                className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Submit an inquiry now to discuss your website needs and get a fully customized site in just 24 hours.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xl py-6 px-10 mt-6 group" 
                  onClick={openContactForm}
                >
                  Submit Inquiry
                  <ChevronRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
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
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={closeContactForm}
        redirectUrl="/websitecreation/inquirysubmitted"
      />
    </div>
  )
}