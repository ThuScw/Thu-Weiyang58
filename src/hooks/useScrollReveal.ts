import { useEffect, useRef, useState, RefObject } from "react";

export function useScrollReveal<T extends HTMLElement>(
  options: { threshold?: number; rootMargin?: string } = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = "0px" } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
