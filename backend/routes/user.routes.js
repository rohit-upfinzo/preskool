const express = require("express");
const authController = require("../controllers/auth.controllers");
const { authMiddleware } = require("../middlwares/authMiddleware");

const userRouter = express.Router();

userRouter.route("/login").post(authController.login);
userRouter.route("/signup").post(authController.signup);
userRouter.route("/verify").get(authMiddleware, authController.verifyUser);
userRouter.route("/send-otp").post(authController.sendOtp);
userRouter.route("/verify-otp").post(authController.verifyOtp);
userRouter.route("/reset-password").post(authController.resetPassword);

module.exports = userRouter;
