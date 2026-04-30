import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import AchievementCard from "../components/achievements/AchievementCard";
import Modal from "../components/ui/Modal";
import Badge from "../components/ui/Badge";
import achievements from "../data/achievements.json";
import { ACHIEVEMENT_CATEGORIES } from "../utils/constants";
import { formatMonth } from "../utils/formatters";

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered =
    activeCategory === "全部"
      ? achievements
      : achievements.filter((a) => a.category === activeCategory);

  const selected = achievements.find((a) => a.id === selectedId);

  return (
    <div className="page-section">
      <SectionHeading
        title="班级成果"
        subtitle="记录58班在集体荣誉、个人成就和学术科研方面的每一项进步"
      />

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {ACHIEVEMENT_CATEGORIES.map((cat) => (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filtered.map((item) => (
            <AchievementCard
              key={item.id}
              {...item}
              onClick={() => setSelectedId(item.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-secondary py-20">暂无该分类的成果</p>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={selectedId !== null}
        onClose={() => setSelectedId(null)}
        title={selected?.title}
      >
        {selected && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="gold">{selected.category}</Badge>
              <span className="text-sm text-text-secondary font-mono">
                {formatMonth(selected.date)}
              </span>
              {selected.highlight && (
                <Badge variant="gold">亮点成果</Badge>
              )}
            </div>
            <p className="text-text-secondary leading-relaxed">
              {selected.description}
            </p>
            {selected.image && (
              <div className="mt-6 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
