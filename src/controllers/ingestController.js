const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();
const shopify = require("../services/shopifyService");

exports.ingestAll = async (req, res) => {
  try {
    // 🔥 1. ENSURE TENANT EXISTS (fixes foreign key error)
    await db.tenant.upsert({
      where: { id: "demo-tenant" },
      update: {},
      create: {
        id: "demo-tenant",
        name: "Demo Tenant",
        storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
        apiToken: process.env.SHOPIFY_API_TOKEN
      }
    });

    // 🔥 2. FETCH DATA FROM SHOPIFY
    const customers = await shopify.fetchCustomers();
    const products = await shopify.fetchProducts();
    const orders = await shopify.fetchOrders();

    // 🔥 3. INSERT / UPSERT CUSTOMERS
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

    // 🔥 4. INSERT / UPSERT PRODUCTS
    for (let p of products) {
      await db.product.upsert({
        where: { shopifyId: String(p.id) },
        update: {},
        create: {
          shopifyId: String(p.id),
          title: p.title,
          price: parseFloat(p.variants[0]?.price || 0),
          tenantId: "demo-tenant"
        }
      });
    }

    // 🔥 5. INSERT / UPSERT ORDERS
    for (let o of orders) {
      await db.order.upsert({
        where: { shopifyId: String(o.id) },
        update: {},
        create: {
          shopifyId: String(o.id),
          amount: parseFloat(o.total_price || 0),
          createdAt: new Date(o.created_at),
          tenantId: "demo-tenant"
        }
      });
    }

    // 🔥 6. SUCCESS RESPONSE
    res.json({ message: "Ingestion completed!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
