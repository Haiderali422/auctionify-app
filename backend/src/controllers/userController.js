import prisma from "../config/db.js";

export const saveUserProfile = async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user;

    const user = await prisma.user.upsert({
      where: { firebase_uid: uid },
      update: {
        email,
        ...(name && { name }),
        ...(picture && { photoURL: picture }),
      },
      create: {
        firebase_uid: uid,
        email,
        name: name || null,
        photoURL: picture || null,
      },
    });

    res.json({ message: "Sign Up/Sign In Successful", user });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Failed to save user" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { uid } = req.user;
    const updates = req.body;

    const updatedUser = await prisma.user.update({
      where: { firebase_uid: uid },
      data: updates,
    });

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await prisma.user.findUnique({
      where: { firebase_uid: uid },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
