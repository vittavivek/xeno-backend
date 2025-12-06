const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();
const shopify = require("../services/shopifyService");

/* ---------------------------
   INGEST SHOPIFY DATA
---------------------------- */
exports.ingestAll = async (req, res) => {
  try {
    const customers = await shopify.fetchCustomers();
    const products = await shopify.fetchProducts();
    const orders = await shopify.fetchOrders();

    for (let c of customers) {
      await db.customer.upsert({
        where: { shopifyId: String(c.id) },
        update: {},
        create: {
          shopifyId: String(c.id),
          email: c.email,
          firstName: c.first_name,
          lastName: c.last_name,
          tenantId: "demo-tenant"
        }
      });
    }

    for (let p of products) {
      await db.product.upsert({
        where: { shopifyId: String(p.id) },
        update: {},
        create: {
          shopifyId: String(p.id),
          title: p.title,
          price: parseFloat(p.variants[0].price),
          tenantId: "demo-tenant"
        }
      });
    }

    for (let o of orders) {
      await db.order.upsert({
        where: { shopifyId: String(o.id) },
        update: {},
        create: {
          shopifyId: String(o.id),
          amount: parseFloat(o.total_price),
          createdAt: new Date(o.created_at),
          tenantId: "demo-tenant"
        }
      });
    }

    res.json({ message: "Ingestion completed!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/* ---------------------------
   GET Customers
---------------------------- */
exports.getCustomers = async (req, res) => {
  try {
    const data = await db.customer.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------------------
   GET Products
---------------------------- */
exports.getProducts = async (req, res) => {
  try {
    const data = await db.product.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------------------
   GET Orders
---------------------------- */
exports.getOrders = async (req, res) => {
  try {
    const data = await db.order.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
