var passport = require("passport");
const bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");

var User = require("../models/user.model");
const saltRounds = 10;

const signup = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).json({ message: "All fields are required" });
  }
  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    profileImage: req.body.profileImage,
    password: req.body.password,
  });

  await User.findOne({ email: newUser.email })
    .then(async (profile) => {
      if (!profile) {
        await newUser
          .save()
          .then(() => {
            res.json({ data: newUser, success: true });
          })
          .catch((err) => {
            console.log("Error is ", err);
            res.json({ message: err.message, success: false });
          });
      } else {
        res.json({ message: "User already exists...", success: false });
      }
    })
    .catch((err) => {
      console.log("Error is", err.message);
      res.json({ message: err.message, success: false });
    });
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: "All fields are required" });
  }

  var newUser = {};
  newUser.email = req.body.email;
  newUser.password = req.body.password;

  await User.findOne({ email: newUser.email })
    .then((profile) => {
      if (!profile) {
        res.json({ message: "User don't exists...", success: false });
      } else {
        bcrypt.compare(
          newUser.password,
          profile.password,
          async (err, result) => {
            if (err) {
              console.log("Error is", err.message);
              res.json({ message: err.message, success: false });
            } else if (result == true) {
              //   res.send("User authenticated");
              const payload = {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                profileImage: profile.profileImage,
              };
              jsonwt.sign(
                payload,
                process.env.SECRET_KEY,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) {
                    console.log("Error is ", err.message);
                    res.json({ message: err.message, success: false });
                  }
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            } else {
              res.json({ message: "User Unauthorized Access", success: false });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.json({ message: err.message, success: false });
    });
};

const profile = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
  });
};

module.exports = { signup, login, profile };
