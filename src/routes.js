import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
// import RegistrationPage from "./pages/RegistrationPage";
// import VerificationPage from "./pages/VerificationPage";
// import BookingPage from "./pages/BookingPage";
// import SubscriptionPage from "./pages/SubscriptionPage";
// import NotFoundPage from "./pages/NotFoundPage";
import AuthPage from "./pages/Auth/AuthPage";

const AppRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Инициализируем состояние из localStorage
        return !!localStorage.getItem("token");
    });

    useEffect(() => {
        // Это действие можно оставить, если нужно что-то делать при изменении токена
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* Главная страница */}
                <Route
                    path="/auth"
                    element={<AuthPage setIsLoggedIn={setIsLoggedIn} />}
                />

                {/* Страница drive, доступная только для авторизованных пользователей */}
                <Route
                    path="/drive/*"
                    element={
                        isLoggedIn ? <HomePage /> : <Navigate to="/auth" />
                    }
                />

                {/* Страница регистрации */}
                {/* <Route path="/register" element={<RegistrationPage />} /> */}

                {/* Страница верификации по OTP */}
                {/* <Route path="/verify" element={<VerificationPage />} /> */}

                {/* Страница бронирования услуги */}
                {/* <Route path="/booking" element={<BookingPage />} /> */}

                {/* Страница подписки (Max+ пакет и другие предложения) */}
                {/* <Route path="/subscription" element={<SubscriptionPage />} /> */}

                {/* Страница ошибки 404 */}
                {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
