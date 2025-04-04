import type React from "react";
import Particle from "@/components/Particle";
import ParticleControls from "@/components/ParticleControls";
import Image from "next/image";

export default function Home() {
  const words = [
    { text: "Welcome to", delay: 4 },
    { text: "My", delay: 3 },
    { text: "Web", delay: 2 },
    { text: "Site", delay: 1 },
  ];

  return (
    <main className="flex items-center h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/bg-explosion.webp"
          alt="Background"
          fill
          className="object-cover object-left"
          quality={80}
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,..."
        />
      </div>

      <div className="absolute right-0 top-0 h-full w-full md:w-[100%] z-[2]">
        <Particle />
      </div>

      <div className="flex flex-col gap-5 z-[10] w-full md:w-[60%] lg:w-[50%] md:pl-10 lg:pl-40 pt-5 md:pt-20 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[70px] text-purple-300 max-w-full md:max-w-[700px]">
          Frontend{" "}
          <span className="text-purple-800 gradient-text">Developer</span>
        </h1>
        <p className="text-sm sm:text-base md:text-[18px] text-gray-400 mb-6 md:mb-10 md:pb-2 max-w-full md:max-w-[600px]">
          Я фронтенд-разработчик с профессиональной подготовкой в области
          веб-разработки. Имею{" "}
          <a
            href="https://drive.google.com/file/d/13eGJHcsxXRo6l295sVk1-NTUGRzXOSje/view?usp=sharing"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            сертификат
          </a>{" "}
          о прохождении комплексной программы профессиональной переподготовки
          «Фронтенд-разработчик» от Яндекс EdTech.
        </p>

        <div className="relative flex items-center justify-center md:justify-start gap-4 text-3xl sm:text-4xl md:text-6xl font-bold">
          <div className="word-container w-[220px] sm:w-[280px] md:w-[360px]">
            {words.map((word, index) => (
              <span
                key={index}
                style={
                  {
                    animationDelay: `${-4 * word.delay}s`,
                    "--i": word.delay,
                  } as React.CSSProperties
                }
                className="word text-3xl sm:text-4xl md:text-6xl"
                data-text={word.text}
              >
                {word.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 md:right-10 lg:right-40 z-[5] pointer-events-none">
        <div className="relative w-[330px] h-[330px] sm:w-[360px] sm:h-[360px] md:w-[500px] md:h-[500px] lg:w-[660px] lg:h-[660px]">
          <Image
            src="/assets/profile.png"
            alt="ProfilePic"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 180px, (max-width: 768px) 250px, (max-width: 1024px) 1024px"
            priority
          />
        </div>
      </div>

      <ParticleControls />
    </main>
  );
}
