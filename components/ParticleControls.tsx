"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParticle, type ParticleTheme } from "@/contexts/ParticleContext";
import { Settings, X, Sliders, RotateCcw } from "lucide-react";

const ParticleControls = () => {
  const {
    settings,
    updateSettings,
    resetSettings,
    isControlsOpen,
    toggleControls,
  } = useParticle();
  const [isMounted, setIsMounted] = useState(false);

  // Убедиться, что компонент смонтирован перед рендерингом, чтобы избежать проблем с гидратацией
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Варианты тем с названиями
  const themeOptions: { value: ParticleTheme; label: string }[] = [
    { value: "purple", label: "Purple" },
    { value: "cosmic", label: "Cosmic" },
    { value: "neon", label: "Neon" },
    { value: "minimal", label: "Minimal" },
  ];

  // Варианты взаимодействия с названиями
  const interactionOptions: {
    value: typeof settings.interactivity;
    label: string;
  }[] = [
    { value: "none", label: "None" },
    { value: "grab", label: "Connect" },
    { value: "repulse", label: "Repel" },
    { value: "attract", label: "Attract" },
    { value: "bubble", label: "Bubble" },
  ];

  return (
    <>
      {/* Кнопка переключения */}
      <button
        onClick={toggleControls}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-purple-800 text-white shadow-lg hover:bg-purple-700 transition-colors"
        aria-label="Toggle particle settings"
      >
        {isControlsOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Sliders className="w-5 h-5" />
        )}
      </button>

      {/* Панель управления */}
      <AnimatePresence>
        {isControlsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-16 right-4 z-50 w-[300px] bg-gray-900/90 backdrop-blur-md rounded-lg shadow-xl p-4 border border-purple-800/30"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-purple-300 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Particle Settings
              </h3>
              <button
                onClick={resetSettings}
                className="text-gray-400 hover:text-purple-300 transition-colors"
                aria-label="Reset settings"
                title="Reset to defaults"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Выбор темы */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Theme
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {themeOptions.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => updateSettings({ theme: theme.value })}
                      className={`px-3 py-2 text-sm rounded-md transition-colors ${
                        settings.theme === theme.value
                          ? "bg-purple-800 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ползунок плотности */}
              <div>
                <label
                  htmlFor="density"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Particle Density: {settings.density}%
                </label>
                <input
                  id="density"
                  type="range"
                  min="10"
                  max="100"
                  value={settings.density}
                  onChange={(e) =>
                    updateSettings({ density: Number.parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Ползунок скорости */}
              <div>
                <label
                  htmlFor="speed"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Movement Speed: {settings.speed}%
                </label>
                <input
                  id="speed"
                  type="range"
                  min="10"
                  max="100"
                  value={settings.speed}
                  onChange={(e) =>
                    updateSettings({ speed: Number.parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Ползунок размера */}
              <div>
                <label
                  htmlFor="size"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Particle Size: {settings.size}%
                </label>
                <input
                  id="size"
                  type="range"
                  min="10"
                  max="100"
                  value={settings.size}
                  onChange={(e) =>
                    updateSettings({ size: Number.parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Переключатель ссылок */}
              <div>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={settings.links}
                      onChange={(e) =>
                        updateSettings({ links: e.target.checked })
                      }
                    />
                    <div className="block bg-gray-700 w-10 h-6 rounded-full"></div>
                    <div
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        settings.links ? "transform translate-x-4" : ""
                      }`}
                    ></div>
                  </div>
                  <div className="ml-3 text-sm font-medium text-gray-300">
                    Show Connections
                  </div>
                </label>
              </div>

              {/* Режим взаимодействия */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Interaction Mode
                </label>
                <select
                  value={settings.interactivity}
                  onChange={(e) =>
                    updateSettings({ interactivity: e.target.value as any })
                  }
                  className="w-full px-3 py-2 bg-gray-800 text-gray-300 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-600"
                >
                  {interactionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ParticleControls;
