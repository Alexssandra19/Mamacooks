import React, { useState } from 'react';
import Page from '../NavBar.jsx';
import Footer from '../Footer.jsx';

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
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
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
                        <button type="submit">Add Menu Item</button>
                    </form>
                </div>

                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }
}

export default AddMenuItem;
