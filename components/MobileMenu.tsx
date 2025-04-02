"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLinks, Socials } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-4 z-50 p-2 rounded-full bg-purple-800 text-white md:hidden"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-[#0f0f1a] z-50 flex flex-col p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-purple-300">Меню</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-purple-800/20 text-white hover:bg-purple-800/40 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="mb-8">
              <ul className="space-y-4">
                {NavLinks.map((link) => {
                  const isActive =
                    pathname === link.link ||
                    (link.link !== "/" && pathname.startsWith(link.link));

                  return (
                    <li key={link.name}>
                      <Link
                        href={link.link}
                        className={`flex items-center gap-3 text-lg py-2 px-3 rounded-md transition-colors ${
                          isActive
                            ? "bg-purple-800/20 text-purple-300"
                            : "text-gray-300 hover:bg-purple-800/10"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 ${
                            isActive ? "bg-purple-300" : "bg-gray-300"
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
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto">
              <h3 className="text-lg font-medium text-purple-300 mb-4">
                Социальные сети
              </h3>
              <div className="flex gap-4">
                {Socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-purple-800/20 hover:bg-purple-800/40 transition-colors"
                    aria-label={social.name}
                  >
                    <Image
                      src={social.src || "/placeholder.svg"}
                      alt={social.name}
                      width={24}
                      height={24}
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
