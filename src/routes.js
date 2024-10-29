import React, { useState } from "react";
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

const AppRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Routes>
                {/* Главная страница */}
                <Route path="/drive/*" element={<HomePage />} />

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
