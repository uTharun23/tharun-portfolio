const mongoose = require('mongoose');

const GuestbookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  role: {
    type: String,
    trim: true,
    default: 'Visitor',
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Guestbook || mongoose.model('Guestbook', GuestbookSchema);
