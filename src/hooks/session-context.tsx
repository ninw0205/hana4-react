import {
  createContext,
  createRef,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { LoginHandler } from '../components/Login';
import { useFetch } from './fetch-hook';
import useToggle from './toggle';

const SampleSession = {
  loginUser: null,
  cart: [],
};
// const SampleSession = {
//   loginUser: { id: 1, name: 'Hong' },
//   cart: [
//     { id: 100, name: '라면', price: 3000 },
//     { id: 101, name: '컵라면', price: 2000 },
//     { id: 200, name: '파', price: 5000 },
//   ],
// };

type LoginUser = { id: number; name: string };
export type CartItem = { id: number; name: string; price: number };
export type Session = { loginUser: LoginUser | null; cart: CartItem[] };

const contextInitValue = {
  session: SampleSession,
  logout: () => {},
  login: (id: number, name: string) => {
    console.log(id, name);
  },
  removeCartItem: (id: number) => console.log(id),
  addCartItem: (name: string, price: number) => console.log(name, price),
  editCartItem: (item: CartItem) => console.log(item),
  loginRef: createRef<LoginHandler>(),
  toggleReloadSession: () => {},
};

type SessionContextProps = Omit<typeof contextInitValue, 'session'> & {
  session: Session;
};

const SessionContext = createContext<SessionContextProps>(contextInitValue);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session>(SampleSession);
  const [reloadSession, toggleReloadSession] = useToggle();

  const { data } = useFetch<Session>('/data/sample.json', false, [
    reloadSession,
  ]);
  // console.log('🚀 ~ SessionProvider ~ data:', data);

  useLayoutEffect(() => {
    setSession(data || SampleSession);
  }, [data]);

  const loginRef = useRef<LoginHandler>(null);

  const logout = () => {
    // 주소가 안바뀌어서 rerender되지 않으면 서버에서의 값은 변경되는데 화면에서 출력만 다르게 됨
    // SetSession({ ...session, loginUser: null });
    session.loginUser = null;
    setSession({ ...session }); // 새로 session을 만들기 때문에 side effect가 아님!
  };

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

  const editCartItem = (item: CartItem) => {
    setSession({
      ...session,
      cart: session.cart.map((oldItem) =>
        oldItem.id === item.id ? item : oldItem
      ),
    });
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        logout,
        login,
        addCartItem,
        removeCartItem,
        editCartItem,
        toggleReloadSession,
        loginRef,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);
