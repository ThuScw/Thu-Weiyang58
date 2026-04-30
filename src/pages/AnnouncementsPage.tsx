import { useState } from "react";
import { Pin, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import announcements from "../data/announcements.json";
import { ANNOUNCEMENT_CATEGORIES } from "../utils/constants";
import { formatDate } from "../utils/formatters";

export default function AnnouncementsPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    activeCategory === "全部"
      ? announcements
      : announcements.filter((a) => a.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="page-section">
      <SectionHeading
        title="通知公告"
        subtitle="及时了解班级最新动态与重要通知"
      />

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {ANNOUNCEMENT_CATEGORIES.map((cat) => (
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

      {/* List */}
      <div className="max-w-3xl mx-auto space-y-4">
        <AnimatePresence>
          {sorted.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  hover
                  className={`p-5 ${
                    item.pinned ? "ring-1 ring-accent/30 bg-amber-50/50" : ""
                  }`}
                  onClick={() =>
                    setExpandedId(isExpanded ? null : item.id)
                  }
                >
                  <div className="flex items-start gap-4">
                    {/* Date badge */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/5 flex flex-col items-center justify-center text-primary">
                      <span className="text-lg font-bold leading-none">
                        {new Date(item.date).getDate()}
                      </span>
                      <span className="text-xs mt-0.5">
                        {new Date(item.date).getMonth() + 1}月
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {item.pinned && (
                          <span className="inline-flex items-center gap-1 text-accent">
                            <Pin size={12} />
                            <span className="text-xs font-medium">置顶</span>
                          </span>
                        )}
                        <Badge>{item.category}</Badge>
                      </div>
                      <h3 className="font-heading font-bold text-text-primary mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-secondary line-clamp-2">
                        {isExpanded ? "" : item.content.slice(0, 100) + "..."}
                      </p>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-gray-100 text-text-secondary leading-relaxed whitespace-pre-line text-sm">
                              {item.content}
                            </div>
                            <p className="mt-4 text-xs text-text-secondary">
                              {formatDate(item.date)}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Expand icon */}
                    <div className="flex-shrink-0 text-text-secondary">
                      {isExpanded ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {sorted.length === 0 && (
        <p className="text-center text-text-secondary py-20">暂无该分类的通知</p>
      )}
    </div>
  );
}
