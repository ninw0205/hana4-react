import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react';
import { useCounter } from '../hooks/counter-hook';

type TitleProps = { text: string; name: string };

const Title = ({ text, name }: TitleProps) => {
  // console.log('titleeeeeeee');
  return (
    <h1 className='text-3xl'>
      {text} {name}
    </h1>
  );
};

const Body = ({ children }: { children: ReactNode }) => {
  // console.log('boddddddd!!!'); // children(props)가 바뀔때 함수형 컴포넌트가 통째로 다시 render 되므로 이 코드도 계속 다시 실행됨
  return (
    <div className='red' style={{ color: 'blue' }}>
      {children}
    </div>
  );
};

type Props = {
  name: string;
  age: number;
};

export type MyHandler = {
  jumpHelloState: () => void;
};

function Hello({ name, age }: Props, ref: ForwardedRef<MyHandler>) {
  // const [myState, setMyState] = useState(() => new Date().getTime());
  const [myState, setMyState] = useState(0);
  const { count, plusCount, minusCount } = useCounter();
  let v = 1;

  const handler: MyHandler = {
    jumpHelloState: () => setMyState((pre) => pre * 10),
  };
  useImperativeHandle(ref, () => handler);

  return (
    <div className='my-5 border border-slate-300 p-3'>
      <Title text='Hello~' name={name} />
      <Body>
        <h3 className='text-2x text-center'>myState: {myState}</h3>
        This is Hello Body Component. {v} - {age}
      </Body>
      <button
        onClick={() => {
          v++; // 이건 왜 카운트가 계속 안되지?
          setMyState(myState + 1);
          plusCount();
          // console.log('🚀 ~ v/myState:', v, myState);
        }}
        className='btn'
      >
        Hello(+)
      </button>
      <strong id='cnt' className='mx-5'>
        {count}
      </strong>
      <button onClick={() => minusCount()} className='btn btn-danger'>
        Minus
      </button>
    </div>
  );
}

const ImpHello = forwardRef(Hello);

export default ImpHello;
