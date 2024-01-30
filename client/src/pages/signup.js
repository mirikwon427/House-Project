import CButton from "../components/common/CButton"
import CInput from "../components/common/CInput"
import axios from "axios"
import { useInput } from "../hooks/useInput"
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  const email = useInput('');
  const pw = useInput('');
  const name = useInput('');
  const phoneNumber = useInput('');
  const address = useInput('');
  const age = useInput('');

  const navigate = useNavigate();
 
  
  
  const onClickSignup = () => {
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
        // jwt 토큰 저장하는 코드 추가
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
        <div>이메일</div>
        <CInput {...email} type="email"></CInput>
        <div>비밀번호</div>
        <CInput {...pw} type="password"></CInput>
        <div>이름</div>
        <CInput {...name}></CInput>
        <div>핸드폰 번호</div>
        <CInput {...phoneNumber}></CInput>
        <div>나이</div>
        <CInput {...age}></CInput>
        <div>주소</div>
        <CInput {...address}></CInput>
        <button className="py-3 px-5 bg-gray-800 text-white mt-3 text-lg rounded-lg focus:outline-none hover:opacity-90" type='button' onClick={onClickSignup}>회원가입</button>
        {/* <CButton title={'회원가입'} onClick={Signup}></CButton> */}
      </form>
    </>
  )
}