"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { ProjectsData } from "@/constants";
import Image from "next/image";
import ProjectModal from "./ProjectModal";
import { ChevronRight } from "lucide-react";

const ProjectSlider = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Функция для обработки изменения размера окна и установки правильного количества слайдов для отображения
  const handleResize = useCallback(() => {
    const width = window.innerWidth;

    if (width < 768) {
      // Мобильные экраны
      setSlidesPerView(1);
      setIsMobile(true);
    } else {
      // Планшеты и настольные экраны
      setSlidesPerView(2);
      setIsMobile(false);
    }
  }, []);

  // Настройка слушателя изменения размера
  useEffect(() => {
    // Начальный вызов
    handleResize();

    // Обработчик изменения размера с задержкой для лучшей производительности
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 200);
    };

    // Добавить слушатель событий
    window.addEventListener("resize", debouncedResize);

    // Очистка
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

  const openModal = useCallback(
    (project: any) => {
      // Убедиться, что проект имеет все необходимые свойства перед открытием модального окна
      const completeProject = {
        title: project.title || "Untitled Project",
        description: project.description || "No description available",
        fullDescription:
          project.fullDescription ||
          project.description ||
          "No description available",
        technologies: project.technologies || [],
        githubUrl: project.githubUrl || "#",
        src: project.src || "/placeholder.svg",
        liveUrl: project.liveUrl,
      };

      setSelectedProject(completeProject);
      setModalOpen(true);

      // Приостановить автовоспроизведение при открытом модальном окне
      if (swiperInstance?.autoplay) {
        swiperInstance.autoplay.stop();
      }
    },
    [swiperInstance]
  );

  const closeModal = useCallback(() => {
    setModalOpen(false);

    // Возобновить автовоспроизведение при закрытии модального окна
    if (swiperInstance?.autoplay) {
      swiperInstance.autoplay.start();
    }
  }, [swiperInstance]);

  // Группировка проектов в слайды в зависимости от количества слайдов для просмотра
  const projectSlides = [];
  for (let i = 0; i < ProjectsData.length; i += slidesPerView) {
    projectSlides.push(ProjectsData.slice(i, i + slidesPerView));
  }

  return (
    <div
      className="w-full max-w-full px-4 sm:px-6 md:px-8 mx-auto"
      ref={sliderRef}
      role="region"
      aria-label="Project showcase"
    >
      {/* Основной контейнер слайдера */}
      <div className="relative">
        <Swiper
          onSwiper={setSwiperInstance}
          slidesPerView={1} // Всегда показывать 1 слайд (который содержит несколько проектов)
          spaceBetween={16}
          pagination={{
            clickable: true,
            bulletActiveClass:
              "swiper-pagination-bullet-active custom-bullet-active",
            bulletClass: "swiper-pagination-bullet custom-bullet",
            renderBullet: function (index, className) {
              return `<span class="${className}"></span>`;
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Pagination, Autoplay]}
          className="w-full project-slider"
        >
          {projectSlides.map((slideProjects, slideIndex) => (
            <SwiperSlide key={`slide-${slideIndex}`} className="pb-14">
              <div
                className={`grid grid-cols-1 ${
                  slidesPerView > 1 ? "sm:grid-cols-2" : ""
                } gap-4 sm:gap-6 md:gap-8`}
              >
                {slideProjects.map((project, projectIndex) => {
                  // Убедиться, что проект имеет массив технологий
                  const projectWithDefaults = {
                    ...project,
                    technologies: project.technologies || [],
                  };

                  return (
                    <div
                      className="relative group aspect-video w-full cursor-pointer rounded-lg overflow-hidden"
                      key={`${project.src}-${slideIndex}-${projectIndex}`}
                      onClick={() => openModal(projectWithDefaults)}
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${project.title}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openModal(projectWithDefaults);
                        }
                      }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={project.src || "/placeholder.svg"}
                          alt={
                            `Screenshot of ${project.title}` ||
                            "Project screenshot"
                          }
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="rounded-lg object-cover transition-transform duration-500 group-hover:scale-105 group-focus:scale-105"
                          priority={slideIndex === 0 && projectIndex < 2}
                        />
                      </div>

                      {/* Градиентный оверлей - виден только при наведении/фокусировке */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 rounded-lg" />

                      {/* Информация о проекте - видна только при наведении/фокусировке */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                        <h3 className="font-bold text-purple-300 text-lg md:text-xl mb-2 text-center">
                          {project.title}
                        </h3>
                        <p className="text-sm text-center text-gray-200 mb-3 line-clamp-2 md:line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 mb-3">
                          {projectWithDefaults.technologies
                            .slice(0, isMobile ? 2 : 3)
                            .map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-purple-900/50 text-purple-200 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          {projectWithDefaults.technologies.length >
                            (isMobile ? 2 : 3) && (
                            <span className="px-2 py-1 text-xs bg-purple-900/30 text-purple-200 rounded-full">
                              +
                              {projectWithDefaults.technologies.length -
                                (isMobile ? 2 : 3)}
                            </span>
                          )}
                        </div>
                        <span className="flex items-center text-sm text-purple-200">
                          Подробнее
                          <ChevronRight className="ml-1 w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ProjectModal
        isOpen={modalOpen}
        onClose={closeModal}
        project={selectedProject}
      />

      {/* Стили для пагинации */}
      <style jsx global>{`
        .project-slider .swiper-pagination {
          bottom: 0px !important;
        }

        .project-slider .custom-bullet {
          width: 12px;
          height: 12px;
          background-color: rgba(139, 92, 246, 0.3); /* light purple */
          opacity: 1;
          margin: 0 6px !important;
          transition: all 0.3s ease;
        }

        .project-slider .custom-bullet-active {
          width: 16px;
          height: 16px;
          background-color: rgba(139, 92, 246, 1); /* purple-600 */
          transform: scale(1);
          position: relative;
        }

        .project-slider .custom-bullet:hover {
          background-color: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default ProjectSlider;
