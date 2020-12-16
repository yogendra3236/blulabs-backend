const express = require("express");
// express-router
const Router = express.Router();
const jwtVerification = require("../middlewares/jwtVerification");

const {
  USER_LOGIN_API,
  USER_SIGNUP_API,
  USER_INFO_API,
  USER_GET_LOCATIONS_API,
  USER_ADD_BOOKING_API,
} = require("../constants/api");

const getUserLogin = require("./user/getUserLogin");
const getUserSignup = require("./user/getUserSignup");
const getUserInfo = require("./user/getUserInfo");
const getLocations = require("./user/getLocations");
const postNewBooking = require("./user/postNewBooking");

// user-login-api
Router.post(USER_LOGIN_API, getUserLogin);

// user-signup api
Router.post(USER_SIGNUP_API, getUserSignup);

/**
 * jwt-verification-middleware for protected-routes
 */
Router.use(jwtVerification);

// get user-info api
Router.get(USER_INFO_API, getUserInfo);

// get all the pumps' loations in asc order of the distances
Router.post(USER_GET_LOCATIONS_API, getLocations);

// fill new booking form
Router.post(USER_ADD_BOOKING_API, postNewBooking);

module.exports = Router;
