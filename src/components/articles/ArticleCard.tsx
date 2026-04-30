import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import { formatDate } from "../../utils/formatters";
import { useImageLoader } from "../../hooks/useImageLoader";

interface ArticleCardProps {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  summary: string;
  image: string;
  featured: boolean;
}

export default function ArticleCard({
  id,
  title,
  date,
  author,
  category,
  summary,
  image,
  featured,
}: ArticleCardProps) {
  const { loaded, currentSrc } = useImageLoader(image);

  return (
    <Link to={`/articles/${id}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`card-base group cursor-pointer h-full flex flex-col ${
          featured ? "ring-1 ring-accent/20 bg-gradient-to-br from-accent/5 to-primary/5" : ""
        }`}
      >
        {/* Image */}
        {image && (
          <div className="relative overflow-hidden h-52 bg-gray-100 flex-shrink-0">
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
            {featured && (
              <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full shadow-lg">
                精选
              </span>
            )}
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-text-secondary mb-3 flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {formatDate(date)}
            </span>
            <span className="flex items-center gap-1">
              <User size={13} />
              {author}
            </span>
            <Badge>{category}</Badge>
            {featured && !image && (
              <Badge variant="gold">精选</Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="font-heading text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Summary */}
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 mb-4 flex-1">
            {summary}
          </p>

          {/* Read more */}
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all mt-auto">
            阅读全文 <ArrowRight size={15} />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
