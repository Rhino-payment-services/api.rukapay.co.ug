import React from 'react'
import { Phone, Mail, MapPin, Clock, Car, Bus } from 'lucide-react'

export const metadata = {
  title: 'Contact Us - Rukapay API Docs',
  description: 'Get in touch with the Rukapay API team for support, inquiries, or partnerships.',
}

const ContactPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100">
              Get in touch with our team - we&apos;re here to help with all your payment needs
            </p>
          </div>
        </div>
      </div>

      {/* Visit Our Office Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Visit Our Office</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Headquarters */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Headquarters</h3>
              <div className="text-gray-300 space-y-1">
                <p>TMT Building 2nd Floor</p>
                <p>Bukoto-Ntinda Road</p>
                <p>Kampala, Uganda</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Business Hours</h3>
              <div className="text-gray-300 space-y-1 text-sm">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            {/* Parking */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Parking</h3>
              <div className="text-gray-300 space-y-1 text-sm">
                <p>Free parking available</p>
                <p>Secure underground parking</p>
                <p>Visitor spaces reserved</p>
              </div>
            </div>

            {/* Public Transport */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bus className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Public Transport</h3>
              <div className="text-gray-300 space-y-1 text-sm">
                <p>Near Ntinda Shopping Complex</p>
                <p>Multiple taxi stages nearby</p>
                <p>Accessible by boda boda</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Call Us */}
            <div className="bg-white rounded-lg p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">24/7 Customer Support</p>
              <a 
                href="tel:+256200244410" 
                className="text-gray-900 font-semibold text-lg hover:text-gray-700 transition-colors"
              >
                0200 244 410
              </a>
            </div>

            {/* Email Us */}
            <div className="bg-white rounded-lg p-8 text-center shadow-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">General Inquiries & Support</p>
              <a 
                href="mailto:info@rukapay.co.ug" 
                className="text-gray-900 font-semibold hover:text-gray-700 transition-colors"
              >
                info@rukapay.co.ug
              </a>
              <p className="text-sm text-gray-500 mt-2">Response within 2 hours</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ContactPage
