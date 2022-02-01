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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = void 0;
const probe_image_size_1 = __importDefault(require("probe-image-size"));
const file_1 = require("../models/file");
const helpers_1 = require("../utils/helpers");
const createFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.files) {
            const uploadedFile = yield (0, helpers_1.uploadFile)({ data: req === null || req === void 0 ? void 0 : req.files, multiple: req.body.multiple });
            const data = yield Promise.all(uploadedFile.map((f) => __awaiter(void 0, void 0, void 0, function* () {
                if (!f)
                    return res.status(400).json({ message: "Something went wrong" });
                try {
                    const fileExists = yield file_1.File.findOne({ name: f.name });
                    const dimensions = yield (0, probe_image_size_1.default)(f.url);
                    const fileObject = {
                        name: f.name,
                        url: f.url,
                        size: f.size,
                        type: f.type,
                        width: dimensions.width,
                        height: dimensions.height,
                    };
                    if (fileExists) {
                        fileExists.name = f.name;
                        fileExists.url = f.url;
                        fileExists.size = f.size;
                        fileExists.type = f.type;
                        fileExists.width = dimensions.width;
                        fileExists.height = dimensions.height;
                        fileExists.save();
                        return fileExists;
                    }
                    else {
                        const file = yield file_1.File.create(fileObject);
                        return file;
                    }
                }
                catch (error) {
                    return res.status(400).json({ error });
                }
            })));
            return res.status(200).json(data);
        }
    }
    catch (error) {
        return res.status(400).json({ error });
    }
});
exports.createFile = createFile;
