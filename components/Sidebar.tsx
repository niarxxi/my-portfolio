"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/constants";
import Link from "next/link";
import Transition from "./Transition";

const Sidebar = () => {
  const path = usePathname();
  const prevPathRef = useRef<string>("");
  const isAnimatingRef = useRef<boolean>(false);

  const getActivePageFromPath = (currentPath: string): string => {
    // Находим соответствующую ссылку в NavLinks
    const activeLink = NavLinks.find(
      (link) =>
        (link.link === "/" && currentPath === "/") ||
        (link.link !== "/" && currentPath.startsWith(link.link))
    );

    return activeLink ? activeLink.name : "Home";
  };

  const [isRouting, setIsRouting] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<string>(() =>
    getActivePageFromPath(path)
  );

  // Обновляем активную страницу при изменении пути
  useEffect(() => {
    setIsActive(getActivePageFromPath(path));
  }, [path]);

  useEffect(() => {
    // Инициализация при первом рендере
    if (prevPathRef.current === "") {
      prevPathRef.current = path;
      return;
    }

    // Запускаем анимацию только если путь изменился и анимация не активна
    if (prevPathRef.current !== path && !isAnimatingRef.current) {
      isAnimatingRef.current = true;
      setIsRouting(true);

      const timeout = setTimeout(() => {
        setIsRouting(false);
        prevPathRef.current = path;

        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 100);
      }, 1100);

      return () => clearTimeout(timeout);
    }
  }, [path]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isRouting && <Transition key="page-transition" />}
      </AnimatePresence>

      {/* Боковая панель - скрыта на мобильных устройствах, отображается на больших экранах */}
      <div className="fixed right-8 top-[40%] z-[20] h-[200px] w-[48px] rounded-full bg-gray-500 bg-opacity-50 hidden md:block">
        <div className="flex flex-col gap-5 pb-3 justify-center items-center h-full">
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.link}
              onClick={() => setIsActive(link.name)}
              aria-label={link.name}
            >
              <div
                className={`w-[32px] h-[32px] ${
                  isActive === link.name ? "bg-purple-800" : "bg-white"
                }`}
                style={{
                  WebkitMaskImage: `url(${link.icon})`,
                  maskImage: `url(${link.icon})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
