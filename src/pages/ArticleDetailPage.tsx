import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import Badge from "../components/ui/Badge";
import articles from "../data/articles.json";
import { formatDate } from "../utils/formatters";

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="page-section text-center py-32">
        <h1 className="font-heading text-4xl font-bold gradient-text mb-4">
          文章未找到
        </h1>
        <p className="text-text-secondary mb-8">该文章可能已被移除或链接无效</p>
        <Link
          to="/articles"
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft size={18} /> 返回专栏
        </Link>
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="max-w-3xl mx-auto">
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            返回专栏列表
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* Category + Featured badge */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Badge variant="gold">{article.category}</Badge>
            {article.featured && (
              <Badge variant="gold">精选文章</Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta row */}
          <div className="flex items-center gap-5 text-sm text-text-secondary pb-8 border-b border-gray-100">
            <span className="flex items-center gap-1.5">
              <Calendar size={16} className="text-primary" />
              {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={16} className="text-primary" />
              {article.author}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
              className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors ml-auto"
              title="复制链接"
            >
              <Share2 size={15} />
              <span className="hidden sm:inline">分享</span>
            </button>
          </div>
        </motion.header>

        {/* Featured image */}
        {article.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden mb-10 shadow-lg"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-72 md:h-96 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose max-w-none"
        >
          <div className="text-text-primary leading-loose text-base md:text-lg whitespace-pre-line">
            {article.content}
          </div>
        </motion.div>

        {/* Bottom nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between"
        >
          <Link
            to="/articles"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
          >
            <ArrowLeft size={16} />
            返回专栏列表
          </Link>

          <span className="text-xs text-text-secondary">
            {article.author} · {formatDate(article.date)}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
