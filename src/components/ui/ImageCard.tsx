import { useState } from "react";
import { motion } from "framer-motion";
import { useImageLoader } from "../../hooks/useImageLoader";

interface ImageCardProps {
  src: string;
  thumbnail?: string;
  title: string;
  description?: string;
  date?: string;
  category?: string;
  onClick?: () => void;
}

export default function ImageCard({
  src,
  thumbnail,
  title,
  description,
  date,
  category,
  onClick,
}: ImageCardProps) {
  const { loaded, currentSrc } = useImageLoader(src, thumbnail);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
        {!loaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={currentSrc || src}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } group-hover:scale-110`}
          loading="lazy"
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 md:opacity-60"
          }`}
        />

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-heading font-bold text-lg mb-1">{title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {category && (
              <span className="text-xs bg-accent/80 text-white px-2 py-0.5 rounded-full">
                {category}
              </span>
            )}
            {date && <span className="text-xs text-white/70">{date}</span>}
          </div>
          {description && (
            <p className="text-sm text-white/80 mt-1 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Hover zoom icon */}
        <div
          className={`absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
