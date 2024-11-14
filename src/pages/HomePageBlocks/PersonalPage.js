// src/pages/PersonalPage.js
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { fetchUserFiles, getImagePreview } from "../../services/fileService";
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

    return (
        <div className="personal-page">
            {files.length > 0 ? (
                <div className="file-grid">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="file-card"
                            style={{
                                backgroundImage: `url("http://localhost:3000/api/files/${userId}/${file.name}")`,
                                backgroundPosition: "center",
                                // backgroundSize: "90%",
                                backgroundRepeat: "no-repeat",
                                padding: ""
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
