import React from 'react';
import Page from "./NavBar.jsx";

class ProductDetails extends React.Component {
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
        <div class="product-container">
        <img src="./images/veg_Pics/Masala_Bhindi.jpg" alt="Product Image" class="product-image" />
        <div class="product-details">
            <h1>Masala Bhindi</h1>
            <p> there’s one classic bhindi (okra) dish with North Indian flavors, it is the Bhindi Masala. This is a semi-dry preparation featuring the star ingredient okra pods (bhindi in Hindi), piquant onions, tangy tomatoes, bold Indian spices and herbs. It is one of the most popular dishes served in almost all restaurants too, of North India.
            </p>
            <a href="#" class="button">Add to Cart</a>
        </div>
    </div>
        </main>
        <footer>
          <p>MAMA Cook &reg; 2024</p>
        </footer>
      </div>
    );
  }
}

export default ProductDetails;
