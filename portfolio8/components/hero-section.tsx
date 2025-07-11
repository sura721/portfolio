"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import dynamic from "next/dynamic"

const Scene3D = dynamic(() => import("@/components/scene-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-primary animate-pulse">Loading  ...</div>
    </div>
  ),
})

export function HeroSection() {
  const handleScroll = () => {
    const aboutSection = document.getElementById("about")
    aboutSection?.scrollIntoView({ behavior: "smooth" })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground drop-shadow-lg"
          >
          FullStack Developer
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 text-foreground/90 max-w-2xl mx-auto drop-shadow-md"
          >
          Building fast, scalable web apps with MongoDB, Prisma, Next.js 15, Express, React, and Node.js — from backend logic to beautiful UIs.
          </motion.p>
      <motion.div
  variants={itemVariants}
  className="flex flex-wrap justify-center gap-4"
>
  <div className="flex gap-4">
    <Button
      size="lg"
      onClick={handleScroll}
      className="bg-primary hover:bg-primary/90 text-primary-foreground"
    >
      View Projects
    </Button>

    <Button
      size="lg"
      variant="outline"
      onClick={() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
      }}
      className="border-primary text-primary hover:bg-primary/10"
    >
      Contact Me
    </Button>
  </div>

  <div className="w-full sm:w-auto flex justify-center">
    {/* <Button
      size="lg"
      variant="outline"
      onClick={() => {
        window.open("/resume.pdf", "_blank")
      }}
      className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white border-0 hover:opacity-90 transition-all shadow-md"
    >
      Download Resume
    </Button> */}
  </div>
</motion.div>

        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <Button variant="ghost" size="icon" onClick={handleScroll} className="text-primary hover:bg-primary/10">
          <ArrowDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  )
}

