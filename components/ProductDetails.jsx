import React, { Component } from 'react';
import Page from "./NavBar.jsx";
import Footer from './Footer.jsx';
import MenuItem from '../models/product.js';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    const productId = '65e79847858deee2a047b7e2';
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

  render() {
    const { product } = this.state;

    if(product) {
      return (
        <div>
          <Page />
          <div className="product-details-container">
            <img src={'./images' + product.imageUrl} alt="Product Image" className="product-image" />
            <div className="product-details-content">
              <h1 className="product-name">{product.name}</h1>
              <p className="product-description">{product.description}</p>
              <button className="button" onClick={() => this.addToCart(product)}>Add to Cart</button>
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
