import { useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  date: string;
  category: string;
}

interface LightboxProps {
  images: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const current = images[currentIndex];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, handleKey]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95"
            onClick={onClose}
          />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4">
            <div className="text-white/70 text-sm font-mono">
              {currentIndex + 1} / {images.length}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/50 text-xs bg-white/10 px-3 py-1 rounded-full">
                {current.category}
              </span>
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                <ChevronDown size={24} />
              </button>
            </div>
          </div>

          {/* Nav buttons */}
          <button
            onClick={onPrev}
            className="absolute left-4 z-10 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={onNext}
            className="absolute right-4 z-10 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Image */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative z-10 max-w-6xl max-h-[85vh] mx-12"
          >
            <img
              src={current.imagePath}
              alt={current.title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl"
            />

            {/* Bottom info */}
            <div className="mt-4 text-center">
              <h3 className="text-white font-heading text-xl font-bold mb-1">
                {current.title}
              </h3>
              <div className="flex items-center justify-center gap-3 text-sm text-white/50">
                <span>{current.date}</span>
                {current.description && (
                  <>
                    <span className="text-white/30">·</span>
                    <span>{current.description}</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
