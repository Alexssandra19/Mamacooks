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
    this.setState({isPlaced: true});
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
                    this.setState({checkout: userCheckout.data})
                    userCheckout.data?.items?.forEach(item => {
                        const product = mappedMenuItems.find(product => product._id == item.productId);
                        if (product) {
                            cartItems.push(new CartItem({ _id: item.productId, name: product.name, imageUrl: product.imageUrl, quantity: item.quantity, price: product.price * item.quantity }));
                        }
                    });
                    this.setState({ cartItems });
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
    console.log(items);
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
            cartItems.filter(item => item._id != id)
            this.setState({ cartItems });
            const ref = useRef();
            ref.current.forceUpdate();
          } else {
            console.error('Failed to update product');
          }
        })
        .catch(error => console.error('Failed to update product:', error));
  }

  render() {
    const { cartItems } = this.state;
    const total = cartItems?.length > 0 ? cartItems.reduce((acc, item) => acc + item.price, 0) : 0;
    return (
        <div>
        <Page />
        {this.state.isPlaced && <Navigate to="/checkout" replace="true"/>}
        <div className="container">
          <h2 className="cart-heading">Your Cart</h2>
          <div className="cart-items-container">
            {cartItems.length > 0 ? cartItems.map(item => (
                <div key={item._id} className="cart-item">
                    <div className="d-flex">
                        <div>
                            <img src={'./images' + item.imageUrl} alt={item.name} className="cart-item-image" />
                        </div>
                        <div className="cart-item-details">
                            <h3 className="cart-item-name">{item.name}</h3>
                            <p className="cart-item-price">Price: ${item.price}</p>
                            <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                        </div>
                        <button className="btn btn-danger ms-auto justify-content-center" onClick={() => this.handleDeleteItem(item._id)}>Delete</button>
                    </div>
                </div>
            )) : <div className="d-flex justify-content-center">
                <h3>Cart is empty</h3>
                </div>}
          </div>
          { cartItems.length > 0 ? <div className="d-flex justify-content-center">
          <h4 className='me-5'>Total Price: ${total}</h4>
          <button type="button" onClick={() => this.proceedCheckout()} className="btn btn-primary btn-lg">Checkout</button>
          </div>
          : <div></div> }
        </div>
        <Footer />
      </div>      
    );
  }
}

export default CartPage;
