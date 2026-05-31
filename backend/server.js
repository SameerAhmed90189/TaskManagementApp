require("dotenv").config();

const express = require("express");
const cors =require("cors");
const helmet=require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authroutes=require("./routes/authroutes");
const taskRoutes=require("./routes/taskroutes");


const notFound=require("./middleware/notfoundmiddleware");
const errorHandler=require("./middleware/errormiddleware")
const app = express();
// Connect Database
connectDB();

app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Task Management API Running");
});

app.use("/auth",authroutes);
app.use("/tasks",taskRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});