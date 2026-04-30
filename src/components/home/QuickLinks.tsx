import { Link } from "react-router-dom";
import { Trophy, Users, Calendar, FileText, Image, Bell, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  {
    title: "班级成果",
    description: "荣誉与成就展示",
    path: "/achievements",
    icon: <Trophy size={28} />,
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-50 to-orange-50",
    shadowColor: "shadow-amber-200",
  },
  {
    title: "班级成员",
    description: "认识我们的同学",
    path: "/members",
    icon: <Users size={28} />,
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    shadowColor: "shadow-blue-200",
  },
  {
    title: "专栏文章",
    description: "班级故事与分享",
    path: "/articles",
    icon: <BookOpen size={28} />,
    gradient: "from-primary to-primary-light",
    bgGradient: "from-primary/5 to-primary-light/5",
    shadowColor: "shadow-primary/20",
  },
  {
    title: "通知公告",
    description: "最新班级通知",
    path: "/announcements",
    icon: <Bell size={28} />,
    gradient: "from-rose-500 to-pink-600",
    bgGradient: "from-rose-50 to-pink-50",
    shadowColor: "shadow-rose-200",
  },
  {
    title: "活动时间线",
    description: "精彩活动回顾",
    path: "/activities",
    icon: <Calendar size={28} />,
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-50 to-teal-50",
    shadowColor: "shadow-emerald-200",
  },
  {
    title: "文件下载",
    description: "资源与文件中心",
    path: "/files",
    icon: <FileText size={28} />,
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-50 to-purple-50",
    shadowColor: "shadow-violet-200",
  },
  {
    title: "图片画廊",
    description: "班级精彩瞬间",
    path: "/gallery",
    icon: <Image size={28} />,
    gradient: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-50 to-blue-50",
    shadowColor: "shadow-cyan-200",
  },
];

export default function QuickLinks() {
  return (
    <section className="page-section">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold gradient-text mb-3">
          探索58班
        </h2>
        <p className="text-text-secondary">了解我们的班级生活与成长轨迹</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {links.map((link, index) => (
          <motion.div
            key={link.path}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            <Link
              to={link.path}
              className={`group block p-6 rounded-2xl bg-gradient-to-br ${link.bgGradient} border border-gray-100 hover-lift transition-all duration-300 hover:shadow-lg ${link.shadowColor}`}
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${link.gradient} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {link.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
                {link.title}
              </h3>
              <p className="text-sm text-text-secondary">{link.description}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                了解更多
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
