import { useEffect } from 'react';

export const useTimeout = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) => {
  useEffect(() => {
    const timer = setTimeout(cb, delay, ...args);

    return () => clearTimeout(timer);
  }, [cb, delay, args]);
};
