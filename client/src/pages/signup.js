import CButton from "../components/common/CButton"
import CInput from "../components/common/CInput"
import axios from "axios"
import { useInput } from "../hooks/useInput"
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function SignUp() {
  const email = useInput('');
  const pw = useInput('');
  const pwCorrect = useInput('');
  const name = useInput('');
  const phoneNumber = useInput('');
  const address = useInput('');
  const age = useInput('');
  
  const navigate = useNavigate();
 
  // 정규표현식 및 유효성 검사 후 true / false
  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPwCorrect, setIsPwCorrect] = useState(false);
  const [isAdress, setIsAdress] = useState(false);
  const [isname, setIsName] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isBirth, setIsBirth] = useState(false);

  const [idMessage, setIdMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [pwMessage, setpwMessage] = useState("");
  const [pwConfirmMessage, setpwConfirmMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");
  
  
  const onClickSignup = () => {
    const phoneRule = /\d{3}-\d{3,4}-\d{4}/;
    const emailRule = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const pwRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/;
  
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
      setpwMessage("일치하지 않습니다.");
      setIsPw(false);
    } else {
      setpwMessage("일치");
      setIsPw(true);
    }

    // axios 전송
    console.log('signup clicked')
    axios({
        method: 'post',
        url: '/api/signup',
        data: {
            email: email.value,
            password: pw.value,
            name: name.value,
            age: age.value,
            phone: phoneNumber.value,
            address: address.value,
        }
    })
    .then(res => {
        console.log('===================== 리스폰스')
        if (res.data.success === true) {
            console.log('======================','회원가입 성공')
            navigate("/login")
        } else {
            console.log(res);
        };
    })
    .catch()
    };

  return (
    <>
      <form>
        {/* <div>이메일</div> */}
        <label>이메일</label>
        <CInput {...email} type="email" ></CInput>
        <p className="message"> {emailMessage}  </p>
        <label> 비밀번호 </label>
        <CInput {...pw} type="password"></CInput>
        <p className="message"> {pwMessage}  </p>
        <label> 비밀번호 확인 </label>
        <CInput {...pwCorrect} type="password"></CInput>
        <p className="message"> {pwConfirmMessage}  </p>
        <label> 이름 </label>
        <CInput {...name}></CInput>
        <p className="message"> 아직 미정  </p>
        <label> 핸드폰 번호 </label>
        <CInput {...phoneNumber}></CInput>
        <p className="message"> {phoneMessage}  </p>
        <label> 나이 </label>
        <CInput {...age}></CInput>
        <label> 주소 </label>
        <CInput {...address}></CInput>
        <button className="py-3 px-5 bg-gray-800 text-white mt-3 text-lg rounded-lg focus:outline-none hover:opacity-90" type='button' onClick={onClickSignup}>회원가입</button>
        {/* <CButton title={'회원가입'} onClick={Signup}></CButton> */}
      </form>
    </>
  )
}