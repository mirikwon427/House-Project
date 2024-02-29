import CInput from '../components/common/CInput';
import CButton from '../components/common/CButton';
import { useInput } from '../hooks/useInput';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/store/reducers/userReducer';
import { phoneAuth } from '../redux/store/api/userApi'






export default function SignUp() {
  const email = useInput('');
  const pw = useInput('');
  const pwCorrect = useInput('');
  const name = useInput('');
  const phoneNumber = useInput('');
  const address = useInput('');
  const age = useInput('');

  const dispatch = useDispatch();

  // 정규표현식 및 유효성 검사 후 true / false
  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPwCorrect, setIsPwCorrect] = useState(false);
  const [isAdress, setIsAdress] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isPhoneAuth , setIsPhoneAuth] = useState(false);
  const [isAge, setIsAge] = useState(false);

  const [nameMessage, setNameMessage] = useState('');
  const [pwMessage, setpwMessage] = useState('');
  const [pwConfirmMessage, setPwConfirmMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [phoneMessage, setPhoneMessage] = useState('');
  const [addressMessage, setAddressMessage] = useState('');
  const [ageMessage, setAgeMessage] = useState('');

  const handlePhoneAuthentication = async(e) => {
    e.preventDefault();
    const result = phoneAuth({"phone" : phoneNumber.value})
    if (result.success === true) {
      alert("인증번호를 발송했습니다.")
    } else {
      alert("에러가 발생했습니다.")
    }
    console.log('인증 클릭');
    
  };

  const onClickSignup = useCallback(
    (e) => {
      e.preventDefault();

      const phoneRule = /\d{3}\d{3,4}\d{4}/;
      const emailRule = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      const pwRule =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/;
      const addressRule = /^.{4,}$/;
      const ageRule = /\d{1,}$/;

      if (!emailRule.test(email.value)) {
        setEmailMessage('이메일 형식이 아닙니다.');
        setIsEmail(false);
      } else {
        setEmailMessage('사용가능한 아이디 입니다.');
        setIsEmail(true);
      }

      if (!pwRule.test(pw.value)) {
        setpwMessage(
          '최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자를 포함해서 최소 8자 이상 입력하세요',
        );
        setIsPw(false);
      } else {
        setpwMessage('사용가능한 비밀번호입니다.');
        setIsPw(true);
      }

      if (pw.value !== pwCorrect.value) {
        setPwConfirmMessage('일치하지 않습니다.');
        setIsPwCorrect(false);
      } else {
        setPwConfirmMessage('일치');
        setIsPwCorrect(true);
      }

      if (!phoneRule.test(phoneNumber.value)) {
        setPhoneMessage('-없이 숫자만 입력해주세요.');
        setIsPhone(false);
      } else {
        setPhoneMessage('');
        setIsPhone(true);
      }

      if (name.value === '') {
        setNameMessage('필수 입력사항입니다.');
        setIsName(false);
      } else {
        setNameMessage('');
        setIsName(true);
      }

      if (!addressRule.test(address.value)) {
        setAddressMessage('최소 4글자 이상 입력하세요.');
        setIsAdress(false);
      } else {
        setAddressMessage('');
        setIsAdress(true);
      }

      if (!ageRule.test(age.value)) {
        setAgeMessage('숫자만 입력가능합니다.');
        setIsAge(false);
      } else {
        setAgeMessage('');
        setIsAge(true);
      }

      if (
        isEmail &&
        isPw &&
        isPwCorrect &&
        isPhone &&
        isName &&
        isAdress &&
        isAge
      ) {
        console.log('passed');
        dispatch(
          userActions.signUpReq({
            name: name.value,
            age: age.value,
            email: email.value,
            password: pw.value,
            phone: phoneNumber.value,
            address: address.value,
          }),
        );
      }
    },
    [
      dispatch,
      email,
      pw,
      phoneNumber,
      pwCorrect,
      address,
      name,
      isAdress,
      age,
      isAge,
      isName,
      isEmail,
      isPw,
      isPwCorrect,
      isPhone,
    ],
  );

  return (
    <div className="w-full flex justify-center my-16">
      <div className="w-full h-fit py-36 bg-gray-50 rounded-2xl flex justify-center items-center">
        <div className="w-[640px] h-fit bg-white shadow-lg rounded-md flex p-20">
          <div className="w-full">
            <div className="text-center text-4xl font-bold mb-12">Sign Up</div>
            <form onSubmit={onClickSignup} className="flex flex-col gap-4">
              <CInput
                {...email}
                type="email"
                placeholder="이메일을 입력해주세요."
                label="이메일"
                isErr={!isEmail}
                errMsg={emailMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                  />
                </svg>
              </CInput>

              <CInput
                {...pw}
                type="password"
                placeholder="비밀번호를 입력해주세요."
                label="비밀번호"
                isErr={!isPw}
                errMsg={pwMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
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

              <CInput
                {...pwCorrect}
                type="password"
                placeholder="비밀번호 확인을 입력해주세요."
                label="비밀번호 확인"
                isErr={!isPwCorrect}
                errMsg={pwConfirmMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </CInput>

              <CInput
                {...name}
                type="text"
                placeholder="이름을 입력해주세요."
                label="이름"
                isErr={!isName}
                errMsg={nameMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </CInput>

              <div>
                <div className="mb-2 font-medium text-sm">핸드폰 번호</div>
                <div className="w-full flex gap-4">
                  <div className="flex-1">
                    <CInput
                      {...phoneNumber}
                      type="text"
                      placeholder="핸드폰 번호를 입력해주세요."
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                        />
                      </svg>
                    </CInput>
                  </div>

                  <CButton
                    title="인증하기"
                    onClick={handlePhoneAuthentication}
                  />
                </div>
                {!isPhone && (
                  <div className="text-[#ea002c] text-xs mt-1 pl-4">
                    {phoneMessage}
                  </div>
                )}
              </div>

              <CInput
                {...age}
                type="text"
                placeholder="나이를 입력해주세요."
                label="나이"
                isErr={!isAge}
                errMsg={ageMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
              </CInput>

              <CInput
                {...address}
                type="text"
                placeholder="주소를 입력해주세요."
                label="주소"
                isErr={!isAdress}
                errMsg={addressMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                  />
                </svg>
              </CInput>

              <CButton title="SIGN UP" onClick={onClickSignup} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
