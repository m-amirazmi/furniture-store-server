const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));
