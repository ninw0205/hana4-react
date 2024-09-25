import { FaTrashCan } from 'react-icons/fa6';
import { Session } from '../App.tsx';
import Login from './Login.tsx';
import Profile from './Profile.tsx';
import { FormEvent, useRef, useState } from 'react';
import Button from './atoms/Button.tsx';

type Props = {
  session: Session;
  logout: () => void;
  login: (id: number, name: string) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (name: string, price: number) => void;
};

export default function My({
  session,
  logout,
  login,
  removeCartItem,
  addCartItem,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const logoutButtonRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const toggleEditing = () => setIsEditing((pre) => !pre);

  const removeItem = (id: number) => {
    if (confirm('Are you sure?')) removeCartItem(id);
  };

  const saveItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const price = priceRef.current?.value;
    console.log('🚀 ~ name/price:', name, price);

    if (!name) {
      alert('상품명을 입력하세요!');
      return nameRef.current?.focus();
    } else if (!price) {
      alert('가격을 입력하세요!');
      return priceRef.current?.focus();
    }

    addCartItem(name, +price);
    nameRef.current.value = '';
    priceRef.current.value = '';
    nameRef.current.focus();
  };

  return (
    <>
      {session.loginUser ? (
        <div className='flex gap-5'>
          <Profile session={session} logout={logout} ref={logoutButtonRef} />
          <Button
            onClick={() => logoutButtonRef.current?.click()}
            text='MySignOut'
          />
        </div>
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
        <li className='mt-3 text-center'>
          {isEditing ? (
            <form onSubmit={(e) => saveItem(e)} className='mt-3 flex gap-3'>
              <input
                ref={nameRef}
                type='text'
                placeholder='name..'
                className='inp'
              />
              <input
                ref={priceRef}
                type='number'
                placeholder='price..'
                className='inp'
              />
              <Button type='reset' onClick={toggleEditing} text='Cancel' />
              <Button type='submit' text='Save' variant='btn-primary' />
            </form>
          ) : (
            <Button onClick={toggleEditing} text='+Add Item' />
          )}
        </li>
      </ul>
    </>
  );
}
