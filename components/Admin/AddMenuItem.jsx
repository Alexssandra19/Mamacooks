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
            products: [],
            activeTab: 'add',
            editMode: false,
            editedProduct: null
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
            this.setState({ products: mappedMenuItems });
        } catch (error) {
            alert('Failed to get Menu Items');
            console.error('Failed to get Menu Items:', error);
        }
    };


    handleEdit = (product) => {
        this.setState({
            editMode: true,
            editedProduct: product,
        });
    };

    handleChange = (e, fieldName) => {
        const { editedProduct } = this.state;
        const updatedProduct = { ...editedProduct, [fieldName]: e.target.value };
        this.setState({
            editedProduct: updatedProduct,
        });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleUpdate = async (productId) => {
        fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.editedProduct)
        })
            .then(response => {
                if (response.ok) {
                    this.fetchData();
                    this.setState({
                        editMode: false,
                        editedProduct: null,
                    });
                } else {
                    console.error('Failed to update product');
                }
            })
            .catch(error => console.error('Failed to update product:', error));
    };

    handleTabChange = (tab) => {
        this.setState({ activeTab: tab });
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
                    this.setState({ products: this.state.products.filter(product => product._id != productId) });
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
        this.setState({
            name: '',
            description: '',
            price: 0,
            restaurantID: '',
            category: '',
            imageUrl: '',
        });
    };
    render() {
        const { activeTab, editMode, editedProduct } = this.state;
        return (
            <div>
                <Page />
                <div className="tab-container">
                    <button
                        className={`tab-button ms-2 mb-2 ${activeTab === 'add' ? 'active' : ''}`}
                        onClick={() => this.handleTabChange('add')}
                    >
                        Add New Item
                    </button>
                    <button
                        className={`tab-button ms-2 mb-2 ${activeTab === 'edit' ? 'active' : ''}`}
                        onClick={() => this.handleTabChange('edit')}
                    >
                        Edit Item
                    </button>
                </div>
                <div>
                    {activeTab && activeTab === 'add' ? (
                        <div>
                            <h2>Add Menu Item</h2>
                            <form onSubmit={this.handleSubmit} className='form-box'>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name:</label>
                                    <input className="form-control" type="text"
                                        name="name"
                                        id="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description:</label>
                                    <textarea className="form-control"
                                        id="description"
                                        rows="3"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price:</label>
                                    <input className="form-control" type="number"
                                        name="price"
                                        id="price"
                                        value={this.state.price}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="restaurantID" className="form-label">Restaurant ID:</label>
                                    <input className="form-control" type="text"
                                        name="restaurantID"
                                        id="restaurantID"
                                        value={this.state.restaurantID}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category:</label>
                                    <input className="form-control" type="text"
                                        name="category"
                                        id="category"
                                        value={this.state.category}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="imageUrl" className="form-label">Image Url:</label>
                                    <input className="form-control" type="text"
                                        name="imageUrl"
                                        id="imageUrl"
                                        value={this.state.imageUrl}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <button className='btn btn-success' type="submit">Add Menu Item</button>
                            </form>
                        </div>
                    ) : <div></div>}
                    {activeTab && activeTab === 'edit' ? (
                        <div className='container'>
                            <h2>Existing Products</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Restaurant ID</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Image Url</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.products.map(product =>
                                    (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>
                                                {editMode && editedProduct._id === product._id ? (
                                                    <input
                                                        type="text"
                                                        value={editedProduct.name}
                                                        onChange={(e) => this.handleChange(e, 'name')}
                                                    />
                                                ) : (
                                                    product.name
                                                )}
                                            </td>
                                            <td>
                                                {editMode && editedProduct._id === product._id ? (
                                                    <input
                                                        type="text"
                                                        value={editedProduct.description}
                                                        onChange={(e) => this.handleChange(e, 'description')}
                                                    />
                                                ) : (
                                                    product.description
                                                )}
                                            </td>
                                            <td>
                                                {editMode && editedProduct._id === product._id ? (
                                                    <input
                                                        type="number"
                                                        value={editedProduct.price}
                                                        onChange={(e) => this.handleChange(e, 'price')}
                                                    />
                                                ) : (
                                                    product.price
                                                )}
                                            </td>
                                            <td>
                                                {editMode && editedProduct._id === product._id ? (
                                                    <input
                                                        type="text"
                                                        value={product.restaurantID}
                                                        onChange={(e) => this.handleChange(e, 'restaurantID')}
                                                    />
                                                ) : (
                                                    product.restaurantID
                                                )}
                                            </td>
                                            <td>
                                                {editMode && editedProduct._id === product._id ? (
                                                    <input
                                                        type="text"
                                                        value={product.category}
                                                        onChange={(e) => this.handleChange(e, 'category')}
                                                    />
                                                ) : (
                                                    product.category
                                                )}
                                            </td>
                                            <td>
                                                {editMode && editedProduct._id === product._id ? (
                                                    <input
                                                        type="text"
                                                        value={product.imageUrl}
                                                        onChange={(e) => this.handleChange(e, 'imageUrl')}
                                                    />
                                                ) : (
                                                    product.imageUrl
                                                )}
                                            </td>
                                            <td>
                                                {editMode && editedProduct._id === product._id ? (
                                                    <button className='btn btn-success' onClick={() => this.handleUpdate(product._id)}>Save</button>
                                                ) : (
                                                    <button className='btn btn-primary' onClick={() => this.handleEdit(product)}>Edit</button>
                                                )}
                                                <button className='btn btn-danger' onClick={() => this.handleDelete(product._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : <div></div>}
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }
}

export default AddMenuItem;
