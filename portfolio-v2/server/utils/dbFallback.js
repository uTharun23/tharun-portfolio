const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Contact = require('../models/Contact');
const Guestbook = require('../models/Guestbook');
const Analytics = require('../models/Analytics');

const LOCAL_DB_PATH = path.join(__dirname, '..', 'uploads', 'local_db.json');

// Ensure local db file exists
const initLocalDb = () => {
  const dir = path.dirname(LOCAL_DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(LOCAL_DB_PATH)) {
    const initialData = {
      contacts: [],
      guestbook: [
        { name: "Dr. K. Srinivasa Rao", role: "Professor at ALIET", message: "Tharun is a dedicated and highly curious student. His integration of AI concepts within full-stack development is promising.", createdAt: new Date(Date.now() - 86400000) },
        { name: "Sarah Jenkins", role: "HR Tech Recruiter", message: "Stumbled upon your portfolio while looking for entry-level developers. The UI design is incredibly polished and premium. Your resume optimizer project sounds very practical!", createdAt: new Date(Date.now() - 3 * 86400000) },
        { name: "Rohit Kumar", role: "B.Tech Classmate", message: "Awesome portfolio bro! The hand gesture brightness control project works smoothly. Looking forward to our next project together.", createdAt: new Date(Date.now() - 5 * 86400000) }
      ],
      analytics: {
        visitor_count: 0,
        resume_download_count: 0
      }
    };
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
  }
};

initLocalDb();

// Read local data
const readLocalData = () => {
  try {
    initLocalDb();
    const content = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading local fallback database:', error);
    return { contacts: [], guestbook: [], analytics: { visitor_count: 0, resume_download_count: 0 } };
  }
};

// Write local data
const writeLocalData = (data) => {
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to local fallback database:', error);
  }
};

// Helper: Check if mongoose is actively connected
const isDbConnected = () => {
  return mongoose.connection.readyState === 1;
};

// --- API Implementation ---

const saveContact = async (contactData) => {
  if (isDbConnected()) {
    const newContact = new Contact(contactData);
    return await newContact.save();
  } else {
    const data = readLocalData();
    const record = {
      _id: 'local_c_' + Date.now(),
      ...contactData,
      createdAt: new Date()
    };
    data.contacts.push(record);
    writeLocalData(data);
    return record;
  }
};

const getGuestbookSignatures = async () => {
  if (isDbConnected()) {
    return await Guestbook.find().sort({ createdAt: -1 });
  } else {
    const data = readLocalData();
    // Return sorted by date descending
    return [...data.guestbook].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

const saveGuestbookSignature = async (signatureData) => {
  if (isDbConnected()) {
    const newSignature = new Guestbook(signatureData);
    return await newSignature.save();
  } else {
    const data = readLocalData();
    const record = {
      _id: 'local_gb_' + Date.now(),
      ...signatureData,
      createdAt: new Date()
    };
    data.guestbook.unshift(record);
    writeLocalData(data);
    return record;
  }
};

const getAnalytics = async () => {
  let visitorCount = 0;
  let resumeDownloadCount = 0;
  let contactCount = 0;

  if (isDbConnected()) {
    const visitorMetric = await Analytics.findOne({ metric: 'visitor_count' });
    const downloadMetric = await Analytics.findOne({ metric: 'resume_download_count' });
    visitorCount = visitorMetric ? visitorMetric.value : 0;
    resumeDownloadCount = downloadMetric ? downloadMetric.value : 0;
    contactCount = await Contact.countDocuments();
  } else {
    const data = readLocalData();
    visitorCount = data.analytics.visitor_count || 0;
    resumeDownloadCount = data.analytics.resume_download_count || 0;
    contactCount = data.contacts.length;
  }

  return {
    visitorCount,
    resumeDownloadCount,
    contactCount
  };
};

const incrementMetric = async (metricName) => {
  if (['visitor_count', 'resume_download_count'].indexOf(metricName) === -1) {
    throw new Error('Invalid metric name');
  }

  if (isDbConnected()) {
    return await Analytics.findOneAndUpdate(
      { metric: metricName },
      { $inc: { value: 1 }, lastUpdated: new Date() },
      { new: true, upsert: true }
    );
  } else {
    const data = readLocalData();
    data.analytics[metricName] = (data.analytics[metricName] || 0) + 1;
    writeLocalData(data);
    return { metric: metricName, value: data.analytics[metricName] };
  }
};

module.exports = {
  saveContact,
  getGuestbookSignatures,
  saveGuestbookSignature,
  getAnalytics,
  incrementMetric,
  isDbConnected
};
