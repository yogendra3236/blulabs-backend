const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

const User = require("../../models/User");
const createHash = require("../../utils/createHash");
const response = require("../../utils/response");

const getUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE } = process.env;
  const userData = await User.findOne({ email });

  if (userData) {
    return response.error(res, "This Email already exists!");
  }

  const hash = await createHash(password);
  const key = uuid();
  await new User({ name, email, password: hash, key }).save();
  const token = jwt.sign({ name, email }, ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: ACCESS_TOKEN_LIFE,
  });

  return response.success(res, { token, name, key });
};

module.exports = getUserSignup;
