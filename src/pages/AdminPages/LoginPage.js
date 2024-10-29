import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Условный логин, можно потом интегрировать с беком
        if (username === "admin" && password === "admin") {
            onLogin(true);
        } else {
            alert("Неверные данные для входа!");
        }
    };

    return (
        <div className="login-container">
            <h2>Вход в админ-панель</h2>
            <form onSubmit={handleSubmit}>
                <label>Имя пользователя</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Пароль</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default LoginPage;
