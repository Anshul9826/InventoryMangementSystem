import mongoose from "mongoose";

import categoryDetail from "../models/categoryDetail.js";

export const getCategories = async (req, res) => {
  try {
    const categoryDetails = await categoryDetail.find();

    res.status(200).json(categoryDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  const category = req.body;

  const newCategory = new categoryDetail({
    name: category.name,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, creator } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No category with id: ${id}`);

  const updatedcategory = { creator, name };

  await categoryDetail.findByIdAndUpdate(id, updatedcategory, { new: true });

  res.json(updatedcategory);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No category with id: ${id}`);

  await categoryDetail.findByIdAndRemove(id);

  res.json({ message: "category deleted successfully!" });
};
