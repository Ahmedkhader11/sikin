import { RefObject } from "react";

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropDownWidth = 240;

    // calcuate the initial position of the dropdown
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // check if the dropdown would go off the right edge of the viewport
    if (left + dropDownWidth > window.innerWidth) {
      // Alig to right edge of button instead
      left = rect.right + window.scrollX - dropDownWidth;

      // if still off-screen, align to the right edge of the viewport with some padding
      if (left < 0) {
        left = window.innerWidth - dropDownWidth - 16;
      }
      // ensure the dropdown is not off the left edge of the viewport
      if (left < 0) {
        left = 16;
      }
    }
    return { top, left };
  };
  return {
    getDropdownPosition,
  };
};
