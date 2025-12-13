const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Community title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Community description is required'],
    trim: true
  },
  fullDescription: {
    type: String,
    default: ''
  },
  tech_stack: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true,
    enum: ['Discord', 'Slack', 'Reddit', 'Forum', 'Telegram', 'WhatsApp', 'GitHub', 'X (Twitter)', 'Meetup', 'LinkedIn']
  },
  location_mode: {
    type: String,
    required: true,
    enum: ['Global/Online', 'Regional (US)', 'Regional (Africa)', 'Local']
  },
  tags: [{
    type: String,
    trim: true
  }],
  joining_link: {
    type: String,
    required: [true, 'Joining link is required'],
    trim: true
  },
  member_count: {
    type: Number,
    default: 0
  },
  activity_level: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Very Active'],
    default: 'Medium'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  weeklyPosts: {
    type: Number,
    default: 0
  },
  founded: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Indexes for better search performance
communitySchema.index({ title: 'text', description: 'text', tags: 'text' });
communitySchema.index({ tech_stack: 1 });
communitySchema.index({ platform: 1 });
communitySchema.index({ location_mode: 1 });
communitySchema.index({ activity_level: 1 });

module.exports = mongoose.model('Community', communitySchema);

