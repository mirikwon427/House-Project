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
              회원 정보
            </div>
            <form className="flex flex-col gap-4 text-lg">
              <div className="w-full flex gap-8">
                <div className="font-bold w-[80px]">이메일</div>
                <div className="flex-1">{email}</div>
              </div>
              <div className="w-full flex gap-8">
                <div className="font-bold w-[80px]">이름</div>
                <div className="flex-1">{name}</div>
              </div>
              <div className="w-full flex gap-8">
                <div className="font-bold w-[80px]">전화번호</div>
                <div className="flex-1">{phone}</div>
              </div>
              <div className="w-full flex gap-8">
                <div className="font-bold w-[80px]">나이</div>
                <div className="flex-1">{age}</div>
              </div>
              <div className="w-full flex gap-8 mb-8">
                <div className="font-bold w-[80px]">주소</div>
                <div className="flex-1">{address}</div>
              </div>
              <CButton title="회원정보 수정" onClick={navigateToUpdate} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
