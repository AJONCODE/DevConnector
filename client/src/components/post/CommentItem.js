import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  handleDeleteClick(post_id, comment_id) {
    this.props.deleteComment(post_id, comment_id);
  }

  render() {
    const { post_id, comment, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/profiles">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt="comment.name"
              />
            </Link>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user._id ? (
              <button
                onClick={this.handleDeleteClick.bind(
                  this,
                  post_id,
                  comment._id
                )}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  post_id: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
