import { useEffect, useState } from 'react';

const cache: Record<string, unknown> = {};

export const useFetch = <T>(
  url: string,
  isCache: boolean = false,
  depArr: unknown[] = []
) => {
  const [result, setResult] = useState<T>();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    (async function () {
      try {
        console.log('cache>>>', cache);
        if (url in cache) {
          console.log('cccccccccccccc');
          return setResult(cache[url] as T);
        }
        const data = (await fetch(url, { signal }).then((res) =>
          res.json()
        )) as T;

        if (isCache) cache[url] = data;
        console.log('cache22>>>', cache);
        // console.log('useFetch.data>>>', data);
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
