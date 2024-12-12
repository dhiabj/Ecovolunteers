const express = require("express");
const {
  deleteUser,
  followUser,
  getAllUsers,
  getUser,
  unfollowUser,
  updateUser,
} = require("../controller/usercontrollers");
const authMiddleWare = require("../middleware/AuthMiddleware");
const router = express.Router();

router.get("/:id", getUser);
router.get("/", getAllUsers);
router.put("/:id", authMiddleWare, updateUser);
router.delete("/:id", authMiddleWare, deleteUser);
router.put("/:id/follow",  followUser);
router.put("/:id/unfollow",   unfollowUser);

module.exports = router;
