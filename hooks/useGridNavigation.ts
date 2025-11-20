import { useRef } from "react";
import { UI_CONSTANTS } from "@/constants/ui";

export function useGridNavigation() {
  const gridScrollRef = useRef<HTMLDivElement | null>(null);

  const handleNavigateLeft = () => {
    if (gridScrollRef.current) {
      gridScrollRef.current.scrollBy({
        left: -UI_CONSTANTS.SCROLL_AMOUNT,
        behavior: "smooth",
      });
    }
  };

  const handleNavigateRight = () => {
    if (gridScrollRef.current) {
      gridScrollRef.current.scrollBy({
        left: UI_CONSTANTS.SCROLL_AMOUNT,
        behavior: "smooth",
      });
    }
  };

  return {
    gridScrollRef,
    handleNavigateLeft,
    handleNavigateRight,
  };
}
