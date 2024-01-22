import { useState } from 'react';
import CFilterBtn from '../components/common/CFilterBtn';
import SearchList from '../components/search/SearchList';
import FilterModal from '../components/search/FilterModal';
import { bgFixed } from '../utils/utils';
import CButton from '../components/common/CButton';

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
            <CFilterBtn data={'2~3억'} />
            <CFilterBtn data={'20~30평'} />
            <CFilterBtn data={'아파트, 투룸, 쓰리룸'} />
            <CFilterBtn data={'영등포구, 금천구'} />
          </div>
          {/* 필터링 버튼 */}
          <CButton
            title="+"
            onClick={() => {
              setModalOpen(true);
              bgFixed();
            }}
          ></CButton>
        </div>
      </div>

      {/* 리스트 */}
      <SearchList />

      {modalOpen ? <FilterModal setModalOpen={setModalOpen} /> : ''}
    </div>
  );
}
