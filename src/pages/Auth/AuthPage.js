// AuthPage.js
import React, { useState } from "react";
import "./AuthPage.css";
import { Link, useNavigate } from "react-router-dom";
import { login, register, verifyEmail } from "../../services/authService";

const AuthPage = ({ setIsLoggedIn }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isVerificationMode, setIsVerificationMode] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        code: "",
    });
    const [fadeOut, setFadeOut] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            if (isVerificationMode) {
                await verifyEmail(formData.email, formData.code);
                alert("Email verified successfully!");
                setIsLoggedIn(true);
                navigate("/drive/home");
            } else if (isLoginMode) {
                const data = await login(formData.username, formData.password);
                if (data.token) {
                    localStorage.setItem("userId", data.userId);
                    localStorage.setItem("token", data.token);
                    setIsLoggedIn(true);
                    navigate("/drive/home");
                } else {
                    throw new Error("No token received");
                }
            } else {
                await register(
                    formData.username,
                    formData.email,
                    formData.phone,
                    formData.password
                );
                alert(
                    "Registration successful. Check your email for verification."
                );
                setIsVerificationMode(true);
            }
        } catch (error) {
            console.error("Ошибка при входе:", error);
            setErrorMessage(
                error.response?.data?.error || "Что-то пошло не так"
            );
        }
    };

    const toggleMode = () => {
        setFadeOut(true);
        setTimeout(() => {
            setIsLoginMode(!isLoginMode);
            setIsVerificationMode(false);
            setFormData({
                username: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
                code: "",
            });
            setFadeOut(false);
        }, 500);
    };

    return (
        <main className="auth-container">
            <div
                className="auth-box"
                style={{
                    height: isLoginMode
                        ? "350px"
                        : isVerificationMode
                          ? "400px"
                          : "450px",
                }}
            >
                <div className="auth-content">
                    <img
                        src="Untitled-3.png"
                        alt="Logo"
                        className="auth-logo"
                    />
                    <h1 className="auth-title">
                        {isLoginMode
                            ? "Войти в аккаунт"
                            : isVerificationMode
                              ? "Подтверждение почты"
                              : "Создать аккаунт"}
                    </h1>
                    <p className="auth-description">
                        {isLoginMode
                            ? "Введите логин или email и пароль"
                            : isVerificationMode
                              ? "Введите код, отправленный на вашу почту"
                              : "Введите свои данные для регистрации"}
                    </p>
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                    {!isVerificationMode && (
                        <button onClick={toggleMode} className="toggle-button">
                            {isLoginMode
                                ? "Создать аккаунт"
                                : "Уже есть аккаунт? Войти"}
                        </button>
                    )}
                </div>
                <form
                    onSubmit={handleSubmit}
                    className={`auth-form ${fadeOut ? "fade-out" : ""}`}
                >
                    {isVerificationMode ? (
                        <input
                            type="text"
                            name="code"
                            placeholder="Введите код верификации"
                            value={formData.code}
                            onChange={handleChange}
                            required
                            className="input-field fade-in"
                        />
                    ) : isLoginMode ? (
                        <>
                            <input
                                type="text"
                                name="username"
                                placeholder="Логин или Email"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                name="username"
                                placeholder="Логин"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Телефон"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Повторите пароль"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                        </>
                    )}
                    <button type="submit" className="submit-button">
                        {isVerificationMode
                            ? "Подтвердить"
                            : isLoginMode
                              ? "Войти"
                              : "Далее"}
                    </button>
                </form>
            </div>
            <div className="auth-footer">
                <Link className="footer-link" to="/support">
                    Условия пользования
                </Link>
                <div>
                    <Link className="footer-link" to="/privacy">
                        Политика конфиденциальности
                    </Link>
                    <Link
                        className="footer-link"
                        style={{ marginLeft: "25px" }}
                        to="/about"
                    >
                        О нас
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default AuthPage;
