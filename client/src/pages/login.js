import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CButton from '../components/common/CButton';
import CInput from '../components/common/CInput';
import CSpinner from '../components/common/CSpinner';
import { useInput } from '../hooks/useInput';
import { userActions } from '../redux/store/reducers/userReducer';

export default function LogIn() {
  const { isLoading } = useSelector((state) => state.user);

  const id = useInput('');
  const pw = useInput('');
  const dispatch = useDispatch();

  const onClickLogin = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(
        userActions.loginUserReq({
          email: id.value,
          password: pw.value,
        }),
      );
    },
    [dispatch, id, pw],
  );

  return (
    <>
      {isLoading && <CSpinner />}

      <div className="flex items-center justify-center w-full my-16">
        <div className="w-full h-[800px] bg-gray-50 rounded-2xl flex justify-center items-center">
          <div className="mb-8 w-[480px] bg-white p-16 rounded-md border border-gray-200 shadow-lg">
            <h3 className="text-3xl text-gray-800 font-bold mb-8">Log in</h3>
            <form className="w-full flex flex-col mt-5" onSubmit={onClickLogin}>
              <div className="w-full mb-4">
                <CInput {...id} type="text" placeholder="Email">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </CInput>
              </div>

              <div className="w-full mb-4">
                <CInput {...pw} type="password" placeholder="Password">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </CInput>
              </div>

              <CButton title="Log In" onClick={onClickLogin} />

              <div className="text-center text-sm text-gray-400 mt-8">
                Not a Member?{' '}
                <Link to="/signUp">
                  <span className="text-blue-500">Sign Up</span>
                </Link>
              </div>

              <div className="text-center mt-2">
                <Link to="/signUp">
                  <span className="text-sm text-gray-400 hover:underline cursor-pointer">
                    Forgot your password?
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
