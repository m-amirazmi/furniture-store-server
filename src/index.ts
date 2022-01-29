import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import { connectDB, PORT } from "./utils/configs";
import { categoryRouter } from "./routes/category";
import { productRouter } from "./routes/product";
import { fileRouter } from "./routes/file";

dotenv.config();
const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());
connectDB();

app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/files", fileRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
