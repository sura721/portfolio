import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "suras– Full-Stack Web Developer",
  description:
    "Explore the professional portfolio of surafel admas, a full-stack web developer building modern, scalable web applications using cutting-edge technologies.",
  keywords: [
    "suras-portfolio",
     "surafel-admas-portfolio ",
    "Full-stack developer",
    "Web developer",
    "Software engineer",
    "Next.js developer",
    "React developer",
    "Node.js",
    "MongoDB",
    "Express.js",
    "JavaScript",
    "TypeScript",
    "Frontend developer",
    "Backend developer",
    "Full-stack portfolio",
    "MERN stack", 
  ],
  metadataBase: new URL("https://surafels-portfolio.vercel.app"), 
  openGraph: {
    title: "surafel – Full-Stack Developer Portfolio",
    description:
      "Discover Surafel's full-stack developer portfolio featuring advanced web applications, seamless UX/UI, and scalable backend solutions.",
    url: "https://surafels-portfolio.vercel.app",
    siteName: "suras-portfolio.vercel.app",
    images: [
      {
        url: "https://surafels-portfolio.vercel.app/og-image.png", 
        width: 1200,
        height: 630,
        alt: "surafel Full-Stack Web Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sura Man – Full-Stack Developer",
    description:
      "Check out the portfolio of surafel admas, a full-stack web developer creating high-performance, scalable apps.",
    images: ["https://surafels-portfolio.vercel.app/og-image.png"], 
  },
  alternates: {
    canonical: "https://surafels-portfolio.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'