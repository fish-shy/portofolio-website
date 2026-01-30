export default function Experience() {
  const experiences = [
    {
      title: "Full-stack Developer",
      company: "RuangAlgo.com - IT Solutions",
      period: "12/2024 - Present",
      description: "Developing and maintaining client/corporate websites and mobile applications.",
      achievements: [
        "Develop and maintain client and corporate websites using Nuxt.js and WordPress",
        "Develop and maintain corporate mobile applications",
        "Collaborate with UI/UX teams to translate designs into interactive and responsive interfaces",
        "Perform QA testing, debugging, and performance optimization",
      ],
    },
    {
      title: "Freelance Mobile Developer",
      company: "Freelance",
      period: "09/2025 - Present",
      description: "Developing mobile applications according to client requirements using Flutter.",
      achievements: [
        "Develop mobile applications according to client requirements using Flutter",
        "Design UI/UX, database structures, and application workflows",
        "Conduct testing and application refinement based on user evaluation results",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-wider">Career Path</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            My professional journey and the impact I have made
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 pb-8 border-l-2 border-green-600 dark:border-green-400 last:pb-0">
              {/* Timeline dot */}
              <div className="absolute -left-4 top-0 w-6 h-6 bg-green-600 dark:bg-green-400 rounded-full border-4 border-white dark:border-gray-900"></div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                    <p className="text-lg text-green-600 dark:text-green-400 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium mt-2 md:mt-0">{exp.period}</span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                        <span className="text-green-600 dark:text-green-400 font-bold mr-3 mt-1">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-8 text-center">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">5+</div>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">Years of Experience</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-8 text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">20+</div>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">Projects Completed</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-8 text-center">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">15+</div>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">Happy Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
}
