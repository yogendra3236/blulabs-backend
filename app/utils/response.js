/**
 * response function for sending various responses
 */

const response = {
  success: async (res, body) => {
    res.status = 200;
    return res.json({ msg: "success", error: false, body });
  },
  error: async (res, body) => {
    res.status = 400;
    return res.json({ msg: "failed", error: true, body });
  },
  serverError: async (res, body) => {
    res.status = 500;
    return res.json({ msg: "failed", error: true, body });
  },
};

module.exports = response;
