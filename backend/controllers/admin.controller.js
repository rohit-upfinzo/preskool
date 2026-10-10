const User = require("../database/models/user.model");
const hash = require("../utils/hash");
const { sendMail } = require("../utils/sendMail");
const crypto = require("crypto");

const sendAccountCreationMail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        status: "Failed",
        message: "Please provide email",
      });
    }

    if (req.user.roles != "admin") {
      return res.status(400).json({
        status: "Failed",
        message: "You are not authorised",
      });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        status: "failed",
        message: "User Already existed with this email",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const inviteTokenHash = hash(token);

    await User.findOneAndUpdate(
      { email },
      {
        email,
        inviteTokenHash,
        inviteTokenExpiry: Date.now() + 30 * 60 * 1000,
      },
      {
        upsert: true,
      },
    );

    const link = `${process.env.FRONTEND_URL}/signup?token=${token}&email=${encodeURIComponent(email)}`;

    await sendMail({
      to: email,
      subject: "Account Creation Link",
      text: `Hi, your account creation link is ${link}\nIt expires in 24 hours.`,
    });
    res.status(200).json({
      status: "Success",
      message: "Account creation link send successfully",
      link,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = { sendAccountCreationMail };
