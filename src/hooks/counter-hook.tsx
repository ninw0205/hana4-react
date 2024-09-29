/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext, useState } from 'react';
// import { flushSync } from 'react-dom';

type CounterContextProps = typeof contextInitValue;

const contextInitValue = {
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
};

const CounterContext = createContext<CounterContextProps>(contextInitValue);

export const CounterProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);
  // console.log('**************');

  const plusCount = () => {
    setCount((count) => count + 1);
    console.log('plusCOunt>>>', count);

    // setCount((count) => {
    //   const newer = count + 1;
    //   console.log('🚀 ~ newer:', newer);
    //   return newer;
    // });
    // flushSync(() => setCount((c) => c + 1));
    // const cnt = document.getElementById('cnt');
    // console.log('🚀 ~ count:', count, cnt?.innerText);
    // setTimeout(() => {
    //   console.log(count, document.getElementById('cnt')?.innerText);
    // }, 17);
  };
  const minusCount = () => {
    setCount((count) => count - 1);
    console.log('minusCOunt>>>', count);
  };

  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => useContext(CounterContext);

export const useCount = (defaultValue = 0) => {
  const [count, setCount] = useState(defaultValue);
  const plusCount = (flag = 1) => setCount((count) => count + flag);

  return [count, plusCount];
};
