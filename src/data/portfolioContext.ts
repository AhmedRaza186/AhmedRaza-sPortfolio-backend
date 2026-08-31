export const portfolioContext = {
  aiInstructions: [
    "Answer questions about Ahmed using only the provided portfolio context.",
    "Never fabricate information.",
    "If information is unavailable, say that it is not listed in Ahmed's portfolio.",
    "Be concise and professional.",
    "Do not claim Ahmed has experience that is not present in the context.",
    "Always refer to Ahmed strictly as a 'Full Stack Developer'. Do NOT call him a 'MERN Stack Developer'. You may mention his focus on MERN architecture, but his title is Full Stack Developer.",
    "Clearly distinguish between current and previous experience. Ahmed currently works at IDM Pakistan as a Full Stack Developer (2026-Present). His previous internship was at Saylani (May 11, 2026 – August 10, 2026). Do NOT use the word 'Trainee' anywhere."
  ],
  personal: {
    name: "Ahmed Raza",
    title: "Full Stack Developer",
    location: "Karachi, Pakistan",
    bio: "Product-focused Full Stack Developer building robust MERN architecture with Node.js, Express, and REST APIs, alongside seamless frontend experiences. Started in design and game experimentation before moving to full-stack systems and AI/Automation."
  },
  skills: {
    frontend: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS", "GSAP", "Three.js"],
    backend: ["Node.js", "Express.js", "REST APIs", "Authentication", "API Integration"],
    database: ["MongoDB", "PostgreSQL", "Prisma", "Drizzle ORM", "Mongoose", "Neon"],
    tools: ["Git", "GitHub", "Postman", "Vercel", "Railway", "VS Code"],
    other: ["Gemini", "AI Agents", "Playwright", "Test Automation", "Workflow Automation"]
  },
  experience: [
    {
      company: "IDM Pakistan",
      role: "Full Stack Developer",
      type: "Full-time",
      duration: "2026 – Present",
      location: "Karachi, Pakistan",
      description: "Working as a Full Stack Developer on real-world production software, contributing to frontend and backend development, APIs, databases, debugging, and business-focused features.",
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "APIs", "Git", "GitHub"]
    },
    {
      company: "Saylani",
      role: "Web & App Development Intern",
      type: "Internship",
      duration: "May 11, 2026 – August 10, 2026",
      description: "Completed a Web & App Development internship focused on building full-stack web applications and collaborating with development and design teams.",
      responsibilities: [],
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "TypeScript"]
    }
  ],
  education: [
    {
      institution: "Saylani",
      qualification: "Web & App Development Course",
      duration: "14 months (Completed 2026)",
      description: "Intensive program covering HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, APIs, databases, authentication, and full-stack development. (Note: This is a professional development course, not a university degree.)"
    }
  ],
  achievements: {
      hackathons: [
    "Saylani Coding Night — 12 Hours (2026)",
    "Saylani Coding Night — 6 Hours (2026)",
    "Saylani Coding Night — 12 Hours (2025)"
  ]
  },
  certifications: [
    "Cisco HTML Certificate (2025)",
    "Cisco CSS Certificate (2025)",
    "Cisco JavaScript Essentials 1 (2025)",
    "Saylani Web & App Development Course Completion (2026)"
  ],

  services: [],
  contact: {
    email: "ahmedrazamun@gmail.com",
    github: "https://github.com/AhmedRaza186",
    linkedin: "https://www.linkedin.com/in/ahmed-raza-14188b35b/",
    whatsapp: "923320397145"
  },
  links: {
    home: "/",
    work: "/work",
    projects: "/work",
    about: "/about",
    achievements: "/achievements",
    journey: "/journey",
    experience: "/experience",
    contact: "/contact",
    github: "https://github.com/AhmedRaza186",
    linkedin: "https://www.linkedin.com/in/ahmed-raza-14188b35b/",
    whatsapp: "https://wa.me/923320397145",
    cv: "/assets/personal/Ahmed_Raza_CV.pdf"
  },
  projects: [
    {
      title: "Auto-QA",
      year: 2026,
      description: "AI-powered testing platform that analyzes GitHub repositories, generates intelligent test cases, creates Playwright automation scripts, executes them, and turns execution logs into human-readable reports.",
      technologies: ["Next.js", "React", "TypeScript", "Drizzle", "PostgreSQL/Neon", "Gemini AI", "GitHub OAuth", "Stripe", "Clerk", "Playwright"],
      githubUrl: "https://github.com/AhmedRaza186/Auto-QA",
      liveUrl: "https://auto-qa-rouge.vercel.app/"
    },
    {
      title: "TradeSift",
      year: 2026,
      description: "AI-powered trade compliance platform focused on verifying and cross-checking information across trade documents before data entry.",
      technologies: [],
      githubUrl: null,
      liveUrl: null
    },
    {
      title: "GoldenKey Estates",
      year: 2026,
      description: "Full-stack real estate platform focused on property discovery, communication, and real-time interaction.",
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "Cloudinary"],
      githubUrl: "https://github.com/AhmedRaza186/GoldenKey-Estates",
      liveUrl: "https://golden-key-estates.vercel.app/"
    },
    {
      title: "User Management System",
      year: 2025,
      description: "Full-stack community management application with authentication, OTP verification, profile management, image uploads, search, filtering, and a dynamic member dashboard.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "Cloudinary"],
      githubUrl: "https://github.com/AhmedRaza186/UserManagementSystem",
      liveUrl: "https://usermanagementsystem26.netlify.app/"
    },
    {
      title: "VIP Setup",
      year: 2026,
      description: "A premium portfolio/demo project showcasing highly interactive frontend architecture and smooth animations.",
      technologies: ["React", "GSAP", "Tailwind CSS", "Vite"],
      githubUrl: null,
      liveUrl: "https://vip-setup-demo.vercel.app/"
    },
    {
      title: "Noir Cafe & Pizzeria",
      year: 2026,
      description: "An immersive, highly animated web experience designed for a premium cafe and pizzeria using 3D elements and advanced scrolling.",
      technologies: ["React", "Three.js", "GSAP", "Tailwind CSS", "Vite"],
      githubUrl: null,
      liveUrl: "https://noir-demo-self.vercel.app/"
    },
    {
      title: "Quizify",
      year: 2025,
      description: "Built a stateful quiz engine featuring robust Firebase authentication, secure real-time score synchronization, and a custom responsive UI architecture.",
      technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
      githubUrl: "https://github.com/AhmedRaza186/Quizify",
      liveUrl: "https://ahmedraza186.github.io/Quizify/"
    },
    {
      title: "HealthMate",
      year: 2025,
      description: "A health tracking web app to monitor daily habits, BMI, and wellness goals.",
      technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
      githubUrl: "https://github.com/AhmedRaza186/HealthMate",
      liveUrl: "https://health-mate12.netlify.app/"
    },
    {
      title: "Roll Clash",
      year: 2025,
      description: "A 2-player dice game with score tracking, animations, and a leaderboard using HTML, CSS & JS.",
      technologies: ["JavaScript", "CSS", "HTML"],
      githubUrl: "https://github.com/AhmedRaza186/Roll-Clash",
      liveUrl: "https://ahmedraza186.github.io/Roll-Clash/"
    },
    {
      title: "Guess My Number",
      year: 2025,
      description: "\"Guess My Number\" is a fun, interactive number guessing game where you try to guess a randomly generated number and earn points for each round.",
      technologies: ["JavaScript", "HTML", "CSS"],
      githubUrl: "https://github.com/AhmedRaza186/guessTheNumber",
      liveUrl: "https://ahmedraza186.github.io/guessTheNumber/"
    },
    {
      title: "Tic Tac Toe",
      year: 2025,
      description: "A lightweight Tic Tac Toe game made with HTML, CSS, and JS featuring player vs player, player vs computer, and popup-based results.",
      technologies: ["JavaScript", "HTML", "CSS"],
      githubUrl: "https://github.com/AhmedRaza186/My-Tic-Tac-Toe-game",
      liveUrl: "https://ahmedraza186.github.io/My-Tic-Tac-Toe-game/"
    },
    {
      title: "Eat U Crave",
      year: 2025,
      description: "A modern ecommerce storefront for food lovers - discover what you prefer and order with ease.",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/AhmedRaza186/Eat-You-Crave",
      liveUrl: "https://ahmedraza186.github.io/Eat-You-Crave/"
    },
    {
      title: "Buy You Want",
      year: 2025,
      description: "Buy You Want is a responsive e-commerce website built using HTML, CSS, and JavaScript. It features a dynamic add-to-cart system with real-time updates and automatic price calculations.",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/AhmedRaza186/Buy-You-Want",
      liveUrl: "https://ahmedraza186.github.io/Buy-You-Want/"
    },
    {
      title: "LinkUp",
      year: 2025,
      description: "Engineered a comprehensive local-storage state management system with full CRUD operations, mock authentication workflows, and dynamic theme switching.",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/AhmedRaza186/LinkUp",
      liveUrl: "https://ahmedraza186.github.io/LinkUp/"
    },
    {
      title: "Luxurs.",
      year: 2025,
      description: "Luxurs. represents luxury, power, and motion in one seamless experience. Built to showcase premium car brands with cinematic visuals and immersive effects.",
      technologies: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/AhmedRaza186/Luxurs.",
      liveUrl: "https://ahmedraza186.github.io/Luxurs./"
    },
    {
      title: "FakeStore",
      year: 2025,
      description: "A modern e-commerce web app built using Fake Store API, featuring dynamic product loading, a localStorage-based cart system, and quantity management.",
      technologies: ["JavaScript", "API", "HTML", "CSS"],
      githubUrl: "https://github.com/AhmedRaza186/FakeStore-API-project",
      liveUrl: "https://ahmedraza186.github.io/FakeStore-API-project/"
    },
    {
      title: "Forkify",
      year: 2025,
      description: "Forkify is a responsive recipe finder web app that allows users to search and explore over 1M recipes using an API with detailed recipe views and smooth navigation.",
      technologies: ["JavaScript", "API", "HTML", "CSS"],
      githubUrl: "https://github.com/AhmedRaza186/Forkify",
      liveUrl: "https://ahmedraza186.github.io/forkify/"
    },
    {
      title: "NewsWave",
      year: 2025,
      description: "A dynamic news web app built with JavaScript and APIs, featuring real-time news fetching, category-based filtering, search functionality, and a fully responsive UI.",
      technologies: ["JavaScript", "API", "HTML", "CSS"],
      githubUrl: "https://github.com/AhmedRaza186/NewsWave",
      liveUrl: "https://ahmedraza186.github.io/NewsWave/"
    },
    {
      title: "Atmos",
      year: 2025,
      description: "A mini weather app built using the OpenWeather API that fetches real-time data, handles API errors, and displays live weather updates.",
      technologies: ["JavaScript", "API", "HTML", "CSS"],
      githubUrl: "https://github.com/AhmedRaza186/Atmos---The-weather-App",
      liveUrl: "https://ahmedraza186.github.io/Atmos---The-weather-App/"
    }
  ]
};
