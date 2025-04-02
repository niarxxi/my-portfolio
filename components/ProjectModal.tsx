"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    fullDescription: string;
    technologies: string[];
    githubUrl: string;
    liveUrl?: string;
    src: string;
  } | null;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80"
            onClick={onClose}
          />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-auto bg-[#0f0f1a] rounded-lg shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-3 rounded-full bg-purple-800/50 text-white hover:bg-purple-800 transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-1 gap-6 pt-0">
              <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh]">
                <Image
                  src={project?.src || "/placeholder.svg"}
                  alt={project?.title || ""}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
                  className="object-cover"
                  priority
                  quality={90}
                />
              </div>

              <div className="flex flex-col p-6 pt-0">
                <h2 className="text-xl sm:text-2xl font-bold text-purple-300 mb-4">
                  {project?.title || ""}
                </h2>

                <div className="mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-purple-200 mb-2">
                    Технологии:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project?.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-xs sm:text-sm bg-purple-900/50 text-purple-200 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6 flex-grow">
                  <h3 className="text-base sm:text-lg font-semibold text-purple-200 mb-2">
                    Описание:
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {project?.fullDescription || ""}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  <a
                    href={project?.githubUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 bg-purple-800 hover:bg-purple-700 text-white rounded-md transition-colors text-sm sm:text-base"
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>

                  {project?.liveUrl && (
                    <a
                      href={project?.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors text-sm sm:text-base"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
