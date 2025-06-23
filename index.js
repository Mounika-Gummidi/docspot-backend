const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

require("dotenv").config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', require('./routes/userRoutes'));

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
