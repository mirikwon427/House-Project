import { Link } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import CLargeCard from '../common/CLargeCard';

export default function MainSwiper({ data }) {
  const { title, items, errMsg, errBtn, errFunc } = data;

  return (
    <div>
      <div className="w-full text-3xl font-extrabold pt-32 pb-12">{title}</div>

      <Swiper spaceBetween={48} slidesPerView={3}>
        {items.length > 0 ? (
          items.map((v) => {
            return (
              <SwiperSlide key={v.registeredHouse_id} className="w-1/3">
                <Link to={`/house/${v.registeredHouse_id}`}>
                  <CLargeCard data={v} />
                </Link>
              </SwiperSlide>
            );
          })
        ) : (
          <div className="w-full h-[540px] bg-[#F4F6F5] rounded-3xl flex justify-center flex-col">
            <div className="h-fit w-full flex flex-col gap-4">
              <div className="text-[#9b9b9b] text-lg text-center">{errMsg}</div>
              <div className="w-full h-fit flex justify-center">
                <button
                  className="w-[132px] h-12 px-4 py-2 border-[#d3d3d3] border rounded-full bg-white text-base mx-auto"
                  onClick={errFunc}
                >
                  {errBtn}
                </button>
              </div>
            </div>
          </div>
        )}
      </Swiper>
    </div>
  );
}
