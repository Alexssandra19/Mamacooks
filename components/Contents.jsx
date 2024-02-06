// IssueList.jsx
import React from 'react';
import { Navigate,Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import LoginForm from './LoginForm.jsx';
import RegistrationForm from './RegistrationForm.jsx';
import Checkout from './Checkoutpage.jsx';

class Contents extends React.Component {
  render() {
    return (
      <div>
     
      <Routes>
         <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      </div>
    );
  }
}

export default Contents;
