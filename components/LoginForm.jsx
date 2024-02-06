import React, { Component } from 'react';


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

  handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login submitted:', this.state);
  };

  render() {
    return (
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit} name="loginForm">
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
    );
  }
}

export default LoginForm;
