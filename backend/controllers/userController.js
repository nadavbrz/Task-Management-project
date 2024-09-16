const User = require("../models/Users");
const fs = require("fs");
const path = require("path");
const { generateToken } = require("../utils/jwtToken");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    const userImage = user.image && `${process.env.BACKEND_URL}${user.image}`;

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      image: userImage ? userImage : null,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user profile" }, error.message);
  }
};
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.username = req.body.username || user.email;
      user.email = req.body.email || user.email;
      if (req.file) {
        if (user.image) {
          const oldImagePath = path.join(__dirname, "..", user.image);
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error("Failed to delete old image: ", err);
            } else {
              console.log("Old image deleted successfully");
            }
          });
        }
        const imagePath = `/uploads/${req.file.filename}`;
        user.image = imagePath;
      }
      const updatedUser = await user.save();
      const userImage =
        updatedUser.image && `${process.env.BACKEND_URL}${updatedUser.image}`;
      res.json({
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        image: userImage ? userImage : null,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.image) {
      const imagePath = path.join(__dirname, "..", user.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image: ", err);
        } else {
          console.log("User image deleted successfully");
        }
      });
    }

    await User.deleteOne({ _id: req.params.id});
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUserImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.image) {
      const imagePath = path.join(__dirname, "..", user.image);
      console.log("Attempting to delete image at:", imagePath);

      fs.unlink(imagePath, async (err) => {
        if (err) {
          console.error("Failed to delete image: ", err);
          return res.status(500).json({ message: "Failed to delete image" });
        }

        console.log("User image deleted successfully");

        user.image = null;
        try {
          await user.save();
          res.json({ success: true, message: "Image deleted successfully" });
        } catch (saveError) {
          console.error("Failed to save user after image deletion:", saveError);
          res.status(500).json({ message: "Failed to update user" });
        }
      });
    } else {
      res.status(400).json({ message: "No image to delete" });
    }
  } catch (error) {
    console.error("Error deleting user image:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getUserProfile, updateUserProfile, getAllUsers, deleteUser,deleteUserImage };
