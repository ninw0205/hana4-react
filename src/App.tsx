import { useRef, useState } from 'react';
import Hello, { MyHandler } from './components/Hello';
import My from './components/My';
import { flushSync } from 'react-dom';
import { LoginHandler } from './components/Login';

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
  const [session, setSession] = useState<Session>(SampleSession);

  const myHandleRef = useRef<MyHandler>(null);

  const plusCount = () => {
    // setCount((count) => count + 1);
    // setCount((count) => {
    //   const newer = count + 1;
    //   console.log('🚀 ~ newer:', newer);
    //   return newer;
    // });
    flushSync(() => setCount((c) => c + 1));
    const cnt = document.getElementById('cnt');
    console.log('🚀 ~ count:', count, cnt?.innerText);
    // setTimeout(() => {
    //   console.log(count, document.getElementById('cnt')?.innerText);
    // }, 17);
  };
  const minusCount = () => setCount(count - 1);

  const logout = () => {
    // 주소가 안바뀌어서 rerender되지 않으면 서버에서의 값은 변경되는데 화면에서 출력만 다르게 됨
    // SetSession({ ...session, loginUser: null });
    session.loginUser = null;
    setSession({ ...session }); // 새로 session을 만들기 때문에 side effect가 아님!
  };

  const loginRef = useRef<LoginHandler>(null);

  const login = (id: number, name: string) => {
    if (!id) {
      alert('ID 입력하세요');
      return loginRef.current?.focus('id');
    }

    if (!name) {
      alert('Name 입력하세요');
      return loginRef.current?.focus('name');
    }

    setSession({ ...session, loginUser: { id, name } });
  };

  const addCartItem = (name: string, price: number) => {
    const id = Math.max(...session.cart.map(({ id }) => id), 0) + 1;
    setSession({ ...session, cart: [...session.cart, { id, name, price }] });
  };

  const removeCartItem = (id: number) =>
    setSession({
      ...session,
      cart: session.cart.filter((item) => id !== item.id),
    });

  // console.log('Apppppp');

  return (
    <div className='flex flex-col items-center'>
      <Hello
        name='Inwoo'
        age={29}
        count={count}
        plusCount={plusCount}
        minusCount={minusCount}
        ref={myHandleRef}
      />
      <hr />
      {/* <pre>{JSON.stringify(session.loginUser)}</pre> */}
      <My
        session={session}
        logout={logout}
        login={login}
        removeCartItem={removeCartItem}
        addCartItem={addCartItem}
        ref={loginRef}
      />
      <div className='card'>
        <button
          onClick={() => {
            setCount((count) => count + 1); // count는 변경되면 다시 App을 그리기 때문에 이떄 session의 이름도 변경이 같이 일어남
            // if (session.loginUser) session.loginUser = { id: 2, name: 'kim' }; //session이 상태값이기 때문에 session이 아닌 session.loginUser가 바뀌어도 새로 render 안됨
            if (session.loginUser) session.loginUser.name = 'XXX' + count; //session이 상태값이기 때문에 session이 아닌 session.loginUser.name이 바뀌어도 새로 render 안됨
            console.table(session.loginUser);
            myHandleRef.current?.jumpHelloState();
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
