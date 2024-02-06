import React from 'react';

class RegistrationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fname: '',
      lname: '',
      pnum: '',
      email: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', this.state);
  }

  render() {
    return (
      <div>
        <h2>Registration</h2>
        <form onSubmit={this.handleSubmit} name="registrationForm" className="checkout-box">
          <div className="form-group">
            <label htmlFor="fname">First name</label>
            <input type="text" id="fname" name="fname" value={this.state.fname} onChange={this.handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="lname">Last name</label>
            <input type="text" id="lname" name="lname" value={this.state.lname} onChange={this.handleInputChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="pnum">Ph Number</label>
            <input type="text" id="pnum" name="pnum" value={this.state.pnum} onChange={this.handleInputChange} required />
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
