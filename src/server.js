require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const ingestRoutes = require("./routes/ingestRoutes");
app.use("/api", ingestRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
