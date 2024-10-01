import { memo, useRef, useState } from 'react';
import Hello, { MyHandler } from './components/Hello';
import My from './components/My';
import { SessionProvider } from './hooks/session-context';
import { useDebounce } from './hooks/timer-hooks';
import useToggle from './hooks/toggle';
import Button from './components/atoms/Button';
// import { useCounter } from './hooks/counter-hook';

const ColorTitle = ({
  color,
  backgroundColor,
}: {
  color: string;
  backgroundColor: string;
}) => {
  console.log('@@@ ColorTitle!!', color, backgroundColor);
  return <h2 style={{ color, backgroundColor }}>Memo</h2>;
};

const MemoedColorTitle = memo(ColorTitle, () => true);

function App() {
  const [friend, setFriend] = useState(10);
  const [, toggle] = useToggle();
  const myHandleRef = useRef<MyHandler>(null);
  const friendRef = useRef<HTMLInputElement>(null);

  useDebounce(
    () => {
      // friends;
      console.log('useDebounce>>>>>>>>>');
      setFriend(+(friendRef.current?.value || 0));
    },
    1000,
    [friendRef.current?.value]
  );

  // const { reset, clear } = useInterval(() => setFriend((pre) => pre + 1), 1000);

  const [color, setColor] = useState('white');
  const [bgcolor, setBgcolor] = useState('red');

  return (
    <div className='flex flex-col items-center'>
      {/* <h1 className='text-2xl'>F: {friend}</h1>
      <div className='flex'>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={clear}>Clear</Button>
      </div> */}

      <MemoedColorTitle color={color} backgroundColor={bgcolor} />
      <Button onClick={() => setColor('blue')}>ChangeColor</Button>
      <Button onClick={() => setBgcolor('blue')}>ChangeBgColor</Button>
      <SessionProvider>
        <div className='mt-3 w-64'>
          <input
            type='number'
            defaultValue={friend}
            // onChange={(e) => setFriend(+e.currentTarget.value)}
            onChange={toggle}
            ref={friendRef}
            placeholder='friend id...'
            className='inp'
          />
        </div>
        <Hello friend={friend} ref={myHandleRef} />
        <hr />
        <My />
      </SessionProvider>
      {/* <div className='card'>
        <button
          onClick={() => {
            plusCount(); // count는 변경되면 다시 App을 그리기 때문에 이떄 session의 이름도 변경이 같이 일어남
            // if (session.loginUser) session.loginUser = { id: 2, name: 'kim' }; //session이 상태값이기 때문에 session이 아닌 session.loginUser가 바뀌어도 새로 render 안됨
            if (session.loginUser) session.loginUser.name = 'XXX' + count; //session이 상태값이기 때문에 session이 아닌 session.loginUser.name이 바뀌어도 새로 render 안됨
            console.table(session.loginUser);
            myHandleRef.current?.jumpHelloState();
          }}
          className='btn'
        >
          App.count is {count}
        </button>
      </div> */}
    </div>
  );
}

export default App;
