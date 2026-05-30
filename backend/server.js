require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const authroutes=require("./routes/authroutes");
const taskRoutes=require("./routes/taskroutes");

const app = express();
// Connect Database
connectDB();

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/auth",authroutes);
app.use("/tasks",taskRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});