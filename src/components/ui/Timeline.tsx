import { type ReactNode } from "react";
import { Clock } from "lucide-react";

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  type?: string;
  description?: string;
  icon?: ReactNode;
  content?: ReactNode;
  isFuture?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  onItemClick?: (item: TimelineItem) => void;
}

export default function Timeline({ items, onItemClick }: TimelineProps) {
  return (
    <div className="relative">
      {/* Central line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary-light opacity-30 md:-translate-x-px" />

      <div className="space-y-2">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          const future = item.isFuture ?? false;

          return (
            <div
              key={item.id}
              className={`relative flex items-start gap-6 md:gap-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div
                className={`flex-1 pl-12 md:pl-0 ${
                  isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <div
                  onClick={() => onItemClick?.(item)}
                  className={`inline-block card-base p-5 hover-lift cursor-pointer max-w-lg ${
                    isLeft ? "md:ml-auto" : ""
                  } ${future ? "border-accent/30 bg-accent/[0.02]" : ""}`}
                >
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={`text-xs font-mono font-medium px-2 py-0.5 rounded-md ${
                        future
                          ? "text-accent bg-accent/10"
                          : "text-primary bg-primary/5"
                      }`}
                    >
                      {item.date}
                    </span>
                    {item.type && (
                      <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-md">
                        {item.type}
                      </span>
                    )}
                    {future && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-md">
                        <Clock size={10} />
                        即将到来
                      </span>
                    )}
                  </div>
                  <h3
                    className={`font-heading text-lg font-bold mb-1 ${
                      future ? "text-accent" : "text-text-primary"
                    }`}
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {item.content}
                </div>
              </div>

              {/* Dot */}
              <div className="absolute left-[13px] md:left-1/2 top-6 md:-translate-x-1/2 z-10">
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-md ${
                    future
                      ? "bg-accent ring-2 ring-accent/20"
                      : "bg-gradient-to-br from-primary to-primary-light"
                  }`}
                />
              </div>

              {/* Spacer for md+ */}
              <div className="hidden md:block flex-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
