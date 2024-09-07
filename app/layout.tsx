import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Aoniqq - Software Development and Consulting Services',
  description: 'Aoniqq provides software and website development, project management, and consulting services.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Facebook Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '521366960377690'); // Replace with your actual Pixel ID
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=521366960377690&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Facebook Pixel Code */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
