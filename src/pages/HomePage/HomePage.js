// src/pages/HomePage.js
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./HomePage.css";
import AsideNav from "../../components/AsideNav/AsideNav";
import MainRoutes from "../MainRoutes";

const HomePage = () => {
    return (
        <div className="page-container">
            <header className="App-header">
                <Navbar />
            </header>
            <div className="home-content">
                <AsideNav />
                <main className="App-main">
                    <MainRoutes />
                </main>
            </div>
        </div>
    );
};

export default HomePage;
