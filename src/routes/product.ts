import express from "express";
import { createProduct, getProduct, getProducts, updateProduct } from "../controllers/product";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);

export { router as productRouter };
