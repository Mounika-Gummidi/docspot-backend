const express = require('express');
const router = express.Router();
const { getAllDoctors,applyDoctor,getDoctorById  } = require('../controllers/doctorController');
const {loginDoctor}=require('../controllers/doctorLoginController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAllDoctors);
router.post('/apply', applyDoctor); 
router.get('/:id', getDoctorById);
router.post('/login', loginDoctor);

module.exports = router;
