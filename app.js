const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://anushri:Advait09@cluster0.2fe34xc.mongodb.net/mydb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err));

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

// Test route
app.get('/', (req, res) => {
  res.send('API is working');
});

// GET all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new user
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE user by ID
app.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // returns the updated document
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  
  // DELETE user by ID
app.delete('/users/:id', async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
