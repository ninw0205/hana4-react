import { ChangeEvent, FormEvent, useState } from 'react';
import Button from './atoms/Button';
import LabelInput from './molecules/LabelInput';

type Props = {
  login: (id: number, name: string) => void;
};

export default function Login({ login }: Props) {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  //   console.log('🚀 ~ Login ~ id:', id);

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !name) {
      alert('Input the id & name!!');
      return;
    }
    login(id, name);
  };

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('changeName Executed>>>', name);
    setName(e.currentTarget.value);
  };
  // const signIn = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const eles = e.currentTarget.elements;
  //   const { id, name } = eles as typeof eles & {
  //     id: HTMLInputElement;
  //     name: HTMLInputElement;
  //   };
  //   // console.log('$$$', id, name);
  //   if (!id.value || !name.value) {
  //     alert('Input the id & name!!');
  //     id.focus();
  //     return;
  //   }

  //   login(+id.value, name.value);
  // };

  return (
    <>
      <form onSubmit={signIn} className='border p-4'>
        <LabelInput
          label='ID'
          type='number'
          onChange={(e) => {
            setId(+e.currentTarget.value);
          }}
        />
        <LabelInput label='Name' type='text' onChange={changeName} />
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
        <Button
          text='Sign In'
          variant='btn-success'
          classNames='float-end mt-3'
        />
      </form>
    </>
  );
}
