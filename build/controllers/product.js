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
exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const product_1 = require("../models/product");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.Product.create(req.body);
        return res.status(201).json(product);
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.Product.find({}).populate("image").populate("category");
        return res.status(200).json(products);
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield product_1.Product.findById(id);
        if (product)
            res.status(200).json(product);
        else
            return res.status(400).json({ message: "The product does not exists!" });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.getProduct = getProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, price, discount, isFeatured, category, quantity, description, sku, vendor, image } = req.body;
    try {
        const product = yield product_1.Product.findById(id);
        if (product) {
            product.name = name;
            product.price = price;
            product.discount = discount;
            product.isFeatured = isFeatured;
            product.category = category;
            product.quantity = quantity;
            product.description = description;
            product.sku = sku;
            product.vendor = vendor;
            product.image = image;
            product.save();
            return res.status(201).json(product);
        }
        else {
            return res.status(400).json({ message: "The product does not exists!" });
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.updateProduct = updateProduct;
