exports.loginDoctor = async (req, res) => {
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ email });
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

  const isMatch = await bcrypt.compare(password, doctor.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: doctor._id, isDoctor: true }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({ token, doctor });
};
