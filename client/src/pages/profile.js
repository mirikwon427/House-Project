// import Card from "../components/common/CCard"
import CButton from "../components/common/CButton"
import CInput from "../components/common/CInput"
import axios from "axios"
import { useInput } from "../hooks/useInput"
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { userSlice } from "../redux/store/reducers/LoginReducer"

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

  // const ShowUserData = () => {
  //   const userEmail = useSelector((state) => state.userSlice.user.email)
  //   console.log(userEmail)
  // };
  function Cart () {
    let state = useSelector( (state)=>{ return state } )
    console.log(state)
  };
  
  useEffect(() => {
    // console.log('전');
    // console.log('후');
  },[])

  
  
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

  const LogOut = () => {
    dispatch(userSlice.actions.logout())
    sessionStorage.clear();
    navigate('/')
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
        <CButton title={'로그아웃'} onClick={LogOut}></CButton>
        {/* <Card></Card> */}
      </div>
    </>
  )
}