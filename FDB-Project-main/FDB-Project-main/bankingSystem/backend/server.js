const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const winston = require('winston'); // For logging

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create a logger instance using winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ],
});

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        logger.error('Error connecting to the database:', err);
        return;
    }
    logger.info('Connected to the MySQL database.');
});

const handleError = (res, err) => {
    logger.error(err);
    res.status(500).json({ error: err.message });
};

const executeQuery = (query, params, res, successMessage) => {
    db.query(query, params, (err, results) => {
        if (err) return handleError(res, err);
        if (successMessage) {
            res.json({ message: successMessage });
        } else {
            res.json(results);
        }
    });
};

// User registration endpoint
app.post('/register', async (req, res) => {
    const { username, password, email, name, address, phone, dateOfBirth, gender, nationality, occupation, maritalStatus, role, status } = req.body;
    const dateJoined = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'SELECT * FROM Users WHERE Username = ?';
        db.query(query, [username], (err, results) => {
            if (err) return handleError(res, err);
            if (results.length > 0) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            const insertQuery = 'INSERT INTO Users (Username, Password, Email, Name, Address, Phone, Date_of_Birth, Gender, Nationality, Occupation, Marital_Status, Role, Status, Date_Joined) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(insertQuery, [username, hashedPassword, email, name, address, phone, dateOfBirth, gender, nationality, occupation, maritalStatus, role, status, dateJoined], (err, results) => {
                if (err) return handleError(res, err);
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    } catch (err) {
        handleError(res, err);
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM Users WHERE Username = ?';
    db.query(query, [username], (err, results) => {
        if (err) return handleError(res, err);
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const user = results[0];
        bcrypt.compare(password, user.Password, (err, match) => {
            if (err) return handleError(res, err);
            if (match) {
                res.json({ message: 'Login successful', user: { username: user.Username, id: user.User_ID } });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        });
    });
});

const createEntity = (entity, fields) => (req, res) => {
    const values = fields.map(field => req.body[field]);
    const query = `INSERT INTO ${entity} (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`;
    executeQuery(query, values, res, `${entity} created successfully`);
};

const getAllEntities = (entity) => (req, res) => {
    const query = `SELECT * FROM ${entity}`;
    executeQuery(query, [], res);
};

const updateEntity = (entity, fields, idField) => (req, res) => {
    const values = [...fields.map(field => req.body[field]), req.params.id];
    const query = `UPDATE ${entity} SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE ${idField} = ?`;
    executeQuery(query, values, res, `${entity} updated successfully`);
};

const deleteEntity = (entity, idField) => (req, res) => {
    const query = `DELETE FROM ${entity} WHERE ${idField} = ?`;
    executeQuery(query, [req.params.id], res, `${entity} deleted successfully`);
};

// Define endpoints for Users
app.post('/users', createEntity('Users', ['Username', 'Password', 'Email', 'Name', 'Address', 'Phone', 'Date_of_Birth', 'Gender', 'Nationality', 'Occupation', 'Marital_Status', 'Role', 'Status', 'Date_Joined']));
app.get('/users', getAllEntities('Users'));
app.put('/users/:id', updateEntity('Users', ['Username', 'Password', 'Email', 'Name', 'Address', 'Phone', 'Date_of_Birth', 'Gender', 'Nationality', 'Occupation', 'Marital_Status', 'Role', 'Status', 'Date_Joined'], 'User_ID'));
app.delete('/users/:id', deleteEntity('Users', 'User_ID'));

// Define endpoints for other entities
app.post('/branches', createEntity('Branches', ['Branch_Name', 'Address', 'Phone', 'Manager_ID', 'Opening_Date', 'Status']));
app.get('/branches', getAllEntities('Branches'));
app.put('/branches/:id', updateEntity('Branches', ['Branch_Name', 'Address', 'Phone', 'Manager_ID', 'Opening_Date', 'Status'], 'Branch_ID'));
app.delete('/branches/:id', deleteEntity('Branches', 'Branch_ID'));

app.post('/accounts', createEntity('Account', ['User_ID', 'Account_Type', 'Balance', 'Open_Date', 'Status', 'Interest_Rate', 'Branch_ID', 'Currency', 'Overdraft_Limit']));
// Fetch accounts for a specific user
app.get('/accounts/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM Account WHERE User_ID = ?';
    executeQuery(query, [userId], res);
});
app.get('/accountsall', getAllEntities('Account'));
app.put('/accounts/:id', updateEntity('Account', ['User_ID', 'Account_Type', 'Balance', 'Open_Date', 'Status', 'Interest_Rate', 'Branch_ID', 'Currency', 'Overdraft_Limit'], 'Account_ID'));
app.delete('/accounts/:id', deleteEntity('Account', 'Account_ID'));

app.post('/accountTransactions', createEntity('Account_Transactions', ['Account_ID', 'Transaction_Date', 'Amount', 'Transaction_Type_ID', 'Description', 'Status']));
app.get('/accountTransactionsAll', getAllEntities('Account_Transactions'));
// Fetch account transactions for a specific user
app.get('/accountTransactions/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT AT.* 
        FROM Account_Transactions AT
        JOIN Account A ON AT.Account_ID = A.Account_ID
        WHERE A.User_ID = ?
    `;
    executeQuery(query, [userId], res);
});

app.put('/accountTransactions/:id', updateEntity('Account_Transactions', ['Account_ID', 'Transaction_Date', 'Amount', 'Transaction_Type_ID', 'Description', 'Status'], 'Transaction_ID'));
app.delete('/accountTransactions/:id', deleteEntity('Account_Transactions', 'Transaction_ID'));

app.post('/atms', createEntity('ATM_Locations', ['Location', 'Branch_ID', 'Installation_Date', 'Status', 'Maintenance_Schedule']));
app.get('/atms', getAllEntities('ATM_Locations'));
app.put('/atms/:id', updateEntity('ATM_Locations', ['Location', 'Branch_ID', 'Installation_Date', 'Status', 'Maintenance_Schedule'], 'ATM_ID'));
app.delete('/atms/:id', deleteEntity('ATM_Locations', 'ATM_ID'));


app.post('/atmTransactions', createEntity('ATM_Transactions', ['ATM_ID', 'User_ID', 'Transaction_Date', 'Amount', 'Transaction_Type_ID', 'Status']));
// Fetch ATM transactions for a specific user
app.get('/atmTransactions/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT AT.* 
        FROM ATM_Transactions AT
        WHERE AT.User_ID = ?
    `;
    executeQuery(query, [userId], res);
});
app.get('/atmTransactionsall', getAllEntities('ATM_Transactions'));
app.put('/atmTransactions/:id', updateEntity('ATM_Transactions', ['ATM_ID', 'User_ID', 'Transaction_Date', 'Amount', 'Transaction_Type_ID', 'Status'], 'ATM_Transaction_ID'));
app.delete('/atmTransactions/:id', deleteEntity('ATM_Transactions', 'ATM_Transaction_ID'));

app.post('/cards', createEntity('Cards', ['User_ID', 'Card_Type', 'Expiry_Date', 'Card_Number', 'CVV', 'Issue_Date', 'Status']));
app.get('/cardsall', getAllEntities('Cards'));
// FIX: Use lowercase '/cards/:userId' to match frontend requests
app.get('/cards/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM Cards WHERE User_ID = ?';
    
    executeQuery(query, [userId], res);
});

