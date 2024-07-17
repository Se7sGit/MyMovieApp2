const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
  },

  {
    timestamps: true,
  }
);

// try to use "trim" for whitespaces  trim:true
// is admin , bolean type => mn al m3lm abo zoz

const User = mongoose.model("User", userSchema);
exports.User = User;
