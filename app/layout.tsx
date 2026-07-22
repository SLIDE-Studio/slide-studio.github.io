import React from "react"
import type { Metadata } from 'next'
import { Just_Another_Hand, Space_Grotesk } from 'next/font/google'

import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const chalkHand = Just_Another_Hand({ weight: '400', subsets: ['latin'], variable: '--font-chalk' })

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
    <html lang="en" className={`${spaceGrotesk.variable} ${chalkHand.variable} bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
