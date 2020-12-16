const Booking = require("../../models/Booking");
const Pump = require("../../models/Pump");
const User = require("../../models/User");

const postNewBooking = async (req, res) => {
  const { fillingType, vehicle, _id: pumpId } = req.body;
  const { email } = req.decoded;
  const { _id: userId } = await User.findOne({ email });

  const doc = {
    user: userId,
    pump: pumpId,
    bookings: { $push: { fillingType, vehicle } }
  }

  const newBook = await new Booking(doc).save();
}

module.exports = postNewBooking;