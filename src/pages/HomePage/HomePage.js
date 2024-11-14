// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AsideNav from "../../components/AsideNav/AsideNav";
import MainRoutes from "../MainRoutes";
import { fetchUserData } from "../../services/userService";
import "./HomePage.css";

const HomePage = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            if (!userId) {
                setError("User ID is not available");
                return;
            }

            try {
                const data = await fetchUserData(userId, token);
                setUserData(data);
            } catch (err) {
                setError("Не удалось получить данные пользователя");
            }
        };

        getUserData();
    }, []);

    return (
        <div className="page-container">
            <header className="App-header">
                <Navbar
                    email={userData ? userData.email : null}
                    username={userData ? userData.username : null}
                    avatarURL={userData ? userData.avatarURL : "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?cs=srgb&dl=pexels-sagui-andrea-200115-618833.jpg&fm=jpg"}
                />
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
