const express = require("express");
const {
  ingestAll,
  getCustomers,
  getProducts,
  getOrders
} = require("../controllers/ingestController");

const router = express.Router();

router.post("/ingest", ingestAll);
router.get("/customers", getCustomers);
router.get("/products", getProducts);
router.get("/orders", getOrders);

module.exports = router;
