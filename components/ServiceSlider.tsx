"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/free-mode"
import { FreeMode, Pagination } from "swiper/modules"
import { ServiceData } from "@/constants"

const ServiceSlider = () => {
  return (
    <div className="w-full md:w-[70%] lg:w-[50%] px-4 md:px-0">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
          bulletClass: 'swiper-pagination-bullet custom-bullet',
          renderBullet: function (index, className) {
            return `<span class="${className}"></span>`;
          },
        }}
        modules={[FreeMode, Pagination]}
        className="w-full service-slider"
      >
        {ServiceData.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="cursor-pointer flex flex-col gap-6 mb-10 group relative text-white shadow-lg rounded-xl px-6 py-8 h-[400px] mx-auto overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.backgroundImage})` }}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70" />
              <div className="relative flex flex-col gap-3">
                <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" />
                <h1 className="text-xl lg:text-2xl">{item.title}</h1>
                <ol className="list-decimal pl-5 text-base lg:text-[18px]">
                  {item.content.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ol>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Стили для пагинации */}
      <style jsx global>{`
        .service-slider .swiper-pagination {
          bottom: 0px !important;
          padding-bottom: 4px;
        }
        
        .service-slider .custom-bullet {
          width: 12px;
          height: 12px;
          background-color: rgba(139, 92, 246, 0.3); /* light purple */
          opacity: 1;
          margin: 0 6px !important;
          transition: all 0.3s ease;
        }
        
        .service-slider .custom-bullet-active {
          width: 16px;
          height: 16px;
          background-color: rgba(139, 92, 246, 1); /* purple-600 */
          transform: scale(1);
          position: relative;
        }
        
        .service-slider .custom-bullet:hover {
          background-color: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  )
}

export default ServiceSlider