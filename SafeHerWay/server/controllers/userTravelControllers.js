import userTravel from "../models/userTravelModel.js";
import User from "../models/userModel.js";
// import nodemailer from "nodemailer";
// import ConnectionRequest from "../models/connectionRequests.js";

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

// // Nodemailer setup (same as before)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "patientptest@gmail.com",
//     pass: "pgfw noar jhit skgv", // App password
//   },
// });

// // Send Connection Request Email
// // export const sendConnectionRequestEmail = async (req, res) => {
// //   const { fromUserId, toUserId, travelplanId } = req.body;

// //   if (!fromUserId || !toUserId || !travelplanId) {
// //     return res.status(400).json({ error: "Missing required fields" });
// //   }

// //   try {
// //     // Fetch all necessary data
// //     const fromUser = await User.findById(fromUserId);
// //     const toUser = await User.findById(toUserId);
// //     const travelPlan = await userTravel.findById(travelplanId);

// //     // Error handling
// //     if (!fromUser || !toUser) {
// //       return res.status(404).json({ error: "User(s) not found" });
// //     }

// //     if (!travelPlan) {
// //       return res.status(404).json({ error: "Travel plan not found" });
// //     }

// //     // Compose and send email
// //     const mailOptions = {
// //       from: "SafeHerWay <patientptest@gmail.com>",
// //       to: toUser.email,
// //       subject: `You've received a new connection request!`,
// //       html: `
// //         <p>Hi ${toUser.name},</p>
// //         <p><strong>${fromUser.name}</strong> (@${
// //         fromUser.userName
// //       }) wants to connect with you for a trip:</p>
// //         <ul>
// //           <li><strong>From:</strong> ${travelPlan.source}</li>
// //           <li><strong>To:</strong> ${travelPlan.destination}</li>
// //           <li><strong>Date:</strong> ${new Date(
// //             travelPlan.date
// //           ).toDateString()}</li>
// //         </ul>
// //         <p>Please check your dashboard to accept or decline the request.</p>
// //         <br/>
// //         <p>Safe travels,<br/>SafeHerWay Team</p>
// //       `,
// //     };

// //     await transporter.sendMail(mailOptions);
// //     return res
// //       .status(200)
// //       .json({ message: "Connection request email sent successfully" });
// //   } catch (error) {
// //     console.error("Email send error:", error);
// //     res.status(500).json({
// //       error: "Failed to send connection request",
// //       details: error.message,
// //     });
// //   }
// // };

// export const sendConnectionRequestEmail = async (req, res) => {
//   const { fromUserId, toUserId, travelplanId } = req.body;

//   if (!fromUserId || !toUserId || !travelplanId) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     const fromUser = await User.findOne({ _id: fromUserId });
//     const toUser = await User.findOne({ _id: toUserId });
//     const travelPlan = await userTravel.findById(travelplanId);

//     if (!fromUser || !toUser) {
//       return res.status(404).json({ error: "User(s) not found" });
//     }

//     if (!travelPlan) {
//       return res.status(404).json({ error: "Travel plan not found" });
//     }

//     // ✅ Save to DB
//     const newRequest = new ConnectionRequest({
//       fromUser: fromUserId,
//       toUser: toUserId,
//       travelPlan: travelplanId,
//       status: "pending",
//     });

//     await newRequest.save();

//     // ✅ Send Email
//     const mailOptions = {
//       from: "SafeHerWay <patientptest@gmail.com>",
//       to: toUser.email,
//       subject: `You've received a new connection request!`,
//       html: `
//         <p>Hi ${toUser.name},</p>
//         <p><strong>${fromUser.name}</strong> (@${
//         fromUser.userName
//       }) wants to connect with you for a trip:</p>
//         <ul>
//           <li><strong>From:</strong> ${travelPlan.source}</li>
//           <li><strong>To:</strong> ${travelPlan.destination}</li>
//           <li><strong>Date:</strong> ${new Date(
//             travelPlan.date
//           ).toDateString()}</li>
//         </ul>
//         <p>Please check your dashboard to accept or decline the request.</p>
//         <br/>
//         <p>Safe travels,<br/>SafeHerWay Team</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     return res.status(200).json({
//       message: "Connection request saved and email sent successfully",
//     });
//   } catch (error) {
//     console.error("Send request error:", error);
//     res.status(500).json({
//       error: "Internal server error",
//       details: error.message,
//     });
//   }
// };

// export const getConnectionRequestsForUser = async (req, res) => {
//   console.log("the request body", req.body);
//   console.log("the request params", req.params);

//   const { toUserId } = req.body;

//   try {
//     const requests = await ConnectionRequest.find({ toUser: toUserId })
//       .populate("travelPlan") // Fetch travel plan details
//       .populate({
//         path: "fromUser",
//         model: User,
//         select: "name userName email", // Fetch sender info
//       });

//     return res.status(200).json({ requests });
//   } catch (error) {
//     console.error("Error fetching connection requests:", error);
//     res.status(500).json({
//       error: "Failed to fetch connection requests",
//       details: error.message,
//     });
//   }
// };
