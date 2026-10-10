const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const hash = require("../../utils/hash");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required for signup"],
      min: [3, "Minimum length of name should be 3"],
      max: [256, "A name cannot be exceeded at length 256"],
    },
    email: {
      type: String,
      unique: [true, "User already registered with this email"],
      required: [true, "Email is required for signup"],
      validate: [validator.isEmail, "Please provide valid email"],
      tolowercase: true,
      trim: true,
    },
    password: {
      type: String,
      min: [3, "Minimum length of password should be 3"],
      max: [256, "A password cannot be exceeded at length 256"],
    },
    otpHash: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    otpAttempts: {
      type: Number,
    },
    roles: {
      type: String,
      enum: {
        values: ["admin", "teacher", "student"],
        message: "Role should be either admin, teacher or student",
      },
      //  default: "admin",
    },
    resetTokenHash: { type: String },
    resetTokenExpiry: { type: Date },
    inviteTokenHash: { type: String },
    inviteTokenExpiry: { type: Date },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password and confirm password should be same",
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
  }
});

userSchema.methods.generateOtp = async function () {
  const otp = crypto.randomInt(100000, 1000000).toString();
  this.otpHash = hash(otp);
  this.otpExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes from now
  this.otpAttempts = 0;
  await this.save();
  return otp;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
