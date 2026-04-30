import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import ArticleCard from "../components/articles/ArticleCard";
import articles from "../data/articles.json";
import { ARTICLE_CATEGORIES } from "../utils/constants";

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filtered =
    activeCategory === "全部"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="page-section">
      <SectionHeading
        title="专栏文章"
        subtitle="记录班级故事，分享学习心得，回顾精彩活动"
      />

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {ARTICLE_CATEGORIES.map((cat) => (
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {sorted.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </AnimatePresence>
      </div>

      {sorted.length === 0 && (
        <p className="text-center text-text-secondary py-20">暂无该分类的文章</p>
      )}
    </div>
  );
}
