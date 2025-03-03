# **Quick-Trace 🚀**  
**Quick Commerce Order & Delivery Tracking System**  

## 📌 **About the Project**  
Quick-Trace is a **full-stack MERN + Next.js** application that enables customers to **place and track orders** in real-time and allows **delivery partners** to **accept and update** order statuses.  

✅ **Technologies Used:**  
- **Frontend:** Next.js, React.js, Bootstrap  
- **Backend:** Next.js API Routes, Express.js, Node.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT-based authentication  
- **Real-Time Updates:** WebSockets (Socket.io)  
- **Deployment:** Vercel / AWS  

---

## 📌 **Features & API Endpoints**  

### 1️⃣ **Authentication (Customers & Delivery Partners)**  
- `POST /api/auth/register` ➝ Register a new user  
- `POST /api/auth/login` ➝ Login & receive a JWT token  
- `GET /api/auth/me` ➝ Fetch logged-in user details  

### 2️⃣ **Customer Workflow**  
- **Place Order** ➝ `POST /api/orders`  
- **View Orders** ➝ `GET /api/orders/customer/:id`  

### 3️⃣ **Delivery Partner Workflow**  
- **View Pending Orders** ➝ `GET /api/orders/pending`  
- **Update Order Status** ➝ `PUT /api/orders/:id/status`  

### 4️⃣ **Real-Time Order Updates (WebSockets)**  
- WebSockets ensure customers get **instant updates** on their order status  

---

## 📌 **Setup & Installation**  

### 🔹 **Clone the repository**  
```sh
git clone https://github.com/omkar193/quick-trace.git
cd quick-trace
```

### 🔹 **Backend Setup**  
```sh
cd backend
npm install
npm run dev
```

### 🔹 **Frontend Setup**  
```sh
cd frontend
npm install
npm run dev
```

---

## 📌 **Usage**  
1️⃣ **Register as a customer or delivery partner**  
2️⃣ **Login & get authenticated**  
3️⃣ **Customers can place orders & track updates**  
4️⃣ **Delivery partners accept & update orders**  
5️⃣ **Real-time order updates via WebSockets**  

---

## 📌 **Next Improvements 🚀**  
✅ Implement **Google Maps API** for real-time location tracking  
✅ Improve **Role-Based Access Control (RBAC)**  
✅ Enhance UI/UX with animations  

---

### 🔥 **Developed by [Omkar Kumar](https://github.com/omkar193)**  
```
