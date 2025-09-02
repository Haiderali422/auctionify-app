import prisma from "../config/db.js";

export const createItem = async (req, res) => {
  try {
    const { title, description, image_url } = req.body;

    if (!title || !image_url || !description) {
      return res
        .status(400)
        .json({ error: "title, description and image_url are required" });
    }

    const user = await prisma.user.findUnique({
      where: { firebase_uid: req.user.uid },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const newItem = await prisma.item.create({
      data: {
        title,
        description,
        image_url,
        auction_enabled: false,
        owner_id: user.id,
      },
      include: { owner: true },
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Failed to create item" });
  }
};

export const getAddedItems = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebase_uid: req.user.uid },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const items = await prisma.item.findMany({
      where: { owner_id: user.id, auction_enabled: false },
      include: { owner: true },
    });

    res.json(items);
  } catch (error) {
    console.error("Error fetching added items:", error);
    res.status(500).json({ error: "Failed to fetch added items" });
  }
};

export const getListedItems = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebase_uid: req.user.uid },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const items = await prisma.item.findMany({
      where: { owner_id: user.id, auction_enabled: true },
      include: { owner: true },
    });

    res.json(items);
  } catch (error) {
    console.error("Error fetching listed items:", error);
    res.status(500).json({ error: "Failed to fetch listed items" });
  }
};
export const getAllListedItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      where: { auction_enabled: true },
      include: { owner: true }, // still include owner details
    });

    res.json(items);
  } catch (error) {
    console.error("Error fetching all listed items:", error);
    res.status(500).json({ error: "Failed to fetch all listed items" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image_url, auction_enabled } = req.body;

    const user = await prisma.user.findUnique({
      where: { firebase_uid: req.user.uid },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const item = await prisma.item.findUnique({
      where: { id: parseInt(id) },
    });

    if (!item || item.owner_id !== user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this item" });
    }

    const updatedItem = await prisma.item.update({
      where: { id: parseInt(id) },
      data: {
        title: title ?? item.title,
        description: description ?? item.description,
        image_url: image_url ?? item.image_url,
        auction_enabled:
          typeof auction_enabled === "boolean"
            ? auction_enabled
            : item.auction_enabled,
      },
      include: { owner: true },
    });

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Failed to update item" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { firebase_uid: req.user.uid },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const item = await prisma.item.findUnique({
      where: { id: parseInt(id) },
    });

    if (!item || item.owner_id !== user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this item" });
    }

    await prisma.item.delete({ where: { id: parseInt(id) } });

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
};
