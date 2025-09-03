import PortfolioCard from "./PortofolioCard";


function App() {
  const projects = [
    {
      id: 1,
      title: "SIPANDAI",
      description: "A smart village monitoring system that helps track village finances, resources, and development. Makes it easy for everyone to see how village funds are being used.",
      imageUrl: "/assets/images/project1.png",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
      link: "https://sipandai.example.com",
      isPrivate: true
    },
    {
      id: 2,  
      title: "E-Commerce Platform",
      description: "A complete online store solution with secure payments, inventory tracking, and a dashboard for store owners to manage products and view sales data.",
      imageUrl: "/assets/images/project2.png",
      technologies: ["React", "Node.js", "MongoDB", "Redux", "Stripe API"],
      link: "https://ecommerce.example.com",
      isPrivate: false
    },
    {
      id: 3,
      title: "Task Management App",
      description: "A team productivity tool that helps organize tasks, collaborate in real-time, and customize workflows to match how your team works.",
      imageUrl: "/assets/images/project3.png",
      technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL", "Docker"],
      link: "https://taskmanager.example.com",
      isPrivate: false
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "An easy-to-use weather app that shows forecasts based on your location, displays weather maps, and sends alerts for severe weather.",
      imageUrl: "/assets/images/project4.png",
      technologies: ["React", "TypeScript", "D3.js", "OpenWeather API", "Geolocation API"],
      link: "https://weatherapp.example.com",
      isPrivate: false
    },
    {
      id: 5,
      title: "Social Media Analytics",
      description: "A tool that helps businesses understand their social media performance with easy-to-read charts, regular reports, and trend analysis.",
      imageUrl: "/assets/images/project5.png",
      technologies: ["Python", "Django", "React", "Chart.js", "GraphQL", "Redis"],
      link: "https://socialanalytics.example.com",
      isPrivate: true
    },
    {
      id: 6,
      title: "Learning Management System",
      description: "An online education platform where instructors can create courses and students can learn at their own pace, with progress tracking and video lessons.",
      imageUrl: "/assets/images/project6.png",
      technologies: ["Next.js", "Prisma", "Tailwind CSS", "AWS S3", "WebRTC"],
      link: "https://lms.example.com",
      isPrivate: false
    }
  ];

  return (
    <>
      <div className='flex flex-col min-h-screen w-full'>
        {/* hero */}
        <div className='flex flex-col md:flex-row items-center justify-around pt-25 bp-5 px-12 bg-[#0A001B]'>
          <div className='md:w-1/2 text-center md:text-left'>
            <h1 className='text-green-400 text-7xl py-4'>Welcome .</h1>
            <p className='text-white text-10 py-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita accusantium voluptatibus, facere maxime fugit non iste saepe quod incidunt consectetur ex accusamus quos ipsum eum mollitia assumenda. Eius sit, illo enim est ipsum ex provident minima cupiditate vero odit nihil nam sunt tempore, veritatis excepturi voluptatibus deleniti nulla! Modi itaque aspernatur expedita consectetur ipsam. Rem repellendus nemo temporibus omnis quasi ratione cupiditate corrupti dolore rerum quo facilis assumenda optio eaque dolor architecto maxime, debitis inventore? In enim maxime recusandae dolor temporibus id doloribus nisi omnis? Fugit, recusandae amet neque ipsa quidem quia harum aliquid delectus saepe repudiandae. Aspernatur, ipsa soluta?</p>
          </div>
          <div>
            <img src="/assets/images/main.png" alt="phone" width={300} height={300} />
          </div>
        </div>

        {/* Wave Transition */}
        <div className="w-full bg-[#0A001B] p-0 -mb-1" style={{ lineHeight: 0 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full block">
            <path fill="#f8fafc" fillOpacity="1" d="M0,288L40,266.7C80,245,160,203,240,202.7C320,203,400,245,480,261.3C560,277,640,267,720,250.7C800,235,880,213,960,197.3C1040,181,1120,171,1200,186.7C1280,203,1360,245,1400,266.7L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
          </svg>
        </div>

        {/* Portfolio Section */}
        <div className='bg-gray-50 w-full flex-grow'>
          <div className='py-20 px-6 md:px-12 lg:px-16'>
            <div className='text-center mb-16'>
              <span className='text-green-500 text-sm font-medium uppercase tracking-wider'>Portfolio</span>
              <h2 className='text-gray-900 text-4xl lg:text-5xl font-bold mt-2 mb-4'>Featured Projects</h2>
              <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                Here's a selection of projects I've worked on, showcasing different technologies and problem-solving approaches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {projects.map((project) => (
                <PortfolioCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  technologies={project.technologies}
                  link={project.link}
                  isPrivate={project.isPrivate}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Wave Transition */}
        <div className="w-full p-0 -mb-1" style={{ lineHeight: 0 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full block bg-gray-50">
            <path fill="#0A001B" fillOpacity="1" d="M0,288L40,266.7C80,245,160,203,240,202.7C320,203,400,245,480,261.3C560,277,640,267,720,250.7C800,235,880,213,960,197.3C1040,181,1120,171,1200,186.7C1280,203,1360,245,1400,266.7L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
          </svg>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#0A001B] to-[#1a0a2e] text-white py-20 px-6 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Let's Build Something Amazing</h2>
            <p className="text-gray-300 text-lg lg:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind or looking for a dedicated developer to join your team?
              I'm currently available for freelance work and exciting opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="mailto:your.email@example.com" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 inline-block">
                Get In Touch
              </a>
              <a href="#portfolio" className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-4 px-8 rounded-full transition-all duration-300 inline-block">
                View All Projects
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#080015] text-white pt-16 pb-8 px-6 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-green-400">Your Name</h3>
                <p className="text-gray-400 leading-relaxed max-w-sm">
                  Creating innovative web solutions with a focus on performance, user experience, and cutting-edge technology.
                </p>
                <div className="flex space-x-4 mt-6">
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Home</a></li>
                  <li><a href="#about" className="text-gray-400 hover:text-green-400 transition-colors">About</a></li>
                  <li><a href="#portfolio" className="text-gray-400 hover:text-green-400 transition-colors">Portfolio</a></li>
                  <li><a href="#contact" className="text-gray-400 hover:text-green-400 transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-6 text-white">Get In Touch</h4>
                <ul className="space-y-4">
                  <li className="text-gray-400">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                      <a href="mailto:your.email@example.com" className="hover:text-green-400 transition-colors">your.email@example.com</a>
                    </div>
                  </li>
                  <li className="text-gray-400">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                      <a href="tel:+1234567890" className="hover:text-green-400 transition-colors">+1 (234) 567-890</a>
                    </div>
                  </li>
                  <li className="text-gray-400">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                      </svg>
                      <span>City, Country</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Your Name. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Built with React & Tailwind CSS
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App