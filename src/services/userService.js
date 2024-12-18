const { findUser, createUser } = require("../repositories/userREpository");
const {createCart}=require('../repositories/cartRepository')

async function registerUser(userDetails) {
  const user = await findUser({
    email: userDetails.email,
    mobileNumber: userDetails.mobileNumber,
  });

  if (user) {
    throw {
      reason: "User with the given email and mobile number already exists",
      statusCode: 400,
    };
  }

  const newUser = await createUser({
    email: userDetails.email,
    password: userDetails.password,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    mobileNumber: userDetails.mobileNumber,
    role:userDetails.role,
  });

  if (!newUser) {
    throw { reason: "Something went wrong", statusCode: 500 };
  }
  
  await createCart(newUser._id)

  return newUser;
}

module.exports = {
  registerUser,
};
