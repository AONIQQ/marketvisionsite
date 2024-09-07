import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Website Creation in 24 hours',
  description: 'Get a fully customized, responsive website in 24 hours with Aoniqq. We use AI and human developers + copywriters to create a website that is tailored to your needs.',
}

export default function WebsiteCreationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}