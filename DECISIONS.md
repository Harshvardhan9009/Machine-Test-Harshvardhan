# Engineering Decision Log (DECISIONS.md)

This log details the engineering reasoning, architectural decisions, trade-offs, and tool collaboration details for **Acowale CRM**.

---

### 1. Why did you choose this technology stack?
* **Frontend (React + Vite + TypeScript)**: React offers a robust, component-driven architecture. Vite was selected as the build tool because its Hot Module Replacement (HMR) is incredibly fast. TypeScript was used to enforce strict types, catching reference and logic errors during development rather than at runtime.
* **Backend (Node.js + Express + TypeScript)**: Express.js is a lightweight, minimal framework that is perfect for building RESTful APIs. Node's single-threaded, non-blocking asynchronous event loop handles high-concurrency I/O efficiently, and sharing TypeScript across both folders unified our data definitions.

---

### 2. Why did you choose this database?
* We transitioned from a local JSON file-based database to **MongoDB Atlas (Cloud)**. Because the application was deployed to **Vercel**, which runs serverless, ephemeral containers, writing database changes to local files would be lost as soon as the serverless function went cold. MongoDB Atlas connects securely via Mongoose, handles flexible document structures, and persists data across global serverless instances.

---

### 3. Why did you structure your application this way?
* We separated the project into decoupled **`/FrontEnd`** and **`/BackEnd`** directories. This monorepo layout prevents dependency leakage, allows front/back teams to run isolated test suites, and matches Vercel's multi-project root folder deployment strategy. The backend is structured into clear MVC folders: configurations, schema validators, routing middleware, database models, and business logic services.

---

### 4. What trade-offs did you make due to time constraints?
* **Custom UI Charts**: Instead of importing heavy chart libraries like Chart.js or Recharts (which increase build size and require configuration), we built category distribution charts using responsive HTML/CSS gradients.
* **Basic Authentication**: Implemented a lightweight custom JWT authentication signature utilizing Node's native `crypto` module (SHA256 HMAC tokens) instead of setting up full OAuth2 or multi-role permissions.

---

### 5. What would you improve if you had one more week?
* **Real-time Synchronization**: Integrate Socket.io/WebSockets so new user feedback immediately pushes to the admin dashboard without refreshing.
* **Advanced Analytics**: Add date range pickers (daily, weekly, monthly charts) and support exporting data in CSV or Excel sheets.
* **Full E2E Testing**: Implement Playwright/Cypress coverage for frontend interactive verification.

---

### 6. What was the most difficult technical challenge you faced?
* **Vercel Serverless Restructuring**: Express apps traditionally run as persistent processes (`app.listen()`). Restructuring the backend to run as a Vercel Serverless function required decoupling the app creation (`src/index.ts` exporting default `app`) from the local runner (`src/server.ts` running the port listener).
* **Local DNS SRV Resolution**: Faced network-level SRV lookup failures (`querySrv ECONNREFUSED`) connecting to MongoDB Atlas on domestic ISPs. Resolved by URL-encoding special characters in the connection string and using public Google/Cloudflare DNS fallback rules.

---

### 7. Which AI tools did you use?
* **ChatGPT / Antigravity AI** as a pair-programming coding assistant.

---

### 8. Share one instance where AI helped you.
* Automatically translating the visual elements of the **BrewMaster Admin Dashboard** screenshot into a responsive, clean grid layout in Tailwind-free raw CSS, mapping coffee items to CRM metrics.

---

### 9. Share one instance where you disagreed with AI and why.
* The AI initially recommended using the local `feedback.json` file database for simplicity. I disagreed because the target deployment platform was **Vercel**. Since serverless containers are stateless, file writes are lost on container recycle. I insisted on integrating **MongoDB Atlas** as a persistent store.

---

### 10. What would break first if this application suddenly had 100,000 users?
* **In-Memory Rate Limiting**: The rate-limiter currently stores request histories in Node memory. With 100k users, this would quickly cause a memory leak. It must be offloaded to a shared Redis instance.
* **Database Connection Pool Exhaustion**: MongoDB Atlas free tier has connection limits (500 connections). High concurrent serverless invocations would exhaust this instantly. We would need to deploy a connection pooling proxy.

---

### 11. What is one thing in this assignment that you would improve, change, or challenge?
* The assignment could recommend selecting a cloud database model from the beginning. Implementing file-based databases when hosting on serverless platforms (Vercel/Netlify) is a common trap for junior engineers that breaks on deployment.
