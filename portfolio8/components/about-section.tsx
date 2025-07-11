"use client"
import useSWR from "swr"
import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Server, Code, Globe, MessageSquare } from "lucide-react"

 type Skill = {
  _id: string;
  name: string;
};

type Experience = {
  _id: string;
  title: string;
  description: string;
  dateRange: string;
  type: string;
  icon: string;
};

 const getIconComponent = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'code':
      return <Code className="h-8 w-8" />;
    case 'server':
      return <Server className="h-8 w-8" />;
    case 'database':
      return <Database className="h-8 w-8" />;
    case 'globe':
        return <Globe className="h-8 w-8" />;
    case 'chat':
        return <MessageSquare className="h-8 w-8" />;
    default:
      return <Code className="h-8 w-8" />;
  }
};

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function AboutSection() {
  const { data: skills = [] } = useSWR<Skill[]>('/api/skills', fetcher)
  const { data: experiences = [] } = useSWR<Experience[]>('/api/experience', fetcher)

  const [bioRef, bioInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [expRef, expInView] = useInView({ triggerOnce: true, threshold: 0.1 })
return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
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
             <section className="space-y-5">
              <h2 className="text-xl font-extrabold text-foreground">
                <span className="text-indigo-500">Wh</span>o I Am
              </h2>
              <p className="text-muted-foreground">
                I’m Surafel, a <span className="font-semibold text-foreground">Full-Stack Developer</span> who builds modern, fast, and scalable web apps using Next.js, TypeScript, Tailwind CSS, MongoDB,  PostgreSQL and prisma.
              </p>
              <h2 className="text-xl font-extrabold text-foreground">
                <span className="text-pink-500">Wh</span>at I Do
              </h2>
              <p className="text-muted-foreground">
                I focus on writing clean, maintainable code and creating smooth, responsive UI/UX backed by strong backend logic.
              </p>
              <h2 className="text-xl font-extrabold text-foreground">
                <span className="text-teal-400">Le</span>t’s Collaborate
              </h2>
              <p className="text-muted-foreground">
                Always open to real-world projects. If you value speed, quality, and modern tech — let’s work together.
              </p>
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
                  key={skill._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Badge variant="outline" className="px-3 py-1 text-sm">{skill.name}</Badge>
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
                key={exp._id}
                initial={{ opacity: 0, y: 30 }}
                animate={expInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">{getIconComponent(exp.icon)}</div>
                    <div>
                      <CardTitle>{exp.title}</CardTitle>
                      <CardDescription>{exp.type} • {exp.dateRange}</CardDescription>
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