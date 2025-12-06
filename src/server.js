require("dotenv").config();
const express = require("express");
const cors = require("cors");

const ingestRoutes = require("./routes/ingestRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", ingestRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
