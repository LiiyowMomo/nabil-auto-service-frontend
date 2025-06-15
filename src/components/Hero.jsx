import { Phone, MapPin, Clock } from 'lucide-react'

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative bg-gradient-to-br from-automotive-blue to-automotive-charcoal text-white py-20 mt-16">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Professional 
              <span className="text-automotive-red block">Auto Service</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Expert automotive repair and maintenance services you can trust. 
              From routine maintenance to complex repairs, we keep your vehicle running smoothly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a 
                href="tel:647-281-0071"
                className="bg-automotive-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now: 647-281-0071
              </a>
              <button 
                onClick={scrollToContact}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-automotive-blue text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Quote
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start">
                <MapPin className="h-5 w-5 mr-2 text-automotive-red" />
                <span className="text-sm">GTA Service</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <Clock className="h-5 w-5 mr-2 text-automotive-red" />
                <span className="text-sm">Quick Turnaround</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <Phone className="h-5 w-5 mr-2 text-automotive-red" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <img 
              src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Professional Auto Mechanic Working" 
              className="rounded-lg shadow-2xl mx-auto max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero