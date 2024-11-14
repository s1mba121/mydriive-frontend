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

export const VideoThumbnail = async (userId, videoName, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/files/videos/${userId}/${videoName}/thumbnail`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching files:", error);
        return [];
    }
    /*
    const [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
        fetch(`/api/videos/${videoName}/thumbnail`)
            .then((response) => response.blob())
            .then((imageBlob) => {
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setThumbnail(imageObjectURL);
            })
            .catch((error) => console.error("Ошибка загрузки миниатюры:", error));
    }, [videoName]);
    */
};

export const isImageFile = (fileType) => {
    return ["photo", "image/png", "image/gif"].includes(fileType);
};

export const isVideoFile = (fileType) => {
    return ["video", "image/png", "image/gif"].includes(fileType);
};

export const getFile = async (userId, type, fileName, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/files/files/${userId}/${type}/${fileName}`, {
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

export function getFilePreview(file) {
    if (isImageFile(file.type)) {
        return "https://cms.imgworlds.com/assets/9558de9d-1e49-437e-aa7b-b8bd4d999b00.jpg?key=home-gallery";
    } else if (isVideoFile(file.type)) {
        return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=1200&s=1";
    }
    return "none";
}


export async function getImagePreview(fileId, token, setImageSrc, setError) {
    const fetchImage = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/files/${fileId}/preview`, {
                responseType: 'blob',  // Задаем тип ответа как blob, чтобы получить бинарные данные файла
                headers: {
                    Authorization: `Bearer ${token}`,  // Добавляем заголовок с токеном авторизации
                },
            });

            // Создаем URL для полученного blob-файла и обновляем состояние
            const imageUrl = URL.createObjectURL(response.data);
            console.log(`${imageUrl}`);
            setImageSrc(imageUrl);
        } catch (err) {
            console.error("Error fetching file:", err);
            setError("Failed to load image.");
        }
    };

    fetchImage();
}