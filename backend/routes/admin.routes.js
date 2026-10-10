const express = require("express");
const adminController = require("../controllers/admin.controller");
const { authMiddleware } = require("../middlwares/authMiddleware");

const adminRouter = express.Router();

adminRouter
  .route("/send-signup-link")
  .post(authMiddleware, adminController.sendAccountCreationMail);

module.exports = adminRouter;
