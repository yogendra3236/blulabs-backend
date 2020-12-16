/**
 * jwt-token verification middleware
 */
const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const User = require("../models/User");

const jwtVerification = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  const accessKey = req.headers["access-key"];
  const { ACCESS_TOKEN_SECRET } = process.env;

  if (token) {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.statusCode = 400;
        console.log("jwt expired error", err);
        return response.error(res, err.message);
      }

      User.findOne({ email: decoded.email })
        .lean()
        .then(({ key }) => {
          if (accessKey === key) {
            req.decoded = decoded;
            req.accessKey = key;
            return next();
          }
          return response.error(res, "INVALID ACCESS KEY");
        })
        .catch((err) => console.log(err));
    });
  } else {
    res.statusCode = 400;
    return response.error(res, "INVALID JWT TOKEN");
  }
};

module.exports = jwtVerification;
