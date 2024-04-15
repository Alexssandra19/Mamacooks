import React, { Component } from 'react';
import FeedbackReplyForm from './FeedbackReplyForm.jsx';
import Feedback from '../../models/feedback';

class AllFeedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackData: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchFeedbacks();
  }

  fetchFeedbacks = async () => {
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

      const feedbackDataFromApi = await response.json();
      const mappedFeedback = feedbackDataFromApi.data.map((feedback) => {
        return new Feedback(feedback);
      }).filter((feedback) => !feedback.reply);
      this.setState({feedbackData: mappedFeedback, loading: false});
    } catch (error) {
      this.setState({ error: error.message, loading: false }); 
      console.error('Failed to get feedback data:', error);
    }
  };

  render() {
    const { feedbackData, loading, error } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    return (
      <div>
        <h2>All Feedback</h2>
        {feedbackData.map(feedback => (
          <FeedbackReplyForm key={feedback._id} feedback={feedback} />
        ))}
      </div>
    );
  }
}

export default AllFeedback;
