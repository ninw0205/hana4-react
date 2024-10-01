/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
  useState,
} from 'react';
// import { flushSync } from 'react-dom';

type CounterContextProps = typeof contextInitValue;

const contextInitValue = {
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
};

const CounterContext = createContext<CounterContextProps>(contextInitValue);

type Action = {
  type: 'plus' | 'minus';
  payload: number;
};

const reducer = (count: number, { type, payload }: Action) => {
  if (type === 'plus') return count + payload;
  if (type === 'minus') return count - payload;
  return count;
};

export const CounterProvider = ({ children }: PropsWithChildren) => {
  // const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(reducer, 0);
  // console.log('**************');

  const plusCount = (step: number = 1) => {
    // setCount((count) => count + 1);
    // console.log('plusCOunt>>>', count);
    dispatch({ type: 'plus', payload: step });

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
  const minusCount = (step: number = 1) => {
    // setCount((count) => count - 1);
    // console.log('minusCOunt>>>', count);
    dispatch({ type: 'minus', payload: step });
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
