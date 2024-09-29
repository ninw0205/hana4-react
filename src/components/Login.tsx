import { FormEvent, useEffect, useImperativeHandle, useRef } from 'react';
import Button from './atoms/Button';
import LabelInput from './molecules/LabelInput';
import { useSession } from '../hooks/session-context';
import { useCounter } from '../hooks/counter-hook';

export type LoginHandler = {
  focus: (prop: string) => void;
};

export default function Login() {
  const { login, loginRef } = useSession();
  const { plusCount, minusCount } = useCounter();
  // const [id, setId] = useState(0);
  // const [name, setName] = useState('');
  //   console.log('🚀 ~ Login ~ id:', id);
  // const nameRef = useRef(null);
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const handler: LoginHandler = {
    focus(prop: string) {
      if (prop === 'id') idRef.current?.focus();
      if (prop === 'name') nameRef.current?.focus();
    },
  };

  useImperativeHandle(loginRef, () => handler);

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = idRef.current?.value ?? 0;
    const name = nameRef.current?.value ?? '';

    login(+id, name);
  };

  useEffect(() => {
    const intl = setInterval(() => console.log('xxx'), 500);
    return () => clearInterval(intl);
  }, []);

  useEffect(() => {
    console.log('useeffffffffff1');
    plusCount();
  }, [plusCount]);

  useEffect(() => {
    console.log('useeffffffffff2');

    return minusCount;
  }, [minusCount]);

  return (
    <>
      <form onSubmit={signIn} className='border p-4'>
        <LabelInput
          label='ID'
          type='number'
          ref={idRef}
          // onChange={(e) => {
          //   setId(+e.currentTarget.value);
          // }}
        />
        <div className='flex'>
          <label htmlFor='name' className='w-24'>
            Name:
          </label>
          <input
            type='text'
            placeholder='Name...'
            id='name'
            ref={nameRef}
            className='inp'
            // onChange={changeName}
          />
        </div>
        {/* <LabelInput label='Name' type='text' onChange={changeName} /> */}
        {/* <div className='flex'>
        <label htmlFor='id' className='w-24'>
          ID:
        </label>
        <input
          type='number'
          placeholder='ID...'
          id='id'
          className='inp mb-3'
          // onChange={(e) => setId(+e.currentTarget.value)}
        />
      </div> */}
        {/* <div className='flex'>
        <label htmlFor='name' className='w-24'>
          Name:
        </label>
        <input
          type='text'
          placeholder='Name...'
          id='name'
          className='inp'
          // onChange={(e) => setName(+e.currentTarget.value)}
        />
      </div> */}
        {/* <button className='btn btn-success float-end mt-3'>Sign In</button> */}
        <Button variant='btn-success' classNames='float-end mt-3'>
          Sign In
        </Button>
      </form>
    </>
  );
}
