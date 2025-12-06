const axios = require("axios");

const api = axios.create({
  baseURL: `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2023-07`,
  headers: {
    "X-Shopify-Access-Token": process.env.SHOPIFY_API_TOKEN,
    "Content-Type": "application/json"
  }
});

exports.fetchCustomers = async () => {
  const res = await api.get("/customers.json");
  return res.data.customers;
};

exports.fetchProducts = async () => {
  const res = await api.get("/products.json");
  return res.data.products;
};

exports.fetchOrders = async () => {
  const res = await api.get("/orders.json");
  return res.data.orders;
};
