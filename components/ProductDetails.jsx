import React, { Component } from 'react';
import Page from "./NavBar.jsx";
import Footer from './Footer.jsx';
import MenuItem from '../models/product.js';
import { Navigate } from 'react-router-dom';
import Cart from '../models/cart.js';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1,
      login: false,
      checkout: null,
      cartItems: [],
      products: [],
    };
  }

  componentDidMount() {
    const productId = sessionStorage.getItem('ProductId');
    this.fetchProductDetails(productId);
  }

  fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`/api/product/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
     
      const menuData = await response.json();
      const productDetails = new MenuItem(menuData.data);
      this.setState({ product: productDetails });
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    this.setState({ quantity: newQuantity });
  };

  getUserCheckout = async (userId) => {
    try {
      // Make HTTP request to your backend API
      const response = await fetch(`/api/checkout/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const responseData = await response.json();
      return responseData?.data;
    } catch (error) {
      alert('Failed to add checkout');
      console.error('Error adding checkout:', error);
    }
  }

  addToCheckout = async (item, quantity) => {
    const userId = sessionStorage.getItem('UserId');
    if (userId) {
      const userCheckout = await this.getUserCheckout(userId);
      if (userCheckout) {
        const curProduct = userCheckout.items.find(x => x.productId == item._id);
        quantity = curProduct ? curProduct.quantity + quantity : quantity;
        userCheckout.items = userCheckout.items.filter(x => x.productId != item._id);
        let checkoutData = new Cart({
          userId: userId,
          items: [...userCheckout.items, {
            productId: item._id,
            quantity: quantity
          }]
        });
        fetch(`/api/checkout/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(checkoutData)
        })
          .then(response => {
            if (response.ok) {
              // Handle success
              alert('Checkout added successfully');
            } else {
              console.error('Failed to update product');
            }
          })
          .catch(error => console.error('Failed to update product:', error));
      } else {
        let checkoutData = new Cart({
          userId: userId,
          items: [{
            productId: item._id,
            quantity: quantity
          }]
        });

        try {
          // Make HTTP request to your backend API
          const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(checkoutData)
          });

          // Check if request was successful
          if (response.ok) {
            // Handle success
            alert('Product added to cart successfully');
          } else {
            // Handle failure
            alert('Failed to add product to checkout');
            console.error('Failed to add product to checkout');
          }
        } catch (error) {
          alert('Failed to add product to checkout');
          console.error('Failed to add product to checkout:', error);
        }
      }
    } else {
      alert('Please Login to Proceed.');
      this.setState({login: true});
    }
  }

  render() {
    const { product } = this.state;

    if(product) {
      return (
        <div>
          {this.state.login && <Navigate to="/login" replace="true"/>}
          <Page />
          <h2 className='mt-3'>Product Details</h2>
          <div className='container'>
            <div className="product-details-container">
              <div className="product-image-container">
                <img src={'./images' + product.imageUrl} alt="Product Image" className="product-details-image" />
              </div>
              <div className="product-details-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="quantity-input">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={this.state.quantity}
                  onChange={this.handleQuantityChange}
                />
              </div>
                <div className="action-buttons m-5">
                  <button className="add-to-cart-button" onClick={() => this.addToCheckout(product, this.state.quantity)}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default ProductDetails;
