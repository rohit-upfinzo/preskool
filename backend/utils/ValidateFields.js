const validateFields = (req) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name) {
    throw new Error("Please provide name for signup");
  }
  if (!email) {
    throw new Error("Please provide email for signup");
  }
  if (!password) {
    throw new Error("Please provide password for signup");
  }
  if (!confirmPassword) {
    throw new Error("Please provide confirmPassword for signup");
  }
};

module.exports = validateFields;
