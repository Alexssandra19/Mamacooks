import React, { Component } from 'react';
import Footer from "./Footer.jsx";

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      comment: '',
      submitted: false
    };
  }

  handleRatingChange = (e) => {
    this.setState({ rating: parseInt(e.target.value) });
  };

  handleCommentChange = (e) => {
    this.setState({ comment: e.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const dataFromSession = sessionStorage.getItem('Name').split(' ');
    // Prepare form data
    const formData = {
      firstName: dataFromSession[0],
      lastName: dataFromSession[1],
      rating: this.state.rating,
      comment: this.state.comment,
    };
  
    try {
      // Make HTTP request to your backend API
      const response = await fetch('/api/add/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      // Check if request was successful
      if (response.ok) {
        // Handle success 
       this.setState({ submitted: true });
       alert('Feedback added successfully');
      } else {
        // Handle failure
        alert('Failed to add feedback');
        console.error('Failed to add feedback');
      }
    } catch (error) {
      alert('Failed to add feedback');
      console.error('Error adding feedback:', error);
    }
  }

  render() {
    const { rating, comment, submitted } = this.state;
    
    if (submitted) {
      return (
        <div>
          <div className="feedback-container feedback-success">
            <h2>Thank you for your feedback!</h2>
            <p>We appreciate your input.</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="feedback-container">
          <h2>Give us your feedback</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">Rating:</label>
              <select id="rating" name="rating" className="form-control" value={rating} onChange={this.handleRatingChange} required>
                <option value={0}>Select a rating</option>
                <option value={1}>1 - Poor</option>
                <option value={2}>2 - Fair</option>
                <option value={3}>3 - Average</option>
                <option value={4}>4 - Good</option>
                <option value={5}>5 - Excellent</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Comment:</label>
              <textarea id="comment" name="comment" className="form-control" rows="4" value={comment} onChange={this.handleCommentChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit Feedback</button>
          </form>
        </div>
      </div>
    ); 
  }
}

export default Feedback;
