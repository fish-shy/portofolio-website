"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import SharedTiltCard from "./TiltCard";

// Project cards use the site-wide 3D tilt with a stronger angle + cursor glare.
function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <SharedTiltCard glare shadow intensity={14} lift={12} perspective={1000} className={className}>
      {children}
    </SharedTiltCard>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Village Budget Monitoring System",
      description:
        "AI-Powered system for Permikomnas Hackathon 2025. Utilizes OpenRouter for AI integration and PrismaDB for robust data management. Secured 2nd Place.",
      image: "/assets/images/sipandai.png",
      technologies: ["Next.js", "PrismaDB", "OpenRouter AI", "Tailwind CSS"],
      category: "web",
      link: "#",
      isPrivate: true,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 2,
      title: "CLINICALgo",
      description:
        "Comprehensive web-based Clinic Management System (CMS) for patient administration, EMR, pharmacy inventory, and billing.",
      image: "/assets/images/clinicalgo.png",
      technologies: ["Web Application", "QA Testing", "Clinic Management"],
      category: "enterprise",
      link: "#",
      isPrivate: true,
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: 3,
      title: "E-Learning Mobile App",
      description:
        "Cross-platform mobile app for digital education. Connecting Students, Teachers, and Admins. Built with Flutter and ExpressJS.",
      image: "/assets/images/learnfy.png",
      technologies: ["Flutter", "GetX", "ExpressJS", "Google Cloud", "Supabase"],
      category: "mobile",
      link: "#",
      isPrivate: false,
      color: "from-green-600 to-emerald-600",
    },
    {
      id: 4,
      title: "Ankrah Studios Website V3.0",
      description:
        "End-to-end development of Ankrah Studios website. Designed interfaces in Figma and implemented using WordPress.",
      image: "/assets/images/ankrah.png",
      technologies: ["WordPress", "Figma", "UI/UX", "CSS"],
      category: "web",
      link: "#",
      isPrivate: false,
      color: "from-orange-500 to-amber-600",
    },
    {
      id: 5,
      title: "DEW Company Profile",
      description:
        "Company profile website for PT Daya Energi Warukin (coal exporter). Designed high-fidelity UI and implemented on WordPress.",
      image: "/assets/images/dew.png",
      technologies: ["WordPress", "Figma", "UI/UX"],
      category: "web",
      link: "#",
      isPrivate: false,
      color: "from-emerald-500 to-teal-400",
    },
    {
      id: 6,
      title: "SmartCal",
      description:
        "Capstone project (Coding Camp 2026 by DBS Foundation). Web app that scans food images with deep learning & computer vision to recognize dishes, estimate calories, and track daily intake. My role: Data Scientist (data wrangling, EDA, Streamlit dashboard).",
      image: "/assets/images/smartcal.png",
      technologies: ["TensorFlow", "Computer Vision", "Express", "Tailwind CSS", "Streamlit", "React"],
      category: "web",
      link: "https://fe-smartcal-656502826232.asia-southeast2.run.app/",
      isPrivate: false,
      color: "from-emerald-500 to-green-600",
    },
  ];

  const categories = [
    { id: "all", label: "All Projects",  },
    { id: "web", label: "Web Dev",  },
    { id: "mobile", label: "Mobile Apps",  },
    { id: "enterprise", label: "Enterprise",  },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative px-6">
      <div className="max-w-6xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <span className="inline-flex items-center gap-4 font-mono text-xs md:text-sm tracking-[0.35em] uppercase text-green-600 dark:text-green-400 mb-5">
            <span className="h-px w-10 bg-green-500/50" />
            04 &middot; work
            <span className="h-px w-10 bg-green-500/50" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of projects showcasing my skills across different
            technologies and industries
          </p>
        </MotionWrapper>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 overflow-hidden ${
                selectedCategory === cat.id
                  ? "text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedCategory === cat.id && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600"
                  layoutId="activeCategory"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {cat.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, rotateX: -18, y: 40, transformPerspective: 900 }}
                animate={{ opacity: 1, rotateX: 0, y: 0, transformPerspective: 900 }}
                exit={{ opacity: 0, rotateX: 12, y: -20, transformPerspective: 900 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative"
                style={{ perspective: 1200 }}
              >
                <TiltCard className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 h-full">
                  {/* Image container */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      src={project.image || "/placeholder.png"}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Overlay gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    {/* Private badge */}
                    {project.isPrivate && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-gray-900/70 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          Private
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <motion.span
                            key={idx}
                            className="text-xs px-3 py-1 rounded-full font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200/70 dark:border-green-800/40"
                            whileHover={{ scale: 1.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs px-3 py-1 rounded-full font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* View link */}
                    {project.link && project.link !== "#" ? (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-semibold text-green-600 dark:text-green-400"
                        whileHover={{ x: 5 }}
                      >
                        View Project
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ x: hoveredId === project.id ? 5 : 0 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                      </motion.a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 dark:text-gray-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        {project.isPrivate ? "Private project" : "Client project"}
                      </span>
                    )}
                  </div>

                  {/* Bottom gradient line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects in this category yet.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
