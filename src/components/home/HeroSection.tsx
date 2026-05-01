import { useEffect, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - dark gradient with cyan + purple */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0F2035] to-[#0D1F2D]" />

      {/* Animated glow orbs - cyan and purple */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cyan orb */}
        <div
          className="glow-orb w-[700px] h-[700px] -top-32 -right-32 opacity-25"
          style={{
            background: "radial-gradient(circle, #14B8A6 0%, transparent 70%)",
            transform: `translate(${mousePos.x * 0.03}px, ${mousePos.y * 0.03}px)`,
          }}
        />
        {/* Purple orb */}
        <div
          className="glow-orb w-[500px] h-[500px] -bottom-24 -left-24 opacity-25"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            transform: `translate(${-mousePos.x * 0.02}px, ${-mousePos.y * 0.02}px)`,
          }}
        />
        {/* Gold accent orb */}
        <div
          className="glow-orb w-[300px] h-[300px] top-1/2 left-1/3 opacity-15"
          style={{
            background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)",
            transform: `translate(${mousePos.x * 0.015}px, ${-mousePos.y * 0.015}px)`,
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,184,166,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.3) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/8 backdrop-blur-sm border border-white/15 text-white/85 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse" style={{ animationDelay: "0.3s" }} />
            </span>
            清华大学 · 未央书院
          </span>
        </motion.div>

        {/* Class logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-6"
        >
          <img
            src="/logo.svg"
            alt="班徽"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-tight"
        >
          未央书院
          <br />
          <span className="bg-gradient-to-r from-primary-lighter via-white to-accent-lighter bg-clip-text text-transparent">
            58班
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          自强不息，厚德载物
          <br />
          <span className="text-white/40 text-base">
            青衿之志，履践致远
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="/achievements"
            className="group px-8 py-3.5 bg-white text-primary font-medium rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-xl hover:shadow-white/15 active:scale-95 inline-flex items-center gap-2"
          >
            班级成果
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="/articles"
            className="group px-8 py-3.5 border-2 border-white/25 text-white font-medium rounded-xl hover:bg-white/8 hover:border-white/40 transition-all duration-300 active:scale-95 inline-flex items-center gap-2"
          >
            专栏文章
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs font-mono">向下滚动</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/40"
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>

      {/* Bottom fade to light background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-light to-transparent" />
    </section>
  );
}
