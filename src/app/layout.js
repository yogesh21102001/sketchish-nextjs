import { Inter } from 'next/font/google'
import './globals.css'
import { NavBar } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://sketchish.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    images: './opengraph-image.png',
  },
  title: 'Empower Your Business with Cutting-Edge IT Services | Sketchish',
  description: 'Transform your business with our comprehensive IT services. From seamless network solutions to advanced cybersecurity, Sketchish delivers tailored technology solutions for optimal efficiency and growth. Explore our expertise today!',
  siteName: 'Sketchish',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <header>

        <meta property="og:type" content="website"></meta>
        <meta property="og:image" content="https://sketchish.com/opengraph-image.png?67f65930403b8043"></meta>
        <meta name="twitter:image" content="https://sketchish.com/opengraph-image.png?67f65930403b8043" />
      </header>
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
