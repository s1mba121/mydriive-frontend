// src/services/fileService.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchUserFiles = async (userId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/files/files/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching files:", error);
        return [];
    }
};

export const isImageFile = (fileType) => {
    return ["image/jpeg", "image/png", "image/gif"].includes(fileType);
};
