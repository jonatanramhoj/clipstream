import { useEffect, useRef } from "react";

export function useDebounce() {
  const timeoutId = useRef<number | null>(null);

  function debounce(
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void,
    delay: number
  ) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = window.setTimeout(() => callback(e), delay);
    };
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId.current ?? 0);
    };
  }, []);

  return {
    debounce,
  };
}
