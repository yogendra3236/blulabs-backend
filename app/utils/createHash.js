const bcrypt = require("bcryptjs");

// password hash create method
const createHash = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = createHash;