app.put('/cards/:id', updateEntity('Cards', ['User_ID', 'Card_Type', 'Expiry_Date', 'Card_Number', 'CVV', 'Issue_Date', 'Status'], 'Card_ID'));
app.delete('/cards/:id', deleteEntity('Cards', 'Card_ID'));

app.post('/cardTransactions', createEntity('Card_Transactions', ['Card_ID', 'Transaction_Date', 'Amount', 'Merchant', 'Transaction_Type_ID', 'Location', 'Currency']));
// Fetch card transactions for a specific user
app.get('/cardTransactions/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT CT.* 
        FROM Card_Transactions CT
        JOIN Cards C ON CT.Card_ID = C.Card_ID
        WHERE C.User_ID = ?
    `;
    executeQuery(query, [userId], res);
});
app.get('/cardTransactionsall', getAllEntities('Card_Transactions'));
app.put('/cardTransactions/:id', updateEntity('Card_Transactions', ['Card_ID', 'Transaction_Date', 'Amount', 'Merchant', 'Transaction_Type_ID', 'Location', 'Currency'], 'Transaction_ID'));
app.delete('/cardTransactions/:id', deleteEntity('Card_Transactions', 'Transaction_ID'));

app.post('/employees', createEntity('Employees', ['Name', 'Position', 'Branch_ID', 'Hire_Date', 'Salary', 'Status']));
app.get('/employees', getAllEntities('Employees'));
app.put('/employees/:id', updateEntity('Employees', ['Name', 'Position', 'Branch_ID', 'Hire_Date', 'Salary', 'Status'], 'Employee_ID'));
app.delete('/employees/:id', deleteEntity('Employees', 'Employee_ID'));

app.post('/employeeSalaries', createEntity('Employee_Salaries', ['Employee_ID', 'Salary_Amount', 'Payment_Date', 'Bonus', 'Deductions']));
app.get('/employeeSalaries', getAllEntities('Employee_Salaries'));
app.put('/employeeSalaries/:id', updateEntity('Employee_Salaries', ['Employee_ID', 'Salary_Amount', 'Payment_Date', 'Bonus', 'Deductions'], 'Salary_ID'));
app.delete('/employeeSalaries/:id', deleteEntity('Employee_Salaries', 'Salary_ID'));

app.post('/fixedDeposits', createEntity('Fixed_Deposits', ['User_ID', 'Amount', 'Interest_Rate', 'Start_Date', 'End_Date', 'Status']));
// Fetch fixed deposits for a specific user
app.get('/fixedDeposits/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM Fixed_Deposits WHERE User_ID = ?';
    executeQuery(query, [userId], res);
});
app.get('/fixedDepositsall', getAllEntities('Fixed_Deposits'));
app.put('/fixedDeposits/:id', updateEntity('Fixed_Deposits', ['User_ID', 'Amount', 'Interest_Rate', 'Start_Date', 'End_Date', 'Status'], 'Deposit_ID'));
app.delete('/fixedDeposits/:id', deleteEntity('Fixed_Deposits', 'Deposit_ID'));

app.post('/loans', createEntity('Loan', ['User_ID', 'Loan_Type_ID', 'Amount', 'Interest_Rate', 'Start_Date', 'End_Date', 'Status', 'Collateral', 'Repayment_Term']));
// Fetch loans for a specific user
app.get('/loans/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM Loan WHERE User_ID = ?';
    executeQuery(query, [userId], res);
});
app.get('/loansall', getAllEntities('Loan'));
app.put('/loans/:id', updateEntity('Loan', ['User_ID', 'Loan_Type_ID', 'Amount', 'Interest_Rate', 'Start_Date', 'End_Date', 'Status', 'Collateral', 'Repayment_Term'], 'Loan_ID'));
app.delete('/loans/:id', deleteEntity('Loan', 'Loan_ID'));

app.post('/loanRepayments', createEntity('Loan_Repayment', ['Loan_ID', 'Repayment_Amount', 'Repayment_Date', 'Payment_Method', 'Status']));
// Fetch loan repayments for a specific user
app.get('/loanRepayments/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT LR.* 
        FROM Loan_Repayment LR
        JOIN Loan L ON LR.Loan_ID = L.Loan_ID
        WHERE L.User_ID = ?
    `;
    executeQuery(query, [userId], res);
});
app.get('/loanRepaymentsall', getAllEntities('Loan_Repayment'));
app.put('/loanRepayments/:id', updateEntity('Loan_Repayment', ['Loan_ID', 'Repayment_Amount', 'Repayment_Date', 'Payment_Method', 'Status'], 'Repayment_ID'));
app.delete('/loanRepayments/:id', deleteEntity('Loan_Repayment', 'Repayment_ID'));

