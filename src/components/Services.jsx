import { 
  Fuel, 
  Shield, 
  Settings, 
  Wind, 
  Disc, 
  Zap, 
  Snowflake, 
  Cog,
  Wrench,
  Phone // Added Phone icon import
} from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: <Fuel className="h-8 w-8" />,
      title: "Fuel Injection",
      description: "Professional fuel injection cleaning and repair services to optimize your engine's performance and fuel efficiency."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safety Inspection",
      description: "Complete safety inspections to ensure your vehicle meets all safety standards and regulations."
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Tune Ups",
      description: "Comprehensive tune-up services including spark plugs, filters, and fluid changes to keep your engine running smoothly."
    },
    {
      icon: <Wind className="h-8 w-8" />,
      title: "Exhaust & Brakes",
      description: "Expert exhaust system repairs and brake service to ensure your vehicle's safety and environmental compliance."
    },
    {
      icon: <Disc className="h-8 w-8" />,
      title: "Shocks & Suspension",
      description: "Shock absorber replacement and suspension system repairs for improved ride comfort and vehicle control."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Front End Service",
      description: "Front end alignment, steering repairs, and suspension work to ensure proper vehicle handling and tire wear."
    },
    {
      icon: <Snowflake className="h-8 w-8" />,
      title: "Air Conditioning",
      description: "AC system diagnostics, repairs, and maintenance to keep you comfortable in all weather conditions."
    },
    {
      icon: <Cog className="h-8 w-8" />,
      title: "Engine Repair",
      description: "Complete engine diagnostics and repair services from minor tune-ups to major engine overhauls."
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Transmission",
      description: "Transmission service, repair, and replacement for both automatic and manual transmissions."
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Oil Change",
      description: "Quick and professional oil change services to keep your engine running smoothly and extend its life."
    }
  ]

  return (
    <section id="services" className="py-20 bg-automotive-lightGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-automotive-charcoal mb-6">
            Our Services
          </h2>
          <p className="text-xl text-automotive-gray max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive automotive services with expertise, quality, and reliability. 
            Trust our experienced technicians to keep your vehicle in peak condition.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-automotive-red"
            >
              <div className="text-automotive-red mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-automotive-charcoal mb-4">
                {service.title}
              </h3>
              <p className="text-automotive-gray leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="tel:647-281-0071"
            className="bg-automotive-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call for Service: 647-281-0071
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services