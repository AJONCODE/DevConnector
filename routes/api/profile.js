const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// Load Model
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route GET api/profile/test
// @desc Tests profile route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route GET api/profile
// @desc Get user profile
// @access Private
router.get(
  "/",
  passport.authenticate("JwtStrategy", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user._id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "User Profile does not exist";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route GET api/profile/all
// @desc Get all profiles
// @access Public
router.get("/all", (req, res) => {
  const errors = {};

  // If we can't find profile with a handle then it will give no profile
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There are no profiles";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json({ noprofile: "There are no profiles" }));
});

// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  // If we can't find profile with a handle then it will give no profile
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this handle";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user _id
// @access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  // If we can't find profile with a user_id then it will throw the .catch error
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ noprofile: "There is no profile for this user" })
    );
});

// @route POST api/profile
// @desc Create user profile
// @access Private
router.post(
  "/",
  passport.authenticate("JwtStrategy", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    // This comes from header
    profileFields.user = req.user._id;
    // This comes from body
    if (req.body.handle) {
      profileFields.handle = req.body.handle;
    }
    if (req.body.company) {
      profileFields.company = req.body.company;
    }
    if (req.body.website) {
      profileFields.website = req.body.website;
    }
    if (req.body.location) {
      profileFields.location = req.body.location;
    }
    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    }
    if (req.body.status) {
      profileFields.status = req.body.status;
    }
    if (req.body.githubusername) {
      profileFields.githubusername = req.body.githubusername;
    }
    // Skills - Split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // Social
    profileFields.social = {};
    if (req.body.youtube) {
      profileFields.social.youtube = req.body.youtube;
    }
    if (req.body.facebook) {
      profileFields.social.facebook = req.body.facebook;
    }
    if (req.body.twitter) {
      profileFields.social.twitter = req.body.twitter;
    }
    if (req.body.linkedin) {
      profileFields.social.linkedin = req.body.linkedin;
    }
    if (req.body.instagram) {
      profileFields.social.instagram = req.body.instagram;
    }

    Profile.findOne({ user: req.user._id })
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user._id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          // Create
          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = "This handle already exists";
              res.status(400).json(errors);
            }
            // Create new profile
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile/experience
// @desc Add experience to a profile
// @access Private
router.post(
  "/experience",
  passport.authenticate("JwtStrategy", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    // Check Validation
    if (!isValid) {
      res.status(404).json(errors);
    }

    Profile.findOne({ user: req.user._id })
      .then(profile => {
        const newExperience = {};

        if (req.body.title) {
          newExperience.title = req.body.title;
        }
        if (req.body.company) {
          newExperience.company = req.body.company;
        }
        if (req.body.location) {
          newExperience.location = req.body.location;
        }
        if (req.body.from) {
          newExperience.from = req.body.from;
        }
        if (req.body.to) {
          newExperience.to = req.body.to;
        }
        if (req.body.current) {
          newExperience.current = req.body.current;
        }
        if (req.body.description) {
          newExperience.description = req.body.description;
        }

        // Add in front of experience array
        profile.experience.unshift(newExperience);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile/education
// @desc Add education to a profile
// @access Private
router.post(
  "/education",
  passport.authenticate("JwtStrategy", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    // Check Validation
    if (!isValid) {
      res.status(404).json(errors);
    }

    Profile.findOne({ user: req.user._id })
      .then(profile => {
        const newEducation = {};

        if (req.body.school) {
          newEducation.school = req.body.school;
        }
        if (req.body.degree) {
          newEducation.degree = req.body.degree;
        }
        if (req.body.fieldofstudy) {
          newEducation.fieldofstudy = req.body.fieldofstudy;
        }
        if (req.body.from) {
          newEducation.from = req.body.from;
        }
        if (req.body.to) {
          newEducation.to = req.body.to;
        }
        if (req.body.current) {
          newEducation.current = req.body.current;
        }
        if (req.body.description) {
          newEducation.description = req.body.description;
        }

        // Add in front of experience array
        profile.education.unshift(newEducation);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/profile/experience
// @desc Delete experience from a profile
// @access Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("JwtStrategy", { session: false }),
  (req, res) => {
    /*
    Profile.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { experience: { _id: req.params.exp_id } } },
      { new: true }
    )
      .then(profile => res.json(profile))
      .catch(err => res.status(400).json(err));
    */
    // OR
    Profile.findOne({ user: req.user._id })
      .then(profile => {
        // Get remove index
        // Always remember - typeof req.params.exp_id === String and typeof experience[0]._id === Object
        // console.log(typeof req.params.exp_id);
        const arr = profile.experience.map(item => item._id);
        // console.log(typeof arr[0].toString());
        const removeIndex = profile.experience
          // typeof item._id === Object
          .map(item => item._id.toString())
          .indexOf(req.params.exp_id);

        // console.log("Index = ", removeIndex);

        if (removeIndex > -1) {
          // To remove an array item, we use splice
          profile.experience.splice(removeIndex, 1);

          //Save
          profile
            .save()
            .then(profileData => res.json(profileData))
            .catch(err => res.status(404).json(err));
        } else {
          res.status(404).json({ noexperience: "No experience found" });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/profile/education
// @desc Delete education from a profile
// @access Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("JwtStrategy", { session: false }),
  (req, res) => {
    /*
    Profile.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { education: { _id: req.params.edu_id } } },
      { new: true }
    )
      .then(profile => res.json(profile))
      .catch(err => res.status(400).json(err));
    */
    // OR
    Profile.findOne({ user: req.user._id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item._id.toString())
          .indexOf(req.params.edu_id);

        if (removeIndex > -1) {
          // To remove an array item, we use splice
          profile.education.splice(removeIndex, 1);

          //Save
          profile
            .save()
            .then(profileData => res.json(profileData))
            .catch(err => res.status(404).json(err));
        } else {
          res.status(404).json({ noexperience: "No education found" });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/profile
// @desc Delete user and profile
// @access Private
router.delete(
  "/",
  passport.authenticate("JwtStrategy", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user._id }).then(() => {
      // Remove user
      User.findOneAndRemove({ _id: req.user._id }).then(() =>
        res.json({ success: true })
      );
    });
    //.catch(err => res.status(404).json(err));
  }
);

module.exports = router;
