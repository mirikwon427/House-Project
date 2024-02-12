import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MypageSwiper({ title, data }) {
  const [swiperSetting, setSwiperSetting] = useState(null);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  useEffect(() => {
    if (!swiperSetting) {
      const settings = {
        spaceBetween: 32,
        navigation: {
          prevEl: navigationPrevRef.current, // 이전 버튼
          nextEl: navigationNextRef.current, // 다음 버튼
        },
        slidesPerView: 7,
        onBeforeInit: (swiper) => {
          // 초기 설정
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
          swiper.navigation.update();
        },
      };
      setSwiperSetting(settings);
    }
  }, [swiperSetting]);

  return (
    <div className="w-full mt-16">
      <div className="relative">
        <div className="text-3xl font-bold mb-12">{title}</div>
        {swiperSetting && (
          <Swiper
            spaceBetween={32}
            slidesPerView={7}
            modules={[Navigation]}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
          >
            {data.map((v, idx) => (
              <SwiperSlide key={v.id} className="group cursor-pointer">
                <Link to={`/house/${v.id}`}>
                  <img
                    src={v.image}
                    alt="dummy"
                    className="w-[200px] h-[200px] bg-[#9C9C9C] rounded-sm"
                  />
                  <div className="flex-1 flex flex-col justify-between py-4 group-hover:underline">
                    <div>
                      <div className="text-base font-bold">{v.bldg_nm}</div>
                      <div className="text-sm text-gray-500">{v.sgg_nm}</div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <button
          ref={navigationPrevRef}
          className="absolute -left-5 bottom-[calc(50%-20px)] z-10 bg-white p-2 rounded-full shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          ref={navigationNextRef}
          className="absolute -right-5 bottom-[calc(50%-20px)] z-10 bg-white p-2 rounded-full shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
