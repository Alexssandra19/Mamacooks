const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
const MenuItem = require('./models/product');
const Feedback = require('./models/feedback');
const Cart = require("./models/cart");
const { ObjectId } = require('mongodb');
const Order = require("./models/order");

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

app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.json({ success: false, message: 'Error fetching user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/user/:id', async (req, res) => {
  const user = new User(req.body);
  try {
    const updatedDetails = await User.findByIdAndUpdate(user._id, req.body, { new: true });
    if (!updatedDetails) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User data updated successfully', data: updatedDetails });

  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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

// Route to add cart
app.post('/api/checkout', async (req, res) => {
  try {
    const cartData = new Cart(req.body);
    await cartData.save();
    
    res.status(201).json({ message: 'Checkout added successfully' });
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to add cart
app.get('/api/checkout/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({userId: new ObjectId(id)}); 
    if (cart) {
      res.json({ success: true, data: cart });
    } else {
      res.json({ success: false, message: 'No data Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/checkout/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, items } = req.body;
  try {
    const updatedItem = await Cart.findOneAndUpdate({userId: new ObjectId(id)}, {
      userId,
      items
    }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart updated successfully', data: updatedItem });

  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to delete user data by ID
app.delete('/api/checkout/:id', async (req, res) => {
  const { id } = req.params; // Extract the user ID from the request parameters
  try {
    // Attempt to find the user by ID and delete it
    const deletedUserCart = await Cart.findOneAndDelete({userId:id});
    if (deletedUserCart) {
      res.json({ success: true, message: 'Cart deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Cart not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Route to place order
app.post('/api/order', async (req, res) => {
  try {
    const orderData = new Order(req.body);
    await orderData.save();
    
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get order details
app.get('/api/order/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.find({userId: new ObjectId(id)}); 
    if (order) {
      res.json({ success: true, data: order });
    } else {
      res.json({ success: false, message: 'No data Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
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

app.get('/api/product/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await MenuItem.findById(productId);
    if (product) {
      res.json({ success: true, data: product });
    } else {
      return res.status(404).json({ message: 'Menu Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const id = req.params.id;
  const { _id, name, description, price, restaurantID, category, imageUrl } = req.body;
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(id, {
      _id,
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

app.post('/api/carts', async (req, res) => {
  try {
    const { userId, items } = req.body;
    const cart = new Cart({ userId, items });
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ error: 'Internal server error' });
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
