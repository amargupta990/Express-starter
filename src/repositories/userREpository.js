const User = require("../schema/userSchema");

async function findUser(parameters) {
  const response = await User.findOne({ ...parameters });
  return response;
}

async function createUser(userDetails) {
  const response = await User.create(userDetails);
  return response;
}

module.exports = {
    findUser,
    createUser
}; // Ensure it's exported correctly
