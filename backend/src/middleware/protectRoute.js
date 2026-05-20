import { clerkClient } from "@clerk/express";
import User from "../models/User.js";
import { upsertStreamUser } from "../lib/stream.js";

const buildUserFromClerk = (clerkUser) => {
  const primaryEmail = clerkUser.emailAddresses.find(
    (email) => email.id === clerkUser.primaryEmailAddressId
  );

  const name =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
    clerkUser.username ||
    primaryEmail?.emailAddress?.split("@")[0] ||
    "Code Go User";

  return {
    clerkId: clerkUser.id,
    email: primaryEmail?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress,
    name,
    profileImage: clerkUser.imageUrl || "",
  };
};

export const protectRoute = [
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      // find user in db by clerk ID
      let user = await User.findOne({ clerkId });

      if (!user) {
        const clerkUser = await clerkClient.users.getUser(clerkId);
        const newUser = buildUserFromClerk(clerkUser);

        if (!newUser.email) {
          return res.status(400).json({ message: "Authenticated user has no email address" });
        }

        user = await User.findOneAndUpdate({ clerkId }, newUser, {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        });

        await upsertStreamUser({
          id: user.clerkId,
          name: user.name,
          image: user.profileImage,
        });
      }

      if (!user) return res.status(404).json({ message: "User not found" });

      // attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
