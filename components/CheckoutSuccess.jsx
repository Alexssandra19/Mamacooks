import React, { Component } from 'react';
import Page from "./NavBar.jsx";

class CheckoutSuccess extends Component {
  render() {
    return (
        <div>
            <Page />
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. Your order has been successfully placed.</p>
        </div>
    );
  }
}

export default CheckoutSuccess;