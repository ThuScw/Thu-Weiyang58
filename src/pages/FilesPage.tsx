import { useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import FileCard from "../components/ui/FileCard";
import files from "../data/files.json";
import { FILE_CATEGORIES } from "../utils/constants";

export default function FilesPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [search, setSearch] = useState("");

  const filtered = files
    .filter((f) =>
      activeCategory === "全部" ? true : f.category === activeCategory
    )
    .filter(
      (f) =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="page-section">
      <SectionHeading
        title="文件下载"
        subtitle="班级文件与学习资料共享中心"
      />

      {/* Search & Filter */}
      <div className="max-w-3xl mx-auto mb-10 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            placeholder="搜索文件名或描述..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {FILE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-white text-text-secondary hover:bg-primary/5 hover:text-primary border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* File list */}
      <div className="max-w-3xl mx-auto space-y-4">
        <AnimatePresence>
          {filtered.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <FileCard {...file} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-text-secondary py-20">
          <p className="text-lg mb-2">未找到匹配的文件</p>
          <p className="text-sm">尝试更换搜索关键词或切换分类</p>
        </div>
      )}
    </div>
  );
}
