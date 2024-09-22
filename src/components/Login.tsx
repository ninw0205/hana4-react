import { FormEvent, useState } from 'react';

type Props = {
  login: (id: number, name: string) => void;
};

export default function Login({ login }: Props) {
  //   const [id, setId] = useState(0);
  //   console.log('🚀 ~ Login ~ id:', id);

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const eles = e.currentTarget.elements;
    const { id, name } = eles as typeof eles & {
      id: HTMLInputElement;
      name: HTMLInputElement;
    };
    // console.log('$$$', id, name);
    if (!id.value || !name.value) {
      alert('Input the id & name!!');
      id.focus();
      return;
    }

    login(+id.value, name.value);
  };

  return (
    <form onSubmit={signIn}>
      ID:
      <input
        type='number'
        placeholder='Id...'
        id='id'
        // onChange={(e) => setId(+e.currentTarget.value)}
      />
      Name:
      <input
        type='text'
        placeholder='Name...'
        id='name'
        // onChange={(e) => setName(+e.currentTarget.value)}
      />
      <button>Sign In</button>
    </form>
  );
}
