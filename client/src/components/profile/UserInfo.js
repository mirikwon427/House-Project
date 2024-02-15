import {useDispatch, useSelector} from "react-redux"
import CInput from "../common/CInput";
import CButton from "../common/CButton";
import { useCallback, useEffect, useState} from "react"
import { userActions } from "../../redux/store/reducers/userReducer"
import { useNavigate } from "react-router-dom";

export default function UserInfo({edit, logout}) {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);

  const [name,setName]= useState(user.name);
  const [address,setAddress]= useState(user.address);
  const [age,setAge]= useState(user.age);
  const [phone,setPhone]= useState(user.phone);
  const [email,setEmail]= useState(user.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userActions.getUserReq({
      id:user.id,
      headers: token
    }));

    setName(user.name);
    setAddress(user.address);
    setAge(user.age);
    setPhone(user.phone)
    setEmail(user.email);
  },[dispatch, user, token]);

  const onClickEdit = () => {
  }

  const onClickLogout = useCallback(
    (e) => {
      dispatch(userActions.logoutUserReq());
    },
    [dispatch],
  );

  
  return (
    <div className="w-full flex justify-center my-16">
      <div className="w-full h-fit py-36 bg-gray-50 rounded-2xl flex justify-center items-center">
        <div className="w-[640px] h-fit bg-white shadow-lg rounded-md flex p-20">
          <div className="w-full">
            <div className="text-center text-4xl font-bold mb-12">User Info</div>
            <form onSubmit={onClickEdit} className="flex flex-col gap-4">
              <div> 
                이메일: {email}
              </div>
              <div> 
                이름: {name}
              </div>
              <div> 
                전화번호: {phone}
              </div>
              <div>
               나이:{age}
              </div>
              <div
              > 주소: {address}
              </div>
              <CButton title="User Info Edit" onClick={edit} />
            </form>
            <div className="flex flex-col gag-4 mt-4">
              <CButton title="Log Out" onClick={logout} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}