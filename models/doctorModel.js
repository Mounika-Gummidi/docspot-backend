const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  fullName: String,
  specialization: String,
  experience: Number,
  fees: Number,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, default: 'pending' },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
