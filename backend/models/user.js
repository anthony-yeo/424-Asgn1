//import mongoose from "mongoose";
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    user: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    token: {
        type: String,
        require: true,
        trim: true,
    }
  },
  { collection: "users_list" }
);

const User =  mongoose.model("User", UserSchema);

module.exports = User;
