const express = require('express');
const { getUserProfile, updateUserProfile,getAllUsers, deleteUser, deleteUserImage } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const router = express.Router();

router
.route("/profile")
.get(protect , getUserProfile)
.put(protect , upload.single("image"),updateUserProfile);
router
.route("/all")
.get(protect , getAllUsers);
router
  .route('/:id')
  .delete(protect, deleteUser);
  router
  .route('/profile/image')
  .delete(protect , deleteUserImage)

module.exports = router