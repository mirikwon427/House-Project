import CInput from "../components/common/CInput"
import { useInput } from "../hooks/useInput"
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/store/reducers/userReducer";


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
  const [isAge, setIsAge] = useState(false);

  const [nameMessage, setNameMessage] = useState("");
  const [pwMessage, setpwMessage] = useState("");
  const [pwConfirmMessage, setPwConfirmMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [addressMessage, setAddressMessage] = useState("");
  const [ageMessage, setAgeMessage] = useState("");
  
  
  const onClickSignup = useCallback(
    (e) => {
      e.preventDefault();

      const phoneRule = /\d{3}-\d{3,4}-\d{4}/;
      const emailRule = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      const pwRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/;
      const addressRule = /^.{4,}$/;
      const ageRule = /\d{1,}$/;
      
      if (!emailRule.test(email.value)) {
        setEmailMessage("이메일 형식이 아닙니다.");
        setIsEmail(false);
      } else {
        setEmailMessage("사용가능한 아이디 입니다.");
        setIsEmail(true);
      }
      
      if (!pwRule.test(pw.value)) {
        setpwMessage("최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자를 포함해서 최소 8자 이상 입력하세요");
        setIsPw(false);
      } else {
        setpwMessage("사용가능한 비밀번호입니다.");
        setIsPw(true);
      }
      
      if (pw.value !== pwCorrect.value) {
        setPwConfirmMessage("일치하지 않습니다.");
        setIsPwCorrect(false);
      } else {
        setPwConfirmMessage("일치");
        setIsPwCorrect(true);
      };
      
      if (!phoneRule.test(phoneNumber.value)) {
        setPhoneMessage("010-1234-5678 형식으로 입력해주세요.");
        setIsPhone(false);
      } else {
        setPhoneMessage("");
        setIsPhone(true);
      };

      if (name.value === '') {
        setNameMessage("필수 입력사항입니다.");
        setIsName(false);
      } else {
        setNameMessage("");
        setIsName(true);
      };

      if (!addressRule.test(address.value)) {
        setAddressMessage("최소 4글자 이상 입력하세요.");
        setIsAdress(false);
      } else {
        setAddressMessage("");
        setIsAdress(true);
      };


      if (!ageRule.test(age.value)) {
        setAgeMessage("숫자만 입력가능합니다.");
        setIsAge(false);
      } else {
        setAgeMessage("");
        setIsAge(true);
      };

      if (isEmail && isPw && isPwCorrect && isPhone && isName && isAdress && isAge){
        console.log("passed")
        dispatch(
          userActions.signUpReq({
            name: name.value,
            age: age.value,
            email: email.value,
            password: pw.value,
            phone: phoneNumber.value,
            address: address.value
          }),
        )
      }
    },
    [dispatch, email, pw, phoneNumber, pwCorrect, address, name, isAdress, age,isAge, isName, isEmail, isPw, isPwCorrect, isPhone],
  );

    return (
      <>
      <form>
        <label>이메일</label>
        <CInput {...email} type="email" ></CInput>
        <p className="message"> {emailMessage} </p>
        <label> 비밀번호 </label>
        <CInput {...pw} type="password"></CInput>
        <p className="message"> {pwMessage}  </p>
        <label> 비밀번호 확인 </label>
        <CInput {...pwCorrect} type="password"></CInput>
        <p className="message"> {pwConfirmMessage}  </p>
        <label> 이름 </label>
        <CInput {...name}></CInput>
        <p className="message"> {nameMessage}  </p>
        <label> 핸드폰 번호 </label>
        <CInput {...phoneNumber}></CInput>
        <p className="message"> {phoneMessage}  </p>
        <label> 나이 </label>
        <CInput {...age}></CInput>
        <p className="message"> {ageMessage}  </p>
        <label> 주소 </label>
        <CInput {...address}></CInput>
        <p className="message"> {addressMessage}  </p>
        <button className="py-3 px-5 bg-gray-800 text-white mt-3 text-lg rounded-lg focus:outline-none hover:opacity-90" type='button' onClick={onClickSignup}>회원가입</button>
      </form>
    </>
  )
}