// import Card from "../components/common/CCard"
import CButton from "../components/common/CButton"
import CInput from "../components/common/CInput"
import axios from "axios"
import { useInput } from "../hooks/useInput"
import {useDispatch, useSelector} from "react-redux"
import { useState, useCallback} from "react"
import { useNavigate } from "react-router-dom"
import { userActions } from "../redux/store/reducers/userReducer"

export default function Profile() {
  const name = useInput('');
  const address = useInput('');
  const age = useInput('');
  const phoneNumber = useInput('');
  const email = useInput('');
  const pw = useInput('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, useEdit ]= useState();


  const onClickLogout = useCallback(
    (e) => {
      dispatch(userActions.logoutUserReq());
    },
    [dispatch],
  );  
  
  const updateUser = () => {
        axios({
          method: 'put',
          url: '/api/user',
          data: {
            email: email.value,
            password: pw.value,
            name: name.value,
            age: age.value,
            phone: phoneNumber.value,
            address: address.value,
          },
          headers: 'jwtToken'
        }
        )
    }


  return (
    <>
      <div>
        <CInput {...email}></CInput>
        {edit? <CInput {...pw}></CInput>:<CInput {...pw}></CInput>}
        <CInput {...name}></CInput>
        <CInput {...address}></CInput>
        <CInput {...age}></CInput>
        <CInput {...phoneNumber}></CInput>
        <CButton title={'회원정보 수정'} onClick={updateUser}></CButton>
        <CButton title={'로그아웃'} onClick={onClickLogout}></CButton>
        {/* <Card></Card> */}
      </div>
    </>
  )
}