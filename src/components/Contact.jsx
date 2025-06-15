import { Phone, MapPin, Clock, Mail } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-automotive-lightGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-automotive-charcoal mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-automotive-gray max-w-3xl mx-auto leading-relaxed">
            Ready to service your vehicle? Get in touch with us today for professional 
            automotive repair and maintenance services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-automotive-charcoal mb-6">
              Get in Touch
            </h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-automotive-red text-white p-3 rounded-lg mr-4">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-automotive-charcoal">Phone</h4>
                  <a 
                    href="tel:647-281-0071" 
                    className="text-automotive-gray hover:text-automotive-red transition-colors duration-200"
                  >
                    647-281-0071
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-automotive-red text-white p-3 rounded-lg mr-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-automotive-charcoal">Service Area</h4>
                  <p className="text-automotive-gray">Greater Toronto Area</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-automotive-red text-white p-3 rounded-lg mr-4">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-automotive-charcoal">Hours</h4>
                  <p className="text-automotive-gray">Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-automotive-gray">Saturday: 8:00 AM - 4:00 PM</p>
                  <p className="text-automotive-gray">Sunday: Closed</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-automotive-red text-white p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-automotive-charcoal">Emergency Service</h4>
                  <p className="text-automotive-gray">24/7 Emergency Support Available</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-automotive-charcoal mb-6">
              Request Service
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-automotive-charcoal mb-1">
                  Name
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-automotive-red focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-automotive-charcoal mb-1">
                  Phone
                </label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-automotive-red focus:border-transparent"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-automotive-charcoal mb-1">
                  Vehicle Make & Model
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-automotive-red focus:border-transparent"
                  placeholder="e.g., Toyota Camry 2018"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-automotive-charcoal mb-1">
                  Service Needed
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-automotive-red focus:border-transparent">
                  <option>Select a service</option>
                  <option>Fuel Injection</option>
                  <option>Safety Inspection</option>
                  <option>Tune Up</option>
                  <option>Exhaust & Brakes</option>
                  <option>Shocks & Front End</option>
                  <option>Air Conditioning</option>
                  <option>Engine Repair</option>
                  <option>Transmission</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-automotive-charcoal mb-1">
                  Message
                </label>
                <textarea 
                  rows="4" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-automotive-red focus:border-transparent"
                  placeholder="Describe your vehicle's issue or service needs"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-automotive-red hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Request Service
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-automotive-red text-white py-6 px-8 rounded-lg inline-block">
            <h3 className="text-2xl font-bold mb-2">Need Immediate Service?</h3>
            <p className="text-lg mb-4">Call us now for urgent automotive repairs</p>
            <a 
              href="tel:647-281-0071"
              className="bg-white text-automotive-red px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              647-281-0071
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact