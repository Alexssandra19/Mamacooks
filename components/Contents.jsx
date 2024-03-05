import React from 'react';
import { Navigate,Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import LoginForm from './LoginForm.jsx';
import RegistrationForm from './RegistrationForm.jsx';
import Checkout from './Checkoutpage.jsx';
import Products from "./Products.jsx";
import AddMenuItem from './Admin/AddMenuItem.jsx';
import ProductDetails from './ProductDetails.jsx';
import CheckoutSuccess from './CheckoutSuccess.jsx';

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
        <Route path="/products/:_id" element={<ProductDetails />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
      </Routes>
      </div>
    );
  }
}

export default Contents;
