const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true, unique: true },
  role: { type: String },
  bio: { type: String },
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
  profilePicture: { type: String },
  cv: {
    url: { type: String },
    fileName: { type: String }
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);
