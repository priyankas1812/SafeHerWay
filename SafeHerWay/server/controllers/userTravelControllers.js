import userTravel from "../models/userTravelModel.js";
import User from "../models/userModel.js";

// POST: Create a new user travel plan
export const createUserTravel = async (req, res) => {
  try {
    const { userId, source, destination, date, interests, description } =
      req.body;

    const userExists = await User.findOne({ userId });
    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const newPlan = new userTravel({
      userId,
      source,
      destination,
      date,
      interests,
      description,
    });

    const savedPlan = await newPlan.save();

    res.status(201).json({
      message: "User travel created successfully.",
      userTravel: savedPlan,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// GET: Travel plans for a specific user
export const getUserUserTravels = async (req, res) => {
  const { userId } = req.params;

  try {
    const plans = await userTravel.find({ userId });
    if (!plans || plans.length === 0) {
      return res
        .status(404)
        .json({ message: "No user travel found for this user." });
    }

    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user travel." });
  }
};

// GET: All travel plans
export const getAllUserTravels = async (req, res) => {
  console.log(" I am here");

  try {
    const plans = await userTravel
      .find()
      .populate("user", "name userName email age" );
    res.status(200).json(plans);
  } catch (error) {
    console.log("the error is ", error);

    res.status(500).json({ error: "Failed to fetch all user travels." });
  }
};
