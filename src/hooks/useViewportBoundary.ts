import { RefObject, useCallback } from "react";

export const useViewportBoundary = (
  navbarHeight: number = 80,
  padding: number = 20
) => {
  const ensureInViewport = useCallback((e?: any, data?: any) => {
    if (data) {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const element = e.target;
      const rect = element.getBoundingClientRect();

      const maxTop = viewportHeight - rect.height - padding;
      const maxLeft = viewportWidth - rect.width - padding;

      let newY = data.y;
      let newX = data.x;

      if (data.y < navbarHeight + padding) {
        newY = navbarHeight + padding;
      }
      if (data.y > maxTop) {
        newY = maxTop;
      }
      if (data.x < padding) {
        newX = padding;
      }
      if (data.x > maxLeft) {
        newX = maxLeft;
      }

      return { x: newX, y: newY };
    }
    return undefined;
  }, [navbarHeight, padding]);

  return { ensureInViewport };
};