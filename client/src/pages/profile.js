import CButton from "../components/common/CButton"
import UserInfoEdit from "../components/profile/UserInfoEdit"
import UserInfo from "../components/profile/UserInfo"
import { useState, useCallback} from "react"
import { useDispatch } from "react-redux"
import { userActions } from "../redux/store/reducers/userReducer"

export default function Profile() {
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch();

  const OnClickUserEdit = () => {
    setEdit(!edit)
  }

  const onClickLogout = useCallback(
    (e) => {
      dispatch(userActions.logoutUserReq());
    },
    [dispatch],
  );  


  return (
    <>
      
      {edit? <UserInfoEdit edit={edit} /> :
      <>
      <UserInfo edit={OnClickUserEdit} logout={onClickLogout}/>
      {/* <CButton title={'회원정보 수정'} onClick={OnClickUserEdit}></CButton>
      <CButton title={'로그아웃'} onClick={onClickLogout}></CButton> */}
      </>}
    </>
  )
}