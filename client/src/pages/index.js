import MainSwiper from '../components/main/MainSwiper';
import MainMap from '../components/main/MainMap';
import { useSelector } from 'react-redux';

const likedProducts = [
  // {
  //   id: 0,
  //   bldg_nm: '더펜트하우스청담',
  //   sgg_nm: '서울 강남 청담',
  //   image: 'https://picsum.photos/id/24/200/300',
  // },
  // {
  //   id: 1,
  //   bldg_nm: '나인원한남',
  //   sgg_nm: '서울 용산 한남',
  //   image: 'https://picsum.photos/id/25/200/300',
  // },
  // {
  //   id: 2,
  //   bldg_nm: '파르크한남',
  //   sgg_nm: '서울 용산 한남',
  //   image: 'https://picsum.photos/id/26/200/300',
  // },
  // {
  //   id: 3,
  //   bldg_nm: '한남더힐',
  //   sgg_nm: '서울 용산 한남',
  //   image: 'https://picsum.photos/id/27/200/300',
  // },
  // {
  //   id: 4,
  //   bldg_nm: '트라움하우스5',
  //   sgg_nm: '서울 서초 서초',
  //   image: 'https://picsum.photos/id/28/200/300',
  // },
  // {
  //   id: 5,
  //   bldg_nm: '아크로서울포레스트',
  //   sgg_nm: '서울 성동 성수동1',
  //   image: 'https://picsum.photos/id/29/200/300',
  // },
];

const recommendedProducts = [
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
];

const likedSwiperData = {
  title: '찜한 매물 목록',
  items: likedProducts,
  errMsg: '찜한 매물이 없습니다.',
  errBtn: '찜 하러가기',
};

const recommendedSwiperData = {
  title: '추천 매물 목록',
  items: recommendedProducts,
  errMsg: '추천 매물이 없습니다.',
  errBtn: '지역 설정',
};

export default function Main() {
  const { user } = useSelector((state) => state.user);

  console.log('user:::', user);

  return (
    <div>
      {/* 거래 많은 지역 */}
      <MainMap />

      {/* 찜한 매물 목록 */}
      <MainSwiper data={likedSwiperData} />

      {/* 추천 매물 목록 */}
      <MainSwiper data={recommendedSwiperData} />
    </div>
  );
}
