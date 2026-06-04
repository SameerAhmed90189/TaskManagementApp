require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");

const request = require("supertest");
const app = require("../app");

const User = require("../models/User");
const bcrypt = require("bcryptjs");
describe("Auth Routes", () => {

  beforeAll(async () => {
  await connectDB();

  const hashedPassword =
    await bcrypt.hash("password123", 10);

  await User.create({
    email: "test@test.com",
    password: hashedPassword
  });
});
  test("Login with valid credentials", async () => {

    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "test@test.com",
        password: "password123"
      });

    expect(response.statusCode).toBe(200);

  });

});