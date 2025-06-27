const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctors',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  }
});

module.exports = mongoose.model('appointments', appointmentSchema);
