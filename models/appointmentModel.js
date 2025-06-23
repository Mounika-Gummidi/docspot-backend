const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorInfo: Object,
  userInfo: Object,
  date: String,
  status: { type: String, default: 'pending' },
  document: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
