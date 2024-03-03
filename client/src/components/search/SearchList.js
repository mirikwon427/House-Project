import { Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { bgFixed } from '../../utils/utils';
import CCard from '../common/CCard';

export default function SearchList({ handleFilter, handleSearch, page }) {
  const { searchedHouses, totalCnt } = useSelector((state) => state.house);
    const { user, token } = useSelector((state) => state.user);

    console.log("user:::", user)
    console.log("searchedHouses:::", searchedHouses)
  const [currentPage, setCurrentpage] = useState(1);

  const onChangePage = (e) => {
    setCurrentpage(e);
    handleSearch(e);
  };

  useEffect(() => {
    setCurrentpage(page);
  }, [page]);

  return (
    <div>
      {searchedHouses.length > 0 ? (
        <div>
          <div className="w-full grid grid-cols-3 gap-8 gap-y-14">
            {searchedHouses.map((v) => {
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
              total={totalCnt}
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
