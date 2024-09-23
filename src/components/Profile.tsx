import { Session } from '../App';
import Button from './atoms/Button';

type Props = {
  session: Session;
  logout: () => void;
};

export default function Profile({ session, logout }: Props) {
  return (
    <div>
      {/* 왜 session.loginUser만 작성하면 아무것도 화면에 출력되지 않는지? */}
      <h3>{session.loginUser?.name} logined</h3>
      <button onClick={logout} className='btn btn-primary'>
        Sign Out
      </button>

      <Button text='SignOut' onClick={logout}>
        Sign Out
      </Button>
    </div>
  );
}
