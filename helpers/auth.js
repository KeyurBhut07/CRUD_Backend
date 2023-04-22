const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltRound = 10;
    const hasedPassword = await bcrypt.hash(password, saltRound);
    return hasedPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparPassword = (password, hasedPassword) => {
  return bcrypt.compare(password, hasedPassword);
};

module.exports = { hashPassword, comparPassword };
