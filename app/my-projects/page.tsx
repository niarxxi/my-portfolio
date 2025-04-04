import ProjectSlider from "@/components/ProjectSlider";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center flex-col px-4 sm:px-6 md:px-8 py-8 md:py-12 relative">
      <div className="absolute inset-0">
        <Image
          src="/assets/bg-explosion.webp"
          alt="Background"
          fill
          className="object-cover"
          quality={80}
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,..."
          style={{ filter: "blur(2px) brightness(0.7)" }}
        />
      </div>

      {/* Дополнительное затемнение */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 w-full max-w-xl mb-8 relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] text-purple-200 font-semibold text-center">
          Мои <span className="text-purple-800">проекты</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-200 md:text-gray-300 text-center">
          Здесь несколько проектов, которые я разработал в ходе обучения, от
          простых лендингов до сложных веб-приложений с использованием React и
          TypeScript. А также собственные пет-проекты, которые я разрабатываю,
          чтобы прокачивать навыки и пробовать новые технологии.
        </p>
      </div>
      <div className="w-full lg:w-[60%] xl:w-[50%] relative z-10">
        <ProjectSlider />
      </div>
    </div>
  );
};

export default Page;
