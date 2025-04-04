import type React from "react"
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa"
import { TbBrandJavascript, TbBrandTypescript } from "react-icons/tb"


export interface ServiceItem {
  icon: React.ElementType
  title: string
  content: string[]
  backgroundImage: string
}

export interface ProjectItem {
  title: string
  description: string
  fullDescription: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  src: string
}

export const Socials = [
  {
    name: "Discord",
    src: "/assets/DiscordFill.svg",
    link: "https://discordapp.com/users/286444766730911755",
  },
  {
    name: "Telegram",
    src: "/assets/Telegram.svg",
    link: "https://t.me/niarland",
  },
  {
    name: "GitHub",
    src: "/assets/GithubOutlineFill.svg",
    link: "https://github.com/niarxxi",
  },
]

export const NavLinks = [
  {
    name: "Главная",
    icon: "/assets/icons/home.svg",
    link: "/",
  },
  {
    name: "Мои навыки",
    icon: "/assets/icons/skills.svg",
    link: "/my-skills",
  },
  {
    name: "Мои проекты",
    icon: "/assets/icons/projects.svg",
    link: "/my-projects",
  },
]

export const ProjectsData: ProjectItem[] = [
  {
    title: "Niar Music Player",
    description: "Музыкальный плеер с возможностью создания плейлистов",
    fullDescription:
      "Музыкальный плеер с современным интерфейсом, разработанный с использованием React и TypeScript. Приложение позволяет создавать плейлисты, искать треки, управлять воспроизведением и настраивать эквалайзер. Реализована адаптивная верстка для комфортного использования на различных устройствах.",
    technologies: ["React", "TypeScript", "Redux", "Styled Components"],
    githubUrl: "https://github.com/niarxxi/WebMusicPlayer",
    liveUrl: "https://niar-music-player.vercel.app",
    src: "/assets/projects/niar-music-player.png",
  },
  {
    title: "Web Ларёк",
    description: "Интернет-магазин с корзиной и оформлением заказа",
    fullDescription:
      "Полнофункциональный интернет-магазин с каталогом товаров, корзиной и оформлением заказа. Реализована фильтрация товаров по категориям, поиск, валидация форм. Проект разработан с использованием ООП и паттерна MVP для обеспечения чистой архитектуры и масштабируемости.",
    technologies: ["TypeScript", "HTML", "CSS", "ООП", "MVP"],
    githubUrl: "https://github.com/niarxxi/web-larek-frontend",
    src: "/assets/projects/web-larek.png",
  },
  {
    title: "Stellar Burgers",
    description: "Приложение для заказа космических бургеров",
    fullDescription:
      "Веб-приложение для заказа космических бургеров с возможностью конструирования собственного бургера путем перетаскивания ингредиентов. Реализована авторизация пользователей, история заказов, лента заказов в реальном времени с использованием WebSocket.",
    technologies: ["React", "Redux", "TypeScript", "WebSocket"],
    githubUrl: "https://github.com/niarxxi/stellar-burgers",
    liveUrl: "https://stellar-burgers.vercel.app",
    src: "/assets/projects/stellar-burgers.png",
  },
  {
    title: "Mesto",
    description: "Социальная сеть для обмена фотографиями",
    fullDescription:
      "Социальная сеть для обмена фотографиями с возможностью добавления, удаления и лайка фотографий. Реализована авторизация пользователей, редактирование профиля, валидация форм. Проект разработан с использованием ООП и модульной структуры.",
    technologies: ["JavaScript", "HTML", "CSS", "Webpack", "REST API"],
    githubUrl: "https://github.com/niarxxi/mesto-project-ff",
    src: "/assets/projects/mesto.png",
  },
  {
    title: "Оно тебе надо",
    description: "Лендинг для аукциона вещей",
    fullDescription:
      "Адаптивный лендинг для аукциона вещей с современным дизайном. Реализована семантическая верстка, адаптивность для различных устройств, анимации и интерактивные элементы. Проект разработан с использованием методологии БЭМ.",
    technologies: ["HTML", "CSS", "БЭМ", "Адаптивная верстка"],
    githubUrl: "https://github.com/niarxxi/ono-tebe-nado",
    src: "/assets/projects/ono-tebe-nado.png",
  },
  {
    title: "Посмотри в окно",
    description: "Сервис для просмотра видов из окна",
    fullDescription:
      "Интерактивный сервис, позволяющий просматривать различные виды из окон по всему миру. Реализована фильтрация по городам, типам видов, возможность добавления в избранное. Адаптивный дизайн обеспечивает комфортное использование на любых устройствах.",
    technologies: ["JavaScript", "HTML", "CSS", "API"],
    githubUrl: "https://github.com/niarxxi/posmotri_v_okno",
    src: "/assets/projects/posmotri-v-okno.png",
  },
  {
    title: "Сложно сосредоточиться",
    description: "Лендинг о концентрации внимания",
    fullDescription:
      "Лендинг, посвященный проблеме концентрации внимания в современном мире. Реализована темная и светлая темы, адаптивная верстка, плавные анимации при переключении тем. Проект разработан с использованием методологии БЭМ.",
    technologies: ["HTML", "CSS", "JavaScript", "БЭМ"],
    githubUrl: "https://github.com/niarxxi/slozhno-sosredotochitsya",
    src: "/assets/projects/slozhno-sosredotochitsya.png",
  },
  {
    title: "Blog Customizer",
    description: "Конструктор блога с настройкой стилей",
    fullDescription:
      "Интерактивный конструктор блога, позволяющий настраивать стили текста, цвета, отступы и другие параметры в реальном времени. Реализована возможность экспорта настроек в CSS. Проект разработан с использованием React и контекстного API для управления состоянием.",
    technologies: ["React", "Context API", "CSS-in-JS", "TypeScript"],
    githubUrl: "https://github.com/niarxxi/blog-customizer",
    src: "/assets/projects/blog-customizer.png",
  },
]

export const ServiceData: ServiceItem[] = [
  {
    icon: FaHtml5,
    title: "HTML",
    content: [
      "Семантическая разметка для улучшения SEO и доступности",
      "Использование тегов и атрибутов для структурирования контента",
      "Оптимизация кода для быстрой загрузки страниц",
    ],
    backgroundImage: "/assets/card-bg/1.jpg",
  },
  {
    icon: FaCss3Alt,
    title: "CSS",
    content: [
      "Современные методы компоновки: Flexbox, Grid",
      "Создание адаптивных интерфейсов под любые устройства",
      "Анимации и переходы с использованием CSS keyframes, transition",
    ],
    backgroundImage: "/assets/card-bg/2.jpg",
  },
  {
    icon: TbBrandJavascript,
    title: "JavaScript",
    content: [
      "Глубокое понимание базового JavaScript",
      "Продвинутые концепции JavaScript",
      "Асинхронное программирование (Promise, async/await)",
      "Работа с API",
      "Оптимизация производительности",
    ],
    backgroundImage: "/assets/card-bg/3.jpg",
  },
  {
    icon: TbBrandTypescript,
    title: "TypeScript ООП",
    content: [
      "Типизация данных",
      "Интерфейсы и типы",
      "Объектно-ориентированное программирование",
      "Паттерны проектирования",
    ],
    backgroundImage: "/assets/card-bg/4.jpg",
  },
  {
    icon: FaReact,
    title: "React",
    content: [
      "Компонентный подход",
      "Управление состоянием (State management)",
      "Хуки (Hooks)",
      "Роутинг и авторизация",
      "Тестирование React-приложений",
    ],
    backgroundImage: "/assets/card-bg/5.jpg",
  },
]

