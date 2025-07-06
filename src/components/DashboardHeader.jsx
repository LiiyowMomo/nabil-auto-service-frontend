import { Phone } from 'lucide-react';

const DashboardHeader = ({ onLogout }) => (
  <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo/Brand as a link to landing page */}
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-automotive-red hover:underline">
              Nabil Auto Service
            </a>
          </div>
        </div>
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
        <div className="flex items-center">
          <button
            className="bg-gray-800 hover:bg-automotive-red text-white px-6 py-3 rounded-lg font-semibold shadow transition-colors duration-200"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
);

export default DashboardHeader;
