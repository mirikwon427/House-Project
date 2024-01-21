import { useState } from 'react';
import FilterBtn from '../components/search/FilterBtn';
import SearchList from '../components/search/SearchList';
import FilterModal from '../components/search/FilterModal';
import { bgFixed } from '../utils/utils';

export default function Search() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="mt-4">
      <div className="mb-12 w-full flex justify-between items-center">
        <div className="text-4xl font-extrabold">통합 검색</div>
        {/* 필터링 */}
        <div className="w-fit flex gap-4">
          {/* 필터링 조건들 */}
          <div className="w-fit flex gap-3 h-fit">
            <FilterBtn data={'2~3억'} />
            <FilterBtn data={'20~30평'} />
            <FilterBtn data={'아파트, 투룸, 쓰리룸'} />
            <FilterBtn data={'영등포구, 금천구'} />
          </div>
          {/* 필터링 버튼 */}
          <button
            className="bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800"
            onClick={() => {
              setModalOpen(true);
              bgFixed();
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* 리스트 */}
      <SearchList />

      {modalOpen ? <FilterModal setModalOpen={setModalOpen} /> : ''}
    </div>
  );
}
