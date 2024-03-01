import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import UserInfo from '../components/profile/UserInfo';
import { userActions } from '../redux/store/reducers/userReducer';

export default function Profile() {
  const dispatch = useDispatch();

  const onClickLogout = useCallback(
    (e) => {
      dispatch(userActions.logoutUserReq());
    },
    [dispatch],
  );

  return (
    <>
      <UserInfo logout={onClickLogout} />
    </>
  );
}
