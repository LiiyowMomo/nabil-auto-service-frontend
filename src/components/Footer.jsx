import { Phone, MapPin, Clock } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-automotive-charcoal text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-automotive-red mb-4">
              Nabil Auto Service
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Professional automotive repair and maintenance services. 
              We keep your vehicle running safely and efficiently with 
              expert care and quality parts.
            </p>
            <div className="flex items-center text-gray-300">
              <Phone className="h-4 w-4 mr-2 text-automotive-red" />
              <a href="tel:647-281-0071" className="hover:text-automotive-red transition-colors duration-200">
                647-281-0071
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>• Fuel Injection Service</li>
              <li>• Safety Inspections</li>
              <li>• Engine Tune-ups</li>
              <li>• Exhaust & Brake Repair</li>
              <li>• Shock & Suspension</li>
              <li>• Front End Service</li>
              <li>• Air Conditioning</li>
              <li>• Engine & Transmission</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Service Hours</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-automotive-red" />
                <span>Monday - Friday: 8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-automotive-red" />
                <span>Saturday: 8:00 AM - 4:00 PM</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-automotive-red" />
                <span>Sunday: Closed</span>
              </div>
              <div className="flex items-center mt-4">
                <MapPin className="h-4 w-4 mr-2 text-automotive-red" />
                <span>Serving Greater Toronto Area</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Nabil Auto Service. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Professional automotive services you can trust.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer