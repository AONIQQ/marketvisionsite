'use client'

import { Button } from "@/components/ui/button"
import { Star, User } from "lucide-react"
import Image from "next/image"
import Head from 'next/head'
import Script from 'next/script'

const MarketVisionLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="50" fill="white" />
      <path
        d="M20 25L30 15L40 25L50 15"
        stroke="#4A90E2"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="25" r="10" fill="#4A90E2" fillOpacity="0.2" />
      <path
        d="M35 25L38 28L45 21"
        stroke="#4A90E2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="65"
        y="32"
        fontFamily="Arial, sans-serif"
        fontSize="20"
        fontWeight="bold"
        fill="#333333"
      >
        Market Vision
      </text>
    </svg>
  )
}

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Market Vision - Scale Your Coaching Business with TikTok</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-white">
        <header className="w-full py-4 sm:py-6 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col items-center">
              <MarketVisionLogo className="w-full max-w-[300px] sm:max-w-[400px] h-auto" />
              <p className="text-sm sm:text-base text-gray-600 text-center mt-2 sm:mt-3">
                For coaches on TikTok looking to generate an extra 3-5+ qualified sales calls/day...
              </p>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
                Here&apos;s how established online coaches on TikTok are earning <span className="bg-yellow-200 px-1">3-10x more money</span> from their audiences - without an exhausting daily posting schedule or <span className="bg-yellow-200 px-1">hoping to go viral to get leads</span>.
              </h1>


              <div className="max-w-4xl mx-auto mb-8 w-full px-4 sm:px-6 lg:px-8">
                {/* Updated Calendly embed code */}
                <div className="calendly-inline-widget" 
                     data-url="https://calendly.com/stevensilverglade/call?hide_event_type_details=1&hide_gdpr_banner=1" 
                     style={{minWidth: '320px', height: '700px', marginBottom: '0'}} // Ensure no margin-bottom
                ></div>
                <Script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
              </div>
            </div>
          </section>


          <section className="py-0 sm:py-0 px-0 bg-white"> {/* Removed padding */}
            <div className="container mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-0"> {/* Removed margin-bottom */}
                We&apos;re rated 5 stars on TrustPilot Across All Our Businesses
              </h2>
              <div className="flex justify-center items-center space-x-2 mb-8">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Star key={index} className="text-yellow-400 w-6 h-6 sm:w-8 sm:h-8 fill-current" />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md text-left">
                  <div className="flex items-center mb-4">
                    <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/73x73-0hS1voJOl9BT5eP8TkaFBLoQo7LdO3.png" alt="Samantha Airth" width={50} height={50} className="rounded-full mr-4" />
                    <div>
                      <h3 className="font-semibold text-black">Samantha Airth</h3>
                      <p className="text-sm text-black">Jul 29, 2024</p>
                    </div>
                  </div>
                  <h4 className="font-bold mb-2 text-black">Is there an option to give a 10 star...</h4>
                  <p className="text-sm sm:text-base text-gray-600">I&apos;ve been working with Steven and Ryan since March, and it&apos;s been a game-changer for me. I followed Steven&apos;s TikToks for a while before I had the capital to invest and sign up, and I&apos;m so glad I did. Investing in myself with Steven and Ryan has been the best decision ever! Steven has taught me so much about choosing stocks, using different parameters to avoid trades that won&apos;t get the results we&apos;re looking for. His insights are incredible.</p>
                </div>
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md text-left">
                  <div className="flex items-center mb-4">
                    <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/73x73%20(1)-gwiD4gJgVDQVxuuGLNtQQ4c5MX9qax.png" alt="Andrew Wilson" width={50} height={50} className="rounded-full mr-4" />
                    <div>
                      <h3 className="font-semibold text-black">Andrew Wilson</h3>
                      <p className="text-sm text-black">Mar 11, 2023</p>
                    </div>
                  </div>
                  <h4 className="font-bold mb-2 text-black">Invest in people, not businesses ...</h4>
                  <p className="text-sm sm:text-base text-gray-600">&ldquo;Invest in people, not businesses.&rdquo; said Mr. Warren Buffett. I met my financial guru, Ryan Conway, five years ago and though he never uttered the words, &ldquo;I won&apos;t let you fail.&rdquo; his actions prove otherwise. Steven is Ryan&apos;s prodigy, and serendipitously he possessed a skill set Ryan did not... bot programming. What separates this powerhouse duo is their expert level communication, an eagerness to learn new technology, a striving for excellence, and a genuine desire for others to do well.</p>
                </div>
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md text-left">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Alex Bi</h3>
                      <p className="text-sm text-black">Oct 13, 2023</p>
                    </div>
                  </div>
                  <h4 className="font-bold mb-2 text-black">Patient and fully transparent</h4>
                  <p className="text-sm sm:text-base text-gray-600">Steven has been an excellent mentor. He&apos;s extremely patient and knowledgeable. What I love most about working with him is that he&apos;s fully transparent. He doesn&apos;t try to hide his flaws nor try to hide any flaws of the program. Which is one of the reasons that made me trust him so much. Overall Steven is a great guy to work with and I don&apos;t regret my decision one bit.</p>
                </div>
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md text-left">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Adam Yarsinsky</h3>
                      <p className="text-sm text-black">Mar 11, 2023</p>
                    </div>
                  </div>
                  <h4 className="font-bold mb-2 text-black">A Proven System</h4>
                  <p className="text-sm sm:text-base text-gray-600">Ryan and Steven have worked very hard to create a system that benefits each person who gives them their trust. I have witnessed them use this system successfully many times over. As someone that has known them for many years, I can say that they are extremely trustworthy and will do everything they can to keep clients satisfied.</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-white text-black">
          <div className="container mx-auto text-center">
            <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Market Vision. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
