import prisma from "../config/db.js";

export const saveUserProfile = async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user;

    const user = await prisma.user.upsert({
      where: { firebaseUid: uid },
      update: {
        email,
        ...(name && { name }),
        ...(picture && { photoUrl: picture }),
      },
      create: {
        firebaseUid: uid,
        email,
        name: name || null,
        photoUrl: picture || null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Sign up/Sign in successful",
      data: user,
    });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save user",
      error: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { uid } = req.user;
    const { name, photoUrl } = req.body;

    const updatedUser = await prisma.user.update({
      where: { firebaseUid: uid },
      data: {
        ...(name && { name }),
        ...(photoUrl && { photoUrl }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await prisma.user.findUnique({
      where: { firebaseUid: uid },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};