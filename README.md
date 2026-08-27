# Banking360 – Secure Full-Stack Banking Application

A full-stack banking management system built with **React**, **Node.js/Express**, and **MySQL**. The application supports two roles — **Admin** and **Customer** — and covers the complete banking lifecycle including accounts, transactions, loans, cards, ATMs, employees, and customer feedback.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, React Router DOM, Axios |
| Backend | Node.js, Express.js, REST APIs |
| Database | MySQL |
| Auth & Security | bcrypt (password hashing), dotenv (env config) |
| Logging | Winston |

---

## Features

### Customer Portal
- Register and login with secure bcrypt-hashed passwords
- View and manage personal bank accounts
- View account transactions, ATM transactions, and card transactions
- Apply for loans and track loan repayments
- Manage cards and card transactions
- Set up scheduled payments
- Apply for overdrafts
- Manage fixed deposits
- Submit and view customer feedback
- View nearby ATM locations and branch details
- ### Admin Dashboard
- Full CRUD operations on all entities:
  - Users, Customers, Employees, Branches
  - Accounts, Account Transactions
  - ATM Locations, ATM Transactions
  - Cards, Card Transactions
  - Loans, Loan Types, Loan Repayments
  - Fixed Deposits, Overdrafts
  - Scheduled Payments, Transaction Types
  - Employee Salaries
  - Customer Feedback

---

## Project Structure
banking360/
├── backend/
│ ├── server.js # Express server with all REST API endpoints
│ ├── .env # Environment variables (DB credentials, port)
│ └── package.json
├── src/
│ ├── forms/ # All React form and dashboard components
│ ├── loginFunctions/ # Login logic
│ ├── registerFunctions/ # Registration logic
│ ├── App.jsx # Main app with routing
│ └── main.jsx
├── index.html
├── package.json
└── vite.config.js

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL database

### 1. Clone the repository
```bash
git clone https://github.com/phasiniyegavakota-source/banking360.git
cd banking360
```

### 2. Set up the backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=banking360
APP_PORT=5001

Start the backend server:
```bash
node server.js
```

### 3. Set up the frontend
```bash
cd ..
npm install
npm run dev
```

The app will run at `http://localhost:5173`

Start the backend server:
```bash
node server.js
```

### 3. Set up the frontend
```bash
cd ..
npm install
npm run dev
```

The app will run at `http://localhost:5173`
## API Endpoints (Sample)

| Method | Endpoint | Description |
|---|---|---|
| POST | /register | Register a new user |
| POST | /login | User login |
| GET | /accounts/:userId | Get accounts for a user |
| POST | /accounts | Create a new account |
| GET | /loans/:userId | Get loans for a user |
| GET | /cards/:userId | Get cards for a user |
| GET | /atmTransactions/:userId | Get ATM transactions for a user |
| POST | /scheduledPayments | Create a scheduled payment |

---

## Key Technical Decisions

- **bcrypt password hashing** — all user passwords are hashed before storing in the database, ensuring no plain-text credentials are ever saved
- **Role-based access** — Admin and Customer roles control what data and actions are accessible
- **Reusable API patterns** — `createEntity`, `getAllEntities`, `updateEntity`, `deleteEntity` factory functions reduce code duplication across 15+ entities
- **Winston logging** — all database errors and server events are logged to both console and file for debugging and audit trails
- **Environment variables** — database credentials are stored in `.env` and never hardcoded

---

## Author

**Hasini Prasad**
MS Computer Science — University of North Texas

[LinkedIn](https://linkedin.com/in/hasini-prasad-b761b0286) | [GitHub](https://github.com/phasiniyegavakota-source)
