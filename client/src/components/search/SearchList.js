import { useEffect, useState } from 'react';
import CCard from '../common/CCard';
import { Pagination } from 'antd';
import { bgFixed } from '../../utils/utils';
import { useLocation } from 'react-router-dom';

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
  {
    id: 6,
    bldg_nm: '한남더힐',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 7,
    bldg_nm: '트라움하우스5',
    sgg_nm: '서울 서초 서초',
    image: 'https://picsum.photos/id/28/200/300',
  },
  {
    id: 8,
    bldg_nm: '아크로서울포레스트',
    sgg_nm: '서울 성동 성수동1',
    image: 'https://picsum.photos/id/29/200/300',
  },
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
    bldg_nm: '한남더힐',
    sgg_nm: '서울 용산 한남',
    image: 'https://picsum.photos/id/27/200/300',
  },
  {
    id: 13,
    bldg_nm: '트라움하우스5',
    sgg_nm: '서울 서초 서초',
    image: 'https://picsum.photos/id/28/200/300',
  },
  {
    id: 14,
    bldg_nm: '아크로서울포레스트',
    sgg_nm: '서울 성동 성수동1',
    image: 'https://picsum.photos/id/29/200/300',
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

export default function SearchList({ handleFilter }) {
  const location = useLocation();
  const [currentPage, setCurrentpage] = useState(1);

  // 필터 조건은 실제 데이터 받아오면 달라짐
  const [houses, setHouses] = useState(
    recommendedProducts.filter((v, i) => i >= 0 && i < 15),
  );

  // 상세 페이지에서 뒤로가기 했을때, 원래 있던 페이지로 이동도 필요함
  useEffect(() => {
    setHouses(
      recommendedProducts.filter(
        (v, i) => i >= 15 * (currentPage - 1) && i < 15 * currentPage,
      ),
    );
  }, [currentPage, location]);

  const onChangePage = (e) => {
    setCurrentpage(e);

    let data = recommendedProducts.filter(
      (v, i) => i >= 15 * (e - 1) && i < 15 * e,
    );
    setHouses(data);
  };

  return (
    <div>
      {recommendedProducts.length > 0 ? (
        <div>
          <div className="w-full grid grid-cols-3 gap-8 gap-y-14">
            {houses.map((v) => {
              return (
                <div key={v.id}>
                  <CCard data={v} />
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-center mt-16">
            <Pagination
              defaultCurrent={currentPage}
              defaultPageSize={15}
              total={recommendedProducts.length}
              onChange={onChangePage}
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-[540px] bg-[#F4F6F5] rounded-3xl flex justify-center flex-col">
          <div className="h-fit w-full flex flex-col gap-4">
            <div className="text-[#9b9b9b] text-lg text-center">
              검색 조건에 해당하는 매물이 없습니다.
            </div>
            <div className="w-full h-fit flex justify-center">
              <button
                className="w-fit h-12 px-8 py-2 border-[#d3d3d3] border rounded-full bg-white text-base mx-auto"
                onClick={() => {
                  handleFilter(true);
                  bgFixed();
                }}
              >
                필터 재설정
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
