const twilio = require('twilio');

class TwilioService {
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    this.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
  }

  async sendSMS(to, message) {
    try {
      const result = await this.client.messages.create({
        body: message,
        from: this.twilioPhoneNumber,
        to: to
      });
      console.log(`SMS sent successfully to ${to}. SID: ${result.sid}`);
      return result;
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }

  // Generate status update messages
  generateStatusMessage(customerName, jobStatus, customerID) {
    const messages = {
      'Started': `Hi ${customerName}, your auto service request (ID: ${customerID}) has been started. Our team is working on your vehicle. You'll receive another update when the work is completed.`,
      'Completed': `Hi ${customerName}, great news! Your auto service request (ID: ${customerID}) has been completed. Your vehicle is ready for pickup. Thank you for choosing Nabil Auto Service!`,
      'Pending': `Hi ${customerName}, your auto service request (ID: ${customerID}) has been received and is pending review. We'll update you once work begins.`
    };
    return messages[jobStatus] || `Your auto service request (ID: ${customerID}) status has been updated to: ${jobStatus}`;
  }
}

module.exports = new TwilioService();