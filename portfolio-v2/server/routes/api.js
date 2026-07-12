const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');
const { validateContact, validateGuestbook } = require('../validators/requestValidator');

// Health Check
router.get('/health', apiController.healthCheck);

// Contact submissions
router.post('/contact', validateContact, apiController.submitContact);

// Guestbook signatures
router.get('/guestbook', apiController.getGuestbook);
router.post('/guestbook', validateGuestbook, apiController.submitSignature);

// Metadata APIs
router.get('/profile', apiController.getProfile);
router.get('/projects', apiController.getProjects);
router.get('/skills', apiController.getSkills);
router.get('/certificates', apiController.getCertificates);

// Specific resume download routes
router.post('/resume/download', apiController.recordDownload);

// Analytics
router.get('/analytics', apiController.getAnalytics);
router.post('/analytics/visit', apiController.recordVisit);
router.post('/analytics/download', apiController.recordDownload);

module.exports = router;
