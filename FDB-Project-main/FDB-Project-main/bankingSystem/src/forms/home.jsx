// src/forms/Home.jsx
import React from "react";
import bankLogo from "../assets/BankLogo.png"; // Correct import path

const Home = () => {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen text-white text-center"
            style={{
                backgroundImage: `url(${bankLogo})`, // Use the imported image here
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <h1 className="text-3xl font-bold mb-6">Welcome to Online Banking</h1>
            <p className="text-xl mb-4">Manage your finances with ease.</p>
            <p>Explore our features by selecting an option from the header.</p>
        </div>
    );
};

export default Home;
