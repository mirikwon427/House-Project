import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function MainSwiper({ data }) {
  const { title, items, errMsg, errBtn } = data;

  return (
    <div>
      <div className="w-full text-3xl font-extrabold pt-32 pb-12">{title}</div>

      <Swiper spaceBetween={48} slidesPerView={3}>
        {items.length > 0 ? (
          items.map((v) => {
            return (
              <SwiperSlide key={v.id} className="w-1/3 cursor-pointer">
                <img
                  src={v.image}
                  alt="dummy"
                  className="w-full h-[540px] bg-[#9C9C9C] rounded-xl"
                />
                <div className="w-full flex justify-between mt-4">
                  <div>
                    <div className="text-lg font-bold">{v.bldg_nm}</div>
                    <div className="text-[#7F7F7F] text-sm">{v.sgg_nm}</div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <div className="w-full h-[540px] bg-[#F4F6F5] rounded-3xl flex justify-center flex-col">
            <div className="h-fit w-full flex flex-col gap-4">
              <div className="text-[#9b9b9b] text-lg text-center">{errMsg}</div>
              <div className="w-full h-fit flex justify-center">
                <button className="w-[132px] h-12 px-4 py-2 border-[#d3d3d3] border rounded-full bg-white text-base mx-auto">
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
