import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import AchievementsPage from "./pages/AchievementsPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import FilesPage from "./pages/FilesPage";
import GalleryPage from "./pages/GalleryPage";

export default function App() {
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}
