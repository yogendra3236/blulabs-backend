const response = require("../../utils/response");

const getUserInfo = async (req, res) => {
  const { name, email } = req.decoded;
  return response.success(res, { name, email });
};

module.exports = getUserInfo;
