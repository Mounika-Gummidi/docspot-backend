const Appointment = require('../models/appointmentModel');

exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id; // This requires auth middleware to decode token
    const appointments = await Appointment.find({ userId }).populate('doctorId', 'fullname specialization');
    res.json(appointments.map(a => ({
      _id: a._id,
      doctorInfo: {
        fullname: a.doctorId.fullname,
        specialization: a.doctorId.specialization
      },
      date: a.date,
      status: a.status
    })));
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;
    const userId = req.user.id;

    const appointment = new Appointment({
      userId,
      doctorId,
      date,
      status: 'pending'
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Server error while booking' });
  }
};
