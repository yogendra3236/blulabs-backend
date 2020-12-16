const bcrypt = require("bcryptjs");

// password hash verification method
const verifyHash = async (password, hash) => {
  const isUser = bcrypt.compareSync(password, hash);
  return isUser;
};

module.exports = verifyHash;