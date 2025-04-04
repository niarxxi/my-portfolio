"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { ProjectsData, ProjectItem } from "@/constants";
import Image from "next/image";
import ProjectModal from "./ProjectModal";
import { ChevronRight } from "lucide-react";

const ProjectSlider = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [visibleSlides, setVisibleSlides] = useState<Set<number>>(
    new Set([0, 1])
  );

  const sliderRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const isMobileView = width < 768;
    setSlidesPerView(isMobileView ? 1 : 2);
    setIsMobile(isMobileView);
  }, []);

  useEffect(() => {
    handleResize();

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
  }, [handleResize]);

  const getCompleteProject = useCallback(
    (project: ProjectItem): ProjectItem => ({
      title: project.title,
      description: project.description,
      fullDescription: project.fullDescription || project.description,
      technologies: project.technologies,
      githubUrl: project.githubUrl || "#",
      src: project.src,
      liveUrl: project.liveUrl,
    }),
    []
  );

  const openModal = useCallback(
    (project: ProjectItem) => {
      setSelectedProject(getCompleteProject(project));
      setModalOpen(true);
      swiperInstance?.autoplay?.stop();
    },
    [swiperInstance, getCompleteProject]
  );

  const closeModal = useCallback(() => {
    setModalOpen(false);
    swiperInstance?.autoplay?.start();
  }, [swiperInstance]);

  const projectSlides = useMemo(() => {
    const slides: ProjectItem[][] = [];
    for (let i = 0; i < ProjectsData.length; i += slidesPerView) {
      slides.push(ProjectsData.slice(i, i + slidesPerView));
    }
    return slides;
  }, [slidesPerView]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const newVisible = new Set<number>();
    const index = swiper.activeIndex;
    newVisible.add(index);
    newVisible.add(Math.max(0, index - 1));
    newVisible.add(Math.min(swiper.slides.length - 1, index + 1));
    setVisibleSlides(newVisible);
  }, []);

  const shouldLoadImage = useCallback(
    (index: number) => visibleSlides.has(index),
    [visibleSlides]
  );

  const translations = useMemo(
    () => ({
      details: "Подробнее",
      projectShowcase: "Project showcase",
    }),
    []
  );

  return (
    <div
      ref={sliderRef}
      className="w-full max-w-6xl px-4 sm:px-6 md:px-8 mx-auto"
      role="region"
      aria-label={translations.projectShowcase}
    >
      <Swiper
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setVisibleSlides(new Set([0, 1]));
        }}
        slidesPerView={1}
        spaceBetween={16}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-bullet-active",
          renderBullet: (_, className) => `<span class="${className}"></span>`,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSlideChange={handleSlideChange}
        modules={[Pagination, Autoplay]}
        className="w-full project-slider"
      >
        {projectSlides.map((projects, slideIndex) => (
          <SwiperSlide key={`slide-${slideIndex}`} className="pb-14">
            <div
              className={`grid grid-cols-1 ${
                slidesPerView > 1 ? "sm:grid-cols-2" : ""
              } gap-6 max-w-6xl mx-auto`}
            >
              {projects.map((project, idx) => {
                const shouldLoad = shouldLoadImage(slideIndex);
                const isPriority = slideIndex === 0 && idx < 2;

                return (
                  <div
                    key={`${project.src}-${slideIndex}-${idx}`}
                    className="relative group aspect-[4/3] w-full cursor-pointer rounded-lg overflow-hidden"
                    onClick={() => openModal(project)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${project.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openModal(project);
                      }
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={project.src}
                        alt={`Screenshot of ${project.title}`}
                        fill
                        className={`object-cover rounded-lg transition-transform duration-500 group-hover:scale-105 group-focus:scale-105 ${
                          !shouldLoad ? "opacity-0" : "opacity-100"
                        }`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={isPriority}
                        loading={isPriority ? "eager" : "lazy"}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,..."
                        onLoad={() =>
                          setVisibleSlides((prev) =>
                            new Set(prev).add(slideIndex)
                          )
                        }
                      />
                      {!shouldLoad && (
                        <div className="absolute inset-0 bg-purple-900/20 rounded-lg animate-pulse" />
                      )}
                    </div>

                    <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-70 transition-opacity duration-300" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                      <h3 className="font-bold text-purple-300 text-lg md:text-xl mb-2 text-center">
                        {project.title}
                      </h3>
                      <p className="text-sm text-center text-gray-200 mb-3 line-clamp-2 md:line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 mb-3">
                        {project.technologies
                          .slice(0, isMobile ? 2 : 3)
                          .map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-purple-900/50 text-purple-200 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        {project.technologies.length > (isMobile ? 2 : 3) && (
                          <span className="px-2 py-1 text-xs bg-purple-900/30 text-purple-200 rounded-full">
                            +{project.technologies.length - (isMobile ? 2 : 3)}
                          </span>
                        )}
                      </div>
                      <span className="flex items-center text-sm text-purple-200">
                        {translations.details}
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

      <ProjectModal
        isOpen={modalOpen}
        onClose={closeModal}
        project={selectedProject}
      />
    </div>
  );
};

export default ProjectSlider;
