import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ApiCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  endpoints: string[]
  status?: 'operational' | 'degraded' | 'outage' | 'maintenance'
}

const ApiCard = ({ title, description, icon, href, endpoints }: ApiCardProps) => {
  return (
    <Link href={href} className="card p-6 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-start mb-4">
        <div className="flex items-center space-x-3">
          {icon}
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-950">
            {title}
          </h3>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
        {description}
      </p>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-900">Key Endpoints:</h4>
        <div className="flex flex-wrap gap-2">
          {endpoints.map((endpoint) => (
            <span
              key={endpoint}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
            >
              {endpoint}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center text-primary-950 group-hover:text-primary-800 font-medium mt-4">
        <span className="text-sm">Explore API</span>
        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}

export default ApiCard
