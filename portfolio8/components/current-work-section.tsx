"use client"

import useSWR from "swr"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type FeatureItem = {
  _id: string
  title: string
  description: string
  status: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function CurrentWorkSection() {
  const { data: features = [], error } = useSWR<FeatureItem[]>('/api/features', fetcher)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const hasFeatures = !error && features.length > 0

  return (
    <section id="current-work" className="py-20 bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Work</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            What I’m building now: modern AI tooling, real-world impact, and smarter web systems.
          </p>
        </motion.div>

        <div ref={ref} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {error ? (
            <div className="md:col-span-2 xl:col-span-3 text-center text-sm text-muted-foreground">
              Current work is temporarily unavailable.
            </div>
          ) : hasFeatures ? (
            features.map((feature, index) => (
              <motion.div
                key={feature._id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full border-border/60">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle>{feature.title}</CardTitle>
                      <Badge variant="secondary">{feature.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="md:col-span-2 xl:col-span-3"
            >
              <Card className="border-border/60">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle>AI grant research for Ethiopian NGOs</CardTitle>
                    <Badge variant="secondary">Researching</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Building an AI-supported system to help Ethiopian NGOs discover grant opportunities, analyze application history, and improve funding success.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
