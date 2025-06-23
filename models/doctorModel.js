const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fullName: String,
  email: String,
  timings: Array,
  phone: String,
  address: String,
  specialization: String,
  status: { type: String, default: 'pending' },
  experience: String,
  fees: String,
});

module.exports = mongoose.model('Doctor', doctorSchema);

