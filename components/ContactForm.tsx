import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import Link from 'next/link'

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl: string;
}

export default function ContactForm({ isOpen, onClose, redirectUrl }: ContactFormProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setToastMessage(data.message)
        setTimeout(() => {
          setToastMessage(null)
          onClose()
          if (isMounted && typeof window !== 'undefined') {
            window.location.href = redirectUrl
          }
        }, 3000)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit inquiry')
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      setToastMessage(error instanceof Error ? error.message : "An error occurred while submitting the inquiry")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-[#000033] p-6 rounded-lg w-full max-w-2xl h-[90vh] overflow-y-auto relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <Button
              className="absolute top-2 right-2 bg-transparent hover:bg-blue-800"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white text-center">Contact Us</h2>
              <p className="text-white text-center">
                Please enter your details below, and someone from our team will contact you to discuss how we can best assist you. If you&apos;d prefer to book a time slot for a zoom/phone call, click the book a discovery call button below. You may also send us a text at 605-884-6550, or send an email to info@aoniqq.com. We look forward to hearing from you!
              </p>
              <div className="flex justify-center">
                <Link href="/websitecreation/book" passHref>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Book a Discovery Call
                  </Button>
                </Link>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-blue-900/20 border-blue-400/20 text-white placeholder-blue-300"
                />
                <Input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-blue-900/20 border-blue-400/20 text-white placeholder-blue-300"
                />
                <Input 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone" 
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-blue-900/20 border-blue-400/20 text-white placeholder-blue-300"
                />
                <Textarea 
                  name="message" 
                  placeholder="Your message" 
                  required 
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-blue-900/20 border-blue-400/20 text-white placeholder-blue-300 min-h-[100px]"
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </Button>
              </form>
            </div>
            {toastMessage && (
              <div className="absolute bottom-4 left-4 right-4 bg-blue-500 text-white p-2 rounded">
                {toastMessage}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}