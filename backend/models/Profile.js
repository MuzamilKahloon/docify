const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true, unique: true },
  role: { type: String },
  bio: { type: String, default: '' },
  skills: [String],
  education: [
    {
      institution: String,
      degree: String,
      year: String
    }
  ],
  experience: [
    {
      company: String,
      position: String,
      duration: String,
      description: String
    }
  ],
  projects: [
    {
      title: String,
      description: String,
      url: String
    }
  ],
  profilePicture: { type: String, default: '' },
  cv: {
    url: { type: String, default: '' },
    fileName: { type: String, default: '' },
    uploadedAt: { type: Date }
  },
  socialLinks: {
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    twitter: { type: String, default: '' },
    website: { type: String, default: '' }
  },
  stats: {
    profileViews: { type: Number, default: 0 },
    cvDownloads: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);

