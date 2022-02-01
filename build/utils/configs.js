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
exports.tiny = exports.s3 = exports.connectDB = exports.TINIFY_KEY = exports.BUCKET_NAME = exports.SECRET = exports.ID = exports.DB_URL = exports.PORT = void 0;
const mongoose_1 = require("mongoose");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const tinify_1 = __importDefault(require("tinify"));
exports.PORT = "9200";
exports.DB_URL = "mongodb+srv://mamirazmi:a8073TBW.@sandbox.2vu53.mongodb.net/fs-v01?retryWrites=true&w=majority";
exports.ID = "AKIA24ADVONQ5C66DBE7";
exports.SECRET = "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";
exports.BUCKET_NAME = "furnistore";
exports.TINIFY_KEY = "2ZT5rYzxzNCKzDbqB1cVGxd9J837Jl89";
// MONGODB CONNECTION
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_1.connect)(exports.DB_URL);
        console.log("Successfully connected to database...");
    }
    catch (error) {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
// Initializing S3 Interface
exports.s3 = new aws_sdk_1.default.S3({
    accessKeyId: exports.ID,
    secretAccessKey: exports.SECRET,
});
// TINIFY
tinify_1.default.key = exports.TINIFY_KEY;
exports.tiny = tinify_1.default;
