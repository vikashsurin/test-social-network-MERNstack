const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  role: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  universityName: {
    type: String,
    required: true
  },
  hobbies: {
    type: [String]
  },
  social: {
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
