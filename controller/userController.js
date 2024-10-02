const asyncHandler = require("express-async-handler");
const User = require("../models/usersSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      res.status(400);
      throw new Error("Email already used");
    } else {
      if (password.length < 8) {
        res.status(400);
        throw new Error("Password must be at least 8 character");
      } else {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const user = await User.create({
            username,
            email,
            password: hashedPassword,
          });

          if (user) {
            res.status(201).json({ _id: user.id, email: user.email });
          } else {
            throw new Error("user data is not valid");
          }
        } catch (error) {
          return res.status(400).json({ err: error.message });
        }
      }
    }
  } else {
    res.status(400);
    throw new Error("Field cannot be empty");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accesToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCES_TOKEN,
        {
          expiresIn: "8h",
        }
      );
      res.status(200).json({
        accesToken,
        user: { username: user.username, email: user.email },
      });
    } else {
      res.status(401);
      throw new Error("email or password is invalid");
    }
  } else {
    res.status(400);
    throw new Error("Email or password cannot be empty");
  }
});

const current = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
  if (!req.user) {
    console.log("null");
  }
  console.log(req.user);
});

module.exports = { register, login, current };
