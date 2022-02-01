"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const mongoose_1 = require("mongoose");
const fileSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    sizeKB: {
        type: Number,
    },
    sizeMB: {
        type: Number,
    },
    width: {
        type: Number,
    },
    height: {
        type: Number,
    },
}, { timestamps: true });
fileSchema.pre("save", function (next) {
    const sizeInKb = parseFloat((this.size * 0.001).toFixed(4));
    const sizeInMb = parseFloat((this.size * 0.001 * 0.001).toFixed(4));
    this.sizeKB = sizeInKb;
    this.sizeMB = sizeInMb;
    next();
});
const File = (0, mongoose_1.model)("File", fileSchema);
exports.File = File;
