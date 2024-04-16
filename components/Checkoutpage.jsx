import React, { Component } from 'react';
import Page from "./NavBar.jsx";
import { Navigate } from 'react-router-dom';
import Order from '../models/order.js';
import CartItem from '../models/cartItem.js';
import MenuItem from '../models/product.js';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        name: '',
        email: '',
        address: '',
        payment: 'credit',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      },
      errors: {},
      isPlaced: false,
      cartItems: [],
      products: [],
      checkout: null,
    };
  }

  componentDidMount() {
    this.getUserCheckout();
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

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    if (Object.keys(errors).length === 0) {
      const { cartItems } = this.state;
      const subtotal = cartItems?.length > 0 ? cartItems.reduce((acc, item) => acc + item.price * item.quantity * 1.00, 0) : 0;
      const tax = subtotal * 0.13;
      const delivery = subtotal > 30.00 ? 0.00 : subtotal > 20.00 && subtotal < 30.00 ? 2.99 : 4.99;
      const total = subtotal + tax + 5.00 + delivery;
      const submitData = new Order({
        userId: sessionStorage.getItem('UserId'),
        customerName: this.state.formData.name,
        customerEmail: this.state.formData.email,
        shippingAddress: this.state.formData.address,
        items: this.state.checkout.items.filter(x => x.productId),
        totalPrice: total,
        paymentMethod: this.state.formData.payment,
      });

      try {
        // Make HTTP request to your backend API
        const response = await fetch('/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submitData)
        });

        // Check if request was successful
        if (response.ok) {
          const cartUpdated = await this.clearCart();
          if (cartUpdated) {
            this.setState({ isPlaced: true });
            // Handle success
            alert('Order Placed successfully');
          } else {
            // Handle failure
            alert('Failed to place order');
            console.error('Failed to place order');
          }
        } else {
          // Handle failure
          alert('Failed to place order');
          console.error('Failed to place order');
        }
      } catch (error) {
        alert('Failed to place order');
        console.error('Error place order:', error);
      }
    } else {
      this.setState({ errors });
    }
  };

  clearCart = async () => {
    const userId = sessionStorage.getItem('UserId');
    try {
      // Make HTTP request to your backend API
      const response = await fetch(`/api/checkout/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Check if request was successful
      if (response.ok) {
        return true;
      } else {
        // Handle failure
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  getUserCheckout = async () => {
    const userId = sessionStorage.getItem('UserId');
    if (userId) {
      try {
        // Make HTTP request to your backend API
        const response = await fetch(`/api/checkout/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Check if request was successful
        if (response.ok) {
          const userCheckout = await response.json();
          try {
            const response = await fetch('/api/menuItems', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            });

            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }

            const menuData = await response.json();
            const mappedMenuItems = menuData.data.map((menu) => {
              return new MenuItem(menu);
            });
            this.setState({ products: mappedMenuItems });
            if (mappedMenuItems && userCheckout.data?.items?.length > 0) {
              let cartItems = [];
              this.setState({ checkout: userCheckout.data });
              userCheckout.data?.items?.forEach(item => {
                const product = mappedMenuItems.find(product => product._id == item.productId);
                if (product) {
                  cartItems.push(new CartItem({ _id: item.productId, name: product.name, imageUrl: product.imageUrl, quantity: item.quantity, price: product.price }));
                }
              });
              this.setState({ cartItems: cartItems });
            }
          } catch (error) {
            console.error('Failed to get Menu Items:', error);
          }
        }
      } catch (error) {
        console.error('Error adding checkout:', error);
      }
    }
  }

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
    if (formData.payment === 'credit') {
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
        {this.state.isPlaced && <Navigate to="/checkout-success" replace="true" />}
        <Page />
        <h2 className='mt-3'>Checkout</h2>
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
              <option value="credit">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash">Cash On Delivery</option>
            </select>

            {formData.payment === 'credit' && (
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

            <button className='btn btn-success mt-2' type="submit">Place Order</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Checkout;
