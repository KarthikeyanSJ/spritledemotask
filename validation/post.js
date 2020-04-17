const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";  

  // Title checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "Post Title is required";
  }

   // Description checks
 if (Validator.isEmpty(data.description)) {
    errors.description = "Post Description is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
