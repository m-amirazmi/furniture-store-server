import express from "express";
import { createCategory, getCategories, getCategory, removeCategory, updateCategory } from "../controllers/category";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", removeCategory);

export { router as categoryRouter };
