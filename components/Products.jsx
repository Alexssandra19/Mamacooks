import React from 'react';
import Page from "./NavBar.jsx";

class Products extends React.Component {
  render() {
    return (
      <div>
         <header>
        <div id="head-section">
            <img src="./images/logo.png" alt="header-logo-image" width="10%" />
            <Page />
          </div>
          <h1>Products</h1>
        </header>
        <main>
          <section className="productContainer">
            <div>
              <h2>Vegetarian Items</h2>
              <div className="product-card">
                <img src="./images/veg_Pics/Mushroom-Curry.avif" alt="Vegetarian Item Name" className="product-image" />
                <h3>Creamy Mashroom</h3>
              </div>
              <div className="product-card">
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
                </div>
            </div>
            <div>
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
            </div>
          </section>
        </main>
        <footer>
          <p>MAMA Cook &reg; 2024</p>
        </footer>
      </div>
    );
  }
}

export default Products;
