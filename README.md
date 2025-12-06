📦 Xeno FDE Internship Assignment — Shopify Data Ingestion Backend

This project is built as part of the Xeno FDE Internship Assignment.
It provides a backend system that connects to a Shopify Store, fetches customer, product, and order data, and stores it inside a local SQLite database using Prisma ORM.

🚀 Features

✔ Connects to Shopify Admin API

✔ Fetches Customers, Products, and Orders

✔ Stores all data into SQLite database (Prisma ORM)

✔ Includes REST API endpoint /api/ingest

✔ Proper project structure (routes, controllers, services)

✔ Clean multi-tenant-ready architecture

✔ Built using Node.js + Express

🛠 Tech Stack
Component	Technology
Backend Framework	Node.js + Express.js
Database	SQLite (Prisma ORM)
ORM	Prisma
API Calls	Axios
Hosting	Local
Authentication	Shopify Admin API Access Token

📁 Project Structure
xeno-backend/
│── prisma/
│   ├── schema.prisma
│   ├── migrations/
│
│── src/
│   ├── controllers/
│   │   └── ingestController.js
│   ├── routes/
│   │   └── ingestRoutes.js
│   ├── services/
│   │   └── shopifyService.js
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
│── .gitignore
│── package.json
│── README.md

🔧 Setup Instructions
1️⃣ Install dependencies
npm install

2️⃣ Configure .env

Create a .env file (not committed to GitHub):

SHOPIFY_STORE_URL=your-store-name.myshopify.com
SHOPIFY_ACCESS_TOKEN=your-admin-api-access-token
DATABASE_URL="file:./dev.db"

3️⃣ Run Prisma migration
npx prisma migrate dev --name init


This will create dev.db (SQLite database).

4️⃣ Start the server
node src/server.js


Server runs at:

http://localhost:5000

🔄 Ingest Data from Shopify

Use this POST API:

POST http://localhost:5000/api/ingest

Using PowerShell:
Invoke-WebRequest -Uri "http://localhost:5000/api/ingest" -Method POST


If successful:

{
  "message": "Ingestion completed!"
}

🧠 How the Ingestion Works

Controller calls service functions

Shopify API returns JSON for:

Customers

Products

Orders

Each record is UPSERTED into the database:

If record exists → update

If not → create

Multi-tenant support using tenantId

🗄 Database Schema (Prisma)
Customer
id          Int
shopifyId   String
email       String?
firstName   String?
lastName    String?
tenantId    String

Product
id          Int
shopifyId   String
title       String
price       Float
tenantId    String

Order
id          Int
shopifyId   String
amount      Float
createdAt   DateTime
tenantId    String

📝 Endpoints
Method	Endpoint	Description
POST	/api/ingest	Fetches customers, products, orders from Shopify and stores in DB
🧪 Testing

You can test using:

PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/api/ingest" -Method POST

cURL
curl -X POST http://localhost:5000/api/ingest

📌 Notes

.env is intentionally excluded due to GitHub secret scanning rules.

Ensure your Shopify Admin API token has required scopes.

SQLite is used for simplicity as per assignment requirement.

📚 Future Improvements (Optional)

Multi-tenant user authentication

Dashboard displaying the ingested data

Cron job for scheduled ingestion

Background queues (BullMQ)

Deploy on Render/Railway
