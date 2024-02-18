import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CButton from '../common/CButton';

export default function UserInfo({ edit, logout }) {
  const { user } = useSelector((state) => state.user);
  const { name, email, phone, age, address } = user;

  const navigate = useNavigate();

  const navigateToUpdate = () => {
    navigate('/profile/update');
  };

  return (
    <div className="w-full flex justify-center my-16">
      <div className="w-full h-fit py-36 bg-gray-50 rounded-2xl flex justify-center items-center">
        <div className="w-[640px] h-fit bg-white shadow-lg rounded-md flex p-20">
          <div className="w-full">
            <div className="text-center text-4xl font-bold mb-12">
              User Info
            </div>
            <form className="flex flex-col gap-4">
              <div>이메일: {email}</div>
              <div>이름: {name}</div>
              <div>전화번호: {phone}</div>
              <div>나이:{age}</div>
              <div> 주소: {address}</div>
              <CButton title="회원정보 수정하기" onClick={navigateToUpdate} />
            </form>
            <div className="flex flex-col gag-4 mt-4">
              <CButton title="Log Out" onClick={logout} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
