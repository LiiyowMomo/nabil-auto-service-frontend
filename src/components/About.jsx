import { Award, Users, Clock, CheckCircle } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Expert Technicians",
      description: "Certified and experienced automotive professionals"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Focused",
      description: "Dedicated to providing exceptional customer service"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Quick Service",
      description: "Efficient repairs without compromising quality"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Quality Guaranteed",
      description: "We stand behind our work with comprehensive warranties"
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-automotive-charcoal mb-6">
              Why Choose 
              <span className="text-automotive-red block">Nabil Auto Service?</span>
            </h2>
            <p className="text-lg text-automotive-gray mb-8 leading-relaxed">
              With years of experience in the automotive industry, Nabil Auto Service has built 
              a reputation for excellence in automotive repair and maintenance. We combine 
              traditional craftsmanship with modern technology to deliver superior results.
            </p>
            <p className="text-lg text-automotive-gray mb-8 leading-relaxed">
              Our commitment to quality service, fair pricing, and customer satisfaction 
              has made us a trusted choice for vehicle owners throughout the GTA. From routine 
              maintenance to complex repairs, we treat every vehicle as if it were our own.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-automotive-red mr-4 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-automotive-charcoal mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-automotive-gray text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <img 
              src="/about.jpg" 
              alt="About Nabil Auto Service" 
              className="rounded-lg shadow-2xl max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About