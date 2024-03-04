import React, { Component } from 'react';
import Page from './NavBar.jsx';
import User from '../models/user.js';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
  
      // Check if request was successful
      if (response.ok) {
        // Handle success
        const userData = await response.json();
        console.log(userData.data);
        // Map API response to UserModel instances
          const userDetails = new User({firstName: userData.data.firstName, 
          lastName: userData.data.lastName,
          email: userData.data.email});
          sessionStorage.setItem('Name', userDetails.firstName + ' ' + userDetails.lastName);
          //reroute to home page
          alert('Login successful');
      } else {
        // Handle failure
        alert('Failed to login');
        console.error('Failed to login');
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

          <div className="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
        <p className="link">Don't have an account? <a href="/registration">Register here</a></p>
      </div>
      </div>
    );
  }
}

export default LoginForm;