app.post('/loanTypes', createEntity('Loan_Types', ['Type_Name', 'Description', 'Maximum_Amount', 'Minimum_Amount']));
app.get('/loanTypes', getAllEntities('Loan_Types'));
app.put('/loanTypes/:id', updateEntity('Loan_Types', ['Type_Name', 'Description', 'Maximum_Amount', 'Minimum_Amount'], 'Loan_Type_ID'));
app.delete('/loanTypes/:id', deleteEntity('Loan_Types', 'Loan_Type_ID'));

// CRUD operations for Overdrafts

// FIX: Added missing POST endpoint for Overdrafts
app.post('/overdrafts', (req, res) => {
    const { Account_ID, limit, Start_Date, End_Date, Status } = req.body;
    const query = 'INSERT INTO Overdrafts (Account_ID, `Limit`, Start_Date, End_Date, Status) VALUES (?, ?, ?, ?, ?)';
    executeQuery(query, [Account_ID, limit, Start_Date, End_Date, Status], res, 'Overdrafts created successfully');
});

app.get('/overdrafts/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT O.* 
        FROM Overdrafts O
        JOIN Account A ON O.Account_ID = A.Account_ID
        WHERE A.User_ID = ?
    `;
    executeQuery(query, [userId], res);
});

app.get('/overdraftsall', (req, res) => {
    const query = 'SELECT * FROM Overdrafts';
    executeQuery(query, [], res);
});

app.put('/overdrafts/:id', (req, res) => {
    const overdraftId = req.params.id;
    const { Account_ID, Limit, Start_Date, End_Date, Status } = req.body;
    const query = `
        UPDATE Overdrafts 
        SET Account_ID = ?, \`Limit\` = ?, Start_Date = ?, End_Date = ?, Status = ?
        WHERE Overdraft_ID = ?
    `;
    executeQuery(query, [Account_ID, Limit, Start_Date, End_Date, Status, overdraftId], res);
});

