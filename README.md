# 🛒 Green Cart - Online Grocery Store

Green Cart is a full-stack e-commerce web application where users can browse grocery items, add them to cart, and place orders via Cash on Delivery or Stripe-based online payments.

## 🚀 Features

- 🥬 Browse & search products
- 🛒 Add to cart & adjust quantity
- 🧾 Place orders with COD or Stripe
- 👤 User authentication (JWT)
- 📦 Admin/Seller panel to view all orders
- 📬 Stripe payment integration with webhook verification

## 🧑‍💻 Tech Stack

**Frontend**  
- React.js (with hooks & context API)  
- Axios  
- React Router

**Backend**  
- Node.js + Express.js  
- MongoDB + Mongoose  
- Stripe Payment Gateway  
- JSON Web Tokens (JWT)

## ⚙️ Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/MaheshDataWizard/green-cart.git
cd green-cart
```

### 2. Backend Setup
```bash
cd server
npm install
```

🔐 Create a `.env` file in `/server`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/greencart
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
JWT_SECRET=your_jwt_secret
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 4. Webhook Setup (for Stripe)
If testing locally:
```bash
npx stripe listen --forward-to localhost:5000/api/order/webhook
```

## 📁 Folder Structure

```
green-cart/
├── client/         # React frontend
├── server/         # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
└── README.md
```
