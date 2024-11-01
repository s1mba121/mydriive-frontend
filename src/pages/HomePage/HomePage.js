// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AsideNav from "../../components/AsideNav/AsideNav";
import MainRoutes from "../MainRoutes";
import "./HomePage.css";

const HomePage = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("userId"); // предполагаем, что `userId` сохранен в localStorage

                if (!userId) {
                    throw new Error("User ID is not available");
                }

                const response = await fetch(
                    `http://10.31.179.74:3000/user/${userId}/data`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Не удалось получить данные пользователя");
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="page-container">
            <header className="App-header">
                <Navbar />
            </header>
            <div className="home-content">
                <AsideNav
                    storageLimit={userData ? userData.storageLimit : 0}
                    usedStorage={userData ? userData.usedStorage : 0}
                    userId={userData ? userData.userId : null}
                />
                <main className="App-main">
                    {error ? (
                        <p>{error}</p>
                    ) : userData ? (
                        <div style={{ textAlign: "center" }}>
                            <h2>Добро пожаловать, {userData.username}!</h2>
                            {/* <p>Email: {userData.email}</p>
                            <p>Роль: {userData.role}</p>
                            <p>Лимит хранилища: {userData.storageLimit} MB</p>
                            <p>
                                Использовано хранилища: {userData.usedStorage}{" "}
                                MB
                            </p> */}
                        </div>
                    ) : (
                        <p>Загрузка данных...</p>
                    )}
                    <MainRoutes />
                </main>
            </div>
        </div>
    );
};

export default HomePage;
