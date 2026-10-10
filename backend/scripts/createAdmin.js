// scripts/createAdmin.js
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../database/models/user.model");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("email=>", process.env.ADMIN_EMAIL);

  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  await User.create({
    name: "Admin",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD, // your pre-save hook will hash it
    roles: "admin",
    status: "active",
  });

  console.log("Admin created");
  process.exit(0);
})();
