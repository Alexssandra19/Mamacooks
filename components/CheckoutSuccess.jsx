import React, { Component } from 'react';
import Page from "./NavBar.jsx";

class CheckoutSuccess extends Component {
  render() {
    return (
        <div>
            <Page />
            <div className='container'>
            <h2>Order Placed Successfully!</h2>
            <p className='text-center'>Thank you for your purchase. Your order has been successfully placed.</p>
            </div>
        </div>
    );
  }
}

export default CheckoutSuccess;