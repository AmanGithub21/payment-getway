const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const nodemailerFunciton = require("../nodemailer");

router.get("/verification/:token", async (req, res) => {
  try {
    console.log("i ran");
    const result = await jwt.verify(req.params.token, process.env.JWT_KEY);
    // console.log(result.user);
    if (result) {
      const user = await User.findById(result.user._id);
      user.isVerified = true;
      await user.save();
      return res.status(200).json("User Verified");
    }
  } catch (error) {
    if (error.message === "jwt malformed")
      return res.status(200).json("User token is incorrect");
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(200).json("User already exist.");
    const user = new User({
      email,
      password: await bcrypt.hash(password, 5),
    });
    const token = await jwt.sign({ user }, process.env.JWT_KEY);
    await user.save();
    await nodemailerFunciton(email, token);
    return res.status(200).json("Verification mail sent successfully");
  } catch (error) {
    console.error({ message: error.message, stack: error.stack });
    return res.status(200).json("Error occured while signup");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json("User does not exist");
    const result = await bcrypt.compare(password, user.password);
    if (!result) return res.status(200).json("Password Incorrect.");
    return res.status(200).json("Logged In");
  } catch (error) {
    console.error({ message: error.message, stack: error.stack });
    return res.status(200).json("Error occured while signup");
  }
});

module.exports = router;
