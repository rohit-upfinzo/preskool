const express = require("express");
const userRouter = require("../routes/user.routes");
const adminRouter = require("../routes/admin.routes");
const coookieparser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(coookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

app.use("/", (err, req, res, next) => {
  res.status(500).json({
    status: "failed",
    message: err.message,
  });
});

module.exports = app;
