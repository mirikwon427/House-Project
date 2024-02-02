// import Card from "../components/common/CCard"
import CButton from "../components/common/CButton"
import CInput from "../components/common/CInput"
import { useInput } from "../hooks/useInput"
import {useDispatch, useSelector} from "react-redux"
import { useState, useCallback} from "react"
import { userActions } from "../redux/store/reducers/userReducer"

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const {token } = useSelector((state) => state.user);

  const name = useInput(user.name);
  const address = useInput(user.address);
  const age = useInput(user.age);
  const phone = useInput(user.phone);
  const email = useInput(user.email);
  const pw = useInput('');
  const dispatch = useDispatch();
  const [edit, useEdit ]= useState();


  const onClickLogout = useCallback(
    (e) => {
      dispatch(userActions.logoutUserReq());
    },
    [dispatch],
  );  

  const onClickUserUpdate = useCallback(
    (e) => {
      e.preventDefault();
      
      console.log('버튼 클릭')
      // console.log(user.id)
      dispatch(userActions.updateUserReq({
        headers: token,
        user: {
          id: user.id,
          email: email.value,
          password: pw.value,
          name: name.value,
          age: age.value,
          phone: phone.value,
          address: address.value,
        }
        }
      ));
    },
    [dispatch, email, pw, name, age, phone, address, token, user],
  );  



  return (
    <>
      <div>
        <CInput {...email}></CInput>
        {edit? <CInput {...pw}></CInput>:<CInput {...pw}></CInput>}
        <CInput {...name}></CInput>
        <CInput {...address}></CInput>
        <CInput {...age}></CInput>
        <CInput {...phone}></CInput>
        <CButton title={'회원정보 수정'} onClick={onClickUserUpdate}></CButton>
        <CButton title={'로그아웃'} onClick={onClickLogout}></CButton>
        {/* <Card></Card> */}
      </div>
    </>
  )
}