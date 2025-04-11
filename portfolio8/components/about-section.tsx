"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Server, Code, Globe } from "lucide-react"
import {useDataStore} from '../store/dataStores'

const experiences = [
  {
    title: "Full Stack Developer (Freelance)",
    company: "Self-Employed",
    period: "2022 - Present",
    description:
      "Worked on various freelance web development projects, including building full-stack applications using the MERN stack (MongoDB, Express.js, React, Node.js) and deploying them on platforms like Vercel and Render.",
    icon: <Code className="h-8 w-8" />,
  },
  {
    title: "Frontend Developer (Personal Projects)",
    company: "Self-Employed",
    period: "2021 - Present",
    description:
      "Built multiple personal projects to showcase frontend development skills, primarily using React and Tailwind CSS. Projects included task managers, portfolio websites, and other web apps.",
    icon: <Globe className="h-8 w-8" />,
  },
  {
    title: "Backend Developer (Freelance)",
    company: "Self-Employed",
    period: "2021 - Present",
    description:
      "Focused on backend development, including creating APIs and databases using Node.js and MongoDB for various personal and client projects. Specialized in authentication, data management, and server-side logic.",
    icon: <Server className="h-8 w-8" />,
  },
  {
    title: "Portfolio Developer",
    company: "Self-Employed",
    period: "2023 - Present",
    description:
      "Built and maintained my own portfolio website using the MERN stack and Tailwind CSS. Included features like project management, skill categorization, and social media integration.",
    icon: <Database className="h-8 w-8" />,
  },
]


export function AboutSection() {
  const  {skills,fetchSkills} = useDataStore()
  useEffect(()=>{
fetchSkills()
  },[])
  
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const [bioRef, bioInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [expRef, expInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bio */}
          <motion.div
            ref={bioRef}
            initial={{ opacity: 0, x: -50 }}
            animate={bioInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
           
            <p className="text-muted-foreground mb-4">
            Hi, I’m Sura — a MERN stack developer passionate about turning ideas into web apps. I’m currently building real-world projects to grow my skills and become a pro full-stack developer.


            </p>
            <p className="text-muted-foreground">
            I'm a full-stack developer focused on the MERN stack — MongoDB, Express.js, React, and Node.js. I love building clean, functional, and user-friendly web apps. Every day is a chance to learn, code, and grow.

Right now, I’m sharpening my skills by building full-stack projects, exploring UI design, and diving deeper into backend systems.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            ref={skillsRef}
            initial={{ opacity: 0, x: 50 }}
            animate={skillsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Badge variant="outline" className="px-3 py-1 text-sm">
                    {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          ref={expRef}
          initial={{ opacity: 0, y: 50 }}
          animate={expInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={expInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">{exp.icon}</div>
                    <div>
                      <CardTitle>{exp.title}</CardTitle>
                      <CardDescription>
                        {exp.company} • {exp.period}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

