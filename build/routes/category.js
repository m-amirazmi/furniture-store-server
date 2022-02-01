"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_1 = require("../controllers/category");
const router = express_1.default.Router();
exports.categoryRouter = router;
router.post("/", category_1.createCategory);
router.get("/", category_1.getCategories);
router.get("/:id", category_1.getCategory);
router.put("/:id", category_1.updateCategory);
router.delete("/:id", category_1.removeCategory);
