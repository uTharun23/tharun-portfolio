const nodemailer = require('nodemailer');

const createTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT, 10) || 587;

  if (!user || user === 'your-email@gmail.com' || !pass || pass === 'your-email-app-password') {
    console.warn('WARN: Email configurations (EMAIL_USER/EMAIL_PASS) are not set. Emails will be logged to the console instead of being sent.');
    return {
      sendMail: async (options) => {
        console.log('=============== MOCK EMAIL SENT ===============');
        console.log(`To: ${options.to}`);
        console.log(`Subject: ${options.subject}`);
        console.log(`Body:\n${options.text || options.html}`);
        console.log('==============================================');
        return { messageId: 'mock-id-12345' };
      }
    };
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
};

module.exports = { createTransporter };
