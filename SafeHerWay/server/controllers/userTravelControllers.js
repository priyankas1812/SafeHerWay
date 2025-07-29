import userTravel from "../models/userTravelModel.js";
import User from "../models/userModel.js";

// POST: Create a new user travel plan
export const createUserTravel = async (req, res) => {
  try {
    console.log("Creating user travel plan with data:", req.body);
    const { userId, source, destination, date, interests, description } =
      req.body;

    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(404).json({ error: "User not found." });
    }

    const newPlan = new userTravel({
      user: userId,
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
    console.log("error", error);
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
  try {
    const plans = await userTravel
      .find()
      .populate("user", "name userName email age isVerified");

    // Filter only those where the populated user is verified
    const verifiedPlans = plans.filter(
      (plan) => plan.user && plan.user.isVerified === true
    );

    res.status(200).json(verifiedPlans);
  } catch (error) {
    console.log("The error is", error);
    res.status(500).json({ error: "Failed to fetch verified user travels." });
  }
};

// GET: Filtered search for travel plans
export const searchUserTravels = async (req, res) => {
  try {
    const { source, destination, date } = req.query;

    const query = {};
    if (source) query.source = { $regex: source, $options: "i" };
    if (destination) query.destination = { $regex: destination, $options: "i" };
    if (date) query.date = new Date(date);

    const results = await userTravel
      .find(query)
      .populate("user", "name userName email age");

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Search failed", details: error.message });
  }
};

// GET: Check if a specific travel plan is accepted
export const checkIsAcceptedStatus = async (req, res) => {
  const { travelPlanId } = req.params;

  try {
    const travelPlan = await userTravel.findById(travelPlanId);

    if (!travelPlan) {
      return res.status(404).json({ message: "Travel plan not found." });
    }

    res.status(200).json({
      isAccepted: travelPlan.isAccepted,
      travelPlanId: travelPlan._id,
    });
  } catch (error) {
    console.error("Error checking isAccepted status:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
