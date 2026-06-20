require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authroutes = require("./routes/authroutes");
const taskRoutes = require("./routes/taskroutes");
const notificationRoutes = require("./routes/notificationroutes");
const analyticsRoutes = require("./routes/analyticsroutes");

const notFound = require("./middleware/notfoundmiddleware");
const errorHandler = require("./middleware/errormiddleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Task Management API Running");
});

app.use("/auth", authroutes);
app.use("/tasks", taskRoutes);
app.use("/notifications", notificationRoutes);
app.use("/analytics", analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
