import { FaTrashCan } from 'react-icons/fa6';
import { Session } from '../App.tsx';
import Login from './Login.tsx';
import Profile from './Profile.tsx';
import { useRef } from 'react';
import Button from './atoms/Button.tsx';

type Props = {
  session: Session;
  logout: () => void;
  login: (id: number, name: string) => void;
  removeCartItem: (id: number) => void;
};

export default function My({ session, logout, login, removeCartItem }: Props) {
  const logoutButtonRef = useRef<HTMLButtonElement>(null);

  const removeItem = (id: number) => {
    if (confirm('Are you sure?')) removeCartItem(id);
  };
  return (
    <>
      {session.loginUser ? (
        <>
          <Profile session={session} logout={logout} ref={logoutButtonRef} />
          <Button
            onClick={() => logoutButtonRef.current?.click()}
            text='MySignOut'
          />
        </>
      ) : (
        <Login login={login} />
      )}
      <ul className='my-3 w-2/3 border p-3'>
        {session.cart.length ? (
          session.cart.map(({ id, name, price }) => (
            <li key={id} className='flex justify-between'>
              <strong>
                {id}. {name} <small>({price.toLocaleString()})</small>
              </strong>
              <button
                onClick={() => removeItem(id)}
                className='btn btn-danger px-1 py-0'
              >
                <FaTrashCan />
              </button>
            </li>
          ))
        ) : (
          <li className='text-slate-500'> There are no items</li>
        )}
      </ul>
    </>
  );
}
