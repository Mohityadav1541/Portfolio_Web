/**
 * Local static data service — replaces the Wix CMS BaseCrudService.
 * All portfolio data sourced from real profiles.
 * Edit this file to update portfolio content.
 */

type CollectionItem = { _id: string; [key: string]: unknown };

const staticData: Record<string, CollectionItem[]> = {

  // ── Social / Profile Links ────────────────────────────────────────────────
  socialprofiles: [
    {
      _id: '1',
      platform: 'GitHub',
      profileUrl: 'https://github.com/Mohityadav1541',
      shortDescription: 'Open Source Projects',
      displayOrder: 1,
    },
    {
      _id: '2',
      platform: 'LinkedIn',
      profileUrl: 'https://www.linkedin.com/in/mohit-yadav-3a8957310/',
      shortDescription: 'Professional Network',
      displayOrder: 2,
    },
    {
      _id: '3',
      platform: 'Email',
      profileUrl: 'mailto:mr.mohit1540@gmail.com',
      shortDescription: 'mr.mohit1540@gmail.com',
      displayOrder: 3,
    },
  ],

  // ── Skills ────────────────────────────────────────────────────────────────
  skills: [
    { _id: 's1',  skillName: 'C++',          proficiencyLevel: 90, category: 'Languages' },
    { _id: 's2',  skillName: 'JavaScript',   proficiencyLevel: 88, category: 'Languages' },
    { _id: 's3',  skillName: 'TypeScript',   proficiencyLevel: 82, category: 'Languages' },
    { _id: 's4',  skillName: 'Python',       proficiencyLevel: 75, category: 'Languages' },
    { _id: 's5',  skillName: 'HTML5 / CSS3', proficiencyLevel: 92, category: 'Languages' },
    { _id: 's6',  skillName: 'React.js',     proficiencyLevel: 90, category: 'Frontend' },
    { _id: 's7',  skillName: 'Next.js',      proficiencyLevel: 82, category: 'Frontend' },
    { _id: 's8',  skillName: 'Tailwind CSS', proficiencyLevel: 88, category: 'Frontend' },
    { _id: 's9',  skillName: 'Three.js',     proficiencyLevel: 70, category: 'Frontend' },
    { _id: 's10', skillName: 'Node.js',      proficiencyLevel: 85, category: 'Backend' },
    { _id: 's11', skillName: 'Express.js',   proficiencyLevel: 83, category: 'Backend' },
    { _id: 's12', skillName: 'Spring Boot',  proficiencyLevel: 68, category: 'Backend' },
    { _id: 's13', skillName: 'REST APIs',    proficiencyLevel: 87, category: 'Backend' },
    { _id: 's14', skillName: 'MongoDB',      proficiencyLevel: 82, category: 'Databases' },
    { _id: 's15', skillName: 'PostgreSQL',   proficiencyLevel: 75, category: 'Databases' },
    { _id: 's16', skillName: 'MySQL',        proficiencyLevel: 72, category: 'Databases' },
    { _id: 's17', skillName: 'AWS (EC2/S3)', proficiencyLevel: 65, category: 'Cloud & DevOps' },
    { _id: 's18', skillName: 'Docker',       proficiencyLevel: 68, category: 'Cloud & DevOps' },
    { _id: 's19', skillName: 'Git & GitHub', proficiencyLevel: 90, category: 'Tools' },
    { _id: 's20', skillName: 'Postman',      proficiencyLevel: 85, category: 'Tools' },
    { _id: 's21', skillName: 'SEO',          proficiencyLevel: 80, category: 'Tools' },
    { _id: 's22', skillName: 'Vercel / Netlify', proficiencyLevel: 85, category: 'Cloud & DevOps' },
  ],

  // ── Work Experience ───────────────────────────────────────────────────────
  experience: [
    {
      _id: 'e1',
      jobTitle: 'Web Developer Intern',
      companyName: 'The Avasar Initiative',
      location: 'Remote',
      startDate: '2026-01-01',
      endDate: null,
      description:
        'Built and maintained the Avasar EdTech platform — a scalable LMS featuring video streaming, course management, and student dashboards. Developed backend APIs with Node.js and Express.js, integrated Cloudinary for media delivery, and deployed on Vercel.',
    },
    {
      _id: 'e2',
      jobTitle: 'Web Developer',
      companyName: 'Menuura',
      location: 'Remote',
      startDate: '2025-08-01',
      endDate: '2025-12-31',
      description:
        'Developed scalable REST APIs and responsive frontend interfaces for restaurant operations using Spring Boot. Collaborated with 100+ cafes and restaurants to streamline digital operations. Built a 3D AR-based POS system with interactive food visualization using React.js, Three.js, and Blender.',
    },
  ],

  // ── Education ─────────────────────────────────────────────────────────────
  education: [
    {
      _id: 'ed1',
      entryType: 'Degree',
      degreeName: 'B.Tech in Electronics and Communication Engineering',
      institution: 'Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat',
      startYear: 2024,
      endYear: 2028,
      description: 'Relevant Coursework: DSA, DBMS, Operating Systems, OOPs.',
      location: 'Surat, Gujarat',
    },
    {
      _id: 'ed2',
      entryType: 'Class XII',
      degreeName: 'Class XII — 85%',
      institution: 'Kiran Bal Vidya Mandir School',
      startYear: 2022,
      endYear: 2023,
      description: 'Science stream with 85%.',
      location: 'India',
    },
    {
      _id: 'ed3',
      entryType: 'Class X',
      degreeName: 'Class X — 88%',
      institution: 'Watika Vidyapeeth School',
      startYear: 2020,
      endYear: 2021,
      description: 'Scored 88% in board examinations.',
      location: 'India',
    },
  ],

  // ── Projects (best from GitHub) ───────────────────────────────────────────
  projects: [
    {
      _id: 'p6',
      projectName: 'Sanwaliya Photo Studio',
      tagline: 'Professional photography studio booking platform',
      description:
        'Full-featured photography studio website with online booking, portfolio gallery, and client management. SEO-optimised with structured data, meta tags, and Google-ready sitemap. Live on Vercel.',
      techStack: 'TypeScript, React.js, Tailwind CSS, Node.js, SEO',
      liveDemoUrl: 'https://sanwaliyaphotostudio.vercel.app',
      githubUrl: 'https://github.com/Mohityadav1541/sanwaliya-photo-studio',
      completionDate: '2026-01-27',
    },
    {
      _id: 'p3',
      projectName: 'Bloom Branding',
      tagline: 'Modern branding & marketing agency website',
      description:
        'A visually stunning branding agency website with smooth animations, responsive design, and interactive UI elements. SEO-optimised and deployed on Vercel.',
      techStack: 'TypeScript, React.js, Tailwind CSS, Framer Motion',
      liveDemoUrl: 'https://bloom-branding.vercel.app',
      githubUrl: 'https://github.com/Mohityadav1541/bloom-branding',
      completionDate: '2026-01-17',
    },
    {
      _id: 'p5',
      projectName: 'React Native Assessment App',
      tagline: 'Production-grade cross-platform mobile app',
      description:
        'A production-ready mobile application featuring REST API integration, Redux state management, search & pagination, and offline data persistence with AsyncStorage.',
      techStack: 'React Native, TypeScript, Redux, AsyncStorage',
      githubUrl: 'https://github.com/Mohityadav1541/task_of_reactNative',
      completionDate: '2026-05-09',
    },
    {
      _id: 'p2',
      projectName: 'AI Photo Scan',
      tagline: 'AI-powered photo scanning & intelligent image analysis tool',
      description:
        'An AI-driven photo scanning application that leverages machine learning to analyze, enhance, and extract insights from images. Features intelligent object detection, smart cropping, and automated metadata generation for a seamless photo management experience.',
      techStack: 'Python, React.js, TensorFlow / OpenCV, Node.js, REST APIs',
      githubUrl: 'https://github.com/Mohityadav1541',
      completionDate: '2026-03-01',
    },
    {
      _id: 'p4',
      projectName: 'Wellness Club SVNIT',
      tagline: 'Full-stack event management with AI certificate generation',
      description:
        'Production-ready event management platform for SVNIT\'s Wellness Club. Features automated email workflows, analytics dashboards, participant management, and automated certificate generation via Cloudinary + Node-Cron. Ranked on Google search for SVNIT events.',
      techStack: 'TypeScript, React.js, Node.js, Express.js, MongoDB, JWT, Cloudinary, Nodemailer',
      liveDemoUrl: 'https://wellness-club-svnit-phi.vercel.app',
      githubUrl: 'https://github.com/Mohityadav1541/WELLNESS_CLUB_SVNIT',
      completionDate: '2026-04-01',
    },
    {
      _id: 'p1',
      projectName: '3D AR-Based POS — Menuura',
      tagline: 'AR-enabled restaurant ordering with 3D food visualization',
      description:
        'AR-powered restaurant point-of-sale system built for Menuura. Customers visualize dishes as 3D models in augmented reality before ordering. Integrated digital billing, real-time menu management, and Spring Boot REST APIs serving 100+ cafes and restaurants.',
      techStack: 'React.js, Three.js, Blender, Spring Boot, Node.js, Express.js, MongoDB',
      githubUrl: 'https://github.com/GarvXlearner/Menuuara',
      completionDate: '2025-11-01',
    },
  ],

  // ── GitHub Repositories (live fetched via GitHubSection, this is fallback) ──
  githubrepositories: [
    {
      _id: 'gh1',
      repositoryName: 'WELLNESS_CLUB_SVNIT',
      description: 'Event management system with email automation and certificate generation',
      primaryLanguage: 'TypeScript',
      repositoryUrl: 'https://github.com/Mohityadav1541/WELLNESS_CLUB_SVNIT',
      starsCount: 0,
      lastUpdated: '2026-04-06T00:00:00Z',
      homepage: 'https://wellness-club-svnit-phi.vercel.app',
    },
    {
      _id: 'gh2',
      repositoryName: 'bloom-branding',
      description: 'Modern branding agency website with animations and responsive design',
      primaryLanguage: 'TypeScript',
      repositoryUrl: 'https://github.com/Mohityadav1541/bloom-branding',
      starsCount: 1,
      lastUpdated: '2026-01-17T00:00:00Z',
      homepage: 'https://bloom-branding.vercel.app',
    },
    {
      _id: 'gh3',
      repositoryName: 'sanwaliya-photo-studio',
      description: 'Professional photography studio booking and portfolio platform',
      primaryLanguage: 'TypeScript',
      repositoryUrl: 'https://github.com/Mohityadav1541/sanwaliya-photo-studio',
      starsCount: 0,
      lastUpdated: '2026-01-27T00:00:00Z',
      homepage: 'https://sanwaliya-photo-studio.vercel.app',
    },
    {
      _id: 'gh4',
      repositoryName: 'task_of_reactNative',
      description: 'React Native app with Redux, API integration, search & pagination',
      primaryLanguage: 'TypeScript',
      repositoryUrl: 'https://github.com/Mohityadav1541/task_of_reactNative',
      starsCount: 0,
      lastUpdated: '2026-05-09T00:00:00Z',
    },
    {
      _id: 'gh5',
      repositoryName: 'avasaar_raw',
      description: 'Avasar EdTech platform — scalable LMS with video streaming',
      primaryLanguage: 'Python',
      repositoryUrl: 'https://github.com/Mohityadav1541/avasaar_raw',
      starsCount: 0,
      lastUpdated: '2026-03-19T00:00:00Z',
    },
  ],

  // ── Coding Stats (DSA goal — aspirational & honest framing) ──────────────
  codingstats: [
    {
      _id: 'cs1',
      dashboardTitle: 'LeetCode — DSA Journey',
      // Goal: 100 problems — actively working toward it
      problemsSolvedCount: 100,   // target shown as goal
      dailyStreakCount: 7,
      globalRanking: 450000,
      lastUpdated: new Date().toISOString(),
      profileUrl: 'https://leetcode.com/u/mohityadav_0/',
      progressIndicatorValue: 35, // honest progress toward 100-problem goal
      // Custom fields for DSA goal display
      isGoal: true,
      goalLabel: 'TARGET: 100 Problems',
      currentSolved: 35,
    },
  ],
};

export const BaseCrudService = {
  async getAll<T>(collectionId: string): Promise<{ items: T[] }> {
    const items = (staticData[collectionId] ?? []) as unknown as T[];
    return { items };
  },

  async get<T>(collectionId: string, itemId: string): Promise<T | null> {
    const collection = staticData[collectionId] ?? [];
    const item = collection.find((i) => i._id === itemId) ?? null;
    return item as unknown as T | null;
  },
};
