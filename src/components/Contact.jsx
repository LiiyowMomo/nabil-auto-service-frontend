import { useState } from 'react';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    service: [], // Change to array
    message: '',
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    if (name === "service" && type === "select-multiple") {
      const selected = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData(prev => ({ ...prev, service: selected }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Phone number validation: must be exactly 10 digits
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    // Service validation: at least one service selected
    if (!formData.service || formData.service.length === 0) {
      setError("Please select at least one service.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setError("");
        alert('Request submitted successfully!');
        setFormData({
          name: '',
          phone: '',
          vehicle: '',
          service: [],
          message: ''
        });
      } else {
        setError('Failed to submit request.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-automotive-lightGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ... your other UI sections ... */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side content skipped for brevity */}

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-automotive-charcoal mb-6">
              Request Service
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="text-red-600 font-semibold mb-2">{error}</div>
              )}
              <div>
                <label className="block text-sm font-medium text-automotive-charcoal mb-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-automotive-red focus:border-transparent"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-automotive-charcoal mb-1">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-automotive-red focus:border-transparent"
                  placeholder="Your phone number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-automotive-charcoal mb-1">Vehicle Make & Model</label>
                <input 
                  type="text" 
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-automotive-red focus:border-transparent"
                  placeholder="e.g., Toyota Camry 2018"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-automotive-charcoal mb-1">Service Needed</label>
                <div className="flex flex-wrap gap-2">
                  { [
                    'Fuel Injection',
                    'Safety Inspection',
                    'Tune Up',
                    'Exhaust & Brakes',
                    'Shocks & Front End',
                    'Air Conditioning',
                    'Engine Repair',
                    'Transmission',
                    'Other'
                  ].map(option => (
                    <label key={option} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        name="service"
                        value={option}
                        checked={formData.service.includes(option)}
                        onChange={e => {
                          const checked = e.target.checked;
                          setFormData(prev => ({
                            ...prev,
                            service: checked
                              ? [...prev.service, option]
                              : prev.service.filter(s => s !== option)
                          }));
                        }}
                        className="mr-2 accent-automotive-red"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-automotive-charcoal mb-1">Message</label>
                <textarea 
                  name="message"
                  rows="4" 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-automotive-red focus:border-transparent"
                  placeholder="Describe your vehicle's issue or service needs"
                  required
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

        {/* ... bottom section remains unchanged ... */}
      </div>
    </section>
  );
};

export default Contact;

