const dbFallback = require('../utils/dbFallback');

const fetchSignatures = async () => {
  return await dbFallback.getGuestbookSignatures();
};

const addSignature = async (signatureData) => {
  const { name, role, message } = signatureData;
  return await dbFallback.saveGuestbookSignature({
    name,
    role: role || 'Visitor',
    message
  });
};

module.exports = {
  fetchSignatures,
  addSignature
};
