const dbFallback = require('../utils/dbFallback');

const sendContactMessage = async (contactData) => {
  const { name, email, message } = contactData;

  // Save to DB (or local JSON fallback)
  try {
    const savedContact = await dbFallback.saveContact({ name, email, message });
    console.log('Database save success: Contact message logged securely in the database.');
    return savedContact;
  } catch (dbError) {
    console.error('Database save failure: Failed to log contact message.', dbError);
    throw new Error('Database insertion failed: ' + dbError.message);
  }
};

module.exports = {
  sendContactMessage
};
