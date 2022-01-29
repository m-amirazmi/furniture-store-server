import express from "express";
import { createFile } from "../controllers/file";

const router = express.Router();

router.post("/", createFile);

export { router as fileRouter };
