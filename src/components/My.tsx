import { FaPlus } from 'react-icons/fa6';
import Login from './Login.tsx';
import Profile from './Profile.tsx';
import { useEffect, useRef } from 'react';
import Button from './atoms/Button.tsx';
import { useSession } from '../hooks/session-context.tsx';
import Item from './Item.tsx';
import useToggle from '../hooks/toggle.ts';

export default function My() {
  const { session } = useSession();
  const logoutButtonRef = useRef<HTMLButtonElement>(null);
  // const [isAdding, setIsAdding] = useState(false);
  // const toggleAdding = () => {
  //   setIsAdding((pre) => !pre);
  // };

  const [isAdding, toggleAdding] = useToggle();

  // const primitive = 123;

  // useEffect(() => {
  //   console.log('effect 1', primitive);

  //   return () => console.log('unmount1!!');
  // }, [primitive]);

  // useEffect(() => {
  //   console.log('effect 2');
  //   // alert('login plz...');

  //   return () => console.log('unmount2!!');
  // }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    fetch('/data/sample.json', { signal })
      .then((res) => res.json())
      .then((data) => {
        console.log('data>>', data);
      });

    return () => abortController.abort();
  }, []);

  return (
    <>
      {session.loginUser ? (
        <div className='flex gap-5'>
          <Profile ref={logoutButtonRef} />
          <Button onClick={() => logoutButtonRef.current?.click()}>
            MySignOut
          </Button>
        </div>
      ) : (
        <Login />
      )}
      <ul className='my-3 w-2/3 border p-3'>
        {session.cart.length ? (
          session.cart.map((item) => (
            <li key={item.id}>
              <Item item={item} />
            </li>
          ))
        ) : (
          <li className='text-slate-500'> There are no items</li>
        )}
        <li className='mt-3 text-center'>
          {isAdding ? (
            <Item
              item={{ id: 0, name: '', price: 0 }}
              toggleAdding={() => toggleAdding()}
            />
          ) : (
            <Button onClick={toggleAdding}>
              <FaPlus /> Add Item
            </Button>
          )}
        </li>
      </ul>
    </>
  );
}
