interface BadgeProps {
  children: string;
  variant?: "default" | "gold" | "outline";
  className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-primary/10 text-primary",
    gold: "bg-accent/20 text-accent border border-accent/30",
    outline: "border border-gray-200 text-text-secondary",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
