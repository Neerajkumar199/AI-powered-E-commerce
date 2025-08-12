import User from "../model/userModel.js";
import { genToken } from "../middleware/token.js";
import validator from "validator";
import bcrypt from "bcryptjs";
// import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
// ✅ Registration
export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic field validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter a valid email" });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter a strong password (min 8 chars)" });
    }

    // Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // Generate token
    const token = genToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      message: "Registration successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (error) {
    console.log("registration error", error.message);
    return res.status(500).json({ message: `Registration error: ${error.message}` });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate token
    const token = genToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (error) {
    console.log("login error", error.message);
    return res.status(500).json({ message: `Login error: ${error.message}` });
  }
};

// ✅ Logout
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("logout error", error.message);
    return res.status(500).json({ message: `Logout error: ${error.message}` });
  }
};
 
// Google with login 


export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // find existing user
    let user = await User.findOne({ email });

    // create if not exists (give a random password if schema requires one)
    if (!user) {
      const randomPassword = crypto.randomBytes(16).toString("hex");
      user = await User.create({
        name,
        email,
        password: randomPassword,
        authProvider: "google" // optional
      });
    }

    // ensure JWT secret exists
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("Missing JWT_SECRET in env");
      return res.status(500).json({ message: "Server misconfiguration: missing JWT_SECRET" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Google login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    // log full stack for debugging
    console.error("googleLogin error:", err.stack || err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};