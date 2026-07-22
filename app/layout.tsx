import React from "react"
import type { Metadata } from 'next'
import { Schoolbell, Space_Grotesk } from 'next/font/google'

import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const schoolbell = Schoolbell({ weight: '400', subsets: ['latin'], variable: '--font-chalk' })

export const metadata: Metadata = {
  title: 'SLIDE Studio - SociaL Interaction DEsign Research Studio',
  description: 'Human-computer interaction research studio exploring inclusive design, social interaction, and accessible technology.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${schoolbell.variable} bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
