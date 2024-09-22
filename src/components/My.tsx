import { Session } from '../App.tsx';
import Login from './Login.tsx';
import Profile from './Profile.tsx';

type Props = {
  session: Session;
  logout: () => void;
  login: (id: number, name: string) => void;
};

export default function My({ session, logout, login }: Props) {
  return (
    <>
      {session.loginUser ? (
        <Profile session={session} logout={logout} />
      ) : (
        <Login login={login} />
      )}
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
