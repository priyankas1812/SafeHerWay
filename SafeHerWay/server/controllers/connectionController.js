import userTravel from "../models/userTravelModel.js";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import ConnectionRequest from "../models/connectionRequests.js";

// Nodemailer setup (same as before)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "patientptest@gmail.com",
    pass: "pgfw noar jhit skgv", // App password
  },
});

export const sendConnectionRequestEmail = async (req, res) => {
  const { fromUserId, toUserId, travelplanId } = req.body;

  if (!fromUserId || !toUserId || !travelplanId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const fromUser = await User.findOne({ _id: fromUserId });
    const toUser = await User.findOne({ _id: toUserId });
    const travelPlan = await userTravel.findById(travelplanId);

    if (!fromUser || !toUser) {
      return res.status(404).json({ error: "User(s) not found" });
    }

    if (!travelPlan) {
      return res.status(404).json({ error: "Travel plan not found" });
    }

    // ✅ Save to DB
    const newRequest = new ConnectionRequest({
      fromUser: fromUserId,
      toUser: toUserId,
      travelPlan: travelplanId,
      status: "pending",
    });

    await newRequest.save();

    // ✅ Send Email
    const mailOptions = {
      from: "SafeHerWay <patientptest@gmail.com>",
      to: toUser.email,
      subject: `You've received a new connection request!`,
      html: `
        <p>Hi ${toUser.name},</p>
        <p><strong>${fromUser.name}</strong> (@${
        fromUser.userName
      }) wants to connect with you for a trip:</p>
        <ul>
          <li><strong>From:</strong> ${travelPlan.source}</li>
          <li><strong>To:</strong> ${travelPlan.destination}</li>
          <li><strong>Date:</strong> ${new Date(
            travelPlan.date
          ).toDateString()}</li>
        </ul>
        <p>Please check your dashboard to accept or decline the request.</p>
        <br/>
        <p>Safe travels,<br/>SafeHerWay Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Connection request saved and email sent successfully",
    });
  } catch (error) {
    console.error("Send request error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

export const getConnectionRequestsForUser = async (req, res) => {
  const { toUserId } = req.body;

  try {
    const requests = await ConnectionRequest.find({
      toUser: toUserId,
      status: "pending", // ✅ Filter only pending requests
    })
      .populate("travelPlan")
      .populate({
        path: "fromUser",
        model: User,
        select: "name userName email",
      });

    return res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching connection requests:", error);
    res.status(500).json({
      error: "Failed to fetch connection requests",
      details: error.message,
    });
  }
};

// export const updateConnectionRequestStatus = async (req, res) => {
//   try {
//     const { requestId } = req.params;
//     const { status } = req.body;

//     // Validate status
//     if (!["accepted", "rejected"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     // Find and update the connection request
//     const request = await ConnectionRequest.findByIdAndUpdate(
//       requestId,
//       { status },
//       { new: true }
//     );

//     if (!request) {
//       return res.status(404).json({ message: "Connection request not found" });
//     }

//     // Respond with the updated request
//     return res.status(200).json({
//       message: `Request has been ${status}`,
//       updatedRequest: request,
//     });
//   } catch (error) {
//     console.error("Error updating request status:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
export const updateConnectionRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Update the connection request
    const request = await ConnectionRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    // ✅ If accepted, update the userTravel's isAccepted field
    if (status === "accepted") {
      await userTravel.findByIdAndUpdate(request.travelPlan, {
        isAccepted: true,
      });
    }

    return res.status(200).json({
      message: `Request has been ${status}`,
      updatedRequest: request,
    });
  } catch (error) {
    console.error("Error updating request status:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
