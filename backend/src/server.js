const app = require("./app");
const dotenv = require("dotenv");
const connectDb = require("../config/database");

dotenv.config();

const { PORT } = process.env;

connectDb()
  .then(() => {
    console.log(`Database is connected successfully`);
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Database is not connected due to ${err.message}`);
  });
