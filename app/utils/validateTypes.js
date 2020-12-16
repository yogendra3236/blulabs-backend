const check = require("check-types");

// function to send response
const response = {
  error: (key, type) => ({ error: true, body: `"${key}" type is not ${type}` }),
  success: (body) => ({ error: false, body }),
};

// all the input-types
const inputTypes = {
  string: "string",
  number: "number",
  object: "object",
  date: "date",
  bool: "boolean",
  array: "array",
  arrayOf: {
    object: "array.of.object",
    string: "array.of.string",
  },
};

/**
 * method for validating inputTypes
 * @param {Object} types inputTypes
 * @param {Object} body req.body
 */

// to validate input-types
const validateInputTypes = async (types, body) => {
  console.log(body);
  // eslint-disable-next-line no-restricted-syntax
  for (const l of Object.keys(body)) {
    if (types[l] === "array.of.object") {
      if (!check.array.of.object(body[l])) {
        return response.error(l, types[l]);
      }
    } else if (types[l] === "array.of.string") {
      if (!check.array.of.string(body[l])) {
        return response.error(l, types[l]);
      }
    } else if (!check[types[l]](body[l])) {
      return response.error(l, types[l]);
    }
  }
  return response.success(body);
};

module.exports = {
  inputTypes,
  validateInputTypes,
};