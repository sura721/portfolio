"use client"
import useSWR from 'swr'
import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
interface Project {
_id?: string;
title: string;
description: string;
image?: string;
technologies: string[];
liveUrl: string;
githubUrl: string;
}
const defaultProject: Project = {
_id: 'default-ping-shop-project',
title: "PingShop – AI-Powered E-Commerce Platform",
description: "PingShop is a clean, modern e-commerce platform built with Next.js and TypeScript, featuring powerful AI-driven product recommendations, secure authentication, cart management, and a fully responsive design for seamless shopping across devices.",
image: "/project.png",
technologies: [
"Next.js",
"TypeScript",
"TailwindCSS",
"Prisma",
"Clerk",
"MongoDB+Prisma+ORM",
"Shadcn/UI",
"inngest",
],
liveUrl: "https://ping-shop.vercel.app",
githubUrl: "https://github.com/sura721/codeAlpha_nextShop/",
};
function ProjectCard({ project, onSelectProject, inView }: { project: Project; onSelectProject: (project: Project) => void, inView: boolean }) {
const imageUrl = project.image || "/placeholder.svg";
return (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
    >
        <Card className="h-full overflow-hidden group">
            <div className="relative overflow-hidden aspect-video bg-muted">
                <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                        e.currentTarget.srcset = "";
                    }}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                        variant="outline"
                        className="text-white border-white hover:bg-white/20"
                        onClick={() => onSelectProject(project)}
                    >
                        View Details
                    </Button>
                </div>
            </div>
            <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                        </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3} more
                        </Badge>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild disabled={!project.githubUrl || project.githubUrl === '#'}>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-disabled={!project.githubUrl || project.githubUrl === '#'}>
                            <Github className="h-4 w-4 mr-1" /> Code
                        </a>
                    </Button>
                    <Button size="sm" asChild disabled={!project.liveUrl || project.liveUrl === '#'}>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-disabled={!project.liveUrl || project.liveUrl === '#'}>
                            <ExternalLink className="h-4 w-4 mr-1" /> Demo
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);
}

const fetcher = (url: string) => fetch(url).then(res => res.json())
export function ProjectsSection() {
const { data: projects = [], isLoading } = useSWR('/api/projects', fetcher)
const displayProjects = projects.length > 0 ? projects : [defaultProject]
const [selectedProject, setSelectedProject] = useState<Project | null>(null);
const [emblaRef, emblaApi] = useEmblaCarousel({
loop: displayProjects.length > 1,
align: "start",
});
const [ref, inView] = useInView({
triggerOnce: true,
threshold: 0.1,
})
const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
}, [emblaApi]);

const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
}, [emblaApi]);

const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
}, []);

const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
}, []);

return (
    <section id="projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
                <div className="h-1 w-20 bg-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Here are some of my recent projects showcasing my skills and experience.
                </p>
            </motion.div>


                            <div ref={ref}>
                {displayProjects.length === 1 ? (
                    <div className="max-w-3xl mx-auto">
                        <ProjectCard
                            project={displayProjects[0]}
                            onSelectProject={handleSelectProject}
                            inView={inView}
                        />
                    </div>
                ) : (
                    <div className="relative">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex -ml-4">
                                {displayProjects.map((project:Project) => (
                                    <div
                                        key={project._id || project.title}
                                        className="pl-4 flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                                    >
                                        <ProjectCard
                                            project={project}
                                            onSelectProject={handleSelectProject}
                                            inView={inView}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {emblaApi && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-[-10px] md:left-[-15px] top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/90 rounded-full shadow-md"
                                    onClick={scrollPrev}
                                    aria-label="Previous project"

                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-[-10px] md:right-[-15px] top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/90 rounded-full shadow-md"
                                    onClick={scrollNext}
                                    aria-label="Next project"

                                >
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
                            onClick={(e:any) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-background z-10">
                                <h3 className="text-xl font-bold">{selectedProject.title}</h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground rounded-full"
                                    onClick={handleCloseModal}
                                    aria-label="Close project details"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="p-6 flex-grow">
                                <div className="relative aspect-video max-h-[50vh] w-full mb-6 bg-muted rounded overflow-hidden">
                                    <Image
                                        src={selectedProject.image || "/placeholder.svg"}
                                        alt={selectedProject.title}
                                        fill
                                        sizes="(max-width: 1024px) 90vw, 800px"
                                        className="object-contain"
                                         onError={(e) => { e.currentTarget.src = "/placeholder.svg"; e.currentTarget.srcset = ""; }}
                                    />
                                </div>
                                <p className="text-muted-foreground mb-6">{selectedProject.description}</p>
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-2 text-lg">Technologies Used:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.technologies.map((tech) => (
                                            <Badge key={tech} variant="secondary" className="px-3 py-1">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                     <Button asChild size="lg" disabled={!selectedProject.liveUrl || selectedProject.liveUrl === '#'}>
                                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" aria-disabled={!selectedProject.liveUrl || selectedProject.liveUrl === '#'}>
                                            <ExternalLink className="h-4 w-4 mr-2" /> View Live Demo
                                        </a>
                                    </Button>
                                    <Button variant="outline" asChild size="lg" disabled={!selectedProject.githubUrl || selectedProject.githubUrl === '#'}>
                                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" aria-disabled={!selectedProject.githubUrl || selectedProject.githubUrl === '#'}>
                                            <Github className="h-4 w-4 mr-2" /> View Source Code
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </section>
);
}