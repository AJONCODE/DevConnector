const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validatePostInput = require("../../validation/post");
const validateCommentInput = require("../../validation/comment");

// Load Models
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

// @route GET api/posts/test
// @desc Tests posts route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route GET api/posts
// @desc Get all posts
// @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noposts: "No posts found" }));
});

// @route GET api/posts/:_id
// :_id is posts _id
// @desc Get a post
// @access Public
router.get("/:_id", (req, res) => {
  Post.findById(req.params._id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopost: "No post found with this _id" })
    );
});

// @route POST api/posts/
// @desc Create posts
// @access Private
router.post(
  "/",
  passport.authenticate("JwtStrategy", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user._id
    });

    // Create new post
    newPost.save().then(post => res.json(post));
  }
);

// @route DELETE api/posts/:_id
// :_id is posts _id
// @desc Delete a post
// @access Private
router.delete(
  "/:_id",
  passport.authenticate("JwtStrategy", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id }).then(profile => {
      Post.findById(req.params._id)
        .then(post => {
          // Check for the post owner
          console.log(typeof post.user.toString());
          console.log(typeof req.user._id.toString());
          console.log(post.user);
          console.log(req.user._id);
          console.log(post.user.toString() !== req.user._id.toString());
          if (post.user.toString() !== req.user._id.toString()) {
            res.status(401).json({ notauthorized: "User not authorized" });
          } else {
            post.remove().then(() => res.json({ success: true }));
          }
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route POST api/posts/like/:_id
// :_id is posts _id
// @desc Like a post
// @access Private
router.post(
  "/like/:_id",
  passport.authenticate("JwtStrategy", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id }).then(profile => {
      Post.findById(req.params._id)
        .then(post => {
          let userLiked = post.likes.filter(
            like => like.user.toString() === req.user._id.toString()
          );
          //console.log(userLiked.length > 0);
          if (userLiked.length > 0) {
            res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          } else {
            // Add user _id to likes array
            post.likes.unshift({ user: req.user._id });

            // Save;
            post.save().then(post => res.json(post));
          }
        })
        .catch(err => res.status(404).json({ postnotfound: "No Post Found" }));
    });
  }
);

// @route POST api/posts/unlike/:_id
// :_id is posts _id
// @desc Unike a post
// @access Private
router.post(
  "/unlike/:_id",
  passport.authenticate("JwtStrategy", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id }).then(profile => {
      Post.findById(req.params._id)
        .then(post => {
          let userLiked = post.likes.filter(
            like => like.user.toString() === req.user._id.toString()
          );
          //console.log(userLiked.length === 0);
          if (userLiked.length === 0) {
            res
              .status(400)
              .json({ notliked: "User have not yet liked this post" });
          } else {
            // Get remove index
            // Always remember - typeof req.params.exp_id === String and typeof experience[0]._id === Object
            //console.log(typeof req.user._id);
            //const arr = post.likes.map(item => item.user);
            //console.log(typeof arr[0].toString());
            const removeIndex = post.likes
              // typeof item.user === Object
              .map(item => item.user.toString())
              .indexOf(req.user._id.toString());

            console.log("Index = ", removeIndex);

            if (removeIndex > -1) {
              // To remove an array item, we use splice
              post.likes.splice(removeIndex, 1);

              //Save
              post
                .save()
                .then(postData => res.json(postData))
                .catch(err => res.status(404).json(err));
            }
          }
        })
        .catch(err => res.status(404).json({ postnotfound: "No Post Found" }));
    });
  }
);

// @route POST api/posts/comment/:_id
// :_id is posts _id
// @desc Add a comment to a post
// @access Private
router.post(
  "/comment/:_id",
  passport.authenticate("JwtStrategy", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    // Check Validation
    if (!isValid) {
      console.log(req.body.text);
      return res.status(404).json(errors);
    }

    Post.findById(req.params._id)
      .then(post => {
        const newComment = {
          user: req.user._id,
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar
        };

        post.comments.unshift(newComment);
        // Save
        post
          .save()
          .then(post => res.json(post))
          .catch(err => res.status(404).json({ nopostfound: "No post found" }));
      })
      .catch(err => res.status(404).json({ nopostfound: "No post found" }));
  }
);

// @route DELETE api/posts/comment/:_id/:comment_id
// :_id is posts _id
// @desc Delete a comment from a post
// @access Private
router.delete(
  "/comment/:_id/:comment_id",
  passport.authenticate("JwtStrategy", { session: false }),
  (req, res) => {
    Post.findById(req.params._id)
      .then(post => {
        //Check if comment exists
        let commentMatch = post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        );
        // console.log(commentMatch);
        // console.log(commentMatch.length);
        if (commentMatch.length === 0) {
          return res.status(404).json({ nocomment: "Comment does not exist" });
        } else {
          // console.log(typeof req.params.comment_id);
          // Get remove index
          const removeIndex = post.comments
            // typeof item._id === Object
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);

          // console.log("Index = ", removeIndex);

          if (removeIndex > -1) {
            // To remove an array item, we use splice
            post.comments.splice(removeIndex, 1);

            //Save
            post
              .save()
              .then(postData => res.json(postData))
              .catch(err => res.status(404).json(err));
          }
        }
      })
      .catch(err => res.status(404).json({ nopostfound: "No post found" }));
  }
);

module.exports = router;
