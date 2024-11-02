// src/services/uploadService.js
import axios from "axios";

let source = null;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const uploadFile = async (file, userId, setUploadProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    source = axios.CancelToken.source();

    try {
        await axios.post(`${BASE_URL}/files/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress({ file, progress: percentCompleted });
            },
            cancelToken: source.token,
        });

        console.log("Файл успешно загружен");
        setUploadProgress(null);
        window.location.reload();
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log("Загрузка отменена");
        } else {
            console.error("Ошибка загрузки файла:", error);
        }
        setUploadProgress(null);
    }
};

export const cancelUpload = () => {
    if (source) {
        source.cancel("Отмена загрузки пользователем");
    }
};

export const pauseUpload = (setUploadProgress) => {
    if (source) {
        source.cancel("Пауза загрузки");
        setUploadProgress((prev) => ({ ...prev, paused: true }));
    }
};

export const resumeUpload = (file, userId, setUploadProgress) => {
    uploadFile(file, userId, setUploadProgress);
    setUploadProgress((prev) => ({ ...prev, paused: false }));
};
