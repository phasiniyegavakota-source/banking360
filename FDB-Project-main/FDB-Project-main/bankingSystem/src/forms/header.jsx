import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './authentication';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
    const { isAuthenticated, role, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [openDropdown, setOpenDropdown] = useState(null);
    const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);

    const toggleDropdown = (name) => {
        if (isAuthenticated) {
            setOpenDropdown((prev) => (prev === name ? null : name));
        }
    };

    const handleLinkClick = (path) => {
        if (isAuthenticated) {
            navigate(path);
            setOpenDropdown(null);
        } else {
            navigate('/login');
        }
    };

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const username = storedUser ? storedUser.username : '';

    const handleUsernameClick = () => {
        setShowLogoutDropdown((prev) => !prev);
    };

    return (
        <nav className="bg-blue-500 p-4 flex justify-between items-center">
            <h1 
                className="text-white text-2xl cursor-pointer hover:underline" 
                onClick={() => handleLinkClick('/')}
            >
                Banking 360
            </h1>
            <ul className="flex space-x-4 justify-center flex-nowrap">
                {isAuthenticated && (
                    <li className="relative">
                        <button
                            onClick={() => toggleDropdown('admin')}
                            className={`text-white hover:underline ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                            disabled={!isAuthenticated}
                        >
                            Admin
                        </button>
                        {openDropdown === 'admin' && (
                            <ul className="absolute top-full mt-2 bg-white shadow-lg rounded-lg py-2 w-48 text-left">
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/customer')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Customer
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/account')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Account
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/fixedDeposite')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Fixed Deposit
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/overDraft')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Overdraft
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/accountTransactions')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Account Transactions
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/cardTransaction')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Card Transactions
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/ATMTransactions')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add ATM Transactions
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/ATMLocations')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add ATM Locations
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/transactionTypes')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Transaction Types
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/loan')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Loan
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/LoanTypes')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Loan Types
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/loanRepayment')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Loan Repayment
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/employee')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Employee
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/employeeSalary')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Employee Salary
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/ScheduledPayment')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Scheduled Payments
                                    </button>
                                </li>
                                {/* <li>
                                    <button 
                                        onClick={() => handleLinkClick('/feedback')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Feedback
                                    </button>
                                </li> */}
                                <li>
                                    <button 
                                        onClick={() => handleLinkClick('/branch')}
                                        className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={!isAuthenticated}
                                    >
                                        Add Branches
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
                )}
                
                {/* Dashboard Dropdown */}
                <li className="relative">
                    <button
                        onClick={() => toggleDropdown('dashboard')}
                        className={`text-white hover:underline ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={!isAuthenticated}
                    >
                        Dashboard
                    </button>
                    {openDropdown === 'dashboard' && (
                        <ul className="absolute top-full mt-2 bg-white shadow-lg rounded-lg py-2 w-48 text-left">
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/userDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Customer Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/fixedDepositeDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Fixed Deposite Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/overDraftDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    OverDraft Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/accountDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Account Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/accountTransactionsDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Account Transactions Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/cardTransactionDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Card Transaction Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/atmTransactionsDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    ATM Transactions Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/transactionTypeDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Transaction Type Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/branchDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Branch Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/salaryTableDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Employee Salary Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/employeeDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Employee Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/loanRepaymentDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Loan Repayment Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/loanDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Loan Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/loanTypeDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Loan Type Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/cardsDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Cards Dashboard
                                </button>
                            </li>
                            
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/atmLocationDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    ATM Location Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/shedulePaymentDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Scheduled Payments Dashboard
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/FeedbackDashboard')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Feedback Dashboard
                                </button>
                            </li>
                        </ul>
                    )}
                </li>

                <li className="relative">
                    <button
                        onClick={() => toggleDropdown('account')}
                        className={`text-white hover:underline ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={!isAuthenticated}
                    >
                        Account
                    </button>
                    {openDropdown === 'account' && (
                        <ul className="absolute top-full mt-2 bg-white shadow-lg rounded-lg py-2 w-48 text-left">
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/customerAccount')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Account
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/CustomerCards')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Cards
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/customerAccountTransactions')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Account Transactions
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/customerCardTransaction')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Card Transactions
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/customerATMTransactions')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    ATM Transactions
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/customerFixedDeposite')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Fixed Deposit
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/customerOverDraft')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Overdrafts
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/CustomerScheduledPayments')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Scheduled Payments
                                </button>
                            </li>
                        </ul>
                    )}
                </li>

                <li className="relative">
                    <button
                        onClick={() => toggleDropdown('loan')}
                        className={`text-white hover:underline ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={!isAuthenticated}
                    >
                        Loan
                    </button>
                    {openDropdown === 'loan' && (
                        <ul className="absolute top-full mt-2 bg-white shadow-lg rounded-lg py-2 w-48 text-left">
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/customerLoan')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Loans
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/customerLoanRepayment')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Loan Repayments
                                </button>
                            </li>
                        </ul>
                    )}
                </li>

                <li className="relative">
                    <button
                        onClick={() => toggleDropdown('location')}
                        className={`text-white hover:underline ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={!isAuthenticated}
                    >
                        Location
                    </button>
                    {openDropdown === 'location' && (
                        <ul className="absolute top-full mt-2 bg-white shadow-lg rounded-lg py-2 w-48 text-left">
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/customerBranch')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    Branches
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => handleLinkClick('/CustomerATMLocations')}
                                    className={`block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={!isAuthenticated}
                                >
                                    ATM Locations
                                </button>
                            </li>
                        </ul>
                    )}
                </li>

                <li>
                    <Link 
                        to="/feedback"
                        onClick={() => handleLinkClick('/feedback')}
                        className={`text-white hover:underline ${!isAuthenticated ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        Feedback
                    </Link>
                </li>
            </ul>

            {/* User Menu (Username and Logout) */}
            <div className="relative">
                {isAuthenticated ? (
                    <div className="flex items-center">
                        <FaUserCircle className="text-white text-2xl mr-2 cursor-pointer" onClick={handleUsernameClick} />
                        <span className="text-white cursor-pointer" onClick={handleUsernameClick}>{username}</span>
                        {showLogoutDropdown && (
                            <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 text-left">
                                <li>
                                    <button 
                                        onClick={() => {
                                            logout();
                                            navigate('/login');
                                        }}
                                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link 
                        to="/login"
                        className="text-white hover:underline"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Header;
