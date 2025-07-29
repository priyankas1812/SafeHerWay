import User from "../models/userModel.js";

// POST - Create new user
// export const createUser = async (req, res) => {
//   try {
//     const { name, userName, email, password, age, phone, aadharNumber } =
//       req.body;

//     // Optional: Validate required fields here if needed
//     if (!name || !userName || !email || !password || !phone || !aadharNumber) {
//       return res
//         .status(400)
//         .json({ error: "Please fill all required fields." });
//     }

//     // Check for existing email
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ error: "Email already exists." });
//     }

//     const user = new User({
//       name,
//       userName,
//       email,
//       password,
//       age,
//       phone,
//       aadharNumber,
//     });

//     const savedUser = await user.save();
//     res
//       .status(201)
//       .json({ message: "User created successfully.", user: savedUser });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const createUser = async (req, res) => {
  try {
    const { name, userName, email, password, phone, aadharNumber, age } =
      req.body;

    // Validate required fields
    if (
      !name ||
      !userName ||
      !email ||
      !password ||
      !phone ||
      !aadharNumber ||
      !age
    ) {
      return res
        .status(400)
        .json({ error: "Please fill all required fields." });
    }

    // Check for existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists." });
    }

    // ✅ Calculate numeric age from birthdate string
    const birthDate = new Date(age); // Here, 'age' is actually the DOB
    const today = new Date();
    let tempAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      tempAge--; // ✅ Use tempAge, not age
    }

    const user = new User({
      name,
      userName,
      email,
      password,
      age: tempAge, // ✅ Calculated age
      phone,
      aadharNumber,
    });

    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User created successfully.", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: error.message });
  }
};
// GET - All users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("abcd", users);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - Check if user exists
export const checkUserExists = async (req, res) => {
  const { email, userName, phone, aadharNumber } = req.body;

  try {
    const errors = {};

    const existingEmail = await User.findOne({ email });
    if (existingEmail) errors.email = "Email already registered. Please login.";

    const existingUserName = await User.findOne({ userName });
    if (existingUserName) errors.userName = "Username already taken.";

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) errors.phone = "Mobile number already registered.";

    const existingAadhar = await User.findOne({ aadharNumber });
    if (existingAadhar)
      errors.aadharNumber = "Aadhaar number already registered.";

    if (Object.keys(errors).length > 0) {
      return res.status(409).json({ errors });
    }

    res.status(200).json({ message: "No duplicate found." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
// POST - Login User
export const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    // 1. Find user by username
    const user = await User.findOne({ userName });

    // 2. If user not found
    if (!user) {
      return res.status(401).json({ error: "Username not found." });
    }

    // 3. Check if password matches
    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    // 4. If match
    return res.status(200).json({ message: "Login successful.", user });
  } catch (error) {
    return res.status(500).json({ error: "Login failed. Please try again." });
  }
};

// Approve or Reject a user
export const verifyUser = async (req, res) => {
  console.log("this function is called");

  const { id } = req.params;
  const { action } = req.body;

  try {
    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ error: "Invalid action" });
    }

    const update =
      action === "approve"
        ? { isVerified: true, status: "Approved" }
        : { isVerified: false, status: "Rejected" };

    const updatedUser = await User.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error verifying user:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// GET - Get single user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("name userName email age");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Server error." });
  }
};
