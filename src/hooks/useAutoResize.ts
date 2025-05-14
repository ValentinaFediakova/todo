import { useLayoutEffect, useRef } from "react";

export function useAutoResize<T extends HTMLTextAreaElement>() {
  const ref = useRef<T>(null);
  const baseHeightRef = useRef<number>(0);

  useLayoutEffect(() => {
    const textArea = ref.current;
    if (!textArea) return;
    textArea.style.height = "auto";
    textArea.value = "";
    baseHeightRef.current = textArea.scrollHeight;
    textArea.style.height = `${baseHeightRef.current}px`;
  }, []);

  const adjust = () => {
    const textArea = ref.current;
    if (!textArea) return;
    if (textArea.value === "") {
      textArea.style.height = `${baseHeightRef.current}px`;
      return;
    }
    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;
  };

  return { ref, adjust, baseHeight: baseHeightRef.current };
}
