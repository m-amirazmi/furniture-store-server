import express from "express";
import { createCategory, getCategories, getCategory } from "../controllers/category";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);

export { router as categoryRouter };
