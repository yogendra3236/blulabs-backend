const mongoose = require("mongoose");
const { Schema } = mongoose;

// booking-schema
const BookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  pump: {
    type: Schema.Types.ObjectId,
    ref: "Pumps",
  },
  bookings: [
    {
      fillingType: String,
      vehicle: String,
    },
  ],
});

// booking-model
const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
