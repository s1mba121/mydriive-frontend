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
    // if (isImageFile(file.type)) {
    //     return Promise.resolve("https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=1200&s=1");
    // } else if (isVideoFile(file.type)) {
    //     return getVideoThumbnail(file.url);
    // }
    // return Promise.resolve("https://cms.imgworlds.com/assets/9558de9d-1e49-437e-aa7b-b8bd4d999b00.jpg?key=home-gallery");
    if (isImageFile(file.type)) {
        return "https://cms.imgworlds.com/assets/9558de9d-1e49-437e-aa7b-b8bd4d999b00.jpg?key=home-gallery"
    } else if (isVideoFile(file.type)) {
        return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=1200&s=1";
    }
    return "none";
}

function getVideoThumbnail(videoUrl) {
    // try {
    //     var process = new ffmpeg('./video.mp4');
    //     process.then(function (video) {
    //         video.addCommand('-ss', '00:01:30')
    //         video.addCommand('-vframes', '1')
    //         video.save('./test.jpg', function (error, file) {
    //             if (!error)
    //                 console.log('Video file: ' + file);
    //         });
    //     }, function (err) {
    //         console.log('Error: ' + err);
    //     });
    // } catch (e) {
    //     console.log(e.code);
    //     console.log(e.msg);
    // }
}

// // Использование функции в компоненте
// files.forEach((file) => {
//     getFilePreview(file).then((thumbnailUrl) => {
//         document.getElementById(file.id).style.backgroundImage = `url(${thumbnailUrl})`;
//     });
// });
