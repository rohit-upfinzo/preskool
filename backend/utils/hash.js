const crypto = require("crypto");

const hash = (value) =>
  crypto.createHash("sha256").update(String(value)).digest("hex");

module.exports = hash;
