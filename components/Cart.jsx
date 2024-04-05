import React, { Component } from 'react';
import Page from "./NavBar.jsx";
import Footer from './Footer.jsx';
import CartItem from '../models/cartItem.js';
import MenuItem from '../models/product.js';
import Cart from '../models/cart.js';
import { Navigate } from 'react-router-dom';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      products: [],
      checkout: null,
      isPlaced: false
    };
  }

  componentDidMount() {
    this.getUserCheckout();
  }

  proceedCheckout = () => {
    const userId = sessionStorage.getItem('UserId');
    fetch(`/api/checkout/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.checkout)
    })
      .then(response => {
        if (response.ok) {
          this.setState({ isPlaced: true });
        } else {
          console.error('Failed to update product');
        }
      })
      .catch(error => console.error('Failed to update product:', error));
  }

  getUserCheckout = async () => {
    const userId = sessionStorage.getItem('UserId');
    if(userId) {
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
                    this.setState({checkout: userCheckout.data});
                    userCheckout.data?.items?.forEach(item => {
                        const product = mappedMenuItems.find(product => product._id == item.productId);
                        if (product) {
                            cartItems.push(new CartItem({ _id: item.productId, name: product.name, imageUrl: product.imageUrl, quantity: item.quantity, price: product.price }));
                        }
                    });
                    this.setState({ cartItems: cartItems });
                }
            } catch (error) {
                alert('Failed to get Menu Items');
                console.error('Failed to get Menu Items:', error);
            }
          }
        } catch (error) {
          alert('Failed to add checkout');
          console.error('Error adding checkout:', error);
        }
    }
  }

  handleDeleteItem = (id) => {
    const items = this.state.checkout.items.filter(item => item.productId != id);
    const userId = this.state.checkout.userId;
    let checkoutData = new Cart({
        userId,
        items
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
            alert('Checkout item deleted successfully');
            this.state.cartItems.filter(item => item._id != id)
            this.setState({ cartItems: cartItems});
            this.setState({checkout: userCheckout.data});
            const ref = useRef();
            ref.current.forceUpdate();
          } else {
            console.error('Failed to update product');
          }
        })
        .catch(error => console.error('Failed to update product:', error));
  }

  handleQuantityChange(itemId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (isNaN(newQuantity) || newQuantity <= 0) {
      return;
    }
  
    this.setState(prevState => ({
      cartItems: prevState.cartItems.map(item => {
        if (item._id == itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    }));
  
    let updatedCheckout = this.state.checkout;
    updatedCheckout.items = this.state.checkout?.items.map(item => {
          if (item.productId == itemId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        console.log(this.state.checkout);
  }

  render() {
    const { cartItems } = this.state;
    const subtotal = cartItems?.length > 0 ? cartItems.reduce((acc, item) => acc + item.price * item.quantity * 1.00, 0) : 0;
    const tax = subtotal * 0.13;
    const delivery = subtotal > 30.00 ? 0.00 : subtotal > 20.00 && subtotal < 30.00 ? 2.99 : 4.99;
    const total = subtotal + tax + 5.00 + delivery;
    return (
      <div>
        <Page />
        <h2 className='mt-3'>Your Cart</h2>
        {this.state.isPlaced && <Navigate to="/checkout" replace="true" />}
        <div className="container">
          <div className="row">
            {/* Cart Items Section */}
            <div className="col-md-8 mx-4">
              <div className="cart-items-container">
                {cartItems.length > 0 ? cartItems.map(item => (
                  <div key={item._id} className="cart-item">
                    <div className="d-flex">
                      <div className="col">
                        <img src={'./images' + item.imageUrl} alt={item.name} className="cart-item-image" />
                      </div>
                      <div className="col cart-item-details d-grid">
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-price">Price: ${item.price}</p>
                      </div>
                      <div className="col cart-item-quantity d-flex align-items-center ms-auto">
                        <label htmlFor={`quantity-${item._id}`}>Quantity:</label>
                        <input
                          className='m-2'
                          type="number"
                          id={`quantity-${item._id}`}
                          value={item.quantity}
                          onChange={(e) => this.handleQuantityChange(item._id, e.target.value)}
                          min="1"
                        />
                      </div>
                      <button className="col btn btn-danger ms-auto justify-content-center m-3 mb-4" onClick={() => this.handleDeleteItem(item._id)}>Delete</button>
                    </div>
                  </div>
                )) : <div className="d-flex justify-content-center">
                  <h3>Cart is empty</h3>
                </div>}
              </div>
            </div>
            {/* Price Details Section */}
            <div className="col-md-3">
              {cartItems.length > 0 &&
                  <div className="d-flex flex-column justify-content-center align-items-start">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h5 className="me-5 mt-2">Subtotal:</h5>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h5 className="me-5 mt-2">Delivery Charge:</h5>
                      <span>${delivery.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h5 className="me-5 mt-2">Tax:</h5>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h4 className="me-5 mt-2">Total Price:</h4>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <button type="button" onClick={() => this.proceedCheckout()} className="btn btn-success w-100 btn-lg mt-3">Checkout</button>
                  </div>
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>      
    );
  }
}

export default CartPage;
