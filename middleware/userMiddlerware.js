const UserModel = require("../models/users");
const jwt = require("jsonwebtoken");

const requireSign = (req, res, next) => {
  try {
    const verifyToken = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    req.user = verifyToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).send({
      success: false,
      message: "Invalid Token",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (user.role !== "admin") {
      res.status(404).send({
        success: false,
        message: "UnAuthorized Access",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went wrong",
    });
  }
};

module.exports = { isAdmin, requireSign };
