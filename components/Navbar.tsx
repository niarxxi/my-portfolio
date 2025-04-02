import { Socials } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed top-0 bg-transparent z-[20] w-full flex justify-between items-center px-4 md:px-40 lg:px-60 py-4">
      <Link href="/" className="flex items-center">
        <h1 className="text-3xl md:text-5xl lg:text-[65px] text-purple-300">
          Niar <span className="text-purple-800">xxi</span>
        </h1>
      </Link>

      <div className="hidden md:flex flex-row gap-5 items-center">
        {Socials.map((social) => (
          <a
            key={social.name}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-50 transition-opacity duration-200"
          >
            <Image
              src={social.src || "/placeholder.svg"}
              alt={social.name}
              width={42}
              height={42}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
