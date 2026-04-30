import { useState } from "react";
import { Mail, MessageCircle, User } from "lucide-react";
import { motion } from "framer-motion";

interface MemberCardProps {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  tags: string[];
  contact: { email?: string; wechat?: string };
}

function AvatarImage({ src, name }: { src: string; name: string }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  if (imgError || !src) {
    return (
      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-primary-light to-accent flex items-center justify-center text-white text-3xl font-bold shadow-inner">
        {name[0]}
      </div>
    );
  }

  return (
    <div className="relative w-24 h-24">
      {!imgLoaded && (
        <div className="absolute inset-0 rounded-2xl skeleton" />
      )}
      <img
        src={src}
        alt={name}
        className={`w-24 h-24 rounded-2xl object-cover shadow-md transition-opacity duration-500 ${
          imgLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImgLoaded(true)}
        onError={() => setImgError(true)}
      />
    </div>
  );
}

export default function MemberCard({
  name,
  role,
  avatar,
  bio,
  tags,
  contact,
}: MemberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const isLeader = role !== "同学";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="perspective-1000 h-[380px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full preserve-3d transition-transform duration-600 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden card-base p-6 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Decorative top gradient */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
            isLeader ? "from-accent via-accent-light to-accent-lighter" : "from-primary via-primary-light to-primary-lighter"
          }`} />

          {/* Avatar */}
          <div className="relative mb-5 mt-2">
            <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${
              isLeader ? "from-accent/20 to-accent-light/20" : "from-primary/10 to-primary-light/10"
            }`} />
            <div className="relative rounded-2xl overflow-hidden ring-2 ring-white">
              <AvatarImage src={avatar} name={name} />
            </div>
          </div>

          <h3 className="font-heading text-xl font-bold text-text-primary mb-1">
            {name}
          </h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
            isLeader
              ? "bg-accent/10 text-accent"
              : "bg-primary/10 text-primary"
          }`}>
            {role}
          </span>
          <p className="text-sm text-text-secondary line-clamp-3 mb-4 leading-relaxed px-2">
            {bio}
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 bg-gray-50 text-text-secondary rounded-full border border-gray-100"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Flip hint */}
          <p className="absolute bottom-3 text-xs text-text-secondary/40 flex items-center gap-1">
            <User size={10} /> 悬停查看联系方式
          </p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 card-base p-6 flex flex-col justify-center bg-gradient-to-br from-dark via-dark-light to-primary overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="text-white text-center relative z-10">
            <h3 className="font-heading text-2xl font-bold mb-1">{name}</h3>
            <p className="text-sm mb-5">
              <span className="gold-text font-medium">{role}</span>
            </p>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed">{bio}</p>

            <div className="space-y-3 mb-6">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-center gap-2 text-sm text-slate-300 hover:text-accent-light transition-colors"
                >
                  <Mail size={16} className="text-accent-light" />
                  {contact.email}
                </a>
              )}
              {contact.wechat && (
                <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                  <MessageCircle size={16} className="text-primary-lighter" />
                  微信：{contact.wechat}
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 bg-white/10 text-white/80 rounded-full border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
