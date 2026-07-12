const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  metric: {
    type: String,
    required: true,
    unique: true,
    enum: ['visitor_count', 'resume_download_count'],
  },
  value: {
    type: Number,
    required: true,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);
