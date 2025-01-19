import { RefObject, useEffect } from "react";

export const useViewportBoundary = (
  ref: RefObject<HTMLDivElement>,
  navbarHeight: number = 80,
  padding: number = 20
) => {
  const ensureInViewport = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const maxTop = viewportHeight - rect.height - padding;
      const maxLeft = viewportWidth - rect.width - padding;

      if (rect.top < navbarHeight) {
        ref.current.style.top = `${navbarHeight + padding}px`;
      }
      if (rect.top > maxTop) {
        ref.current.style.top = `${maxTop}px`;
      }
      if (rect.left < padding) {
        ref.current.style.left = `${padding}px`;
      }
      if (rect.left > maxLeft) {
        ref.current.style.left = `${maxLeft}px`;
      }
    }
  };

  useEffect(() => {
    const handleResize = () => ensureInViewport();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { ensureInViewport };
};