"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    image: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "File",
    },
}, { timestamps: true });
categorySchema.pre("save", function (next) {
    const convertSlug = (0, slugify_1.default)(this.name, {
        lower: true,
        replacement: "-",
        strict: true,
    });
    this.slug = convertSlug;
    next();
});
const Category = (0, mongoose_1.model)("Category", categorySchema);
exports.Category = Category;
