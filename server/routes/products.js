import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", auth, createProduct);
router.patch("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
