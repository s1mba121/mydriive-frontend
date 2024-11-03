// src/pages/PersonalPage.js
import React, { useEffect, useState } from "react";
import { fetchUserFiles, isImageFile, getFilePreview } from "../../services/fileService";
import "./PersonalPage.css";

const PersonalPage = () => {
    const [files, setFiles] = useState([]);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getFiles = async () => {
            const userFiles = await fetchUserFiles(userId, token);
            setFiles(userFiles);
        };
        getFiles();
    }, [userId, token]);
    /*
    const [videos, setThumbnail] = useState(null);

    useEffect(() => {
        const getVideoThumbnail = async () => {
            const imageObjectURL = await fetchUserFiles(userId, "video.mp4", token);
            setThumbnail(imageObjectURL);
        }
        getVideoThumbnail();
    }, [userId, "video.mp4", token]);
    */
    return (
        <div className="personal-page">
            {files.length > 0 ? (
                <div className="file-grid">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="file-card"
                            style={{
                                backgroundImage: `url("${getFilePreview(file)}")`,
                            }}
                        >
                            <strong>{file.name}</strong>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Файлы отсутствуют</p>
            )}
        </div>
    );
};

export default PersonalPage;
