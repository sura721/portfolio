"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, Sparkles, BriefcaseBusiness } from "lucide-react"

type EducationItem = {
  degree: string
  institution: string
  expectedGraduation: string
  note?: string
}

type CertificationItem = {
  title: string
  issuer: string
  date: string
}

type TestimonialItem = {
  name: string
  role: string
  company: string
  quote: string
  image?: string
}

const educationItems: EducationItem[] = [
  {
    degree: "B.Sc. in Computer Science",
    institution: "Addis Ababa University",
    expectedGraduation: "Expected 2026",
    note: "Focused on software engineering, systems design, and product development.",
  },
]

const certifications: CertificationItem[] = [
  { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2025" },
  { title: "Google UX Design Foundations", issuer: "Google", date: "2024" },
]

const testimonials: TestimonialItem[] = [
  {
    name: "Martha Bekele",
    role: "Product Lead",
    company: "Northstar Labs",
    quote: "Surafel combines deep technical skill with a calm, thoughtful product mindset. He made the rollout feel effortless.",
  },
  {
    name: "Daniel Tadesse",
    role: "Founder",
    company: "Aster AI",
    quote: "The build quality was excellent and the experience felt polished from day one. He quickly understood the product vision.",
  },
  {
    name: "Selamawit Hailu",
    role: "Operations Manager",
    company: "Greenloop",
    quote: "He was proactive, reliable, and brought strong execution to a fast-moving project. I would work with him again.",
  },
]

export function EducationAndCertificationsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="credentials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Credentials</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A short snapshot of my academic background and professional validation points.
          </p>
        </motion.div>

        <div ref={ref} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border-border/60">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <GraduationCap className="h-5 w-5" />
                  <CardTitle>Education</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {educationItems.map((item) => (
                  <div key={item.degree} className="rounded-lg border border-border/60 bg-muted/20 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold text-foreground">{item.degree}</h3>
                      <Badge variant="secondary">{item.expectedGraduation}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.institution}</p>
                    {item.note ? <p className="mt-2 text-sm text-muted-foreground">{item.note}</p> : null}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full border-border/60">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5" />
                  <CardTitle>Certifications</CardTitle>
                </div>
                <CardDescription>Short, relevant proof points for the work I do.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {certifications.map((item) => (
                  <div key={item.title} className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 px-4 py-3">
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.issuer}</p>
                    </div>
                    <Badge variant="outline">{item.date}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="testimonials" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimonials</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A few early words from collaborators and clients that I&apos;ll swap for live feedback later.
          </p>
        </motion.div>

        <div ref={ref} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Card className="h-full border-border/60">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12 border border-border/60">
                      {testimonial.image ? <AvatarImage src={testimonial.image} alt={testimonial.name} /> : null}
                      <AvatarFallback>{testimonial.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role} • {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">“{testimonial.quote}”</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
