const mongoose = require("mongoose");
const { Schema } = mongoose;

// pump-schema
const PumpSchema = new Schema({
  pumpName: {
    type: String,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bookings",
    },
  ],
});

// pump-model
const Pump = mongoose.model("Pump", PumpSchema);
module.exports = Pump;
