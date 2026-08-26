import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './forms/header';
import Home from './forms/home';
import Customer from './forms/Customer';
import Account from './forms/Account';
import Loan from './forms/Loan';
import Card from './forms/Card';
import Feedback from './forms/Feedback';
import ScheduledPayment from './forms/ScheduledPayment';
import Login from './loginFunctions/Login';
import RegisterPage from './registerFunctions/Register';
import { AuthProvider } from './forms/authentication';
import Branch from './forms/Branch';
import AccountHolder from './forms/AccountHolder';
import Employee from './forms/Employee';
import EmployeeSalary from './forms/EmployeeSalary';
import LoanRepayments from './forms/LoanRepayment';
import ATMLocations from './forms/ATMLocations';
import CardTransaction from './forms/CardTransaction';
import ATMTransactions from './forms/ATMTransactions';
import AccountTransactions from './forms/AccountTransactions';
import FixedDeposite from './forms/FixedDeposite';
import Overdraft from './forms/OverDraft';
import LoanTypes from './forms/LoanTypes';
import TransactionTypes from './forms/TransactionTypes';

import CustomerAccount from './forms/CustomerAccount';
import CustomerFixedDeposite from './forms/CustomerFixedDeposite';
import CustomerOverDraft from './forms/CustomerOverDraft';
import CustomerAccountTransactions from './forms/CustomerAccountTransactions';
import CustomerCardTransaction from './forms/CustomerCardTransaction';
import CustomerATMTransactions from './forms/CustomerATMTransactions';
import CustomerLoan from './forms/CustomerLoan';
import CustomerLoanRepayment from './forms/CustomerLoanRepayment';
import CustomerFeedback from './forms/CustomerFeedback';
import CustomerBranch from './forms/CustomerBranch';
import CustomerScheduledPayments from './forms/CustomerScheduledPayments';
import CustomerCards from './forms/CustomerCards'; 
import CustomerATMLocations from './forms/CustomerATMLocations';

import UserTable from './forms/userDashboard';
import DepositTable from './forms/fixedDepositeDashboard';
import OverdraftTable from './forms/overDraftDashboard';
import AccountTable from './forms/accountDashboard';
import TransactionTable from './forms/accountTransactionsDashboard';
import CardTransactionTable from './forms/cardTransactionDashboard';
import ATMTransactionTable from './forms/atmTransactionsDashboard';
import TransactionTypeTable from './forms/transactionTypeDashboard';
import BranchTable from './forms/branchDashboard';
import SalaryTable from './forms/salaryTableDashboard';
import EmployeeTable from './forms/employeeDashboard';
import LoanRepaymentTable from './forms/loanRepaymentDashboard';
import LoanTable from './forms/loanDashboard';
import CardTable from './forms/cardsDashboard';
import ATMTable from './forms/atmLocationDashboard';
import LoanTypeDashboard from './forms/loanTypeDashboard';
import ScheduledPaymentsTable from './forms/shedulePaymentDashboard';
import CustomerFeedbackTable from './forms/FeedbackDashboard';



const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/customer" element={<Customer />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/loan" element={<Loan />} />
                    <Route path="/card" element={<Card />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/ScheduledPayment" element={<ScheduledPayment/>} />
                    <Route path="/branch" element={<Branch />} />
                    <Route path="/accountHolder" element={<AccountHolder />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/employeeSalary" element={<EmployeeSalary />} />
                    <Route path="/loanRepayment" element={<LoanRepayments />} />
                    <Route path="/ATMLocations" element={<ATMLocations/>} />
                    <Route path="/cardTransaction" element={<CardTransaction />} />
                    <Route path="/atmTransactions" element={<ATMTransactions />} />
                    <Route path="/accountTransactions" element={<AccountTransactions />} />
                    <Route path="/fixedDeposite" element={<FixedDeposite />} />
                    <Route path="/overDraft" element={<Overdraft/>} />
                    <Route path="/LoanTypes" element={<LoanTypes/>} />
                    <Route path="/transactionTypes" element={<TransactionTypes />} />
                    <Route path="/customerAccount" element={<CustomerAccount />} />
                    <Route path="/customerFixedDeposite" element={<CustomerFixedDeposite />} />
                    <Route path="/customerOverDraft" element={<CustomerOverDraft />} />
                    <Route path="/customerAccountTransactions" element={<CustomerAccountTransactions />} />
                    <Route path="/customerCardTransaction" element={<CustomerCardTransaction />} />
                    <Route path="/customerATMTransactions" element={<CustomerATMTransactions />} />
                    <Route path="/customerLoan" element={<CustomerLoan />} />
                    <Route path="/customerLoanRepayment" element={<CustomerLoanRepayment />} />
                    <Route path="/customerFeedback" element={<CustomerFeedback />} />
                    <Route path="/customerBranch" element={<CustomerBranch />} />
                    <Route path="/CustomerScheduledPayments" element={<CustomerScheduledPayments />} />
                    <Route path="/customerCards" element={<CustomerCards />} /> 
                    <Route path="/CustomerATMLocations" element={<CustomerATMLocations />} /> 

                    <Route path="/userDashboard" element={<UserTable/>} /> 
                    <Route path="/fixedDepositeDashboard" element={<DepositTable/>} />
                    <Route path="/overDraftDashboard" element={<OverdraftTable/>} />
                    <Route path="/accountDashboard" element={<AccountTable/>} />
                    <Route path="/accountTransactionsDashboard" element={<TransactionTable/>} />
                    <Route path="/cardTransactionDashboard" element={<CardTransactionTable/>} />
                    <Route path="/atmTransactionsDashboard" element={<ATMTransactionTable/>} />
                    <Route path="/transactionTypeDashboard" element={<TransactionTypeTable/>} />
                    <Route path="/branchDashboard" element={<BranchTable/>} />
                    <Route path="/salaryTableDashboard" element={<SalaryTable/>} />
                    <Route path="/employeeDashboard" element={<EmployeeTable/>} />
                    <Route path="/loanRepaymentDashboard" element={<LoanRepaymentTable/>} />
                    <Route path="/loanDashboard" element={<LoanTable/>} />
                    <Route path="/cardsDashboard" element={<CardTable/>} />
                    <Route path="/atmLocationDashboard" element={<ATMTable/>} />
                    <Route path="/loanTypeDashboard" element={<LoanTypeDashboard/>} />
                    <Route path="/shedulePaymentDashboard" element={<ScheduledPaymentsTable/>} />
                    <Route path="/FeedbackDashboard" element={<CustomerFeedbackTable/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
