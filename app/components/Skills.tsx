export default function Skills() {
  const skillCategories = [
    {
      title: "Mobile Development",
      skills: ["Flutter", "Dart", "GetX", "Mobile UI/UX"],
    },
    {
      title: "Web Development",
      skills: ["Nuxt.js", "React", "Next.js", "WordPress", "HTML/CSS/JS", "TypeScript"],
    },
    {
      title: "Backend & Database",
      skills: ["Node.js", "Express", "Prisma", "PostgreSQL", "Supabase", "MySQL"],
    },
    {
      title: "QA & Tools",
      skills: ["Manual Testing", "Automation Testing", "Debugging", "Git/GitHub", "Figma", "Google Cloud Platform"],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-wider">My Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Technical Skills
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of technologies and tools I've worked with
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-900/50 p-8 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-1 h-8 bg-green-600 dark:bg-green-400 rounded mr-3"></span>
                {category.title}
              </h3>

              <div className="space-y-3">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mr-3"></span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{skill}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Proficiency</span>
                  <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 dark:bg-green-400 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency Levels */}
        <div className="mt-16 bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-gray-900/50 p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Core Competencies</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 dark:bg-green-500 text-white rounded-full font-bold text-2xl mb-4">
                Dev
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Development</h4>
              <p className="text-gray-600 dark:text-gray-400">Flutter, Nuxt.js, React, Node.js</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 dark:bg-blue-500 text-white rounded-full font-bold text-2xl mb-4">
                QA
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quality Assurance</h4>
              <p className="text-gray-600 dark:text-gray-400">Manual & Automation Testing, Debugging</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 dark:bg-purple-500 text-white rounded-full font-bold text-2xl mb-4">
                UI/UX
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Design</h4>
              <p className="text-gray-600 dark:text-gray-400">Figma, Responsive Design</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
