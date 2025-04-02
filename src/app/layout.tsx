import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
// const kufiArabic=Noto_Kufi_Arabic({subsets:['arabic'],weight:['300','500']})
export const metadata: Metadata = {
  title: 'Cloud Hosting',
  description: 'Cloud hosting project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  ) 
}
