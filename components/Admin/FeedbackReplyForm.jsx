import React, { Component } from 'react';

class FeedbackReplyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reply: '',
    };
  }

  handleReplyChange = (event) => {
    this.setState({ reply: event.target.value });
  };

  handleReplySubmit = async (e) => {
    e.preventDefault();
    const { feedback } = this.props;
    const { reply } = this.state;

    // Prepare form data
    const formData = {
        _id : feedback._id,
        firstName: feedback.firstName,
        lastName: feedback.lastName,
        rating: feedback.rating,
        comment: feedback.comment,
        reply: reply
      };

    fetch(`/api/update/feedback/${feedback._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                console.log('Reply submitted:', reply);
                this.setState({ reply: '' });
            } else {
                console.error('Failed to add reply');
            }
        })
        .catch(error => console.error('Failed to add reply:', error));
  };

  render() {
    const { feedback } = this.props;
    const { reply } = this.state;

    return (
      <div className="feedback-container-admin">
        <div className="feedback">
          <p><strong>Name: </strong>{feedback.firstName} {feedback.lastName}</p>
          <p><strong>Rating: </strong>{feedback.rating}</p>
          <p><strong>Comment: </strong>{feedback.comment}</p>
        </div>
        <div className="reply-form">
          <form onSubmit={this.handleReplySubmit}>
            <label htmlFor="reply">Reply:</label>
            <textarea id="reply" value={reply} onChange={this.handleReplyChange} />
            <button type="submit">Submit Reply</button>
          </form>
        </div>
      </div>
    );
  }
}

export default FeedbackReplyForm;
