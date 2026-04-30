import { useState, useEffect } from "react";

export function useImageLoader(src: string, placeholder?: string) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder || "");

  useEffect(() => {
    if (!src) {
      setError(true);
      return;
    }

    setLoaded(false);
    setError(false);

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
      setCurrentSrc(src);
    };
    img.onerror = () => {
      setError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loaded, error, currentSrc };
}
