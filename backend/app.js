require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authroutes = require("./routes/authroutes");
const taskRoutes = require("./routes/taskroutes");
<<<<<<< HEAD
const collaborationRoutes = require("./routes/collaborationroutes");


=======
const notificationRoutes = require("./routes/notificationroutes");
const collaborationRoutes = require("./routes/collaborationroutes");
const analyticsRoutes = require("./routes/analyticsroutes");
>>>>>>> 58f1cc6468c759d7adb925c44188eec5fac85c6e

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
<<<<<<< HEAD
app.use("/api/collaboration",collaborationRoutes);
app.use("/api/notifications",notificationRoutes);
=======
app.use("/notifications", notificationRoutes);
app.use("/collaborate", collaborationRoutes);
app.use("/analytics", analyticsRoutes);
>>>>>>> 58f1cc6468c759d7adb925c44188eec5fac85c6e

app.use(notFound);
app.use(errorHandler);

<<<<<<< HEAD

module.exports = app;
=======
module.exports = app;
>>>>>>> 58f1cc6468c759d7adb925c44188eec5fac85c6e
