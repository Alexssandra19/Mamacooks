import React, { Component } from 'react';
import Page from './NavBar.jsx';
import User from '../models/user.js';
import { Navigate } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isPlaced: false
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const dataFromSession = sessionStorage.getItem('Name');
    const isLoggedIn = dataFromSession ? true : false;
    if(!isLoggedIn) {
    // Add your login logic here
    console.log('Login submitted:', this.state);
    const formData = {
      email: this.state.email,
      password: this.state.password
    };
  
    try {
      // Make HTTP request to your backend API
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const responseData = await response.json();
  
      // Check if request was successful
      if (responseData.success) {
        // Handle success
        const userData = responseData.data;
        // Map API response to UserModel instances
          const userDetails = new User({
          _id: userData._id,
          firstName: userData.firstName, 
          lastName: userData.lastName,
          email: userData.email});
          sessionStorage.setItem('Name', userDetails.firstName + ' ' + userDetails.lastName);
          sessionStorage.setItem('UserId', userDetails._id);
          alert('Login successful');
          this.setState({isPlaced: true});
      } else {
        // Handle failure
        alert(responseData.message);
        console.error('Incorrect username or password');
      }
    } catch (error) {
      alert('Failed to login');
      console.error('Error logging in:', error);
    }
  } else {
    alert('You have already Logged In');
  }
  };

  render() {
    return (
      <div>
        {this.state.isPlaced && <Navigate to="/" replace="true"/>}
        <Page />
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit} className='form-box' name="loginForm">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              required
            />
          </div>

          <div className="form-group d-flex justify-content-center" >
            <button className="btn btn-success btn-lg" type="submit">Login</button>
          </div>
        </form>
        <div className="form-group d-flex justify-content-center" >
        <p className="link">Don't have an account? <a href="/registration">Register here</a></p>
        </div>
      </div>
      </div>
    );
  }
}

export default LoginForm;
