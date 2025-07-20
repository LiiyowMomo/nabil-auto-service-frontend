import React from "react";

// Helper function to format wait time
function formatWaitTime(minutes) {
  if (!minutes && minutes !== 0) return "Unknown";
  
  if (minutes >= 1440) {
    const days = Math.ceil(minutes / 1440); // Round up for days
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (minutes >= 60) {
    const hours = Math.ceil(minutes / 60); // Round up for hours
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
}

// Default durations for services in minutes
const DEFAULT_DURATIONS = {
  'Oil Change': 30,
  'Engine Repair': 1440, // 1 day
  'Transmission': 1440, // 1 day
  'Safety Inspection': 75,
  'Tune Up': 60,
  'Exhaust & Brakes': 120,
  'Shocks & Front End': 75,
  'Air Conditioning': 120,
  'Fuel Injection': 60,
  'Other': 60
};

const WaitTimeEstimator = ({ 
  services = [], 
  isLoading = false, 
  status = "pending", 
  queueWaitMinutes = null,
  totalJobMinutes = null 
}) => {
  // Calculate estimated time based on selected services
  const calculateEstimatedTime = () => {
    if (!services || services.length === 0) return null;
    
    // Sum up durations of all selected services
    const totalMinutes = services.reduce((total, service) => {
      // Use the service's estimatedDuration if available, otherwise use default duration
      const duration = service.estimatedDuration || 
                      DEFAULT_DURATIONS[service.name] || 
                      30; // Fallback to 30 minutes if no duration found
      return total + duration;
    }, 0);
    
    return totalMinutes;
  };

  // Get time for the selected services
  const serviceMinutes = calculateEstimatedTime();
  
  // Use the provided queue wait time if available, otherwise estimate based on 2 jobs ahead
  const waitMinutes = queueWaitMinutes !== null ? queueWaitMinutes : (serviceMinutes ? Math.round(serviceMinutes * 0.75) : null);
  
  // For the total job time, use provided value or the calculated service time
  const jobMinutes = totalJobMinutes !== null ? totalJobMinutes : serviceMinutes;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6 rounded shadow text-automotive-charcoal">
      <h4 className="font-bold text-lg mb-2">Estimated Wait Time</h4>
      
      {isLoading ? (
        <p>Calculating wait time...</p>
      ) : (
        <div>
          {status === "pending" && waitMinutes !== null && (
            <>
              <div className="mb-3">
                <p className="font-medium">Wait before your turn:</p>
                <p className="font-bold text-xl text-automotive-red">
                  {formatWaitTime(waitMinutes)}
                </p>
              </div>
              
              <div className="mb-2">
                <p className="font-medium">Service duration:</p>
                <p className="font-bold text-xl">
                  {formatWaitTime(jobMinutes)}
                </p>
              </div>
              
              <p className="text-sm text-gray-600 mt-2">
                Based on selected services and our current workload
              </p>
            </>
          )}
          
          {status === "started" && jobMinutes !== null && (
            <>
              <p className="font-medium">Your service has started!</p>
              <p className="font-bold text-xl mb-1">
                Estimated time to completion: {formatWaitTime(jobMinutes)}
              </p>
            </>
          )}
          
          {status === "completed" && (
            <p className="font-medium text-green-600">
              Your service has been completed. Thank you!
            </p>
          )}
          
          {!["pending", "started", "completed"].includes(status) && !waitMinutes && !jobMinutes && (
            <p>Select services to see estimated wait time</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WaitTimeEstimator;
