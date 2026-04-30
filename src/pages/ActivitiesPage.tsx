import { useState } from "react";
import { MapPin, Calendar, Image, Clock } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import Timeline from "../components/ui/Timeline";
import Modal from "../components/ui/Modal";
import Badge from "../components/ui/Badge";
import activities from "../data/activities.json";
import { formatDate, getYear } from "../utils/formatters";

function isFuture(dateStr: string): boolean {
  return new Date(dateStr) > new Date();
}

function isPast(dateStr: string): boolean {
  return new Date(dateStr) <= new Date();
}

export default function ActivitiesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = activities.find((a) => a.id === selectedId);

  const pastActivities = activities
    .filter((a) => isPast(a.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const futureActivities = activities
    .filter((a) => isFuture(a.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const hasFuture = futureActivities.length > 0;

  function buildTimelineItems(list: typeof activities) {
    return list.map((a) => ({
      id: a.id,
      date: a.date,
      title: a.title,
      type: a.type,
      description: a.description,
      isFuture: isFuture(a.date),
    }));
  }

  function renderYearSection(list: typeof activities) {
    const years = [...new Set(list.map((a) => getYear(a.date)))];
    const items = buildTimelineItems(list);

    return years.map((year) => {
      const yearItems = items.filter((a) => getYear(a.date) === year);
      return (
        <div key={year}>
          <div className="flex items-center justify-center mb-8">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-full text-lg font-bold shadow-lg shadow-primary/25"
            >
              <Calendar size={18} />
              {year}年
            </motion.span>
          </div>
          <Timeline
            items={yearItems}
            onItemClick={(item) => setSelectedId(item.id)}
          />
        </div>
      );
    });
  }

  return (
    <div className="page-section">
      <SectionHeading
        title="活动时间线"
        subtitle="回顾58班走过的每一步精彩旅程，查看即将到来的活动安排"
      />

      <div className="max-w-3xl mx-auto">
        {/* Future events section */}
        {hasFuture && (
          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/30" />
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-accent/10 text-accent rounded-full text-sm font-bold">
                <Clock size={16} />
                即将到来
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/30" />
            </div>

            <div className="space-y-2">
              {buildTimelineItems(futureActivities).map((item) => (
                <div key={item.id} className="relative flex items-start gap-6 md:gap-0 md:flex-row">
                  <div className="flex-1 pl-12 md:pl-0 md:pr-12 md:text-right">
                    <div
                      onClick={() => setSelectedId(item.id)}
                      className="inline-block card-base p-5 hover-lift cursor-pointer max-w-lg md:ml-auto border-accent/20 bg-accent/[0.03]"
                    >
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md text-accent bg-accent/10">
                          {item.date}
                        </span>
                        {item.type && (
                          <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-md">
                            {item.type}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-md">
                          <Clock size={10} />
                          即将到来
                        </span>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-accent mb-1">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-text-secondary line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="absolute left-[13px] md:left-1/2 top-6 md:-translate-x-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-accent border-2 border-white shadow-md ring-2 ring-accent/20 animate-pulse" />
                  </div>
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past events timeline by year */}
        <div className="space-y-16">
          {renderYearSection(pastActivities)}
        </div>

        {activities.length === 0 && (
          <p className="text-center text-text-secondary py-20">暂无活动记录</p>
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={selectedId !== null}
        onClose={() => setSelectedId(null)}
        title={selected?.title}
      >
        {selected && (
          <div>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Badge variant="gold">{selected.type}</Badge>
              {isFuture(selected.date) && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                  <Clock size={12} />
                  即将到来
                </span>
              )}
              <span className="text-sm text-text-secondary font-mono">
                {formatDate(selected.date)}
              </span>
              {selected.location && (
                <span className="flex items-center gap-1 text-sm text-text-secondary">
                  <MapPin size={14} /> {selected.location}
                </span>
              )}
            </div>
            <p className="text-text-secondary leading-relaxed whitespace-pre-line">
              {selected.description}
            </p>
            {selected.images.length > 0 && (
              <div className="mt-6 grid grid-cols-1 gap-3">
                {selected.images.map((img, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden bg-gray-100"
                  >
                    <img
                      src={img}
                      alt={`${selected.title} - ${i + 1}`}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            {selected.images.length === 0 && (
              <div className="mt-6 flex items-center justify-center gap-2 text-text-secondary py-8 bg-gray-50 rounded-xl">
                <Image size={20} />
                <span className="text-sm">暂无活动图片</span>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
