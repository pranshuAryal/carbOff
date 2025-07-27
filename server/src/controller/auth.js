import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth.js";
import jwt from 'jsonwebtoken';
import env from "../config/env.js";



const JWT_SECRET = env.JWT_SECRET || "your_super_secret_key";


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({
      access_token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const userObject = user.toObject();
    delete userObject.password;

    res.status(201).json(userObject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const me = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization header received:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Token extracted:", token);

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token payload:", decoded);

    const userId = decoded.id;
    console.log("UserId used for DB query:", userId);

    if (!userId) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    const user = await User.findById(userId).select('username email');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    console.error('Error fetching authenticated user:', error.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};