import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home.jsx';
import LoginForm from './LoginForm.jsx';
import RegistrationForm from './RegistrationForm.jsx';
import Checkout from './Checkoutpage.jsx';
import Products from "./Products.jsx";
import AddMenuItem from './Admin/AddMenuItem.jsx';
import ProductDetails from './ProductDetails.jsx';
import CheckoutSuccess from './CheckoutSuccess.jsx';
import Feedback from './Feedback.jsx';
import CartPage from './Cart.jsx';
import UserDetails from './UserDetails.jsx';

class Contents extends React.Component {
  render() {
    return (
      <div>
     
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AddMenuItem />} />
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/user-details/:userId" element={<UserDetails />} /> */}
        <Route path="/user-details" element={<UserDetails />} />
      </Routes>
      </div>
    );
  }
}

export default Contents;
