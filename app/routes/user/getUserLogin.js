const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const response = require("../../utils/response");
const verifyHash = require("../../utils/verifyHash");

const getUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE } = process.env;
  const userData = await User.findOne({ email });

  if (userData) {
    const { name, password: hash, key } = userData;
    const isCorrectPassword = await verifyHash(password, hash);

    if (isCorrectPassword) {
      const token = jwt.sign({ name, email }, ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: ACCESS_TOKEN_LIFE,
      });

      return response.success(res, { token, name, key });
    }
    return response.error(res, "This Email or Password is incorrect!");
  }
  return response.error(res, "This User doesn't exist!");
};

module.exports = getUserLogin;
