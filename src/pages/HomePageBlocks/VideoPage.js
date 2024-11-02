import React, { useState } from "react";
import axios from "axios";

const VideoPage = () => {
    const [file, setFile] = useState(null);
    const [videos, setVideos] = useState([]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Пожалуйста, выберите видео для загрузки");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "http://192.168.183.33:3000/files/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert("Видео успешно загружено");
            fetchVideos(); // Обновляем список видео после загрузки
        } catch (error) {
            console.error("Ошибка загрузки видео:", error);
            alert("Ошибка загрузки видео");
        }
    };

    const fetchVideos = async () => {
        try {
            const response = await axios.get(
                "http://192.168.183.33:3000/files/your-user-id/videos"
            );
            setVideos(response.data);
        } catch (error) {
            console.error("Ошибка при получении видео:", error);
        }
    };

    return (
        <div>
            <h2>VideoPage</h2>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Загрузить видео</button>
            <h3>Загруженные видео:</h3>
            <ul>
                {videos.map((video) => (
                    <li key={video.id}>{video.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default VideoPage;
