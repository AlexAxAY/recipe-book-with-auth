const Register = require("../models/User/Register/RegisterSchema");
const registerSchema = require("../models/User/Register/RegisterValidSchema");
const loginSchema = require("../models/User/Login/LoginValSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errMsg = {};
    error.details.forEach((e) => (errMsg[e.context.key] = e.message));
    return res.status(400).json(errMsg);
  }
  try {
    const { name, email, password, confirmPassword } = req.body;

    const user = await Register.findOne({ email });
    if (user) {
      return res.status(400).json(["User already exist!"]);
    }

    if (password !== confirmPassword) {
      return res.status(400).json(["Passwords mismatch!"]);
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Register({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, "helloworld", {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.log("Error in registration", error);
  }
};

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((m) => m.message);
    console.log("Error message from backend", errMsg);
    return res.status(400).json(errMsg);
  }

  try {
    const { email, password } = req.body;

    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(400).json(["Invalid credentials!"]);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json(["Invalid credentials!"]);
    }

    const token = jwt.sign({ id: user._id }, "helloworld", {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.log("Error in Signing in!", err);
  }
};

module.exports = { register, login };
