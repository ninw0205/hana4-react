import { useState } from 'react';
import Hello from './components/Hello';
import My from './components/My';

const SampleSession = {
  loginUser: { id: 1, name: 'Hong' },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

export type LoginUser = typeof SampleSession.loginUser;
export type CartItem = { id: number; name: string; price: number };
export type Session = { loginUser: LoginUser | null; cart: CartItem[] };

function App() {
  const [count, setCount] = useState(0);
  const [session, SetSession] = useState<Session>(SampleSession);

  const plusCount = () => setCount(count + 1);
  const minusCount = () => setCount(count - 1);

  const logout = () => {
    // 주소가 안바뀌어서 rerender되지 않으면 서버에서의 값은 변경되는데 화면에서 출력만 다르게 됨
    // SetSession({ ...session, loginUser: null });
    session.loginUser = null;
    SetSession({ ...session }); // 새로 session을 만들기 때문에 side effect가 아님!
  };

  const login = (id: number, name: string) => {
    SetSession({ ...session, loginUser: { id, name } });
  };

  // console.log('Apppppp');

  return (
    <div className='mt-5 flex flex-col items-center'>
      <Hello
        name='Inwoo'
        age={29}
        count={count}
        plusCount={plusCount}
        minusCount={minusCount}
      />
      <hr />
      <pre>{JSON.stringify(session.loginUser)}</pre>
      <My session={session} logout={logout} login={login} />
      <div className='card'>
        <button
          onClick={() => {
            setCount((count) => count + 1); // count는 변경되면 다시 App을 그리기 때문에 이떄 session의 이름도 변경이 같이 일어남
            // if (session.loginUser) session.loginUser = { id: 2, name: 'kim' }; //session이 상태값이기 때문에 session이 아닌 session.loginUser가 바뀌어도 새로 render 안됨
            if (session.loginUser) session.loginUser.name = 'XXX' + count; //session이 상태값이기 때문에 session이 아닌 session.loginUser.name이 바뀌어도 새로 render 안됨
            console.table(session.loginUser);
          }}
          className='btn'
        >
          App.count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
