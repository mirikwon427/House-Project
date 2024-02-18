import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CButton from '../components/common/CButton';
import CInput from '../components/common/CInput';
import { useInput } from '../hooks/useInput';
import { houseActions } from '../redux/store/reducers/houseReducer';

export default function RegisterHouse() {
  const { token } = useSelector((state) => state.user);

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

  // Error
  const [sgg_cdErr, setSgg_cdErr] = useState(false);
  const [sgg_nmErr, setSgg_nmErr] = useState(false);
  const [land_gbmErr, setLand_gbmErr] = useState(false);
  const [land_gbn_nmErr, setLand_gbn_nmErr] = useState(false);
  const [bonbeonErr, setBonbeonErr] = useState(false);
  const [bubeonErr, setBubeonErr] = useState(false);
  const [bldg_nmErr, setBldg_nmErr] = useState(false);
  const [dal_ymdErr, setDal_ymdErr] = useState(false);
  const [obj_amtErr, setObj_amtErr] = useState(false);
  const [bldg_areaErr, setBldg_areaErr] = useState(false);
  const [tot_areaErr, setTot_areaErr] = useState(false);
  const [h_floorErr, setH_floorErr] = useState(false);
  const [build_yearErr, setBuild_yearErr] = useState(false);
  const [house_typeErr, setHouse_typeErr] = useState(false);
  const [req_gbnErr, setReq_gbnErr] = useState(false);

  // ErrorMsg

  const dispatch = useDispatch();

  const checkErr = (val, func) => {
    func(val.value === '');
    return val.value === '';
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      let errFlag = false;

      errFlag = checkErr(sgg_cd, setSgg_cdErr);
      errFlag = checkErr(sgg_nm, setSgg_nmErr);
      errFlag = checkErr(land_gbm, setLand_gbmErr);
      errFlag = checkErr(land_gbn_nm, setLand_gbn_nmErr);
      errFlag = checkErr(bonbeon, setBonbeonErr);
      errFlag = checkErr(bubeon, setBubeonErr);
      errFlag = checkErr(bldg_nm, setBldg_nmErr);
      errFlag = checkErr(dal_ymd, setDal_ymdErr);
      errFlag = checkErr(obj_amt, setObj_amtErr);
      errFlag = checkErr(bldg_area, setBldg_areaErr);
      errFlag = checkErr(tot_area, setTot_areaErr);
      errFlag = checkErr(h_floor, setH_floorErr);
      errFlag = checkErr(build_year, setBuild_yearErr);
      errFlag = checkErr(house_type, setHouse_typeErr);
      errFlag = checkErr(req_gbn, setReq_gbnErr);

      if (errFlag) return;

      let data = {
        house: {
          sgg_cd: sgg_cd.value,
          sgg_nm: sgg_nm.value,
          land_gbm: land_gbm.value,
          land_gbn_nm: land_gbn_nm.value,
          bonbeon: bonbeon.value,
          bubeon: bubeon.value,
          bldg_nm: bldg_nm.value,
          dal_ymd: dal_ymd.value,
          obj_amt: Number(obj_amt.value),
          bldg_area: Number(bldg_area.value),
          tot_area: tot_area.value,
          h_floor: h_floor.value,
          build_year: build_year.value,
          house_type: house_type.value,
          req_gbn: req_gbn.value,
          acc_year: acc_year.value,
          bjdong_cd: bjdong_cd.value,
          bjdong_nm: bjdong_nm.value,
          right_gbn: right_gbn.value,
          cntl_ymd: cntl_ymd.value,
          rdealer_lawdnm: rdealer_lawdnm.value,
          deal_ymd: '20240109',
          floor: '2.0',
        },
        token,
      };

      dispatch(houseActions.registerHouseReq(data));
    },
    [
      dispatch,
      token,
      sgg_cd,
      sgg_nm,
      land_gbm,
      land_gbn_nm,
      bonbeon,
      bubeon,
      bldg_nm,
      dal_ymd,
      obj_amt,
      bldg_area,
      tot_area,
      h_floor,
      build_year,
      house_type,
      req_gbn,
      acc_year,
      bjdong_cd,
      bjdong_nm,
      right_gbn,
      cntl_ymd,
      rdealer_lawdnm,
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
            isErr={bldg_nmErr}
            errMsg="건물명을 입력해주세요."
          />
          <CInput
            {...obj_amt}
            type="text"
            label="물건금액(만원)"
            placeholder="물건금액을 입력해주세요."
            required
            isErr={obj_amtErr}
            errMsg="물건금액을 입력해주세요."
          />
          <div className="w-full flex gap-6">
            <CInput
              {...dal_ymd}
              type="text"
              label="계약일"
              placeholder="계약일을 입력해주세요."
              required
              isErr={dal_ymdErr}
              errMsg="계약일을 입력해주세요."
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
              isErr={sgg_nmErr}
              errMsg="자치구명을 입력해주세요."
            />
            <CInput
              {...sgg_cd}
              type="text"
              label="자치구코드"
              placeholder="자치구코드를 입력해주세요."
              required
              isErr={sgg_cdErr}
              errMsg="자치구코드를 입력해주세요."
            />
          </div>
          <div className="w-full flex gap-6">
            <CInput
              {...land_gbm}
              type="text"
              label="지번구분"
              placeholder="지번구분을 입력해주세요."
              required
              isErr={land_gbmErr}
              errMsg="지번구분을 입력해주세요."
            />
            <CInput
              {...land_gbn_nm}
              type="text"
              label="지번구분명"
              placeholder="지번구분명을 입력해주세요."
              required
              isErr={land_gbn_nmErr}
              errMsg="지번구분명을 입력해주세요."
            />
          </div>
          <div className="w-full flex gap-6">
            <CInput
              {...bonbeon}
              type="text"
              label="본번"
              placeholder="본번을 입력해주세요."
              required
              isErr={bonbeonErr}
              errMsg="본번을 입력해주세요."
            />
            <CInput
              {...bubeon}
              type="text"
              label="부번"
              placeholder="부번을 입력해주세요."
              required
              isErr={bubeonErr}
              errMsg="부번을 입력해주세요."
            />
          </div>
          <div className="w-full flex gap-6">
            <CInput
              {...bldg_area}
              type="text"
              label="건물 면적"
              placeholder="건물 면적을 입력해주세요."
              required
              isErr={bldg_areaErr}
              errMsg="건물 면적을 입력해주세요."
            />
            <CInput
              {...tot_area}
              type="text"
              label="토지 면적"
              placeholder="토지 면적을 입력해주세요."
              required
              isErr={tot_areaErr}
              errMsg="토지 면적을 입력해주세요."
            />
          </div>
          <div className="w-full flex gap-6">
            <CInput
              {...h_floor}
              type="text"
              label="층"
              placeholder="층을 입력해주세요."
              required
              isErr={h_floorErr}
              errMsg="층을 입력해주세요."
            />
            <CInput
              {...build_year}
              type="text"
              label="건축년도"
              placeholder="건축년도를 입력해주세요."
              required
              isErr={build_yearErr}
              errMsg="건축년도를 입력해주세요."
            />
          </div>
          <div className="w-full flex gap-6">
            <CInput
              {...house_type}
              type="text"
              label="건축물용도"
              placeholder="건축물용도를 입력해주세요."
              required
              isErr={house_typeErr}
              errMsg="건축물용도를 입력해주세요."
            />
            <CInput
              {...req_gbn}
              type="text"
              label="신고구분"
              placeholder="신고구분을 입력해주세요."
              required
              isErr={req_gbnErr}
              errMsg="신고구분을 입력해주세요."
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
