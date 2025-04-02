import ServiceSlider from "@/components/ServiceSlider";
import React from "react";

const Page = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center flex-col lg:flex-row px-4 sm:px-6 md:px-8 py-8 md:py-12 bg-cover bg-center bg-[url('/assets/bg-explosion.png')]">
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-full max-w-xl mb-8 lg:mb-0 lg:mr-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] text-purple-200 font-semibold text-center lg:text-left">
          Мои <span className="text-purple-800">навыки</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-200 md:text-gray-300 text-center lg:text-left">
          Мои ключевые компетенции охватывают весь стек современной
          фронтенд-разработки:
        </p>
      </div>

      <ServiceSlider />
    </div>
  );
};

export default Page;
