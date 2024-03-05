import React, { Component } from 'react';
import Page from "./NavBar.jsx";
import { Navigate } from 'react-router-dom';

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
      errors: {},
      isPlaced: false
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
    const errors = this.validateForm();
    if (Object.keys(errors).length === 0) {
      // Add logic for processing the order
      console.log('Form submitted:', this.state.formData);
      this.setState({isPlaced: true});
    } else {
      this.setState({ errors });
    }
  };

  validateForm = () => {
    const { formData } = this.state;
    let errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    if (formData.payment === 'credit-card') {
      if (!formData.cardNumber.trim()) {
        errors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber)) {
        errors.cardNumber = 'Card number must be 16 digits';
      }
      if (!formData.expiryDate.trim()) {
        errors.expiryDate = 'Expiry date is required';
      }
      if (!formData.cvv.trim()) {
        errors.cvv = 'CVV is required';
      } else if (!/^\d{3}$/.test(formData.cvv)) {
        errors.cvv = 'CVV must be 3 digits';
      }
    }
    return errors;
  };

  render() {
    const { formData, errors } = this.state;
    return (
      <div>
        {this.state.isPlaced && <Navigate to="/" replace="true"/>}
        <Page />
        <h2>Checkout</h2>
        <div className="form-box">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={this.handleInputChange} required />
            {errors.name && <span className="error">{errors.name}</span>}

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={this.handleInputChange} required />
            {errors.email && <span className="error">{errors.email}</span>}

            <label htmlFor="address">Shipping Address:</label>
            <textarea class="form-control" rows="3" id="address" name="address" value={formData.address} onChange={this.handleInputChange} rows="4" required />
            {errors.address && <span className="error">{errors.address}</span>}

            <label htmlFor="payment">Payment Method:</label>
            <select class="form-control" id="payment" name="payment" value={formData.payment} onChange={this.handlePaymentChange} required>
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>

            {formData.payment === 'credit-card' && (
              <div>
                <label htmlFor="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={this.handleInputChange} />
                {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}

                <label htmlFor="expiryDate">Expiry Date:</label>
                <input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={this.handleInputChange} />
                {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}

                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={this.handleInputChange} />
                {errors.cvv && <span className="error">{errors.cvv}</span>}
              </div>
            )}

            <button className='btn btn-success' type="submit">Place Order</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Checkout;
