import { ForwardedRef, forwardRef } from 'react';
import { Session } from '../App';

type Props = {
  session: Session;
  logout: () => void;
};

const Profile = forwardRef(
  ({ session, logout }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <div className='border px-5 py-2'>
        {/* 왜 session.loginUser만 작성하면 아무것도 화면에 출력되지 않는지? */}

        <button onClick={logout} ref={ref} className='btn btn-primary'>
          {session.loginUser?.name} Sign Out
        </button>

        {/* <Button text='SignOut' onClick={logout}>
          Sign Out
        </Button> */}
      </div>
    );
  }
);

Profile.displayName = 'Profile';

export default Profile;
