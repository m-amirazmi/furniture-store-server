"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const router = express_1.default.Router();
exports.productRouter = router;
router.post("/", product_1.createProduct);
router.get("/", product_1.getProducts);
router.get("/:id", product_1.getProduct);
router.put("/:id", product_1.updateProduct);
