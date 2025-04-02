"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Определение всех типов тем для частиц
export type ParticleTheme = "purple" | "cosmic" | "neon" | "minimal";

// Определение интерфейса настроек частиц
export interface ParticleSettings {
  theme: ParticleTheme;
  density: number; // шкала 0-100 для количества частиц
  speed: number; // шкала 0-100 для скорости частиц
  size: number; // шкала 0-100 для размера частиц
  links: boolean; // Показывать ли связи между частицами
  interactivity: "none" | "repulse" | "attract" | "grab" | "bubble";
}

// Определение интерфейса контекста
interface ParticleContextType {
  settings: ParticleSettings;
  updateSettings: (newSettings: Partial<ParticleSettings>) => void;
  resetSettings: () => void;
  isControlsOpen: boolean;
  toggleControls: () => void;
}

// Настройки по умолчанию
const defaultSettings: ParticleSettings = {
  theme: "purple",
  density: 70,
  speed: 50,
  size: 50,
  links: true,
  interactivity: "grab",
};

// Создание контекста
const ParticleContext = createContext<ParticleContextType | undefined>(
  undefined
);

// Компонент-провайдер
export const ParticleProvider = ({ children }: { children: ReactNode }) => {
  // Инициализация настроек из localStorage, если доступно
  const [settings, setSettings] = useState<ParticleSettings>(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("particleSettings");
      return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    }
    return defaultSettings;
  });

  const [isControlsOpen, setIsControlsOpen] = useState(false);

  // Сохранение настроек в localStorage при их изменении
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("particleSettings", JSON.stringify(settings));
    }
  }, [settings]);

  // Функция обновления настроек
  const updateSettings = (newSettings: Partial<ParticleSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Функция сброса настроек
  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  // Переключение видимости элементов управления
  const toggleControls = () => {
    setIsControlsOpen((prev) => !prev);
  };

  return (
    <ParticleContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        isControlsOpen,
        toggleControls,
      }}
    >
      {children}
    </ParticleContext.Provider>
  );
};

// Пользовательский хук для использования контекста частиц
export const useParticle = () => {
  const context = useContext(ParticleContext);
  if (context === undefined) {
    throw new Error("useParticle must be used within a ParticleProvider");
  }
  return context;
};
