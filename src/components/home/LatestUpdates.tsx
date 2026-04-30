import { Link } from "react-router-dom";
import { ArrowRight, Bell, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import announcements from "../../data/announcements.json";
import activities from "../../data/activities.json";
import { formatDate } from "../../utils/formatters";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function LatestUpdates() {
  const latestAnnouncements = announcements.slice(0, 3);
  const latestActivities = activities.slice(0, 3);

  return (
    <section className="page-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Announcements */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                <Bell size={20} />
              </div>
              <h2 className="font-heading text-2xl font-bold">最新通知</h2>
            </div>
            <Link
              to="/announcements"
              className="flex items-center gap-1 text-sm text-primary hover:text-primary-light transition-colors font-medium"
            >
              查看全部 <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-3">
            {latestAnnouncements.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link to="/announcements">
                  <Card hover className="p-4 flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 font-mono text-sm font-bold">
                      {new Date(item.date).getDate().toString().padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-text-primary truncate">
                          {item.title}
                        </h3>
                        {item.pinned && <Badge variant="gold">置顶</Badge>}
                      </div>
                      <p className="text-xs text-text-secondary">
                        {formatDate(item.date)} · {item.category}
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                <Calendar size={20} />
              </div>
              <h2 className="font-heading text-2xl font-bold">近期活动</h2>
            </div>
            <Link
              to="/activities"
              className="flex items-center gap-1 text-sm text-primary hover:text-primary-light transition-colors font-medium"
            >
              查看全部 <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-3">
            {latestActivities.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link to="/activities">
                  <Card hover className="p-4 flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 font-mono text-sm font-bold">
                      {new Date(item.date).getMonth() + 1}月
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-text-primary truncate">
                          {item.title}
                        </h3>
                        <Badge>{item.type}</Badge>
                      </div>
                      <p className="text-xs text-text-secondary">
                        {formatDate(item.date)}
                        {item.location && ` · ${item.location}`}
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
