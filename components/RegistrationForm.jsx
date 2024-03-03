import React from 'react';

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
       alert('User registered successfully');
      } else {
        // Handle failure
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
  
  render() {
    return (
      <div>
        <h2>Registration</h2>
        <form onSubmit={this.handleSubmit} name="registrationForm" className="checkout-box" method="POST" action="/register">
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
    );
  }
}

export default RegistrationForm;
