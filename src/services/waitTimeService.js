// Frontend service to fetch estimated wait times
import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5001/api';

const waitTimeService = {
  /**
   * Get all available service types with their durations
   * @returns {Promise} Array of service types
   */
  async getServiceTypes() {
    try {
      const response = await axios.get(`${API_URL}/waittime/services`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service types:', error);
      // Return default service types if API fails
      return [
        { name: 'Oil Change', estimatedDuration: 30 },
        { name: 'Engine Repair', estimatedDuration: 1440 },
        { name: 'Transmission', estimatedDuration: 1440 },
        { name: 'Safety Inspection', estimatedDuration: 75 },
        { name: 'Tune Up', estimatedDuration: 60 },
        { name: 'Exhaust & Brakes', estimatedDuration: 120 },
        { name: 'Shocks & Front End', estimatedDuration: 75 },
        { name: 'Air Conditioning', estimatedDuration: 120 },
        { name: 'Fuel Injection', estimatedDuration: 60 },
        { name: 'Other', estimatedDuration: 60 }
      ];
    }
  },
  
  /**
   * Get wait time estimate for selected services
   * @param {Array} services - Array of service names or objects
   * @param {String} customerId - Optional customer ID
   * @returns {Promise} Estimated wait time
   */
  async estimateWaitTime(services, customerId = null) {
    try {
      // Convert service objects to names if needed
      const serviceNames = services.map(s => typeof s === 'string' ? s : s.name);
      
      const payload = {
        services: serviceNames
      };
      
      if (customerId) {
        payload.customerId = customerId;
      }
      
      const response = await axios.post(`${API_URL}/waittime/estimate`, payload);
      return response.data;
    } catch (error) {
      console.error('Error estimating wait time:', error);
      throw error;
    }
  },
  
  /**
   * Get wait time for a specific customer
   * @param {String} customerId - Customer ID
   * @returns {Promise} Customer's wait time estimate
   */
  async getCustomerWaitTime(customerId) {
    try {
      const response = await axios.get(`${API_URL}/waittime/customer/${customerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer wait time:', error);
      throw error;
    }
  },
  
  /**
   * Track a job's status and get updated wait times
   * @param {String} jobId - Job ID
   * @returns {Promise} Current status and wait time
   */
  async getJobStatus(jobId) {
    try {
      const response = await axios.get(`${API_URL}/waittime/job/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching job status:', error);
      throw error;
    }
  },
  
  /**
   * Get the current queue status and position
   * @param {String} customerId - Optional customer ID to get position in queue
   * @returns {Promise} Queue information
   */
  async getQueueStatus(customerId = null) {
    try {
      const url = customerId 
        ? `${API_URL}/waittime/queue?customerId=${customerId}` 
        : `${API_URL}/waittime/queue`;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching queue status:', error);
      throw error;
    }
  }
};

export default waitTimeService;
