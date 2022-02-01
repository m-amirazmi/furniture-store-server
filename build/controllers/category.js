"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategory = exports.updateCategory = exports.getCategory = exports.getCategories = exports.createCategory = void 0;
const category_1 = require("../models/category");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_1.Category.create(req.body);
        return res.status(201).json(category);
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.createCategory = createCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.Category.find({}).populate("image");
        return res.status(200).json(categories);
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield category_1.Category.findById(id);
        if (category)
            res.status(20).json(category);
        else
            return res.status(400).json({ message: "The category does not exists!" });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.getCategory = getCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, isFeatured, image } = req.body;
    if (!name)
        return res.status(400).json({ message: "Name input should not be emptied!" });
    try {
        const category = yield category_1.Category.findById(id);
        if (category) {
            category.isFeatured = isFeatured;
            category.name = name;
            category.image = image;
            category.save();
            return res.status(201).json(category);
        }
        else {
            return res.status(400).json({ message: "The category does not exists!" });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.updateCategory = updateCategory;
const removeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield category_1.Category.findByIdAndDelete(id);
        return res.status(200).json(category);
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.removeCategory = removeCategory;
