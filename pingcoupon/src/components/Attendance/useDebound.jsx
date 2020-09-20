import { useState, useEffect } from "react";

export default function useDebounce(text, delay) {
  const [debounceValue, setDebounceValue] = useState(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(text);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [text, delay]);

  return debounceValue;
}
