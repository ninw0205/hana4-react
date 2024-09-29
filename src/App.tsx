import { useRef, useState } from 'react';
import Hello, { MyHandler } from './components/Hello';
import My from './components/My';
import { SessionProvider } from './hooks/session-context';
// import { useCounter } from './hooks/counter-hook';

function App() {
  const [friend, setFriend] = useState(10);
  const myHandleRef = useRef<MyHandler>(null);

  return (
    <div className='flex flex-col items-center'>
      <SessionProvider>
        <div className='mt-3 w-64'>
          <input
            type='number'
            defaultValue={friend}
            onChange={(e) => setFriend(+e.currentTarget.value)}
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
