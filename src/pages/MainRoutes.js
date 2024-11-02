// src/pages/MainRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import PersonalPage from "./HomePageBlocks/PersonalPage";
import DiskPage from "./HomePageBlocks/DiskPage";
import RecentPage from "./HomePageBlocks/RecentPage";
import StarredPage from "./HomePageBlocks/StarredPage";
import TrashPage from "./HomePageBlocks/TrashPage";
import StoragePage from "./HomePageBlocks/StoragePage";
import VideoPage from "./HomePageBlocks/VideoPage";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="home" element={<PersonalPage />} />
            <Route path="video" element={<VideoPage />} />
            <Route path="recent" element={<RecentPage />} />
            <Route path="starred" element={<StarredPage />} />
            <Route path="trash" element={<TrashPage />} />
            <Route path="storage" element={<StoragePage />} />
        </Routes>
    );
};

export default MainRoutes;
