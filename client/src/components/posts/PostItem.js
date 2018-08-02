import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";

import { deletePost, addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {
  handleDeleteClick(_id) {
    this.props.deletePost(_id);
  }

  handleLikeClick(_id) {
    this.props.addLike(_id);
  }

  handleUnlikeClick(_id) {
    this.props.removeLike(_id);
  }

  findIfUserLiked(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user._id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    // console.log("POST: ", this.props.post);
    // console.log("Logged-in user _id : ", this.props.auth.user._id);
    // console.log("Post user _id : ", this.props.post.user);
    // console.log("Post _id : ", this.props.post._id);

    const { post, auth, showActions } = this.props;
    // We are using showAction(we can name it) property for selecting a component only if we want

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt={post.name}
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.handleLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findIfUserLiked(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.handleUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user._id ? (
                  <button
                    onClick={this.handleDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propItems = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired, // Comes as a prop from PostFeed.js
  auth: PropTypes.object.isRequired
};

PostItem.defaultProps = {
  showActions: true
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
