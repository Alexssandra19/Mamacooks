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
            editedProduct: null,
            sortedBy: null,
            sortOrder: 'asc',
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

    handleEditChange = (e, fieldName) => {
        console.log(e.target.value);
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
        // Prepare form data
        const formData = {
            _id: this.state.editedProduct._id,
            name: this.state.editedProduct.name,
            description: this.state.editedProduct.description,
            price: this.state.editedProduct.price,
            restaurantID: this.state.editedProduct.restaurantID,
            category: this.state.editedProduct.category,
            imageUrl: this.state.editedProduct.imageUrl,
        };
        fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
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

    // Function to handle sorting
    handleSort = (cri) => {
        if(!this.state.editMode) {
            const { products, sortedBy, sortOrder } = this.state;
        let newOrder = 'asc';

        // If already sorted by the same criteria, toggle the sort order
        if (cri === sortedBy) {
            newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        }

        // Perform sorting based on the selected criteria and order
        const sortedProducts = products.slice().sort((a, b) => {
            let comparison = 0;
            if (a[cri] > b[cri]) {
                comparison = 1;
            } else if (a[cri] < b[cri]) {
                comparison = -1;
            }
            return newOrder === 'desc' ? comparison * -1 : comparison;
        });

        // Update state with sorted products and sort criteria/order
        this.setState({
            products: sortedProducts,
            sortedBy: cri,
            sortOrder: newOrder,
        });
        }
    };

    render() {
        const { activeTab, editMode, editedProduct } = this.state;
        return (
            <div>
                <Page />
                <main className='container'>
                    <div className="tab-container">
                        <button
                            className={`btn-group tab-button ms-2 mb-2 ${activeTab === 'add' ? 'active' : ''}`}
                            onClick={() => this.handleTabChange('add')}
                        >
                            Add New Item
                        </button>
                        <button
                            className={`btn-group tab-button ms-2 mb-2 ${activeTab === 'edit' ? 'active' : ''}`}
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
                                            min="0"
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
                                        <select
                                            className="form-select"
                                            name="category"
                                            id="category"
                                            value={this.state.category}
                                            onChange={this.handleChange}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option value="veg">Vegeterian</option>
                                            <option value="nonVeg">Non-Veg</option>
                                        </select>
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
                                            <th scope="col"></th>
                                            <th scope="col" onClick={() => this.handleSort('name')}>Name {this.state.sortedBy === 'name' && <span>{this.state.sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
                                            <th scope="col" onClick={() => this.handleSort('description')}>Description {this.state.sortedBy === 'description' && <span>{this.state.sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
                                            <th scope="col" onClick={() => this.handleSort('price')}>Price {this.state.sortedBy === 'price' && <span>{this.state.sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
                                            <th scope="col" onClick={() => this.handleSort('restaurantID')}>Restaurant ID {this.state.sortedBy === 'restaurantID' && <span>{this.state.sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
                                            <th scope="col" onClick={() => this.handleSort('category')}>Category {this.state.sortedBy === 'category' && <span>{this.state.sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
                                            <th scope="col" onClick={() => this.handleSort('imageUrl')}>Image Url {this.state.sortedBy === 'imageUrl' && <span>{this.state.sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
                                            <th scope="col">Actions</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.products.map(product =>
                                        (
                                            <tr key={product._id}>
                                                <td>{product.id}</td>
                                                <td>
                                                    {editMode && editedProduct._id === product._id ? (
                                                        <input
                                                            type="text"
                                                            value={editedProduct.name}
                                                            onChange={(e) => this.handleEditChange(e, 'name')}
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
                                                            onChange={(e) => this.handleEditChange(e, 'description')}
                                                        />
                                                    ) : (
                                                        product.description
                                                    )}
                                                </td>
                                                <td>
                                                    {editMode && editedProduct._id === product._id ? (
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={editedProduct.price}
                                                            onChange={(e) => this.handleEditChange(e, 'price')}
                                                        />
                                                    ) : (
                                                        product.price
                                                    )}
                                                </td>
                                                <td>
                                                    {editMode && editedProduct._id === product._id ? (
                                                        <input
                                                            type="text"
                                                            value={editedProduct.restaurantID}
                                                            onChange={(e) => this.handleEditChange(e, 'restaurantID')}
                                                        />
                                                    ) : (
                                                        product.restaurantID
                                                    )}
                                                </td>
                                                <td>
                                                    {editMode && editedProduct._id === product._id ? (
                                                        <select
                                                            value={editedProduct.category}
                                                            onChange={(e) => this.handleEditChange(e, 'category')}
                                                            className="form-select"
                                                        >
                                                            <option value="">Select Category</option>
                                                            <option value="veg">Vegeterian</option>
                                                            <option value="nonVeg">Non-Veg</option>
                                                        </select>
                                                    ) : (
                                                        product.category
                                                    )}
                                                </td>
                                                <td>
                                                    {editMode && editedProduct._id === product._id ? (
                                                        <input
                                                            type="text"
                                                            value={editedProduct.imageUrl}
                                                            onChange={(e) => this.handleEditChange(e, 'imageUrl')}
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
                                                </td>
                                                <td>
                                                    <button className='btn btn-danger ms-2' onClick={() => this.handleDelete(product._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : <div></div>}
                    </div>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        );
    }
}

export default AddMenuItem;
