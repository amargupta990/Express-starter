const { registerUser } = require("../services/userService");

async function createUser(req, res) {
  try {
    const response = await registerUser(req.body);

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      data: response,
      error: {},
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: error.message || "An error occurred",
      success: false,
      data: {},
      error: error,
    });
  }
}

module.exports = { createUser };
