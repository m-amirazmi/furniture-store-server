import express from "express";
import { connectDB } from "./utils/configs";
import * as dotenv from "dotenv";
import { categoryRouter } from "./routes/category";

dotenv.config();
const app = express();
app.use(express.json());

const DB_URL = process.env.DB_URL;
if (typeof DB_URL === "string") connectDB(DB_URL);

app.use("/api/categories", categoryRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));
