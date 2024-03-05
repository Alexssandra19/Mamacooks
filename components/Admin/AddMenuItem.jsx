import React, { useState } from 'react';
import Page from '../NavBar.jsx';
import Footer from '../Footer.jsx';
import MenuItem from '../../models/product.js';

class AddMenuItem extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            price: 0,
            restaurantID: '',
            category: '',
            imageUrl: '',
            products: []
        };
    }

    componentDidMount() {
        this.fetchData();
      }
    
    fetchData = async () => {
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
          this.setState({products: mappedMenuItems});
        } catch (error) {
          alert('Failed to get Menu Items');
          console.error('Failed to get Menu Items:', error);
        }
      };
    
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleDelete = async (productId) => {
        fetch(`/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    this.setState({ products: this.state.products.filter(product => product.id !== productId) });
                } else {
                    console.error('Failed to delete product');
                }
            })
            .catch(error => console.error('Failed to delete product:', error));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        // Add logic to send data to the server or perform any other actions
        console.log('New menu item:');
    
    // Prepare form data
    const formData = {
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        restaurantID: this.state.restaurantID,
        category: this.state.category,
        imageUrl: this.state.imageUrl,
    };
  
    try {
      // Make HTTP request to your backend API
      const response = await fetch('/api/register/menuItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      // Check if request was successful
      if (response.ok) {
        // Handle success
       alert('Item added successfully');
      } else {
        // Handle failure
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
        // Reset the form
        setMenuItem({
            name: '',
            description: '',
            price: 0,
            restaurantID: '',
            category: '',
            imageUrl: '',
        });
    };
    render() {
        return (
            <div>
                <Page />
                <div>
                    <h2>Add Menu Item</h2>
                    <form onSubmit={this.handleSubmit} className='form-box'>
                        <div className="mb-3">
                            <label for="name" class="form-label">Name:</label>
                            <input class="form-control" type="text"
                                name="name"
                                id="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                required>
                            </input>
                        </div>
                        <div className="mb-3">
                            <label for="description" class="form-label">Description:</label>
                            <textarea class="form-control"
                                id="description"
                                rows="3"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange}
                                required>
                            </textarea>
                        </div>
                        <div className="mb-3">
                            <label for="price" class="form-label">Price:</label>
                            <input class="form-control" type="number"
                                name="price"
                                id="price"
                                value={this.state.price}
                                onChange={this.handleChange}
                                required>
                            </input>
                        </div>
                        <div className="mb-3">
                            <label for="restaurantID" class="form-label">Resturant ID:</label>
                            <input class="form-control" type="text"
                                name="restaurantID"
                                id="restaurantID"
                                value={this.state.restaurantID}
                                onChange={this.handleChange}
                                required>
                            </input>
                        </div>
                        <div className="mb-3">
                            <label for="category" class="form-label">Category:</label>
                            <input class="form-control" type="text"
                                name="category"
                                id="category"
                                value={this.state.category}
                                onChange={this.handleChange}
                                required>
                            </input>
                        </div>
                        <div className="mb-3">
                            <label for="imageUrl" class="form-label">Image Url:</label>
                            <input class="form-control" type="text"
                                name="imageUrl"
                                id="imageUrl"
                                value={this.state.imageUrl}
                                onChange={this.handleChange}
                                required>
                            </input>
                        </div>
                        <button className='btn btn-success' type="submit">Add Menu Item</button>
                    </form>
                </div>
                <div className='container'>
                    <h2>Existing Products</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Restaurant ID</th>
                                <th scope="col">Category</th>
                                <th scope="col">Image Url</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map(product => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>${product.price}</td>
                                    <td>{product.restaurantID}</td>
                                    <td>{product.category}</td>
                                    <td>{product.imageUrl}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => this.handleDelete(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }
}

export default AddMenuItem;
