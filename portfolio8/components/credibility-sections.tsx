"use client"

import { useState } from "react"
import useSWR, { useSWRConfig } from "swr"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { toast, Toaster } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  status?: string
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
  const { mutate } = useSWRConfig()
  const { data: testimonials = [], error: testimonialsError } = useSWR<TestimonialItem[]>('/api/testimonials', fetcher)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    quote: '',
    initials: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!formData.name.trim() || !formData.role.trim() || !formData.company.trim() || !formData.quote.trim() || !formData.initials.trim()) {
      toast.error('Please fill in every testimonial field before submitting.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, status: 'pending' }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || 'Unable to submit testimonial right now.')
      }

      toast.success('Thanks! Your testimonial is now pending review.')
      setFormData({ name: '', role: '', company: '', quote: '', initials: '' })
      setIsDialogOpen(false)
      mutate('/api/testimonials')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to submit testimonial right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="testimonials" className="py-20 bg-muted/20">
      <Toaster position="top-center" richColors />
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
            A few early words from collaborators and clients, shared in a simple way that stays subtle on the page.
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

        <div className="mt-8 flex justify-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-sm">
                Leave a testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Share your experience with developer</DialogTitle>
                <DialogDescription>
                  Add a short note about working together. Your submission will be reviewed before it appears publicly.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="testimonial-name">Name</label>
                    <Input id="testimonial-name" value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} placeholder="Your full name" />
                    <p className="text-xs text-muted-foreground">This is the name shown publicly on the quote card.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="testimonial-role">Role</label>
                    <Input id="testimonial-role" value={formData.role} onChange={(event) => setFormData((current) => ({ ...current, role: event.target.value }))} placeholder="e.g. Client, collaborator, or manager" />
                    <p className="text-xs text-muted-foreground">Use your job title or how you worked with me.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="testimonial-company">Company or project</label>
                    <Input id="testimonial-company" value={formData.company} onChange={(event) => setFormData((current) => ({ ...current, company: event.target.value }))} placeholder="Company, team, or project name" />
                    <p className="text-xs text-muted-foreground">This helps give the quote a little context.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="testimonial-initials">Initials</label>
                    <Input id="testimonial-initials" value={formData.initials} onChange={(event) => setFormData((current) => ({ ...current, initials: event.target.value }))} placeholder="e.g. JS" />
                    <p className="text-xs text-muted-foreground">These appear in the small avatar circle. No profile photo is required.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="testimonial-quote">Your quote</label>
                  <Textarea id="testimonial-quote" value={formData.quote} onChange={(event) => setFormData((current) => ({ ...current, quote: event.target.value }))} placeholder="Share a short note about the experience." rows={4} />
                  <p className="text-xs text-muted-foreground">Keep it short and specific so it feels natural on the site.</p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="outline" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit testimonial'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}
