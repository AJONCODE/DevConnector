import axios from "axios";

import {
  POST_LOADING,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  CLEAR_ERRORS
} from "./types";

// Add post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());

  axios
    .post("/api/posts", postData)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());

  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: null
      });
    });
};

// Get post
export const getPost = _id => dispatch => {
  dispatch(setPostLoading());

  axios
    .get(`/api/posts/${_id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POST,
        payload: null
      });
    });
};

// Delete post
export const deletePost = _id => dispatch => {
  axios
    .delete(`/api/posts/${_id}`)
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: _id // Using this way is fast (we can also send res.data, but it will be a bit slow)
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add like
export const addLike = _id => dispatch => {
  axios
    .post(`/api/posts/like/${_id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Remove like
export const removeLike = _id => dispatch => {
  axios
    .post(`/api/posts/unlike/${_id}`)
    .then(res => dispatch(getPosts()))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add comment
export const addComment = (post_id, commentData) => dispatch => {
  dispatch(clearErrors());

  axios
    .post(`/api/posts/comment/${post_id}`, commentData)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete comment
export const deleteComment = (post_id, comment_id) => dispatch => {
  axios
    .delete(`/api/posts/comment/${post_id}/${comment_id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Post Loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
