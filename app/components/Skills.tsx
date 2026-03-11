"use client";

import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";

const row1 = [
  "React/Next.js", "TypeScript", "Node.js", "Express.js", 
  "PostgreSQL", "Prisma", "MongoDB", "REST API", "Tailwind CSS",
  "HTML5/CSS3", "JavaScript", "Redux"
];

const row2 = [
  "Flutter", "Dart", "GetX", "Figma", "UI/UX Design", 
  "Mobile Development", "Nuxt.js", "Vue.js", "WordPress",
  "Responsive Design", "State Management"
];

const row3 = [
  "Git/GitHub", "Manual Testing", "Agile Methodology", "Scrum",
  "GCP", "AWS", "Python", "Java", "Firebase", "Postman", "CI/CD"
];

const MarqueeRow = ({ items, reverse = false, duration = 40 }: { items: string[], reverse?: boolean, duration?: number }) => {
  // Double the items for seamless infinite scroll
  const content = [...items, ...items];
  
  return (
    <div className="flex w-full overflow-hidden" 
         style={{ 
           maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", 
           WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" 
         }}>
      <motion.div
        className="flex gap-4 md:gap-6 w-max py-2"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      >
        {content.map((item, idx) => (
          <div
            key={idx}
            className="px-6 md:px-8 py-3 rounded-full border border-gray-200 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/40 backdrop-blur-md text-sm md:text-base font-medium whitespace-nowrap hover:border-green-500/50 dark:hover:border-green-400/50 dark:hover:bg-gray-800/80 hover:-translate-y-1 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 cursor-default shadow-sm"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden px-6">
      {/* Background ambient effect */}
      <div className="absolute inset-0 bg-gray-50/50 dark:bg-transparent -z-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-green-500/10 dark:bg-green-500/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Technologies & Tools
          </h2>
        </MotionWrapper>

        {/* Marquee Container */}
        <div className="relative flex flex-col gap-4 md:gap-6 w-full overflow-hidden mt-10">
             <MarqueeRow items={row1} duration={40} />
             <MarqueeRow items={row2} reverse duration={45} />
             <MarqueeRow items={row3} duration={50} />
        </div>
      </div>
    </section>
  );
}