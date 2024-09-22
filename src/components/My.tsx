import { Session } from '../App.tsx';

type Props = {
  session: Session;
  logout: () => void;
};

export default function My({ session, logout }: Props) {
  return (
    <>
      {/* 왜 session.loginUser만 작성하면 아무것도 화면에 출력되지 않는지? */}
      <h3>{session.loginUser?.name} logined</h3>
      <button onClick={logout}>Log Out</button>
      <ul>
        {session.cart.map(({ id, name, price }) => (
          <li key={id}>
            {name} <small>({price.toLocaleString()})</small>
          </li>
        ))}
      </ul>
    </>
  );
}
