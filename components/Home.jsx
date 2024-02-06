import React, { Component } from 'react';
import Page from "./NavBar.jsx";

class Home extends Component {
  render() {
    return (
      <div id="index_page">
        <header>
        
          <div id="head-section">
            <img src="./images/logo.png" alt="header-logo-image" width="10%" />
            <Page />
          </div>
          <div id="head-title">
            <h1>Delivering Deliciousness</h1>
           
            <button id="header-button"><a href="about.html">ORDER NOW</a></button>
          </div>
        </header>

        
      </div>
    );
  }
}

export default Home;
