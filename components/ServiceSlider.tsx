"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { ServiceData, ServiceItem } from "@/constants";
import Image from "next/image";

// Удаление дубликатов через Set
const removeDuplicates = (array: number[]): number[] => Array.from(new Set(array));

// Количество слайдов в зависимости от ширины экрана
const getSlidesPerView = (width: number): number => {
  if (width < 1125) return 1;
  if (width < 1671) return 2;
  return 3;
};

const ServiceSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [visibleSlides, setVisibleSlides] = useState<number[]>([0, 1, 2]);
  const [isClient, setIsClient] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalSlides = ServiceData.length;

  // Инициализация клиента
  useEffect(() => {
    setIsClient(true);

    const width = window.innerWidth;
    const view = getSlidesPerView(width);
    setSlidesPerView(view);

    const initial = Array.from({ length: Math.min(Math.max(3, view + 1), totalSlides) }, (_, i) => i);
    setVisibleSlides(initial);
  }, [totalSlides]);

  // Обработка ресайза окна
  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const newView = getSlidesPerView(width);
    setSlidesPerView(newView);

    const additional = Array.from({ length: Math.min(newView + 1, totalSlides) }, (_, i) => i);
    setVisibleSlides(prev => removeDuplicates([...prev, ...additional]));
  }, [totalSlides]);

  // Подписка на resize
  useEffect(() => {
    if (!isClient) return;

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 200);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [isClient, handleResize]);

  const breakpoints = useMemo(() => ({
    0: { slidesPerView: 1, spaceBetween: 10 },
    1125: { slidesPerView: 2, spaceBetween: 15 },
    1671: { slidesPerView: 3, spaceBetween: 15 },
  }), []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const index = swiper.activeIndex;
    const newVisible = [index];

    if (index > 0) newVisible.push(index - 1);
    for (let i = 1; i <= slidesPerView; i++) {
      if (index + i < totalSlides) newVisible.push(index + i);
    }

    setVisibleSlides(prev => removeDuplicates([...prev, ...newVisible]));
  }, [slidesPerView, totalSlides]);

  const shouldLoadSlide = useCallback((index: number) => {
    return visibleSlides.includes(index) || index < 3;
  }, [visibleSlides]);

  const handleImageError = useCallback((index: number) => {
    console.error(`Image failed to load for slide ${index}`);
  }, []);

  return (
    <div
      className="w-full md:w-[50%] lg:w-[50%] px-4 md:px-0"
      ref={sliderRef}
      role="region"
      aria-label="Технические навыки"
    >
      <Swiper
        onSwiper={setSwiperInstance}
        breakpoints={breakpoints}
        freeMode
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active",
          bulletClass: "swiper-pagination-bullet custom-bullet",
          renderBullet: (index, className) => `<span class="${className}"></span>`,
        }}
        modules={[FreeMode, Pagination]}
        className="w-full service-slider"
        onSlideChange={handleSlideChange}
      >
        {ServiceData.map((item: ServiceItem, index: number) => {
          const isVisible = shouldLoadSlide(index);

          return (
            <SwiperSlide key={item.title}>
              <div
                className="cursor-pointer flex flex-col gap-6 mb-10 group relative text-white shadow-lg rounded-xl px-6 py-8 h-[400px] mx-auto overflow-hidden"
                tabIndex={0}
                role="button"
                aria-label={`Навыки в ${item.title}`}
                onKeyDown={(e) => {
                  if (["Enter", " "].includes(e.key)) e.preventDefault();
                }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0">
                    {isClient && isVisible ? (
                      <Image
                        src={item.backgroundImage}
                        alt={`Фон навыков ${item.title}`}
                        fill
                        sizes="(max-width: 1124px) 100vw, (max-width: 1670px) 50vw, 33vw"
                        className="object-cover"
                        loading={index < 3 ? "eager" : "lazy"}
                        priority={index < 3}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        onError={() => handleImageError(index)}
                        onLoad={() => {
                          setVisibleSlides(prev => removeDuplicates([...prev, index]));
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800" />
                    )}
                  </div>
                  {!isVisible && isClient && (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                  )}
                </div>

                <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-70 transition-opacity duration-300" />

                <div className="relative flex flex-col gap-3 z-10">
                  <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px] transition-colors duration-300" />
                  <h2 className="text-xl lg:text-2xl font-bold">{item.title}</h2>
                  <ol className="list-decimal pl-5 text-base lg:text-[18px]">
                    {item.content.map((point, i) => (
                      <li key={i} className="mb-1">{point}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ServiceSlider;
