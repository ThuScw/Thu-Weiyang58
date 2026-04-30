import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-14 ${centered ? "text-center" : ""} ${className}`}
    >
      {/* Decorative ornament */}
      <div className={`flex items-center gap-4 mb-5 ${centered ? "justify-center" : ""}`}>
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/30" />
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary-light" />
        </div>
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/30" />
      </div>

      <h2 className="font-heading text-3xl md:text-4xl font-bold gradient-text">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-text-secondary max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
