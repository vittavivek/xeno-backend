const express = require("express");
const { ingestAll } = require("../controllers/ingestController");

const router = express.Router();

router.post("/ingest", ingestAll);

module.exports = router;
