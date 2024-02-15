import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CButton from '../components/common/CButton';
import CInput from '../components/common/CInput';
import { useInput } from '../hooks/useInput';
import { houseActions } from '../redux/store/reducers/houseReducer';

export default function RegisterHouse() {
  const { user, token } = useSelector((state) => state.user);

  // required
  const sgg_cd = useInput(''); // 자치구코드 string
  const sgg_nm = useInput(''); // 자치구명 string
  const land_gbm = useInput(''); // 지번구분 string
  const land_gbn_nm = useInput(''); // 지번구분명 string
  const bonbeon = useInput(''); // 본번 string
  const bubeon = useInput(''); // 부번 string
  const bldg_nm = useInput(''); // 건물명 string
  const dal_ymd = useInput(''); // 계약일 string
  const obj_amt = useInput(''); // 물건금액(만원) int
  const bldg_area = useInput(''); // 건물 면적 int
  const tot_area = useInput(''); // 토지 면적 int
  const h_floor = useInput(''); // 층 string
  const build_year = useInput(''); // 건축년도 string
  const house_type = useInput(''); // 건축물용도 string
  const req_gbn = useInput(''); // 신고구분 string

  // not required
  const acc_year = useInput(''); // 접수연도 string
  const bjdong_cd = useInput(''); // 법정동코드 string
  const bjdong_nm = useInput(''); // 법정동명 string
  const right_gbn = useInput(''); // 권리구분 string
  const cntl_ymd = useInput(''); // 취소일 string
  const rdealer_lawdnm = useInput(''); // 신고한 개업공인중개사 시군구명 string
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      let data = {
        // house: {
        //   sgg_cd: sgg_cd.value,
        //   sgg_nm: sgg_nm.value,
        //   land_gbm: land_gbm.value,
        //   land_gbn_nm: land_gbn_nm.value,
        //   bonbeon: bonbeon.value,
        //   bubeon: bubeon.value,
        //   bldg_nm: bldg_nm.value,
        //   dal_ymd: dal_ymd.value,
        //   obj_amt: obj_amt.value,
        //   bldg_area: bldg_area.value,
        //   tot_area: tot_area.value,
        //   h_floor: h_floor.value,
        //   build_year: build_year.value,
        //   house_type: house_type.value,
        //   req_gbn: req_gbn.value,
        //   acc_year: acc_year.value,
        //   bjdong_cd: bjdong_cd.value,
        //   bjdong_nm: bjdong_nm.value,
        //   right_gbn: right_gbn.value,
        //   cntl_ymd: cntl_ymd.value,
        //   rdealer_lawdnm: rdealer_lawdnm.value,
        // },
        house: {
          acc_year: '2023',
          sgg_cd: '11530',
          sgg_nm: '구로구',
          bjdong_cd: '10200',
          bjdong_nm: '구로동',
          land_gbm: '1',
          land_gbn_nm: '대지',
          bonbeon: '546',
          bubeon: '17',
          bldg_nm: '오크트리빌구로1차',
          dal_ymd: '20220104',
          deal_ymd: '20240109',
          obj_amt: 25300,
          bldg_area: 26.85,
          tot_area: '18.52',
          h_floor: '4',
          floor: '2.0',
          right_gbn: '전세권',
          cntl_ymd: '2023',
          build_year: '연립다세대',
          house_type: '직거래',
          req_gbn: '전세',
          rdealer_lawdnm: '강서공인중개사',
        },
        token,
      };

      dispatch(houseActions.registerHouseReq(data));
    },
    [
      dispatch,
      token,
      //   sgg_cd,
      //   sgg_nm,
      //   land_gbm,
      //   land_gbn_nm,
      //   bonbeon,
      //   bubeon,
      //   bldg_nm,
      //   dal_ymd,
      //   obj_amt,
      //   bldg_area,
      //   tot_area,
      //   h_floor,
      //   build_year,
      //   house_type,
      //   req_gbn,
      //   acc_year,
      //   bjdong_cd,
      //   bjdong_nm,
      //   right_gbn,
      //   cntl_ymd,
      //   rdealer_lawdnm,
    ],
  );

  return (
    <div className="py-12 flex justify-center">
      <div className="w-[864px]">
        <h1 className="w-full text-4xl font-bold mb-10">
          등록할 매물 정보를 입력해주세요.
        </h1>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <CInput
            {...bldg_nm}
            type="text"
            label="건물명"
            placeholder="건물명을 입력해주세요."
            required
          />
          <CInput
            {...obj_amt}
            type="text"
            label="물건금액(만원)"
            placeholder="물건금액을 입력해주세요."
            required
          />
          <div className="w-full flex gap-6">
            <CInput
              {...dal_ymd}
              type="text"
              label="계약일"
              placeholder="계약일을 입력해주세요."
              required
            />
            <CInput
              {...acc_year}
              type="text"
              label="접수연도"
              placeholder="접수연도를 입력해주세요."
            />
          </div>
          <div className="w-full flex gap-6">
            <CInput
              {...sgg_nm}
              type="text"
              label="자치구명"
              placeholder="자치구명을 입력해주세요."
              required
            />
            <CInput
              {...sgg_cd}
              type="text"
              label="자치구코드"
              placeholder="자치구코드를 입력해주세요."
              required
            />
          </div>
          <div className="w-full flex gap-6">
            <CInput
              {...land_gbm}
              type="text"
              label="지번구분"
              placeholder="지번구분을 입력해주세요."
              required
            />
            <CInput
              {...land_gbn_nm}
              type="text"
              label="지번구분명"
              placeholder="지번구분명을 입력해주세요."
              required
            />
          </div>
          <div className="w-full flex gap-6">
            <CInput
              {...bonbeon}
              type="text"
              label="본번"
              placeholder="본번을 입력해주세요."
              required
            />
            <CInput
              {...bubeon}
              type="text"
              label="부번"
              placeholder="부번을 입력해주세요."
              required
            />
          </div>
          <div className="w-full flex gap-6">
            <CInput
              {...bldg_area}
              type="text"
              label="건물 면적"
              placeholder="건물 면적을 입력해주세요."
              required
            />
            <CInput
              {...tot_area}
              type="text"
              label="토지 면적"
              placeholder="토지 면적을 입력해주세요."
              required
            />
          </div>
          <div className="w-full flex gap-6">
            <CInput
              {...h_floor}
              type="text"
              label="층"
              placeholder="층을 입력해주세요."
              required
            />
            <CInput
              {...build_year}
              type="text"
              label="건축년도"
              placeholder="건축년도를 입력해주세요."
              required
            />
          </div>
          <div className="w-full flex gap-6">
            <CInput
              {...house_type}
              type="text"
              label="건축물용도"
              placeholder="건축물용도를 입력해주세요."
              required
            />
            <CInput
              {...req_gbn}
              type="text"
              label="신고구분"
              placeholder="신고구분을 입력해주세요."
              required
            />
          </div>
          <div className="w-full flex gap-6">
            <CInput
              {...cntl_ymd}
              type="text"
              label="취소일"
              placeholder="취소일을 입력해주세요."
            />
            <CInput
              {...right_gbn}
              type="text"
              label="권리구분"
              placeholder="권리구분을 입력해주세요."
            />
          </div>
          <div className="w-full flex gap-6">
            <CInput
              {...bjdong_nm}
              type="text"
              label="법정동명"
              placeholder="법정동명을 입력해주세요."
            />
            <CInput
              {...bjdong_cd}
              type="text"
              label="법정동코드"
              placeholder="법정동코드를 입력해주세요."
            />
          </div>

          <CInput
            {...rdealer_lawdnm}
            type="text"
            label="신고한 개업공인중개사 시군구명"
            placeholder="신고한 개업공인중개사 시군구명을 입력해주세요."
          />

          <div className="w-full flex justify-end">
            <CButton title="등록하기" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
}
