// src/services/userService.js
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchUserData = async (userId, token) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}/data`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};
