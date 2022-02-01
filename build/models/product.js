"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
    },
    vendor: {
        type: String,
    },
    image: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "File",
    },
    slug: {
        type: String,
        unique: true,
    },
}, { timestamps: true });
productSchema.pre("save", function (next) {
    const convertSlug = (0, slugify_1.default)(this.name, {
        lower: true,
        replacement: "-",
        strict: true,
    });
    this.slug = convertSlug;
    next();
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.Product = Product;
