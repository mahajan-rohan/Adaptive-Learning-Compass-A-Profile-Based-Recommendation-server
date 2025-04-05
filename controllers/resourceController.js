import Resource from "../models/Resource.js";

export const getResources = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resources = await Resource.find({ userId });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addResource = async (req, res) => {
  try {
    const { title, description, urls } = req.body;
    const userId = req.auth.userId;

    const resource = new Resource({
      title,
      description,
      urls,
      userId,
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    await Resource.findByIdAndDelete(id);
    res.json({ message: "Resource deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
