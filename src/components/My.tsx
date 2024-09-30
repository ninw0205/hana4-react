import { FaPlus } from 'react-icons/fa6';
import Login from './Login.tsx';
import Profile from './Profile.tsx';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Button from './atoms/Button.tsx';
import { useSession } from '../hooks/session-context.tsx';
import Item from './Item.tsx';
import useToggle from '../hooks/toggle.ts';
import { FaSearch } from 'react-icons/fa';
import { useDebounce } from '../hooks/timer-hooks.ts';

export default function My() {
  const { session, toggleReloadSession } = useSession();
  const logoutButtonRef = useRef<HTMLButtonElement>(null);

  // const [isAdding, setIsAdding] = useState(false);
  // const toggleAdding = () => {
  //   setIsAdding((pre) => !pre);
  // };

  const [isAdding, toggleAdding] = useToggle();

  const [, toggleSearch] = useToggle();
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchstr, setSearchstr] = useState('');

  useDebounce(
    () => {
      console.log('useDebounce>>', searchRef.current?.value);
      setSearchstr(searchRef.current?.value || '');
    },
    2000,
    [searchRef.current?.value]
  );

  const [ulHeight, setUlHeight] = useState(0);

  // const ulCbRef = useCallback(
  //   (node: HTMLUListElement) => {
  //     console.log('node>>>', node, session.cart.length);
  //     setUlHeight(node?.clientHeight);
  //   },
  //   [session.cart.length]
  // );

  const ulCbRef = (node: HTMLUListElement) => {
    console.log('node>>>', node, session.cart.length);
    setUlHeight(node?.clientHeight);
  };

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

  const totalPrice = useMemo(
    () => session.cart.reduce((acc, item) => acc + item.price, 0),
    [session.cart]
  );

  const dcPrice = useMemo(() => totalPrice * 0.1, [totalPrice]);

  useLayoutEffect(() => {
    // console.log('$$$$$$$$$$$$$$$$$$$$', totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    // const abortController = new AbortController();
    // const { signal } = abortController;
    // (async function () {
    //   try {
    //     const data = await fetch('/data/sample.json', { signal }).then((res) =>
    //       res.json()
    //     );
    //     console.log('My.data>>>', data);
    //   } catch (error) {
    //     console.error('Error>>>', error);
    //   }
    // })();
    // fetch('/data/sample.json', { signal })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('data>>', data);
    //   });
    // return () => abortController.abort('Clean-up in My!');
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

      <div className='w-2/3 border p-3'>
        <div className='flex items-center gap-2'>
          <FaSearch />
          <input
            type='text'
            className='inp'
            placeholder='아이템명 검색...'
            // onChange={(e) => setSearchstr(e.currentTarget.value)}
            onChange={toggleSearch}
            ref={searchRef}
          />
        </div>
        <ul ref={ulCbRef} className='my-3 px-3'>
          {session.cart.length ? (
            session.cart
              .filter(({ name }) => name.includes(searchstr))
              .map((item) => (
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
      </div>
      <div className='mb-3 flex gap-5'>
        <span>*총액: {totalPrice.toLocaleString()}원</span>
        <span>*할인: {dcPrice.toFixed(0).toLocaleString()}원</span>
        <span>{ulHeight}</span>
      </div>
      <Button onClick={toggleReloadSession}>Reload Session</Button>
    </>
  );
}
