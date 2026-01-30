export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-wider">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Who I Am
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              I am a Computer Science student at Universitas Lambung Mangkurat, focused on software development and user interface design. I have professional experience in developing Nuxt.js and WordPress-based websites, as well as mobile applications using Flutter.
            </p>

            <p>
              I am accustomed to working in cross-functional teams, result-oriented, and committed to delivering efficient and user-friendly digital solutions. My background covers full-stack web development, mobile app development, and QA testing.
            </p>

            <div className="pt-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Highlights:</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 font-bold mr-3">•</span>
                  <span>Mobile Application Development with Flutter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 font-bold mr-3">•</span>
                  <span>Web Development using Nuxt.js and WordPress</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 font-bold mr-3">•</span>
                  <span>UI/UX Design and Implementation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 font-bold mr-3">•</span>
                  <span>Quality Assurance (Manual Testing)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 font-bold mr-3">•</span>
                  <span>Backend Development with NodeJS and Next.js</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-32 h-32 mx-auto text-green-600 dark:text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">Crafting digital experiences with passion and precision</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
