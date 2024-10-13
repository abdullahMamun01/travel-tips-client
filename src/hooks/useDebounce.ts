import { useEffect, useRef, useState } from 'react';

function useDebounce<T>(delay: number): [T | undefined, (value: T) => void] {
  const [debounceValue, setDebounceValue] = useState<T | undefined>(undefined);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (ref.current) {
        clearTimeout(ref.current);
        ref.current = null;
      }
    };
  }, []);

  const debounceCB = (value: T) => {
    if (ref.current) {
      clearTimeout(ref.current);
    }

    ref.current = setTimeout(() => setDebounceValue(value), delay);
  };

  return [debounceValue, debounceCB];
}

export default useDebounce;