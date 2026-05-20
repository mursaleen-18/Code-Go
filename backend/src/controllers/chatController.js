import { streamClient, upsertStreamUser } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    // use clerkId for Stream (not mongodb _id)=> it should match the id we have in the stream dashboard
    await upsertStreamUser({
      id: req.user.clerkId,
      name: req.user.name,
      image: req.user.profileImage,
    });

    const token = streamClient.generateUserToken({
      user_id: req.user.clerkId,
      validity_in_seconds: 60 * 60,
    });

    res.status(200).json({
      token,
      userId: req.user.clerkId,
      userName: req.user.name,
      userImage: req.user.profileImage,
    });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
