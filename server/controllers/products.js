import mongoose from "mongoose";

import productDetail from "../models/productDetail.js";

export const getProducts = async (req, res) => {
  try {
    const productDetails = await productDetail.find();

    res.status(200).json(productDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  const newproduct = new productDetail({...product, creator: req.userId, createdAt: new Date().toISOString()});

  try {
    await newproduct.save();

    res.status(201).json(newproduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, creator, price } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);

  const updatedProduct = { creator, name, category, price };

  await productDetail.findByIdAndUpdate(id, updatedProduct, { new: true });

  res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);

  await productDetail.findByIdAndRemove(id);

  res.json({ message: "Product deleted successfully!" });
};


