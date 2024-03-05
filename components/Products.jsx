import React , { useEffect, useState } from 'react';
import Page from "./NavBar.jsx";
import MenuItem from '../models/product.js';
import Footer from './Footer.jsx';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
      activeData: [],
      activeTab: ''
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
      this.setState({apiData: mappedMenuItems, activeData: mappedMenuItems});
    } catch (error) {
      alert('Failed to get Menu Items');
      console.error('Failed to get Menu Items:', error);
    }
  };

  setData = (tab) => {
    if(this.state.apiData) {
      let filteredResults = this.state.apiData;
      if(tab) {
        filteredResults = this.state.apiData.filter(item => {
          return item.category === tab; 
        });
      }
      this.setState({activeData: filteredResults});
    }
  }

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
    this.setData(tab);
  };

  addToCheckout = (event) => {
    console.log(event);
  }
  
  render() {
    const { apiData, activeTab, activeData } = this.state;
    return (
      <div>
          <Page />
          <h2>Products</h2>
        <main className='container'>
        <div className="tab-container">
                <button
                  className={`tab-button ms-2 mb-2 ${activeTab === '' ? 'active' : ''}`}
                  onClick={() => this.handleTabChange('')}
                >
                  All
                </button>
                <button
                  className={`tab-button ms-2 mb-2 ${activeTab === 'veg' ? 'active' : ''}`}
                  onClick={() => this.handleTabChange('veg')}
                >
                  Vegetarian
                </button>
                <button
                  className={`tab-button ms-2 mb-2 ${activeTab === 'nonVeg' ? 'active' : ''}`}
                  onClick={() => this.handleTabChange('nonVeg')}
                >
                  Non-vegetarian
                </button>
              </div>
          <section>
            <div>
              <div className="row m-0">
              {activeData ? activeData.map(item => (
                <div className="card bg-light m-2 p-3"  style={{ width: '19rem'}}>
                  <img src={'./images' + item.imageUrl} alt={item.name} className="card-img-top" style={{ height: '200px'}} />
                  <div class="card-body">
                    <h5 class="card-title">{item.name}</h5>
                    <p class="card-text h-25">{item.description}</p>
                    <strong class="card-text">Price: ${item.price}</strong>
                    <div className="mb-2 d-flex ">
                      <label htmlFor="quantity" className="form-label">Quantity:</label>
                      <input
                        type="number"
                        id="quantity"
                        className="form-control ms-3"
                        min="1"
                        defaultValue='1'
                      />
                    </div>
                    <button className="btn btn-primary w-100" onClick={() => this.addToCheckout()}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              )) :
                  <div className='ms-3'>
                    <h3><strong>No items to display</strong></h3>
                  </div>}
              </div>
              {/* <div className="card bg-light">
                <img src="./images/veg_Pics/Mushroom-Curry.avif" alt="Vegetarian Item Name" className="product-image" />
                <h3>Creamy Mashroom</h3>
              </div>
              <div className="card">
                    <img src="./images/veg_Pics/Full Platter.jpg" alt="Vegetarian Item Name" class="product-image"/>
                    <h3>Full Platter</h3>
                </div>

                <div className="product-card">
                    <img src="./images/veg_Pics/Masala_Bhindi.jpg" alt="Vegetarian Item Name" class="product-image"/>
                    <h3>Masala Bhindi</h3>
                </div>

                <div className="product-card">
                    <img src="./images/veg_Pics/Tava Pulav.jpg" alt="Vegetarian Item Name" class="product-image"/>
                    <h3>Tawa Pulav</h3>
                </div>

                <div className="product-card">
                    <img src="./images/veg_Pics/Paneer.jpg" alt="Vegetarian Item Name" class="product-image"/>
                    <h3>Paneer Butter Masala</h3>
                </div> */}
            </div>
            {/* <div>
              <h2>Non-vegetarian Items</h2>
              <div className="product-card">
                <img src="./images/Non_Veg_pics/Fish curry.jpg" alt="Non-Vegetarian Item Name" className="product-image" />
                <h3>Fish Curry</h3>
              </div>
              <div className="product-card">
                    <img src="./images/Non_Veg_pics/Tandoori Chicken.jpg" alt="Non-Vegetarian Item Name" class="product-image"/>
                    <h3>Tandoori Chicken</h3>
                </div>

                <div className="product-card">
                    <img src="./images/Non_Veg_pics/FullPlatter.jpg" alt="Non-Vegetarian Item Name" class="product-image"/>
                    <h3>FullPlatter</h3>
                </div>

                <div className="product-card">
                    <img src="./images/Non_Veg_pics/Chicken_Biryani.jpg" alt="Non-Vegetarian Item Name" class="product-image"/>
                    <h3>Chicken Biryani</h3>
                </div>

                <div className="product-card">
                    <img src="./images/Non_Veg_pics/Masala Prawns.jpg" alt="Non-Vegetarian Item Name" class="product-image"/>
                    <h3>Masala Prawns</h3>
                </div>
            </div> */}
          </section>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default Products;
