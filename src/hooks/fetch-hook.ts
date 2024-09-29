import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string, depArr: unknown[] = []) => {
  const [result, setResult] = useState<T>();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    (async function () {
      try {
        const data = (await fetch(url, { signal }).then((res) =>
          res.json()
        )) as T;
        console.log('useFetch.data>>>', data);
        setResult(data);
      } catch (error) {
        console.error('Error>>>', error);
      }
    })();

    return () => abortController.abort('Clean-up');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depArr);
  return result;
};
