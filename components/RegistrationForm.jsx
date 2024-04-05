import React from 'react';
import Page from "./NavBar.jsx";
import Footer from './Footer.jsx';

class RegistrationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    // Prepare form data
    const formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      password: this.state.password
    };
  
    try {
      // Make HTTP request to your backend API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      // Check if request was successful
      if (response.ok) {
        // Handle success
       alert('Menu added successfully');
      } else {
        // Handle failure
        alert('Failed to add item');
        console.error('Failed to add item');
      }
    } catch (error) {
      alert('Failed to add item');
      console.error('Error adding item:', error);
    }
  }
  
  render() {
    return (
      <div>
        <Page />
      <div>
        <h2 className='mt-3'>Registration</h2>
        <form onSubmit={this.handleSubmit} name="registrationForm" className="form-box" method="POST" action="/register">
          <div className="form-group">
            <label htmlFor="fname">First name</label>
            <input type="text" id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="lname">Last name</label>
            <input type="text" id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="pnum">Ph Number</label>
            <input type="text" id="phoneNumber" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />
          </div>

          <div className="form-group">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
      <footer>
          <Footer />
      </footer>
      </div>
    );
  }
}

export default RegistrationForm;
