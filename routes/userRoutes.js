const express = require("express");
const {
  registerUser,
  loginControlers,
  getAllUser,
  getUserDetails,
  delteUser,
  updateUser,
} = require("../controllers/userControllers");
const { requireSign, isAdmin } = require("../middleware/userMiddlerware");
const router = express.Router();

// User Register
router.post("/register", registerUser);

// User Login
router.post("/login", loginControlers);

// Get All User
router.get("/getusers", requireSign, isAdmin, getAllUser);

// Get Sepefic User
router.get("/getuser/:id", requireSign, isAdmin, getUserDetails);

// delet users
router.delete("/deleteuser/:id", requireSign, isAdmin, delteUser);

// update user
router.put("/updaeuser/:id", requireSign, isAdmin, updateUser);

module.exports = router;
