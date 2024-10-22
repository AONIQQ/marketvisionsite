'use client'

import Head from 'next/head'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Market Vision</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-white">
        <header className="w-full py-4 sm:py-6 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-sm sm:text-base text-gray-600 text-center mt-2 sm:mt-3">
                Your privacy is important to us. This privacy policy outlines how we collect, use, and protect your information when you interact with Market Vision.
              </p>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="container mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Information We Collect</h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                When you engage with Market Vision, we may collect personal information that you provide to us directly through forms, surveys, or other interactions. This may include your name, email address, phone number, and other relevant details.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                The information we collect is used for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-sm sm:text-base text-gray-700">
                <li>To provide and improve our services.</li>
                <li>To communicate with you regarding your inquiries or service requests.</li>
                <li>To send promotional offers, newsletters, or other marketing material (only with your consent).</li>
                <li>To analyze usage data and improve user experience on our website.</li>
              </ul>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Data Sharing and Disclosure</h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 text-sm sm:text-base text-gray-700">
                <li>With trusted service providers who assist in operating our website or conducting our business.</li>
                <li>When required by law or in response to valid legal requests.</li>
              </ul>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Your Consent</h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                By providing us with your personal information, you consent to our privacy policy. You can withdraw your consent at any time by contacting us at <a href="mailto:privacy@marketvision.com" className="text-blue-600">privacy@marketvision.com</a>.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Security of Your Information</h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                We take appropriate measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no online data transmission is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Changes to This Policy</h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                We may update this privacy policy periodically. Any changes will be posted on this page with the updated date at the top. We encourage you to review this page regularly to stay informed about how we are protecting your information.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                If you have any questions about this privacy policy or how we handle your information, please contact us at <a href="mailto:privacy@marketvision.com" className="text-blue-600">privacy@marketvision.com</a>.
              </p>
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
