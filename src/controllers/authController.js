import User from "../models/Users.js";
import { generateToken } from "../utils/generateToken.js";

//register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check if user email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    //if not then create new user
    const user = await User.create({
      name,
      email,
      password,
    });
    //generate token
    const token = generateToken(user._id);
    //if user created successfully
    if (user) {
      res.status(201).json({
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Register User Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "There is no user with this email" });
    }
    //check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    //generate token
    const token = generateToken(user._id);
    //if all good then send response
    res.status(200).json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
