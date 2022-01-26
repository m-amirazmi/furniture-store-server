import express from "express";
import { createProduct, getProduct, getProducts } from "../controllers/product";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);

export { router as productRouter };
