const User = require("../database/models/user.model");
const generateToken = require("../utils/generateToken");
const { sendMail } = require("../utils/sendMail");
const validateFields = require("../utils/ValidateFields");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const hash = require("../utils/hash");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "Failed",
        message: "Please provide valid email and password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        status: "Failed",
        message: "Please provide valid email and password",
      });
    }

    const token = generateToken(res, user);

    res.status(200).json({
      status: "Success",
      message: "User Login successfully",
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, invitedTokenHash } =
      req.body;

    validateFields(req);
    console.log({ name, email, password, confirmPassword, invitedTokenHash });
    if (!invitedTokenHash) {
      return res.status(200).json({
        status: "Failed",
        message: "Please provide ivnitedToken",
      });
    }

    const tokenHash = hash(invitedTokenHash);

    const user = await User.findOne({
      email,
      inviteTokenHash: tokenHash,
      inviteTokenExpiry: { $gt: Date.now() },
    });
    console.log("tokenHash==>", user);
    if (!user) {
      return res.status(403).json({
        status: "Failed",
        message: "Invalid or expired invite",
      });
    }

    user.name = name;
    user.password = password;
    user.confirmPassword = confirmPassword; // only if your schema validates it
    user.inviteTokenHash = undefined;
    user.inviteExpiresAt = undefined;
    await user.save();

    const token = generateToken(res, user);

    res.status(200).json({
      status: "Success",
      message: "User signup successfully",
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "User Verified Successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(400).json({
      status: "success",
      message: "Something went wrong",
      error: error.message,
    });
  }
  res.send("user verified");
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide mail id to continue",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide valid e-mail id",
      });
    }

    const otp = await user.generateOtp();
    await sendMail({
      to: email,
      subject: "OTP for password reset",
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    });
    // Same response whether or not the user exists
    return res.status(200).json({
      status: "success",
      next: "verify_otp",
      message: "If an account exists for this email, an OTP has been sent.",
      otp,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const MAX_ATTEMPTS = 5;

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });

    const invalid = () => {
      return res
        .status(400)
        .json({ status: "Falied", message: "Invalid or OTP expired" });
    };
    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ status: "Falied", message: "OTP expired" });
    }
    console.log("I am in==>", otp);
    if (!user || !user.otpHash || user.otpExpiry < Date.now()) {
      return invalid();
    }

    if (user.otpAttempts >= MAX_ATTEMPTS) {
      user.otpHash = undefined;
      user.otpExpiry = undefined;
      await user.save();
      return res.status(429).json({
        status: "failed",
        message: "Too many attempts. Please request a new OTP.",
      });
    }

    if (user.otpHash !== hash(otp)) {
      user.otpAttempts += 1;
      await user.save();
      return invalid();
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.otpHash = undefined;
    user.otpExpiry = undefined;
    user.otpAttempts = 0;
    user.resetTokenHash = hash(resetToken);
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "OTP verified",
      next: "RESET_PASSWORD",
      token: resetToken,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, resetToken, confirmPassword } = req.body;
    console.log({ password, resetToken, confirmPassword });
    if (!password || !resetToken || !confirmPassword) {
      return res.status(400).json({
        status: "Failed",
        message: "Token and new password are required",
      });
    }

    const user = await User.findOne({
      resetTokenHash: hash(resetToken),
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: "Failed",
        message: "Invalid or expire token",
      });
    }

    console.log(user);
    user.password = password;
    user.resetTokenHash = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  login,
  signup,
  verifyUser,
  sendOtp,
  verifyOtp,
  resetPassword,
};
