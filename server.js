import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ================= SIGNUP =================
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Signup successful 🎉",
      user,
    });

  } catch (error) {
    console.log("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= LOGIN =================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 🔥 TOKEN
    const token = jwt.sign(
      { id: user._id },
      "secretkey123",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful 🔥",
      token,
      user,
    });

  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= 🔐 AUTH MIDDLEWARE =================
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const decoded = jwt.verify(token, "secretkey123");
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ================= 🔐 PROTECTED ROUTE =================
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route access granted 🔐",
    user: req.user,
  });
});

// ================= SERVER =================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});