import { Trophy, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import { formatMonth } from "../../utils/formatters";
import { useImageLoader } from "../../hooks/useImageLoader";

interface AchievementCardProps {
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
  highlight: boolean;
  onClick: () => void;
}

export default function AchievementCard({
  title,
  category,
  date,
  description,
  image,
  highlight,
  onClick,
}: AchievementCardProps) {
  const { loaded, currentSrc } = useImageLoader(image);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div
        onClick={onClick}
        className={`group relative card-base cursor-pointer transition-all duration-300 hover-lift overflow-hidden ${
          highlight
            ? "ring-2 ring-accent/40 shadow-lg shadow-accent/10"
            : ""
        }`}
      >
        {/* Image area */}
        {image && (
          <div className="relative h-40 bg-gray-100 overflow-hidden">
            {!loaded && <div className="absolute inset-0 skeleton" />}
            <img
              src={currentSrc || image}
              alt={title}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {highlight && (
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full shadow-lg">
                  <Trophy size={12} /> 亮点
                </span>
              </div>
            )}
          </div>
        )}

        {/* No image placeholder */}
        {!image && (
          <div className="relative h-40 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
            <ImageIcon size={32} className="text-primary/20" />
            {highlight && (
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full shadow-lg">
                  <Trophy size={12} /> 亮点
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-5">
          {/* Trophy icon row */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Trophy size={16} />
            </div>
            <span className="text-xs font-mono text-text-secondary">
              {formatMonth(date)}
            </span>
            <Badge>{category}</Badge>
          </div>

          <h3 className="font-heading text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2">
            {description}
          </p>

          {/* Bottom decoration */}
          <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary via-accent to-primary-light transition-all duration-500 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}
