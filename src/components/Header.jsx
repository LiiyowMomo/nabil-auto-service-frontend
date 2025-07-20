import { useState } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import { Link } from "react-router-dom"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                src="/Nabil_name-Logo.jpg"
                alt="Nabil Auto Service Logo"
                className="h-14 max-w-xs"
                style={{ objectFit: "contain", display: "block", margin: "0 auto" }}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-automotive-charcoal hover:text-automotive-red px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-automotive-charcoal hover:text-automotive-red px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-automotive-charcoal hover:text-automotive-red px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-automotive-charcoal hover:text-automotive-red px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Contact
              </button>
            </div>
          </nav>

          {/* Phone Number */}
          <div className="hidden md:flex items-center">
            <Phone className="h-4 w-4 text-automotive-red mr-2" />
            <a
              href="tel:647-281-0071"
              className="text-automotive-charcoal hover:text-automotive-red font-medium transition-colors duration-200"
            >
              647-281-0071
            </a>
          </div>
          <div className="hidden md:flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-automotive-red mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <a
              href="/admin-login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-automotive-charcoal hover:text-automotive-red font-medium transition-colors duration-200"
            >
              Admin Login
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-automotive-charcoal hover:text-automotive-red p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={() => scrollToSection('home')}
                className="text-automotive-charcoal hover:text-automotive-red block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-automotive-charcoal hover:text-automotive-red block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-automotive-charcoal hover:text-automotive-red block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-automotive-charcoal hover:text-automotive-red block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200"
              >
                Contact
              </button>
              <div className="px-3 py-2 border-t">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-automotive-red mr-2" />
                  <a
                    href="tel:647-281-0071"
                    className="text-automotive-charcoal hover:text-automotive-red font-medium transition-colors duration-200"
                  >
                    647-281-0071
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header