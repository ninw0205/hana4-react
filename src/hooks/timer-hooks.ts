import { useEffect, useRef } from 'react';

export const useTimeout = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) => {
  const cbRef = useRef(cb);
  const argsRef = useRef(args);
  useEffect(() => {
    const timer = setTimeout(cbRef.current, delay, ...argsRef.current);

    return () => clearTimeout(timer);
  }, [delay]);
};

export const useInterval = <
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) => {
  useEffect(() => {
    const timer = setInterval(cb, delay, ...args);

    return () => clearInterval(timer);
  }, [cb, delay, args]);
};
