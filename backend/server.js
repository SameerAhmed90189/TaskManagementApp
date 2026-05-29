require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const User = require("./models/User");
const Task = require("./models/Task");

const app = express();

app.use(express.json());

// Connect Database
connectDB();

// Home Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Test User Creation Route
app.get("/create-user", async (req, res) => {
  try {

    console.log("✅ /create-user route was hit");

    const user = await User.create({
      email: "baba@gmail.com",
      password: "12356"
    });

    console.log("✅ User created successfully:");
    console.log(user);

    res.status(201).json(user);

  } catch (error) {

    console.log("❌ Error creating user:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Test Route to Fetch All Users
app.get("/users", async (req, res) => {
  try {

    const users = await User.find();

    console.log(`✅ Found ${users.length} users`);

    res.status(200).json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});