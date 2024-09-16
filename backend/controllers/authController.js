const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtToken");
const { isValidEmail, isValidText } = require("../utils/validation");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    let errors = {};
    if (userExist) {
      errors.email = "User already exist";
    }
    if (!isValidEmail( email )) {
      errors.email = "Invalid email";
    }
    if (!isValidText(username)) {
      errors.username = "Invalid username";
    }
    if (
      !isValidText( password ) ||
      !/[A-Z]/.test( password ) ||
      !/[a-z]/.test( password ) ||
      !/[0-9]/.test( password )
    ) {
      errors.password =
        "Password must be at least 8 characters long,and must include at least one number, upper case and lower case letter";
    }
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors })
    }
    const user = await User.create({ username, email, password });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let errors = {}
    const user = await User.findOne({ email });

    if (!user) {
      errors.auth = "Email or password are incorrect";
    } else {
      const userImage = user.image && `${process.env.BACKEND_URL}${user.image}`;
      if (await bcrypt.compare(password, user.password)) {
        return res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          image: userImage ? userImage : null,
          token: generateToken(user._id),
        });
      } else {
        errors.auth = "Email or password are incorrect";
      }
    }

    // If there are any errors, send a 400 response
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
