const Validator = require("validator");

const isEmpty = require("./is-empty");

const validatePostInput = data => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 50 })) {
    errors.text = "Post must be between 10 and 50 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validatePostInput;
