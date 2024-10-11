const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes will be added here

const userRoutes = require('./routes/users');
const gymPassRoutes = require('./routes/gymPasses');

app.use('/api/users', userRoutes);
app.use('/api/gym-passes', gymPassRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
