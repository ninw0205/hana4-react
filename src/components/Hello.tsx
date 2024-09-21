import { ReactNode, useState } from 'react';

type TitleProps = { text: string; name: string };

const Title = ({ text, name }: TitleProps) => {
  console.log('titleeeeeeee');
  return (
    <h1>
      {text} {name}
    </h1>
  );
};

const Body = ({ children }: { children: ReactNode }) => {
  console.log('boddddddd!!!'); // children(props)가 바뀔때 함수형 컴포넌트가 통째로 다시 render 되므로 이 코드도 계속 다시 실행됨
  return (
    <div className='red' style={{ color: 'blue' }}>
      {children}
    </div>
  );
};

export default function Hello() {
  const [myState, setMyState] = useState(0);
  let v = 1;
  console.log('********', v, myState);

  return (
    <>
      <Title text='Hi~' name='React' />
      <Body>
        This is Hello Body Component. {v} - {myState}
      </Body>
      <button
        onClick={() => {
          v++; // 이건 왜 카운트가 계속 안되지?
          setMyState(myState + 1);
          // console.log('🚀 ~ v/myState:', v, myState);
        }}
      >
        Click Here!
      </button>
    </>
  );
}
