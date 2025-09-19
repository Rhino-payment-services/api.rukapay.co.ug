import { CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react'

interface StatusIndicatorProps {
  service: string
  status: 'operational' | 'degraded' | 'outage' | 'maintenance'
  uptime: string
  responseTime: string
}

const StatusIndicator = ({ service, status, uptime, responseTime }: StatusIndicatorProps) => {
  const statusConfig = {
    operational: {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      label: 'Operational'
    },
    degraded: {
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      label: 'Degraded'
    },
    outage: {
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      label: 'Outage'
    },
    maintenance: {
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      label: 'Maintenance'
    }
  }

  const config = statusConfig[status]

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{service}</h3>
        {config.icon}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status</span>
          <span className={`text-sm font-medium ${config.color}`}>
            {config.label}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Uptime</span>
          <span className="text-sm font-medium text-gray-900">{uptime}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Response Time</span>
          <span className="text-sm font-medium text-gray-900">{responseTime}</span>
        </div>
      </div>
    </div>
  )
}

export default StatusIndicator
