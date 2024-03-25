const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
const MenuItem = require('./models/product');
const Feedback = require('./models/feedback');

app.use(express.static("public"));

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://admin:admin@cluster0.htqw40t.mongodb.net/mamacooks?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/menuItems', async (req, res) => {

  try {
    const menuItems = await MenuItem.find();
    
    if (menuItems) {
      res.json({ success: true, data: menuItems });
    } else {
      res.json({ success: false, message: 'Error fetching products' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/blogposts', async (req, res) => {

  try {
    const feedbacks = await Feedback.find();
    
    if (feedbacks) {
      res.json({ success: true, data: feedbacks });
    } else {
      res.json({ success: false, message: 'Error fetching products' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
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

// Route to handle registration
app.post('/api/add/feedback', async (req, res) => {
  try {
   
    const feedback = new Feedback(req.body);
  
    await feedback.save();
    
    res.status(201).json({ message: 'Feedback added successfully' });
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to handle registration
app.post('/api/register/menuItem', async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json({ message: 'Menu Item Added successfully' });

  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedItem = await MenuItem.findByIdAndDelete(productId);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu Item not found' });
    }

    res.status(200).json({ message: 'Menu Item deleted successfully', data: deletedItem });

  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, restaurantID, category, imageUrl } = req.body;
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(id, {
      name,
      description,
      price,
      restaurantID,
      category,
      imageUrl
    }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu Item not found' });
    }

    res.status(200).json({ message: 'Menu Item updated successfully', data: updatedItem });

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
