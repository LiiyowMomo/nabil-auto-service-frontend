import { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';
import WaitTimeEstimator from './WaitTimeEstimator';
import waitTimeService from '../services/waitTimeService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    service: [], // Change to array
    message: '',
  });
  const [error, setError] = useState("");
  const [serviceTypes, setServiceTypes] = useState([]);
  const [isEstimatingWaitTime, setIsEstimatingWaitTime] = useState(false);
  const [waitTimeServices, setWaitTimeServices] = useState([]);
  const [queueWaitMinutes, setQueueWaitMinutes] = useState(null);
  const [jobId, setJobId] = useState(null);
  // Dropdown state for service selection
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  const formatPhoneNumber = (value) => {
    // If the value is empty or just "+", return empty string
    if (!value || value === '+') {
      return '';
    }
    
    // If it starts with +1, extract just the digits after +1
    if (value.startsWith('+1')) {
      const phoneNumber = value.slice(2).replace(/\D/g, '');
      if (phoneNumber.length === 0) {
        return '';
      }
      if (phoneNumber.length <= 10) {
        return `+1${phoneNumber}`;
      } else {
        return `+1${phoneNumber.slice(0, 10)}`;
      }
    }
    
    // For any other input, extract digits and format
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length === 0) {
      return '';
    }
    if (phoneNumber.length <= 10) {
      return `+1${phoneNumber}`;
    } else {
      return `+1${phoneNumber.slice(0, 10)}`;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    if (name === "service" && type === "select-multiple") {
      const selected = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData(prev => ({ ...prev, service: selected }));
    } else if (name === "phone") {
      // Format phone number as user types
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedPhone }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Load service types when component mounts
  useEffect(() => {
    async function fetchServiceTypes() {
      try {
        const types = await waitTimeService.getServiceTypes();
        setServiceTypes(types);
      } catch (error) {
        console.error('Error loading service types:', error);
      }
    }
    
    fetchServiceTypes();
  }, []);
  
  // Estimate wait time whenever services change
  useEffect(() => {
    async function estimateWaitTime() {
      if (waitTimeServices.length > 0) {
        setIsEstimatingWaitTime(true);
        try {
          // Simulate backend call for queue wait minutes
          // In real implementation, this would call the API:
          // const result = await waitTimeService.estimateWaitTime(waitTimeServices);
          // setQueueWaitMinutes(result.queueWaitMinutes);
          
          // For now, we'll simulate a wait time (about 75% of service time)
          const totalServiceTime = waitTimeServices.reduce((total, service) => {
            return total + (service.estimatedDuration || 30);
          }, 0);
          
          // Simulate a short API delay
          setTimeout(() => {
            setQueueWaitMinutes(Math.round(totalServiceTime * 0.75));
            setIsEstimatingWaitTime(false);
          }, 500);
        } catch (error) {
          console.error('Error estimating wait time:', error);
          setIsEstimatingWaitTime(false);
        }
      } else {
        setQueueWaitMinutes(null);
      }
    }
    
    estimateWaitTime();
  }, [waitTimeServices]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Phone number validation: must be in +1XXXXXXXXXX format and 12 characters
    const phone = formData.phone;
    const phoneDigits = phone.replace(/\D/g, '');
    if (!phone.startsWith('+1') || phoneDigits.length !== 11) {
      setError("Phone number must start with +1 and be followed by exactly 10 digits.");
      return;
    }
    // Service validation: at least one service selected
    if (!formData.service || formData.service.length === 0) {
      setError("Please select at least one service.");
      return;
    }

    try {
      // Submit the phone number as-is (with +1)
      const submissionData = {
        ...formData,
        phone: formData.phone // keep the +1
      };

      console.log('Submitting data:', submissionData); // Debug log

      const response = await fetch('http://localhost:5001/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
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
        const errorData = await response.text();
        console.error('Response error:', response.status, errorData);
        setError(`Failed to submit request. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error. Please check if the backend server is running.');
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
                  placeholder="+1 437 766-1234"
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
                <div className="relative" style={{ maxWidth: '300px' }}>
                  <button
                    type="button"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-left focus:ring-2 focus:ring-automotive-red focus:border-transparent"
                    onClick={() => setShowServiceDropdown(prev => !prev)}
                  >
                    {formData.service.length > 0 ? formData.service.join(", ") : "Select services"}
                  </button>
                  {showServiceDropdown && (
                    <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-2" style={{ maxHeight: '220px', overflowY: 'auto' }}>
                      {[ 'Fuel Injection', 'Safety Inspection', 'Tune Up', 'Exhaust & Brakes', 'Shocks & Front End', 'Air Conditioning', 'Engine Repair', 'Transmission', 'Oil Change', 'Other' ].map(option => (
                        <label key={option} className="flex items-center mb-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="service"
                            value={option}
                            checked={formData.service.includes(option)}
                            onChange={e => {
                              const checked = e.target.checked;
                              const updatedServices = checked
                                ? [...formData.service, option]
                                : formData.service.filter(s => s !== option);
                              setFormData(prev => ({ ...prev, service: updatedServices }));
                              const serviceObj = serviceTypes.find(s => s.name === option) || { name: option, estimatedDuration: 30 };
                              if (checked) {
                                setWaitTimeServices(prev => [...prev, serviceObj]);
                              } else {
                                setWaitTimeServices(prev => prev.filter(s => s.name !== option));
                              }
                            }}
                            className="mr-2 accent-automotive-red"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
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
              
              {/* Wait Time Estimator */}
              {formData.service.length > 0 && (
                <WaitTimeEstimator 
                  services={waitTimeServices}
                  isLoading={isEstimatingWaitTime}
                  status="pending"
                  queueWaitMinutes={queueWaitMinutes}
                />
              )}
              
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

