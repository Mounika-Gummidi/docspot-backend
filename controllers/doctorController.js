const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');
const bcrypt = require('bcryptjs');

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (err) {
    console.error('Error fetching doctor by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



// POST a doctor application
exports.applyDoctor = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { fullName, specialization, experience, fees } = req.body;
    const userId = req.user.id;

    const doctor = new Doctor({
      fullName,
      specialization,
      experience,
      fees,
      email,
      password: hashedPassword,
      status: 'pending',
      userId
    });

    await doctor.save();

    res.status(201).json({ message: 'Application submitted' });
  } catch (err) {
    console.error('Error applying doctor:', err);
    res.status(500).json({ message: 'Failed to apply as doctor' });
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