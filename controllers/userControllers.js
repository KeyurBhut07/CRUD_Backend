const { hashPassword, comparPassword } = require("../helpers/auth");
const UserModel = require("../models/users");
const jwt = require("jsonwebtoken");

// register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exitsUser = await UserModel.findOne({ email });
    if (exitsUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register User This Email...!",
      });
    }

    const hashedPass = await hashPassword(password);
    const user = await new UserModel({
      name,
      email,
      password: hashedPass,
    }).save();
    res.status(201).send({
      success: true,
      message: "Register successfully..!",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something Went Wrong..!",
    });
  }
};

// Login user

const loginControlers = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Invalid Email or Login",
      });
    }

    //Check Email Register Or Not

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(204).send({
        success: false,
        message: "Email is not registered...!",
      });
    }

    const match = await comparPassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // token created
    const token = await jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" }
    );

    res.status(200).send({
      success: true,
      message: "Login Successfully...!",
      user: {
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something Went Wrong..!",
    });
  }
};

// get All user Details
const getAllUser = async (req, res) => {
  try {
    const user = await UserModel.find();
    if (user) {
      res.status(200).send({
        success: true,
        message: "Users Found",
        user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Somethig Went Wrong",
    });
  }
};

// Get Specific User Details
const getUserDetails = async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.params.id });
    if (user) {
      res.status(200).send({
        success: true,
        message: "Users Found",
        user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Somethig Went Wrong",
    });
  }
};

// delete user
const delteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).send({
        success: true,
        message: "User Deleted",
        user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something Went wrong",
    });
  }
};

//update users
const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (user) {
      res.status(200).send({
        success: true,
        message: "User Updated",
        user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something Went wrong",
    });
  }
};

module.exports = {
  loginControlers,
  registerUser,
  getAllUser,
  getUserDetails,
  delteUser,
  updateUser,
};
