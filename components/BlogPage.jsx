import React, { Component } from 'react';
import BlogPost from './BlogPost.jsx';
import Feedback from '../models/feedback.js';

class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPosts: [],
      currentIndex: 0,
    };
  }

  fetchBlogData = async () => {
    try {
      const response = await fetch('/api/blogposts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch feedback data');
      }

      const feedbackData = await response.json();
      const mappedFeedback = feedbackData.data.map((feedback) => {
        return new Feedback(feedback);
      });
      this.setState({blogPosts: mappedFeedback});
    } catch (error) {
      alert('Failed to get feedback data');
      console.error('Failed to get feedback data:', error);
    }
  };

  async componentDidMount() {
    await this.fetchBlogData();
    this.startAutoCycle();
  }

  componentWillUnmount() {
    this.stopAutoCycle();
  }

  startAutoCycle = () => {
    this.timerID = setInterval(this.handleNext, 5000); // Change post every 5 seconds
  };

  stopAutoCycle = () => {
    clearInterval(this.timerID);
  };

  handleNext = () => {
    const { currentIndex, blogPosts } = this.state;
    let nextIndex = (currentIndex + 1) % blogPosts.length;
    const dataFromSession = sessionStorage.getItem('Name');
    const isLoggedIn = dataFromSession ? true : false;
    if(!isLoggedIn && nextIndex == (blogPosts.length - 2)) {
      nextIndex = 0;
    } else if (nextIndex == (blogPosts.length - 1)) {
      nextIndex = 0;
    } else {
      nextIndex = nextIndex;
    }
    this.setState({ currentIndex: nextIndex });
  };

  render() {
    const dataFromSession = sessionStorage.getItem('Name');
    const isLoggedIn = dataFromSession ? true : false;
    const { blogPosts, currentIndex } = this.state;
    const currentPost = blogPosts[currentIndex];
    const secondPost = blogPosts[currentIndex + 1];
    const thirdPost = blogPosts[currentIndex + 2];
    if(currentPost) {
      if(isLoggedIn) {
        return (
          <div className="blog-page">
            <div className="blog-posts">
                <BlogPost post={currentPost} />
                <BlogPost post={secondPost} />
            </div>
          </div>
        );
      } else {
        return (
          <div className="blog-page">
            <div className="blog-posts">
                <BlogPost post={currentPost} />
                <BlogPost post={secondPost} />
                <BlogPost post={thirdPost} />
            </div>
          </div>
        );
      }
      
    } else {
      <div></div>
    }  
  }
}

export default BlogPage;
