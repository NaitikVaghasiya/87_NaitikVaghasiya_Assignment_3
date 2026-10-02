# 701 Node.js - Assignment 3 Solutions

**Student Name:** Naitik Vaghasiya  
**Repository:** [87_NaitikVaghasiya_Assignment_3](https://github.com/NaitikVaghasiya/87_NaitikVaghasiya_Assignment_3.git)  
**Theme:** Modern Black & Blue Dark Palette (`#070c18`, `#0e172a`, `#2563eb`, `#38bdf8`)

---

## 📌 Assignment Overview & Question Directory

| Directory | Topic / Technology | Key Features |
| :--- | :--- | :--- |
| **`Question_1`** | Express + EJS + Multer + Express-Validator | Registration form, single/multi file upload, validation errors with old values, tabular display, file download route |
| **`Question_2`** | Express + EJS + `session-file-store` | File-based persistent session store, login, 2 protected routes, logout |
| **`Question_3`** | Express + EJS + `connect-redis` | Redis in-memory session store, login, 2 protected routes, logout |
| **`Question_4`** | Express + EJS + Mongoose + Nodemailer | ERP Admin Panel, session, employee CRUD, auto-generated EmpID & encrypted password (Bcrypt), payroll calculation (HRA, DA, PF, Net), email dispatch |
| **`Question_5`** | React.js + Vite + Express + JWT + Mongoose | Employee Self-Service (ESS) site, JWT auth, Page 1: Profile & payroll details, Page 2: Leave application (Add, List) & approval status |
| **`Question_6`** | React.js + Express + Frankfurter API | Real-time foreign exchange converter calling free utility API from frontend and backend |
| **`Question_7`** | MERN Stack (React + Express + Mongoose) | Complete Shopping Cart with Admin site (2-level Category & Product CRUD) and Customer Storefront (Category filters, cart drawer, live totals) |
| **`Question_8`** | React.js + Express + Sequelize ORM | Student Information System (SIS) CRUD operations for student records using Sequelize ORM |

---

## 🚀 How to Run Each Solution

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally on `mongodb://127.0.0.1:27017`)
- [Redis](https://redis.io/) (for Question 3, if running Redis locally)

---

### Question 1: User Registration & File Download
```bash
cd Question_1
npm install
node app.js
```
- Open browser at: `http://localhost:3000`

---

### Question 2: Login with File Session Store
```bash
cd Question_2
npm install
node app.js
```
- Open browser at: `http://localhost:3000`
- **Credentials:** Username: `admin` | Password: `1234`
- **Protected Routes:** `/home` (Route 1) & `/profile` (Route 2)

---

### Question 3: Login with Redis Session Store
```bash
cd Question_3
npm install
node app.js
```
- Open browser at: `http://localhost:3000`
- **Credentials:** Username: `admin` | Password: `1234`

---

### Question 4: ERP Admin Panel with Payroll & Email
```bash
cd Question_4
npm install
node app.js
```
- Open browser at: `http://localhost:3000`
- **Admin Credentials:** Username: `admin` | Password: `admin123`
- Features: Auto-generated `EMP###` IDs, bcrypt password hashing, automatic salary calculation:
  - HRA: `20%`
  - DA: `10%`
  - PF: `12%`
  - Net Pay: `Basic + HRA + DA - PF`

---

### Question 5: Employee Self-Service Portal (React + JWT)
**Backend:**
```bash
cd Question_5/server
npm install
node app.js
```
*(Runs on port 5000)*

**Frontend:**
```bash
cd Question_5/client
npm install
npm run dev
```

---

### Question 6: Currency Exchange Utility API
**Backend:**
```bash
cd Question_6/backend
npm install
node app.js
```
*(Runs on port 5000)*

**Frontend:**
```bash
cd Question_6/frontend
npm install
npm run dev
```

---

### Question 7: MERN Shopping Cart & Admin Catalog
**Backend:**
```bash
cd Question_7/backend
npm install
node app.js
```
*(Runs on port 5000)*

**Frontend:**
```bash
cd Question_7/frontend
npm install
npm run dev
```

---

### Question 8: Student Information System (Sequelize CRUD)
**Backend:**
```bash
cd Question_8/backend
npm install
node app.js
```
*(Runs on port 5000)*

**Frontend:**
```bash
cd Question_8/frontend
npm install
npm run dev
```

---

## 🎨 Theme Details
All 8 question modules have been styled with an executive **Black & Blue** color palette:
- **Backgrounds:** `#070c18` / `#0b1324` / `#0e172a`
- **Primary Accents:** Royal & Electric Blue (`#2563eb`, `#1d4ed8`)
- **Highlights & Cyan Glow:** `#38bdf8`
- **Typography:** Inter Google Font
