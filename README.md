# Acowale CRM by Harshvardhan Salunkhe 🚀

> [!NOTE]
> This project was created and polished with the help of AI coding tools.

A lightweight, premium customer feedback management platform that allows users to submit categorized reviews and lets the internal admin team analyze trends through an elegant, feature-rich dashboard. 

Both the **React + Vite Frontend** and the **Node.js + Express Backend** are successfully deployed as Serverless applications on **Vercel**, powered by a persistent **MongoDB Atlas** cloud database.

---

## 🎨 Visual Identity & UX Features

* **Google Antigravity Aesthetic**: Built with a clean, high-end light-theme interface featuring subtle grid lines, periwinkle-blue background radial blends, and an eye-catching multi-colored vector particle spray in the bottom-left corner.
* **Animated Mascots**:
  * **Aco (Feedback page)**: A cute floating robot mascot with blinking eyes, glowing face, and active cyan antenna animations.
  * **Professor Bot (Admin login)**: A smart, qualified administrator mascot wearing circular spectacles and a mortarboard cap with a swaying gold tassel.
* **BrewMaster Admin Dashboard**:
  * Dual-column layout: left brand sidebar navigation, topbar search & profile info, 4 metrics cards, and scrollable data feeds.
  * Prominent red topbar `Logout` action next to the avatar profile and a matching logout button on the sidebar.
* **Enhanced Form Usability**: Added a dynamic **Show/Hide Password Eye Toggle** on the credentials card using custom vector SVGs.

---

## 🛠️ Architecture & Tech Stack

### Frontend (`/FrontEnd`)
* **Core**: React 18 (Vite + TypeScript).
* **Styles**: Custom Vanilla CSS variables for maximum performance and design control.
* **Session Persistence**: JWT-based session storage persisted in browser `localStorage` using a centralized `AuthContext` provider.
* **Routing**: React Router v6 with `ProtectedRoute` guards preventing unauthorized users from accessing the admin panel.

### Backend (`/BackEnd`)
* **Core**: Node.js + Express + TypeScript.
* **Database**: MongoDB Atlas via Mongoose schemas.
* **Security & Auth**:
  * Custom JWT creation & HMAC-SHA256 signature verification utilizing Node's native `crypto` module (zero external dependency footprint).
  * Helmet security headers and rate-limiting rules.
  * Robust, comma-separated CORS mapping allowing local development ports and Vercel origins dynamically.
* **Validation**: Input parsing and request schema verification using **Zod**.

---

## 📁 Repository Structure

```
├── BackEnd/
│   ├── api/                 # Legacy entrypoint (Vercel routes via vercel.json)
│   ├── src/
│   │   ├── config/          # Environment & MongoDB Atlas configurations
│   │   ├── db/              # In-memory store fallback definitions
│   │   ├── middleware/      # JWT verification, CORS, error handling
│   │   ├── models/          # Mongoose schema models
│   │   ├── routes/          # API express router definitions
│   │   ├── services/        # Service handlers (MongoDB queries)
│   │   ├── utils/           # Signature helpers and loggers
│   │   ├── index.ts         # Vercel entrypoint (exports default app)
│   │   └── server.ts        # Local execution entrypoint (app.listen)
│   ├── vercel.json          # Vercel serverless deployment routing config
│   └── package.json         # Scripts mapping tsx and tsc commands
│
└── FrontEnd/
    ├── src/
    │   ├── api/             # Fetch clients mapped to backend API
    │   ├── components/      # SVG Mascots, Layout, Filters, and Table views
    │   ├── context/         # AuthContext provider
    │   ├── pages/           # FeedbackPage, LoginPage, DashboardPage
    │   ├── index.css        # Global Antigravity light design system
    │   └── main.tsx         # React router mount
    └── package.json
```

---

## 🌐 Deployment Details (Vercel Serverless)

The application has been restructured to deploy natively on Vercel's serverless environment:

* **Backend Entrypoint**: Decoupled `app.listen()` from the deployment script. `src/index.ts` connects to Mongoose and exports the `app` instance. `vercel.json` intercepts all API requests (`/(.*)`) and routes them to this exported function using the `@vercel/node` compiler.
* **Database Access**: Hosted on MongoDB Atlas with IP access lists configured to `0.0.0.0/0` (allowing serverless backend requests from Vercel's dynamic IP ranges).

---

## ⚙️ Running Locally

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd BackEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `BackEnd/` directory based on `.env.example`:
   ```env
   PORT=3000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173,http://localhost:5174
   MONGO_URI=mongodb+srv://<username>:<password>@<your-cluster>.mongodb.net/myDatabase
   JWT_SECRET=your-secure-secret-key
   ADMIN_USERNAME=Admin-Harshvardhan
   ADMIN_PASSWORD=Harsh@9090
   ```
   *(Note: Remember to URL-encode any special characters in your database password, e.g. replace `@` with `%40`).*
4. Run the local development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a separate terminal and navigate to the frontend directory:
   ```bash
   cd FrontEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `FrontEnd/` directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
4. Run the development site:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) (or the port specified by Vite) in your browser.

---

## 🔑 Admin Credentials

To access the Admin Dashboard panel, click **Admin Login** in the nav bar and enter:

* **Username**: `Admin-Harshvardhan`
* **Password**: `Harsh@9090`

---

## 🧪 Integration Tests

You can run the Express server route-protection test suites (authentications, route blocks, rate limits) by navigating to `BackEnd/` and running:
```bash
npm run test
```

---

## 📝 Design Logs

For detailed educational notes and technical choices:
* Refer to [DECISIONS.md](file:///c:/Users/HP/Desktop/Machine-Test-Harshvardhan/DECISIONS.md) to understand why Node.js, Mongoose, and custom HMAC tokens were preferred.
* Refer to [TEACH_US.md](file:///c:/Users/HP/Desktop/Machine-Test-Harshvardhan/TEACH_US.md) to read an analysis on how file I/O serialization blocks the Node Event Loop.
