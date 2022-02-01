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
exports.uploadFile = void 0;
const configs_1 = require("./configs");
const saveFile = ({ filetype, blob, filename, ext }) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: `${configs_1.BUCKET_NAME}/${filetype}`,
        Key: `${filename}.${ext}`,
        Body: blob,
        ACL: "public-read",
    };
    try {
        const saved = yield configs_1.s3.upload(params).promise();
        return saved;
    }
    catch (error) {
        console.log(error);
    }
});
const compressedFile = (file) => __awaiter(void 0, void 0, void 0, function* () { return yield configs_1.tiny.fromBuffer(file).toBuffer(); });
const uploadFile = ({ data, multiple }) => __awaiter(void 0, void 0, void 0, function* () {
    let uploadedFile;
    const filetype = Object.keys(data)[0];
    if (multiple === "false")
        uploadedFile = [data[filetype]];
    else
        uploadedFile = data[filetype];
    return yield Promise.all(uploadedFile.map((f) => __awaiter(void 0, void 0, void 0, function* () {
        let compressed;
        const blob = f.data;
        const filename = f.name.replace(/\.[^/.]+$/, "");
        const ext = f.mimetype.split("/")[1];
        if (filetype.includes("image"))
            compressed = yield compressedFile(blob);
        else
            compressed = blob;
        const saved = yield saveFile({ filetype, blob: compressed, filename, ext });
        if (saved)
            return { name: filename, size: compressed.byteLength, url: saved.Location, type: f.mimetype };
    })));
});
exports.uploadFile = uploadFile;
