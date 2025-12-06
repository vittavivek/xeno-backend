const axios = require("axios");

const baseURL = `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2023-07`;

const headers = {
  "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
  "Content-Type": "application/json"
};

/* -------- FETCH CUSTOMERS -------- */
exports.fetchCustomers = async () => {
  const res = await axios.get(`${baseURL}/customers.json`, { headers });
  return res.data.customers || [];
};

/* -------- FETCH PRODUCTS -------- */
exports.fetchProducts = async () => {
  const res = await axios.get(`${baseURL}/products.json`, { headers });
  return res.data.products || [];
};

/* -------- FETCH ORDERS -------- */
exports.fetchOrders = async () => {
  const res = await axios.get(`${baseURL}/orders.json`, { headers });
  return res.data.orders || [];
};
