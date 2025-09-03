interface PortfolioCardProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  link?: string;
  isPrivate?: boolean;
}

function PortfolioCard({ 
  title, 
  description, 
  imageUrl, 
  technologies, 
  link = "#",
  isPrivate = false 
}: PortfolioCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative overflow-hidden h-48">
        <img
          src={imageUrl}
          alt={`${title} screenshot`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Overlay with link */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a 
            href={link} 
            className="bg-white/90 backdrop-blur-sm text-gray-900 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-white transition-colors duration-200 transform hover:scale-105"
          >
            View Project
          </a>
        </div>

        {/* Private indicator */}
        {isPrivate && (
          <div className="absolute top-4 left-4">
            <span className="bg-gray-900/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
              Private
            </span>
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
            {description}
          </p>
        </div>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-green-100 hover:text-green-700 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            {isPrivate ? "Private repository" : "Open source"}
          </div>
          <a 
            href={link} 
            className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors duration-200 group/link"
          >
            <span className="text-sm font-medium">View Project</span>
            <svg 
              className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default PortfolioCard;