const express = require('express');
const router = express.Router();
const { getUserAppointments,bookAppointment} = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/user', authMiddleware, getUserAppointments);
router.post('/book', authMiddleware, bookAppointment);
router.get('/appointments', authMiddleware, async (req, res) => {
  const appointments = await Appointment.find({ doctorId: req.user.id }).populate('userId', 'name');
  res.json(appointments);
});

module.exports = router;
