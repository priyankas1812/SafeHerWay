import User from "../models/userModel.js";

// POST - Create new user
export const createUser = async (req, res) => {
  try {
    const { name, userName, email, password, age, phone, aadharNumber } =
      req.body;

    // Optional: Validate required fields here if needed
    if (!name || !userName || !email || !password || !phone || !aadharNumber) {
      return res
        .status(400)
        .json({ error: "Please fill all required fields." });
    }

    // Check for existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists." });
    }

    const user = new User({
      name,
      userName,
      email,
      password,
      age,
      phone,
      aadharNumber,
    });

    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User created successfully.", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET - All users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
