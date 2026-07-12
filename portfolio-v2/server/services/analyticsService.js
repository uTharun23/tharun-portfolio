const dbFallback = require('../utils/dbFallback');

const fetchAnalyticsSummary = async () => {
  return await dbFallback.getAnalytics();
};

const incrementVisitorCount = async () => {
  return await dbFallback.incrementMetric('visitor_count');
};

const incrementResumeDownloadCount = async () => {
  return await dbFallback.incrementMetric('resume_download_count');
};

module.exports = {
  fetchAnalyticsSummary,
  incrementVisitorCount,
  incrementResumeDownloadCount
};
