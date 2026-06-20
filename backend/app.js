require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authroutes = require("./routes/authroutes");
const taskRoutes = require("./routes/taskroutes");
const collaborationRoutes = require("./routes/collaborationroutes");



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
app.use("/api/collaboration",collaborationRoutes);
app.use("/api/notifications",notificationRoutes);

app.use(notFound);
app.use(errorHandler);


module.exports = app;