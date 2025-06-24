"use client"
import useSWR from "swr"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Server, Code, Globe, MessageSquare } from "lucide-react"
const experiences = [
{
title: "Full-Stack Project Development",
company: "Personal Projects",
period: "2024 - Present",
description:
"Developed and deployed multiple full-stack web applications using Next.js, TypeScript, Tailwind CSS, Prisma, and MongoDB. Hosted on Vercel, focusing on clean, scalable, and responsive designs.",
icon: <Code className="h-8 w-8" />,
},
{
title: "Real-Time Chat Application",
company: "Personal Project",
period: "2023",
description:
"Built a real-time chat app leveraging WebSocket technology with Socket.IO, integrated within a Next.js and Node.js backend. Implemented features including message persistence, user presence, and chat rooms.",
icon: <MessageSquare className="h-8 w-8" />,
},
{
title: "Frontend Focused Projects",
company: "Personal Projects",
period: "2023 - Present",
description:
"Created various interactive and responsive user interfaces using React, Next.js, and Tailwind CSS. Projects include dashboards, reusable components, and SPA features.",
icon: <Globe className="h-8 w-8" />,
},
{
title: "Backend & API Development",
company: "Personal Projects",
period: "2024 - Present",
description:
"Designed and implemented RESTful APIs and server-side logic using Next.js API routes, Prisma ORM, and MongoDB. Integrated authentication with Clerk and optimized data workflows.",
icon: <Server className="h-8 w-8" />,
},
{
title: "Portfolio Website Creation",
company: "Personal Project",
period: "2024 - Present",
description:
"Built and continuously maintain this portfolio using Next.js, TypeScript, Tailwind CSS, and UploadThing for image storage. Showcases projects, skills, and development journey.",
icon: <Database className="h-8 w-8" />,
},
];
type Skill = {
name: string;
};
const fetcher = (url: string) => fetch(url).then(res => res.json())
export function AboutSection() {
const { data: skills = [], isLoading } = useSWR<Skill[]>('/api/skills', fetcher)
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
      <motion.div
        ref={bioRef}
        initial={{ opacity: 0, x: -50 }}
        animate={bioInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center"
      >
      <section className="space-y-5 text-gray-300">
  <h2 className="text-xl font-extrabold">
    <span className="text-indigo-500">Wh</span><span className="text-white">o I Am</span>
  </h2>
  <p>I’m Sura Man, a <span className="font-semibold">Full-Stack Developer</span> who builds modern, fast, and scalable web apps using Next.js, TypeScript, Tailwind CSS, MongoDB,  PostgreSQL and prisma.</p>

  <h2 className="text-xl font-extrabold">
    <span className="text-pink-500">Wh</span><span className="text-white">at I Do</span>
  </h2>
  <p>I focus on writing clean, maintainable code and creating smooth, responsive UI/UX backed by strong backend logic.</p>

  <h2 className="text-xl font-extrabold">
    <span className="text-teal-400">Le</span><span className="text-white">t’s Collaborate</span>
  </h2>
  <p>Always open to real-world projects. If you value speed, quality, and modern tech — let’s work together.</p>
</section>

</motion.div>
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