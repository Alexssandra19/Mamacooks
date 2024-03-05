import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div id="index_page">
        <header>
          <div id="head-section">
            <img src="./images/logo.png" alt="header-logo-image" width="10%" />
          </div>
          <div id="head-title">
            <h1>Delivering Deliciousness</h1>
            <button id="header-button"><a href="/products">ORDER NOW</a></button>
          </div>
        </header>
      </div>
    );
  }
}

export default Home;
