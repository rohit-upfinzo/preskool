const jwt = require("jsonwebtoken");

const generateToken = (res, user) => {
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "24h",
    },
  );

  res.cookie("token", token);

  return token;
};

module.exports = generateToken;
