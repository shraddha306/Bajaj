const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Replace the following with your MongoDB connection string
const MONGODB_URI = 'mongodb+srv://shraddhamallareddy156:shraddha@cluster0.cwqq4.mongodb.net/';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const PORT = process.env.PORT || 4000;

// Define a simple schema and model for demonstration
const DataSchema = new mongoose.Schema({
  user_id: String,
  email: String,
  roll_number: String,
  numbers: [String],
  alphabets: [String],
  highest_lowercase_alphabet: [String],
});

const DataModel = mongoose.model('Data', DataSchema);

// GET /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST /bfhl
app.post('/bfhl', async (req, res) => {
  const { data } = req.body;
  const alphabets = [];
  const numbers = [];
  let highestLowercase = '';

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (item.toLowerCase() !== item.toUpperCase()) {
      alphabets.push(item);
      if (item === item.toLowerCase()) {
        if (!highestLowercase || item > highestLowercase) {
          highestLowercase = item;
        }
      }
    }
  });

  const responseData = {
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
  };

  // Save to MongoDB
  const newData = new DataModel(responseData);
  await newData.save();

  res.json(responseData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
