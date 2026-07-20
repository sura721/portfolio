"use client"

import useSWR from "swr"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, Sparkles } from "lucide-react"

type EducationItem = {
  _id: string
  degree: string
  institution: string
  description: string
  status: string
}

type CertificationItem = {
  _id: string
  name: string
  issuer: string
  verificationUrl?: string
}

type TestimonialItem = {
  _id: string
  name: string
  role: string
  company: string
  quote: string
  initials: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function EducationAndCertificationsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { data: education = [], error: educationError } = useSWR<EducationItem[]>('/api/education', fetcher)
  const { data: certifications = [], error: certificationsError } = useSWR<CertificationItem[]>('/api/certifications', fetcher)

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
                {educationError ? (
                  <p className="text-sm text-muted-foreground">Education data is temporarily unavailable.</p>
                ) : education.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No education entries yet.</p>
                ) : (
                  education.map((item) => (
                    <div key={item._id} className="rounded-lg border border-border/60 bg-muted/20 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-semibold text-foreground">{item.degree}</h3>
                        <Badge variant="secondary">{item.status}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{item.institution}</p>
                      {item.description ? <p className="mt-2 text-sm text-muted-foreground">{item.description}</p> : null}
                    </div>
                  ))
                )}
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
                {certificationsError ? (
                  <p className="text-sm text-muted-foreground">Certification data is temporarily unavailable.</p>
                ) : certifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No certifications yet.</p>
                ) : (
                  certifications.map((item) => {
                    const content = (
                      <div className="rounded-lg border border-border/60 bg-muted/20 px-4 py-3 transition-colors hover:border-primary/50 hover:bg-primary/5">
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.issuer}</p>
                        </div>
                      </div>
                    )

                    return item.verificationUrl ? (
                      <a key={item._id} href={item.verificationUrl} target="_blank" rel="noreferrer" className="block">
                        {content}
                      </a>
                    ) : (
                      <div key={item._id}>{content}</div>
                    )
                  })
                )}
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
  const { data: testimonials = [], error: testimonialsError } = useSWR<TestimonialItem[]>('/api/testimonials', fetcher)

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

        <div ref={ref} className={`grid gap-6 ${testimonials.length <= 2 ? "md:grid-cols-2 justify-center" : "md:grid-cols-2 xl:grid-cols-3"}`}>
          {testimonialsError ? (
            <div className="md:col-span-2 xl:col-span-3 text-center text-sm text-muted-foreground">
              Testimonials are temporarily unavailable.
            </div>
          ) : testimonials.length === 0 ? (
            <div className="md:col-span-2 xl:col-span-3 text-center text-sm text-muted-foreground">
              No testimonials yet.
            </div>
          ) : (
            testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full border-border/60">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-12 w-12 border border-border/60">
                        <AvatarFallback>{testimonial.initials}</AvatarFallback>
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
            ))
          )}
        </div>
      </div>
    </section>
  )
}
