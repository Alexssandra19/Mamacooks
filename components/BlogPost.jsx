import React, { Component } from 'react';

class BlogPost extends Component {
    renderStars(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <span key={i} className={i <= rating ? "star filled" : "star"}>
              &#9733;
            </span>
          );
        }
        return stars;
      }
  render() {
    const { post } = this.props;
    return (
      <div className="feedback-card">
        <div className="feedback-content">
          <p className="feedback-text">{post.comment}</p>
          <div className="feedback-rating">
            {this.renderStars(post.rating)}
            <span className="rating">{post.rating}/5</span>
          </div>
          <span className="person-name">-{post.firstName} {post.lastName}</span>
          {post.reply && (
            <div className="reply-field">
              <strong>Reply:</strong> {post.reply}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BlogPost;