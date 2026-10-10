const jwt = require("jsonwebtoken");
const User = require("../database/models/user.model");

module.exports.authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({
        status: "Failed",
        message: "Please login",
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_KEY);
    if (!decode) {
      return res.status(400).json({
        status: "Failed",
        message: "Please provide valid token",
      });
    }

    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(400).json({
        status: "Failed",
        message: "Please provide valid token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};
