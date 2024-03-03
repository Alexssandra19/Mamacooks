const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');

app.use(express.static("public"));

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://admin:admin@cluster0.htqw40t.mongodb.net/mamacooks?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Route to handle registration
app.post('/api/register', async (req, res) => {
  try {
   
    const newUser = new User(req.body);
  
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to serve your React application
app.get("*", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
