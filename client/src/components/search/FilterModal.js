import { cancelBgFixed } from '../../utils/utils';
import CButton from '../common/CButton';
import CCheckBtn from '../common/CCheckBtn';

export default function FilterModal({ setModalOpen }) {
  const onSubmit = (e) => {
    setModalOpen(false);
  };

  const onCheck = (e) => {
    console.log('check!!');
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 flex flex-col justify-center bg-opacity-40 overflow-hidden">
      <div className="relative min-w-[1080px] w-1/3 h-fit max-h-[80vh] bg-white shadow-xl items-center mx-auto my-0 rounded-xl flex">
        <div className="w-full h-full px-12 py-12 overflow-auto">
          <div className="text-4xl font-bold mb-12">검색 조건</div>

          <div className="text-xl font-bold mb-4">금액</div>
          <div className="w-full flex gap-4 mb-6 flex-wrap">
            <CCheckBtn data={'1억 이하'} onClick={onCheck} />
            <CCheckBtn data={'1억~2억'} onClick={onCheck} />
            <CCheckBtn data={'2억~3억'} onClick={onCheck} />
            <CCheckBtn data={'3억~4억'} onClick={onCheck} />
            <CCheckBtn data={'4억~5억'} onClick={onCheck} />
            <CCheckBtn data={'5억~6억'} onClick={onCheck} />
            <CCheckBtn data={'6억~7억'} onClick={onCheck} />
            <CCheckBtn data={'무제한'} onClick={onCheck} />
          </div>

          <div className="text-xl font-bold mb-4">지역</div>
          <div className="w-full flex gap-4 mb-6 flex-wrap">
            <CCheckBtn data={'금천구'} onClick={onCheck} />
            <CCheckBtn data={'영등포구'} onClick={onCheck} />
            <CCheckBtn data={'중구'} onClick={onCheck} />
            <CCheckBtn data={'은평구'} onClick={onCheck} />
          </div>

          <div className="text-xl font-bold mb-4">건물 형태</div>
          <div className="w-full flex gap-4 mb-6 flex-wrap">
            <CCheckBtn data={'원룸'} onClick={onCheck} />
            <CCheckBtn data={'투, 쓰리룸'} onClick={onCheck} />
            <CCheckBtn data={'오피스텔'} onClick={onCheck} />
            <CCheckBtn data={'아파트'} onClick={onCheck} />
          </div>

          <div className="text-xl font-bold mb-4">평수</div>
          <div className="w-full flex gap-4 flex-wrap">
            <CCheckBtn data={'10평 이하'} onClick={onCheck} />
            <CCheckBtn data={'10평~15평'} onClick={onCheck} />
            <CCheckBtn data={'15평~20평'} onClick={onCheck} />
            <CCheckBtn data={'20평~25평'} onClick={onCheck} />
            <CCheckBtn data={'25평~30평'} onClick={onCheck} />
            <CCheckBtn data={'30평~35평'} onClick={onCheck} />
            <CCheckBtn data={'35평~40평'} onClick={onCheck} />
            <CCheckBtn data={'무제한'} onClick={onCheck} />
          </div>

          <div className="w-full mt-12 flex justify-end">
            <CButton title="적용" onClick={onSubmit} />
          </div>
        </div>

        <div
          className={`absolute -right-12 -top-12 w-10 h-10 rounded-full bg-white shadow-xl flex justify-center items-center cursor-pointer hover:-top-[52px] transition-all`}
          onClick={() => {
            setModalOpen(false);
            cancelBgFixed();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