app.delete('/overdrafts/:id', (req, res) => {
    const overdraftId = req.params.id;
    const query = 'DELETE FROM Overdrafts WHERE Overdraft_ID = ?';
    executeQuery(query, [overdraftId], res);
});




app.post('/scheduledPayments', (req, res) => {
    const { accountID, amount, paymentDate, description, status } = req.body;

    if (!accountID || !amount || !paymentDate || !status) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = 'INSERT INTO Scheduled_Payments (Account_ID, Amount, Payment_Date, Description, Status) VALUES (?, ?, ?, ?, ?)';
    executeQuery(query, [accountID, amount, paymentDate, description, status], res);
});


app.get('/scheduledPayments/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT SP.* 
        FROM Scheduled_Payments SP
        JOIN Account A ON SP.Account_ID = A.Account_ID
        WHERE A.User_ID = ?
    `;
    executeQuery(query, [userId], res);
});

app.get('/scheduledPaymentsall', getAllEntities('Scheduled_Payments'));

app.put('/scheduledPayments/:id', updateEntity('Scheduled_Payments', ['Account_ID', 'Amount', 'Payment_Date', 'Description', 'Status'], 'Payment_ID'));

app.delete('/scheduledPayments/:id', deleteEntity('Scheduled_Payments', 'Payment_ID'));



app.post('/transactionTypes', createEntity('Transaction_Types', ['Type_Name', 'Description', 'Category']));
app.get('/transactionTypes', getAllEntities('Transaction_Types'));
app.put('/transactionTypes/:id', updateEntity('Transaction_Types', ['Type_Name', 'Description', 'Category'], 'Transaction_Type_ID'));
app.delete('/transactionTypes/:id', deleteEntity('Transaction_Types', 'Transaction_Type_ID'));

app.post('/feedbacks', createEntity('Customer_Feedback', [
    'User_ID',
    'Feedback_Date',
    'Feedback_Type',
    'Comments',
    'Rating'
]));
app.get('/feedbacks', getAllEntities('Customer_Feedback'));
app.put('/feedbacks/:id', updateEntity('Customer_Feedback', ['User_ID', 'Feedback_Date', 'Feedback_Type', 'Comments', 'Rating'], 'Feedback_ID'));
app.delete('/feedbacks/:id', deleteEntity('Customer_Feedback', 'Feedback_ID'));


const PORT = process.env.APP_PORT || 5001;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
