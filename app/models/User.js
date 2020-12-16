const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

// user-schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: "Invalid Email Address" });
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// user-model
const User = mongoose.model("User", UserSchema);
module.exports = User;
