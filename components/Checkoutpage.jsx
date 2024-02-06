import React, { Component } from 'react';
import Page from "./NavBar.jsx";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        name: '',
        email: '',
        address: '',
        payment: 'credit-card',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      },
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handlePaymentChange = (e) => {
    const paymentMethod = e.target.value;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        payment: paymentMethod,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for processing the order
    console.log('Form submitted:', this.state.formData);
  };

  render() {
    const { formData } = this.state;

    return (
      <div>
        
        <header>
        <div id="head-section">
            <img src="./images/logo.png" alt="header-logo-image" width="10%" />
            <Page />
          </div>
          <h1>Checkout</h1>
        </header>
        <div className="checkout-box">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={this.handleInputChange} required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={this.handleInputChange} required />

          <label htmlFor="address">Shipping Address:</label>
          <textarea id="address" name="address" value={formData.address} onChange={this.handleInputChange} rows="4" required />

          <label htmlFor="payment">Payment Method:</label>
          <select id="payment" name="payment" value={formData.payment} onChange={this.handlePaymentChange} required>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>

          {formData.payment === 'credit-card' && (
            <div>
              <label htmlFor="cardNumber">Card Number:</label>
              <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={this.handleInputChange} />

              <label htmlFor="expiryDate">Expiry Date:</label>
              <input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={this.handleInputChange} />

              <label htmlFor="cvv">CVV:</label>
              <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={this.handleInputChange} />
            </div>
          )}

          <button type="submit">Place Order</button>
        </form>
        </div>
      </div>
    );
  }
}

export default Checkout;
