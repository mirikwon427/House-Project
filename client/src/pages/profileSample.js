import { Link, useNavigate } from 'react-router-dom';
import CButton from '../components/common/CButton';
import MypageSwiper from '../components/mypage/MypageSwiper';

const likedProducts = [
  {
    id: 9,
    bldg_nm: '더펜트하우스청담',
    sgg_nm: '서울 강남 청담',
    image: 'https://picsum.photos/id/24/200/300',
  },
  {
    id: 10,
    bldg_nm: '나인원한남',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/25/200/300',
  },
  {
    id: 11,
    bldg_nm: '파르크한남',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/26/200/300',
  },
  {
    id: 12,
    bldg_nm: '더펜트하우스청담',
    sgg_nm: '서울 강남 청담',
    image: 'https://picsum.photos/id/24/200/300',
  },
  {
    id: 13,
    bldg_nm: '나인원한남',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/25/200/300',
  },
  {
    id: 14,
    bldg_nm: '파르크한남',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/26/200/300',
  },
  {
    id: 15,
    bldg_nm: '더펜트하우스청담',
    sgg_nm: '서울 강남 청담',
    image: 'https://picsum.photos/id/24/200/300',
  },
  {
    id: 16,
    bldg_nm: '나인원한남',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/25/200/300',
  },
  {
    id: 17,
    bldg_nm: '파르크한남',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/26/200/300',
  },
  {
    id: 18,
    bldg_nm: '더펜트하우스청담',
    sgg_nm: '서울 강남 청담',
    image: 'https://picsum.photos/id/24/200/300',
  },
  {
    id: 19,
    bldg_nm: '나인원한남',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/25/200/300',
  },
  {
    id: 20,
    bldg_nm: '파르크한남',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/26/200/300',
  },
];

const registerdProducts = [
  {
    id: 0,
    bldg_nm: '한남더힐',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 1,
    bldg_nm: '트라움하우스5',
    sgg_nm: '서울 서초 서초',
    image: 'https://picsum.photos/id/28/200/300',
  },
  {
    id: 2,
    bldg_nm: '아크로서울포레스트',
    sgg_nm: '서울 성동 성수동1',
    image: 'https://picsum.photos/id/29/200/300',
  },
  {
    id: 3,
    bldg_nm: '더펜트하우스청담',
    sgg_nm: '서울 강남 청담',
    image: 'https://picsum.photos/id/24/200/300',
  },
  {
    id: 4,
    bldg_nm: '나인원한남',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/25/200/300',
  },
  {
    id: 5,
    bldg_nm: '파르크한남',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/26/200/300',
  },
  {
    id: 6,
    bldg_nm: '한남더힐',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 7,
    bldg_nm: '한남더힐',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 8,
    bldg_nm: '트라움하우스5',
    sgg_nm: '서울 서초 서초',
    image: 'https://picsum.photos/id/28/200/300',
  },
  {
    id: 9,
    bldg_nm: '아크로서울포레스트',
    sgg_nm: '서울 성동 성수동1',
    image: 'https://picsum.photos/id/29/200/300',
  },
  {
    id: 10,
    bldg_nm: '더펜트하우스청담',
    sgg_nm: '서울 강남 청담',
    image: 'https://picsum.photos/id/24/200/300',
  },
  {
    id: 11,
    bldg_nm: '나인원한남',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/25/200/300',
  },
  {
    id: 12,
    bldg_nm: '파르크한남',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/26/200/300',
  },
  {
    id: 13,
    bldg_nm: '한남더힐',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/27/200/300',
  },
];

// 일단은 샘플이라고 이름 붙여놓은거라 나중에 프로필 수정 넣으시면서 이름이랑 url 라우팅까지 바꿔주시면 ㅎㅎㅎㅎ
export default function MypageSample() {

  const navigate = useNavigate();
  const gotoUpdateUser = () => {
    // 프로필 수정 페이지로 이동하거나 해당 컴포넌트로 전환하거나 해주세요 ㅎㅎㅎㅎ
    console.log("clicked");
    // <Link to="/profile"></Link>
    navigate('/profile');
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-50 rounded-sm p-16">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-8">
            <div className="w-32 h-32 rounded-full bg-gray-500"></div>
            <div className="flex flex-col justify-center gap-2">
              <div className="text-2xl font-bold">윤제혁</div>
              <div className="text-sm text-gray-500">
                지역 넣을건데 와 아래 디자인 너무 안이쁘다
              </div>
            </div>
          </div>
          <CButton title="프로필 수정" onClick={gotoUpdateUser} />
        </div>
      </div>

      <MypageSwiper title="찜한 매물 목록" data={likedProducts} />
      <MypageSwiper title="등록한 매물 목록" data={registerdProducts} />
    </div>
  );
}
