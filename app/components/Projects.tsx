"use client";

import { useState } from "react";
import Image from "next/image";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Village Budget Monitoring System",
      description: "AI-Powered system for Permikomnas Hackathon 2025. Utilizes OpenRouter for AI integration and PrismaDB for robust data management. Secured 2nd Place.",
      image: "/assets/images/sipandai.png",
      technologies: ["Next.js", "PrismaDB", "OpenRouter AI", "Tailwind CSS"],
      category: "web",
      link: "#",
      isPrivate: false,
    },
    {
      id: 2,
      title: "CLINICALgo",
      description: "Comprehensive web-based Clinic Management System (CMS) for patient administration, EMR, pharmacy inventory, and billing.",
      image: "/assets/images/clinicalgo.png",
      technologies: ["Web Application", "QA Testing", "Clinic Management"],
      category: "enterprise",
      link: "#",
      isPrivate: true,
    },
    {
      id: 3,
      title: "E-Learning Mobile App",
      description: "Cross-platform mobile app for digital education. Connecting Students, Teachers, and Admins. Built with Flutter and ExpressJS.",
      image: "/assets/images/learnfy.png",
      technologies: ["Flutter", "GetX", "ExpressJS", "Google Cloud", "Supabase"],
      category: "mobile",
      link: "#",
      isPrivate: false,
    },
    {
      id: 4,
      title: "Ankrah Studios Website V3.0",
      description: "End-to-end development of Ankrah Studios website. Designed interfaces in Figma and implemented using WordPress.",
      image: "/assets/images/ankrah.png",
      technologies: ["WordPress", "Figma", "UI/UX", "CSS"],
      category: "web",
      link: "#",
      isPrivate: false,
    },
    {
      id: 5,
      title: "DEW Company Profile",
      description: "Company profile website for PT Daya Energi Warukin (coal exporter). Designed high-fidelity UI and implemented on WordPress.",
      image: "/assets/images/dew.png",
      technologies: ["WordPress", "Figma", "UI/UX"],
      category: "web",
      link: "#",
      isPrivate: false,
    },
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Dev" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "enterprise", label: "Enterprise" },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-wider">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            A selection of projects showcasing my skills across different technologies and industries
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-green-600 dark:bg-green-500 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-900/50 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 transform hover:scale-105"
            >
              <Image className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 h-48 flex items-center justify-center text-6xl" src={project.image != "" ? project.image : "📁"} alt={project.title} width={384} height={192} />              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex-1">{project.title}</h3>
                  {project.isPrivate && (
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full ml-2">
                      Private
                    </span>
                  )}
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="mb-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-3 py-1 rounded-full font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors"
                >
                  View Project
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
