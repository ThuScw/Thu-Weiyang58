import { useEffect, useRef, useState } from "react";
import { Users, Trophy, Calendar, Flag } from "lucide-react";
import { motion } from "framer-motion";
import stats from "../../data/stats.json";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
}

const statItems: StatItem[] = [
  { label: "班级成员", value: stats.totalMembers, suffix: "人", icon: <Users size={24} /> },
  { label: "集体成果", value: stats.totalAchievements, suffix: "+", icon: <Trophy size={24} /> },
  { label: "活动次数", value: stats.totalActivities, suffix: "+", icon: <Calendar size={24} /> },
  { label: "建班年份", value: Number(stats.established), suffix: "", icon: <Flag size={24} /> },
];

function CountUpNumber({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsSection() {
  return (
    <section className="relative -mt-16 z-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover-lift"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <div className="font-heading text-3xl font-bold text-text-primary mb-1 font-mono">
                <CountUpNumber target={item.value} />
                <span className="text-xl text-primary">{item.suffix}</span>
              </div>
              <div className="text-sm text-text-secondary">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
