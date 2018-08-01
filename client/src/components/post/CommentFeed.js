import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, post_id } = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} post_id={post_id} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  post_id: PropTypes.string.isRequired
};

export default CommentFeed;
