// src/pages/PersonalPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PersonalPage.css"; // Import the CSS file

const PersonalPage = () => {
    const [files, setFiles] = useState([]);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get(
                    `http://10.31.179.74:3000/files/files/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setFiles(response.data);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };
        fetchFiles();
    }, [userId]);

    const isImageFile = (fileType) => {
        return ["image/jpeg", "image/png", "image/gif"].includes(fileType);
    };

    return (
        <div className="personal-page">
            {/* <h2>Личный контент</h2> */}
            {files.length > 0 ? (
                <div className="file-grid">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="file-card"
                            style={{
                                backgroundImage: isImageFile(file.type)
                                    ? `url(${file.url})`
                                    : "none",
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
