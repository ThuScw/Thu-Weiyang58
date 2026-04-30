import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import ImageCard from "../components/ui/ImageCard";
import Lightbox from "../components/gallery/Lightbox";
import gallery from "../data/gallery.json";
import { GALLERY_CATEGORIES } from "../utils/constants";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "全部"
      ? gallery
      : gallery.filter((g) => g.category === activeCategory);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [filtered]
  );

  const handleOpen = (id: string) => {
    const idx = sorted.findIndex((g) => g.id === id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  return (
    <div className="page-section">
      <SectionHeading
        title="图片画廊"
        subtitle="用镜头记录58班的每一个精彩瞬间"
      />

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {GALLERY_CATEGORIES.map((cat) => (
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

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        <AnimatePresence>
          {sorted.map((item) => (
            <div key={item.id} className="break-inside-avoid">
              <ImageCard
                src={item.imagePath}
                thumbnail={item.thumbnailPath}
                title={item.title}
                description={item.description}
                date={item.date}
                category={item.category}
                onClick={() => handleOpen(item.id)}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>

      {sorted.length === 0 && (
        <p className="text-center text-text-secondary py-20">暂无该分类的图片</p>
      )}

      {/* Lightbox */}
      <Lightbox
        images={sorted}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNext={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % sorted.length : 0
          )
        }
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev !== null ? (prev - 1 + sorted.length) % sorted.length : 0
          )
        }
      />
    </div>
  );
}
