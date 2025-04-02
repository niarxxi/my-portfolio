"use client";

import { useCallback, useMemo } from "react";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { useParticle } from "@/contexts/ParticleContext";

const Particle = () => {
  // Получить настройки частиц из контекста
  const { settings } = useParticle();

  // Инициализировать движок частиц
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  // Рассчитать фактические значения из нормализованных настроек
  const particleCount = useMemo(() => {
    // Базовое количество зависит от размера экрана
    const baseCount =
      typeof window !== "undefined" && window.innerWidth < 768 ? 50 : 100;
    // Применить коэффициент плотности (шкала 0-100)
    return Math.round(baseCount * (settings.density / 70));
  }, [settings.density]);

  const particleSpeed = useMemo(() => {
    // Преобразовать шкалу 0-100 в диапазон 0.5-5
    return 0.5 + (settings.speed / 100) * 4.5;
  }, [settings.speed]);

  const particleSize = useMemo(() => {
    // Преобразовать шкалу 0-100 в диапазоны размеров
    const minSize = 0.5 + (settings.size / 100) * 2.5;
    const maxSize = minSize + 2 + (settings.size / 100) * 3;
    return { min: minSize, max: maxSize };
  }, [settings.size]);

  // Определить режим взаимодействия на основе настроек
  const interactionMode = useMemo(() => {
    return settings.interactivity === "none"
      ? undefined
      : settings.interactivity;
  }, [settings.interactivity]);

  // Конфигурации тем
  const themeConfigs = useMemo<Record<string, ISourceOptions>>(
    () => ({
      // Фиолетовая тема
      purple: {
        fullScreen: { enable: false },
        fpsLimit: 120,
        particles: {
          number: {
            value: particleCount * 1.5,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: ["#F0F8FF", "#9370DB", "#D8BFD8", "#DDA0DD"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: { min: 0.1, max: 1 },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1,
              sync: false,
            },
          },
          size: {
            value: particleSize,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: false,
            },
          },
          links: {
            enable: settings.links,
            distance: 150,
            color: "#9370DB",
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: particleSpeed * 0.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 1,
            },
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: !!interactionMode,
              mode: interactionMode,
            },
            onClick: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 180,
              links: {
                opacity: 0.8,
                color: "#F0F8FF",
              },
            },
            bubble: {
              distance: 200,
              size: 6,
              duration: 0.4,
            },
            repulse: {
              distance: 200,
              duration: 0.8,
            },
            attract: {
              distance: 200,
              duration: 0.4,
              factor: 5,
            },
          },
        },
        background: {
          color: "transparent",
        },
        detectRetina: true,
      },

      // Космическая тема
      cosmic: {
        fullScreen: { enable: false },
        fpsLimit: 120,
        particles: {
          number: {
            value: particleCount * 1.5,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: ["#ffffff", "#87CEFA", "#ADD8E6", "#E6E6FA"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: { min: 0.1, max: 1 },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1,
              sync: false,
            },
          },
          size: {
            value: particleSize,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: false,
            },
          },
          links: {
            enable: settings.links,
            distance: 150,
            color: "#87CEFA",
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: particleSpeed * 0.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 1,
            },
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: !!interactionMode,
              mode: interactionMode,
            },
            onClick: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 180,
              links: {
                opacity: 0.8,
                color: "#ffffff",
              },
            },
            bubble: {
              distance: 200,
              size: 6,
              duration: 0.4,
            },
            repulse: {
              distance: 200,
              duration: 0.8,
            },
            attract: {
              distance: 200,
              duration: 0.4,
              factor: 5,
            },
          },
        },
        background: {
          color: "transparent",
        },
        detectRetina: true,
      },

      // Неоновая тема
      neon: {
        fullScreen: { enable: false },
        fpsLimit: 120,
        particles: {
          number: {
            value: particleCount * 0.8,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: ["#ff00ff", "#00ffff", "#ffff00", "#00ff00"],
          },
          shape: {
            type: ["circle", "square"],
          },
          opacity: {
            value: 0.7,
          },
          size: {
            value: particleSize,
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
              sync: false,
            },
          },
          links: {
            enable: settings.links,
            distance: 150,
            color: "random",
            opacity: 0.5,
            width: 1.5,
            consent: false,
            blink: true,
          },
          move: {
            enable: true,
            speed: particleSpeed * 1.2,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "out",
            },
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: !!interactionMode,
              mode: interactionMode,
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 180,
              links: {
                opacity: 0.8,
                color: "#ffffff",
              },
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
            attract: {
              distance: 200,
              duration: 0.4,
              factor: 5,
            },
            bubble: {
              distance: 200,
              size: 6,
              duration: 0.4,
            },
          },
        },
        background: {
          color: "transparent",
        },
        detectRetina: true,
      },

      // Минималистичная тема
      minimal: {
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: {
            value: particleCount * 0.5,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: { min: 0.1, max: 0.3 },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1,
              sync: false,
            },
          },
          size: {
            value: { min: particleSize.min * 0.5, max: particleSize.max * 0.5 },
          },
          links: {
            enable: settings.links,
            distance: 150,
            color: "#ffffff",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: particleSpeed * 0.6,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: !!interactionMode,
              mode: interactionMode,
            },
            onClick: {
              enable: false,
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 180,
              links: {
                opacity: 0.5,
              },
            },
            connect: {
              distance: 150,
              links: {
                opacity: 0.3,
              },
              radius: 120,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            attract: {
              distance: 200,
              duration: 0.4,
              factor: 3,
            },
            bubble: {
              distance: 200,
              size: 6,
              duration: 0.4,
            },
          },
        },
        background: {
          color: "transparent",
        },
        detectRetina: true,
      },
    }),
    [
      particleCount,
      particleSize,
      particleSpeed,
      settings.links,
      interactionMode,
    ]
  );

  // Получить текущую конфигурацию темы
  const currentConfig = themeConfigs[settings.theme];

  return (
    <Particles
      id="tsparticles"
      className="h-screen"
      init={particlesInit}
      options={currentConfig}
    />
  );
};

export default Particle;
