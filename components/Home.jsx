import React, { Component } from 'react';
import Feedback from './Feedback.jsx';
import BlogPage from './BlogPage.jsx';

class Home extends Component {
  render() {
    const dataFromSession = sessionStorage.getItem('Name');
    const isLoggedIn = dataFromSession ? true : false;
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
        {  isLoggedIn ?
        <section id="content" className="content">
          <div id="blog-section" className="blog-section">
            <BlogPage />
          </div>
          <div id="feedback-section" className="feedback-section">
            <Feedback />
          </div>
        </section>  :
        <section id="content" className="content">
        <div id="blog-section" className="blog-section">
          <BlogPage />
        </div>
      </section> }
      </div>
    );
  }
}

export default Home;
