export interface Bootcamp {
  slug: string
  title: string
  tagline: string
  description: string
  duration: string
  hours: number
  level: "Débutant" | "Intermédiaire" | "Avancé"
  format: "Présentiel" | "Hybride" | "En ligne"
  price: number
  targets: string[]
  prerequisites: string[]
  outcomes: string[]
  program: {
    day: number
    title: string
    modules: {
      title: string
      duration: string
      topics: string[]
    }[]
  }[]
  methodology: string[]
  trainer: {
    name: string
    title: string
    bio: string
    expertise: string[]
  }
  includes: string[]
  faq: {
    question: string
    answer: string
  }[]
}

export interface Session {
  id: string
  bootcampSlug: string
  dateStart: string
  dateEnd: string
  city: string
  format: "Présentiel" | "Hybride" | "En ligne"
  trainer: string
  spotsTotal: number
  spotsRemaining: number
  status: "open" | "almost_full" | "full"
}

export const bootcamps: Bootcamp[] = [
  {
    slug: "social-media-management-avance",
    title: "Maîtrisez le Social Media Management",
    tagline: "Passez de gestionnaire à stratège des réseaux sociaux",
    description: "Une formation intensive pour maîtriser la stratégie social media, l'analyse de données et l'optimisation de vos performances sur les réseaux sociaux.",
    duration: "2 jours",
    hours: 14,
    level: "Avancé",
    format: "Présentiel",
    price: 450000,
    targets: [
      "Social Media Managers",
      "Community Managers seniors",
      "Responsables communication",
      "Chefs de projet digital",
    ],
    prerequisites: [
      "Minimum 2 ans d'expérience en gestion de réseaux sociaux",
      "Connaissance des principales plateformes (Facebook, Instagram, LinkedIn, Twitter)",
      "Notions de base en analytics",
      "Ordinateur portable requis",
    ],
    outcomes: [
      "Concevoir une stratégie social media alignée sur les objectifs business",
      "Analyser et interpréter les KPIs pour optimiser vos performances",
      "Créer un calendrier éditorial efficace et automatisé",
      "Maîtriser les outils d'analytics avancés",
      "Gérer une crise sur les réseaux sociaux",
      "Présenter des reportings impactants à votre direction",
    ],
    program: [
      {
        day: 1,
        title: "Stratégie et planification avancée",
        modules: [
          {
            title: "Audit et benchmark concurrentiel",
            duration: "2h",
            topics: [
              "Méthodologie d'audit social media",
              "Analyse SWOT digitale",
              "Outils de veille et benchmark",
            ],
          },
          {
            title: "Définition de la stratégie",
            duration: "3h",
            topics: [
              "Alignement objectifs business et social media",
              "Choix des plateformes et formats",
              "Construction des personas avancés",
              "Définition des KPIs stratégiques",
            ],
          },
          {
            title: "Planification éditoriale avancée",
            duration: "2h",
            topics: [
              "Content pillars et thématiques",
              "Calendrier éditorial optimisé",
              "Outils de planification et automatisation",
            ],
          },
        ],
      },
      {
        day: 2,
        title: "Analytics, reporting et optimisation",
        modules: [
          {
            title: "Analytics avancés",
            duration: "3h",
            topics: [
              "Configuration des outils d'analytics",
              "Lecture et interprétation des données",
              "Attribution et parcours client",
              "Tests A/B et expérimentation",
            ],
          },
          {
            title: "Reporting et présentation",
            duration: "2h",
            topics: [
              "Construction de dashboards",
              "Storytelling avec les données",
              "Présentation à la direction",
            ],
          },
          {
            title: "Gestion de crise et cas pratiques",
            duration: "2h",
            topics: [
              "Protocole de gestion de crise",
              "Études de cas réels",
              "Simulation et mise en pratique",
            ],
          },
        ],
      },
    ],
    methodology: [
      "70% de pratique, 30% de théorie",
      "Travail sur vos propres comptes et projets",
      "Exercices en petits groupes",
      "Retours personnalisés du formateur",
      "Accès aux templates et ressources exclusives",
    ],
    trainer: {
      name: "Sarah Koné",
      title: "Experte Social Media & Digital Strategist",
      bio: "Plus de 10 ans d'expérience en stratégie digitale. Ex-directrice social media chez des agences internationales. Accompagne les grandes marques africaines dans leur transformation digitale.",
      expertise: [
        "Stratégie Social Media",
        "Analytics & Data",
        "Content Strategy",
        "Brand Building",
      ],
    },
    includes: [
      "14 heures de formation intensive",
      "Support de cours complet (PDF)",
      "Templates et outils exclusifs",
      "Accès à la communauté Big Five",
      "Certificat de formation",
      "Pause-café et déjeuner inclus",
    ],
    faq: [
      {
        question: "Puis-je payer en plusieurs fois ?",
        answer: "Oui, nous proposons un paiement en 2 ou 3 fois sans frais. Contactez-nous pour plus d'informations.",
      },
      {
        question: "Un certificat est-il délivré ?",
        answer: "Oui, un certificat de formation Big Five est remis à chaque participant ayant complété le bootcamp.",
      },
      {
        question: "Que dois-je apporter ?",
        answer: "Votre ordinateur portable avec accès à vos comptes de réseaux sociaux professionnels.",
      },
      {
        question: "Quelle est la taille des groupes ?",
        answer: "Les groupes sont limités à 12 participants maximum pour garantir un accompagnement personnalisé.",
      },
      {
        question: "Y a-t-il un suivi après la formation ?",
        answer: "Oui, vous bénéficiez d'un accès à notre communauté privée et d'un suivi de 30 jours par email.",
      },
    ],
  },
  {
    slug: "marketing-digital-fondamentaux",
    title: "Les Fondamentaux du Marketing Digital",
    tagline: "Maîtrisez les bases pour lancer votre stratégie digitale",
    description: "Une formation complète pour comprendre et mettre en œuvre les fondamentaux du marketing digital : SEO, publicité en ligne, email marketing et analytics.",
    duration: "2 jours",
    hours: 14,
    level: "Intermédiaire",
    format: "Présentiel",
    price: 350000,
    targets: [
      "Responsables marketing",
      "Entrepreneurs",
      "Chargés de communication",
      "Freelances",
    ],
    prerequisites: [
      "Connaissance de base du marketing",
      "Utilisation régulière d'internet et des réseaux sociaux",
      "Ordinateur portable requis",
    ],
    outcomes: [
      "Comprendre l'écosystème du marketing digital",
      "Créer une stratégie SEO de base",
      "Lancer et optimiser des campagnes publicitaires",
      "Mettre en place une stratégie d'email marketing",
      "Analyser les performances de vos actions",
    ],
    program: [
      {
        day: 1,
        title: "Stratégie digitale et SEO",
        modules: [
          {
            title: "Introduction au marketing digital",
            duration: "2h",
            topics: [
              "Panorama du marketing digital",
              "Les canaux et leurs spécificités",
              "Définir ses objectifs",
            ],
          },
          {
            title: "SEO et référencement naturel",
            duration: "3h",
            topics: [
              "Fondamentaux du SEO",
              "Recherche de mots-clés",
              "Optimisation on-page",
              "Introduction au SEO local",
            ],
          },
          {
            title: "Content Marketing",
            duration: "2h",
            topics: [
              "Stratégie de contenu",
              "Formats et canaux",
              "Calendrier éditorial",
            ],
          },
        ],
      },
      {
        day: 2,
        title: "Publicité, email et analytics",
        modules: [
          {
            title: "Publicité digitale",
            duration: "3h",
            topics: [
              "Google Ads : fondamentaux",
              "Facebook/Meta Ads : fondamentaux",
              "Création de campagnes",
              "Budget et optimisation",
            ],
          },
          {
            title: "Email Marketing",
            duration: "2h",
            topics: [
              "Stratégie d'email marketing",
              "Outils et automatisation",
              "Bonnes pratiques et délivrabilité",
            ],
          },
          {
            title: "Analytics et mesure",
            duration: "2h",
            topics: [
              "Google Analytics 4",
              "Définition des KPIs",
              "Création de tableaux de bord",
            ],
          },
        ],
      },
    ],
    methodology: [
      "Approche pratique avec exercices concrets",
      "Études de cas adaptées au marché africain",
      "Travail en groupe et échanges",
      "Templates et checklists fournis",
    ],
    trainer: {
      name: "Jean-Marc Diallo",
      title: "Consultant Marketing Digital",
      bio: "15 ans d'expérience en marketing digital. Formateur certifié Google et Meta. A accompagné plus de 100 entreprises dans leur transformation digitale.",
      expertise: [
        "SEO/SEA",
        "Marketing Automation",
        "Analytics",
        "Growth Hacking",
      ],
    },
    includes: [
      "14 heures de formation",
      "Support de cours complet",
      "Templates et checklists",
      "Certificat de formation",
      "Pause-café et déjeuner inclus",
    ],
    faq: [
      {
        question: "Ce bootcamp est-il adapté aux débutants ?",
        answer: "Ce bootcamp s'adresse aux personnes ayant des notions de base en marketing. Pour les débutants complets, nous recommandons notre formation d'introduction.",
      },
      {
        question: "Les outils utilisés sont-ils gratuits ?",
        answer: "La majorité des outils présentés sont gratuits ou proposent des versions freemium suffisantes pour démarrer.",
      },
    ],
  },
  {
    slug: "creation-contenu-video",
    title: "Création de Contenu Vidéo",
    tagline: "Produisez des vidéos professionnelles avec votre smartphone",
    description: "Apprenez à créer du contenu vidéo engageant pour les réseaux sociaux, de la conception à la publication, avec des techniques professionnelles accessibles.",
    duration: "2 jours",
    hours: 14,
    level: "Débutant",
    format: "Présentiel",
    price: 300000,
    targets: [
      "Community Managers",
      "Entrepreneurs",
      "Créateurs de contenu",
      "Équipes marketing",
    ],
    prerequisites: [
      "Smartphone récent (moins de 3 ans)",
      "Compte actif sur au moins un réseau social",
      "Aucune expérience vidéo requise",
    ],
    outcomes: [
      "Maîtriser les bases du cadrage et de la lumière",
      "Créer des vidéos engageantes pour chaque plateforme",
      "Éditer vos vidéos sur smartphone",
      "Optimiser vos vidéos pour l'algorithme",
      "Développer votre identité visuelle vidéo",
    ],
    program: [
      {
        day: 1,
        title: "Tournage et techniques de base",
        modules: [
          {
            title: "Les fondamentaux de la vidéo",
            duration: "2h",
            topics: [
              "Formats et spécificités par plateforme",
              "Équipement minimal recommandé",
              "Configuration de votre smartphone",
            ],
          },
          {
            title: "Techniques de tournage",
            duration: "3h",
            topics: [
              "Cadrage et composition",
              "Gestion de la lumière",
              "Prise de son",
              "Mouvements de caméra",
            ],
          },
          {
            title: "Atelier pratique",
            duration: "2h",
            topics: [
              "Tournage en conditions réelles",
              "Retours personnalisés",
            ],
          },
        ],
      },
      {
        day: 2,
        title: "Montage et publication",
        modules: [
          {
            title: "Montage sur smartphone",
            duration: "3h",
            topics: [
              "Présentation des apps de montage",
              "Techniques de montage efficaces",
              "Ajout de textes et effets",
              "Musique et sound design",
            ],
          },
          {
            title: "Optimisation et publication",
            duration: "2h",
            topics: [
              "Formats d'export optimisés",
              "Sous-titres et accessibilité",
              "Horaires de publication",
              "Hashtags et descriptions",
            ],
          },
          {
            title: "Projet final",
            duration: "2h",
            topics: [
              "Création d'une vidéo complète",
              "Présentation et critique constructive",
            ],
          },
        ],
      },
    ],
    methodology: [
      "80% de pratique",
      "Tournage en conditions réelles",
      "Montage de vos propres vidéos",
      "Feedback immédiat du formateur",
    ],
    trainer: {
      name: "Awa Touré",
      title: "Créatrice de contenu & Vidéaste",
      bio: "Créatrice de contenu avec plus de 500K followers. Spécialisée dans la création de contenu viral pour les marques africaines.",
      expertise: [
        "Création vidéo mobile",
        "TikTok & Reels",
        "Storytelling visuel",
        "Personal Branding",
      ],
    },
    includes: [
      "14 heures de formation",
      "Guide des apps recommandées",
      "Presets et templates",
      "Certificat de formation",
      "Pause-café et déjeuner inclus",
    ],
    faq: [
      {
        question: "Quel smartphone faut-il ?",
        answer: "Un smartphone de moins de 3 ans avec une bonne qualité photo (iPhone 11+ ou équivalent Android).",
      },
      {
        question: "Faut-il du matériel supplémentaire ?",
        answer: "Non, mais nous recommandons un petit trépied smartphone (environ 5000 FCFA).",
      },
    ],
  },
]

export const sessions: Session[] = [
  // Social Media Management
  {
    id: "smm-mars-2025",
    bootcampSlug: "social-media-management-avance",
    dateStart: "2025-03-15",
    dateEnd: "2025-03-16",
    city: "Abidjan",
    format: "Présentiel",
    trainer: "Sarah Koné",
    spotsTotal: 12,
    spotsRemaining: 4,
    status: "almost_full",
  },
  {
    id: "smm-avril-2025",
    bootcampSlug: "social-media-management-avance",
    dateStart: "2025-04-12",
    dateEnd: "2025-04-13",
    city: "Abidjan",
    format: "Présentiel",
    trainer: "Sarah Koné",
    spotsTotal: 12,
    spotsRemaining: 10,
    status: "open",
  },
  {
    id: "smm-mai-2025",
    bootcampSlug: "social-media-management-avance",
    dateStart: "2025-05-17",
    dateEnd: "2025-05-18",
    city: "Abidjan",
    format: "Hybride",
    trainer: "Sarah Koné",
    spotsTotal: 15,
    spotsRemaining: 15,
    status: "open",
  },
  // Marketing Digital
  {
    id: "md-mars-2025",
    bootcampSlug: "marketing-digital-fondamentaux",
    dateStart: "2025-03-22",
    dateEnd: "2025-03-23",
    city: "Abidjan",
    format: "Présentiel",
    trainer: "Jean-Marc Diallo",
    spotsTotal: 15,
    spotsRemaining: 0,
    status: "full",
  },
  {
    id: "md-avril-2025",
    bootcampSlug: "marketing-digital-fondamentaux",
    dateStart: "2025-04-26",
    dateEnd: "2025-04-27",
    city: "Abidjan",
    format: "Présentiel",
    trainer: "Jean-Marc Diallo",
    spotsTotal: 15,
    spotsRemaining: 8,
    status: "open",
  },
  // Création Vidéo
  {
    id: "video-avril-2025",
    bootcampSlug: "creation-contenu-video",
    dateStart: "2025-04-05",
    dateEnd: "2025-04-06",
    city: "Abidjan",
    format: "Présentiel",
    trainer: "Awa Touré",
    spotsTotal: 10,
    spotsRemaining: 3,
    status: "almost_full",
  },
  {
    id: "video-mai-2025",
    bootcampSlug: "creation-contenu-video",
    dateStart: "2025-05-10",
    dateEnd: "2025-05-11",
    city: "Abidjan",
    format: "Présentiel",
    trainer: "Awa Touré",
    spotsTotal: 10,
    spotsRemaining: 10,
    status: "open",
  },
]

export function getBootcampBySlug(slug: string): Bootcamp | undefined {
  return bootcamps.find((b) => b.slug === slug)
}

export function getSessionsByBootcamp(bootcampSlug: string): Session[] {
  return sessions.filter((s) => s.bootcampSlug === bootcampSlug)
}

export function getSessionById(id: string): Session | undefined {
  return sessions.find((s) => s.id === id)
}

// User Dashboard Types and Mock Data
export interface UserEnrollment {
  id: string
  bootcampSlug: string
  sessionId: string
  enrolledAt: string
  progress: number
  status: "in_progress" | "completed" | "not_started"
  certificateRequested: boolean
  certificateIssued: boolean
}

export interface CourseVideo {
  id: string
  bootcampSlug: string
  dayNumber: number
  moduleIndex: number
  title: string
  description: string
  duration: string
  videoUrl: string
  thumbnailUrl: string
  watched: boolean
  watchedDuration: number
  totalDuration: number
}

export interface UserSubscription {
  id: string
  plan: "basic" | "premium" | "enterprise"
  planName: string
  price: number
  billingCycle: "monthly" | "yearly"
  startDate: string
  endDate: string
  status: "active" | "cancelled" | "expired"
  features: string[]
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  enrollments: UserEnrollment[]
  subscriptions: UserSubscription[]
}

export const mockUser: UserProfile = {
  id: "user-001",
  firstName: "Aminata",
  lastName: "Diallo",
  email: "aminata.diallo@example.com",
  phone: "+225 07 12 34 56 78",
  avatar: "",
  enrollments: [
    {
      id: "enroll-001",
      bootcampSlug: "social-media-management-avance",
      sessionId: "smm-mars-2025",
      enrolledAt: "2025-02-15",
      progress: 75,
      status: "in_progress",
      certificateRequested: false,
      certificateIssued: false,
    },
    {
      id: "enroll-002",
      bootcampSlug: "marketing-digital-fondamentaux",
      sessionId: "md-avril-2025",
      enrolledAt: "2025-01-20",
      progress: 100,
      status: "completed",
      certificateRequested: true,
      certificateIssued: true,
    },
    {
      id: "enroll-003",
      bootcampSlug: "creation-contenu-video",
      sessionId: "video-mai-2025",
      enrolledAt: "2025-03-01",
      progress: 0,
      status: "not_started",
      certificateRequested: false,
      certificateIssued: false,
    },
  ],
  subscriptions: [
    {
      id: "sub-001",
      plan: "premium",
      planName: "Premium",
      price: 25000,
      billingCycle: "monthly",
      startDate: "2025-01-01",
      endDate: "2026-01-01",
      status: "active",
      features: [
        "Accès illimité aux vidéos",
        "Replay des sessions live",
        "Ressources téléchargeables",
        "Support prioritaire",
        "Communauté privée",
      ],
    },
  ],
}

export const courseVideos: CourseVideo[] = [
  // Social Media Management Videos
  {
    id: "video-smm-1-1",
    bootcampSlug: "social-media-management-avance",
    dayNumber: 1,
    moduleIndex: 0,
    title: "Méthodologie d'audit social media",
    description: "Apprenez à réaliser un audit complet de votre présence sur les réseaux sociaux.",
    duration: "45 min",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "",
    watched: true,
    watchedDuration: 2700,
    totalDuration: 2700,
  },
  {
    id: "video-smm-1-2",
    bootcampSlug: "social-media-management-avance",
    dayNumber: 1,
    moduleIndex: 0,
    title: "Analyse SWOT digitale",
    description: "Appliquez la méthode SWOT à votre stratégie digitale.",
    duration: "35 min",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "",
    watched: true,
    watchedDuration: 2100,
    totalDuration: 2100,
  },
  {
    id: "video-smm-1-3",
    bootcampSlug: "social-media-management-avance",
    dayNumber: 1,
    moduleIndex: 1,
    title: "Alignement objectifs business et social media",
    description: "Comment aligner vos objectifs social media avec les objectifs de l'entreprise.",
    duration: "50 min",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "",
    watched: true,
    watchedDuration: 3000,
    totalDuration: 3000,
  },
  {
    id: "video-smm-1-4",
    bootcampSlug: "social-media-management-avance",
    dayNumber: 1,
    moduleIndex: 1,
    title: "Construction des personas avancés",
    description: "Créez des personas détaillés pour mieux cibler votre audience.",
    duration: "40 min",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "",
    watched: false,
    watchedDuration: 1200,
    totalDuration: 2400,
  },
  {
    id: "video-smm-2-1",
    bootcampSlug: "social-media-management-avance",
    dayNumber: 2,
    moduleIndex: 0,
    title: "Configuration des outils d'analytics",
    description: "Configurez et maîtrisez les outils d'analytics pour vos réseaux sociaux.",
    duration: "55 min",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "",
    watched: false,
    watchedDuration: 0,
    totalDuration: 3300,
  },
  {
    id: "video-smm-2-2",
    bootcampSlug: "social-media-management-avance",
    dayNumber: 2,
    moduleIndex: 1,
    title: "Construction de dashboards",
    description: "Créez des tableaux de bord efficaces pour suivre vos KPIs.",
    duration: "45 min",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "",
    watched: false,
    watchedDuration: 0,
    totalDuration: 2700,
  },
  // Marketing Digital Videos
  {
    id: "video-md-1-1",
    bootcampSlug: "marketing-digital-fondamentaux",
    dayNumber: 1,
    moduleIndex: 0,
    title: "Panorama du marketing digital",
    description: "Vue d'ensemble complète du marketing digital et de ses opportunités.",
    duration: "40 min",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "",
    watched: true,
    watchedDuration: 2400,
    totalDuration: 2400,
  },
  {
    id: "video-md-1-2",
    bootcampSlug: "marketing-digital-fondamentaux",
    dayNumber: 1,
    moduleIndex: 1,
    title: "Fondamentaux du SEO",
    description: "Les bases du référencement naturel pour améliorer votre visibilité.",
    duration: "50 min",
    videoUrl: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "",
    watched: true,
    watchedDuration: 3000,
    totalDuration: 3000,
  },
]

export function getVideosByBootcamp(bootcampSlug: string): CourseVideo[] {
  return courseVideos.filter((v) => v.bootcampSlug === bootcampSlug)
}

// Admin Types and Mock Data
export interface AdminUser {
  id: string
  email: string
  name: string
  role: "admin" | "super_admin"
}

export interface Enrollment {
  id: string
  userId: string
  userName: string
  userEmail: string
  userPhone: string
  bootcampSlug: string
  sessionId: string
  enrolledAt: string
  status: "confirmed" | "pending" | "cancelled"
  paymentStatus: "paid" | "pending" | "refunded"
  amount: number
}

export const adminUser: AdminUser = {
  id: "admin-001",
  email: "admin@bigfive.ci",
  name: "Admin Big Five",
  role: "super_admin",
}

export const allEnrollments: Enrollment[] = [
  {
    id: "enroll-001",
    userId: "user-001",
    userName: "Aminata Diallo",
    userEmail: "aminata.diallo@example.com",
    userPhone: "+225 07 12 34 56 78",
    bootcampSlug: "social-media-management-avance",
    sessionId: "smm-mars-2025",
    enrolledAt: "2025-02-15",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 450000,
  },
  {
    id: "enroll-002",
    userId: "user-001",
    userName: "Aminata Diallo",
    userEmail: "aminata.diallo@example.com",
    userPhone: "+225 07 12 34 56 78",
    bootcampSlug: "marketing-digital-fondamentaux",
    sessionId: "md-avril-2025",
    enrolledAt: "2025-01-20",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 350000,
  },
  {
    id: "enroll-003",
    userId: "user-002",
    userName: "Kouame Yao",
    userEmail: "kouame.yao@email.com",
    userPhone: "+225 05 98 76 54 32",
    bootcampSlug: "social-media-management-avance",
    sessionId: "smm-mars-2025",
    enrolledAt: "2025-02-20",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 450000,
  },
  {
    id: "enroll-004",
    userId: "user-003",
    userName: "Marie Kouassi",
    userEmail: "marie.kouassi@orange.ci",
    userPhone: "+225 01 23 45 67 89",
    bootcampSlug: "creation-contenu-video",
    sessionId: "video-avril-2025",
    enrolledAt: "2025-03-01",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 300000,
  },
  {
    id: "enroll-005",
    userId: "user-004",
    userName: "Ibrahim Traore",
    userEmail: "ibrahim.t@gmail.com",
    userPhone: "+225 07 55 44 33 22",
    bootcampSlug: "marketing-digital-fondamentaux",
    sessionId: "md-avril-2025",
    enrolledAt: "2025-03-05",
    status: "pending",
    paymentStatus: "pending",
    amount: 350000,
  },
  {
    id: "enroll-006",
    userId: "user-005",
    userName: "Fatou Bamba",
    userEmail: "fatou.bamba@jumia.ci",
    userPhone: "+225 01 11 22 33 44",
    bootcampSlug: "social-media-management-avance",
    sessionId: "smm-avril-2025",
    enrolledAt: "2025-03-10",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 450000,
  },
  {
    id: "enroll-007",
    userId: "user-006",
    userName: "Sekou Konate",
    userEmail: "sekou.k@yahoo.fr",
    userPhone: "+225 05 66 77 88 99",
    bootcampSlug: "creation-contenu-video",
    sessionId: "video-avril-2025",
    enrolledAt: "2025-03-12",
    status: "cancelled",
    paymentStatus: "refunded",
    amount: 300000,
  },
  {
    id: "enroll-008",
    userId: "user-007",
    userName: "Aissata Coulibaly",
    userEmail: "aissata.c@outlook.com",
    userPhone: "+225 07 99 88 77 66",
    bootcampSlug: "social-media-management-avance",
    sessionId: "smm-mai-2025",
    enrolledAt: "2025-03-15",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 450000,
  },
  {
    id: "enroll-009",
    userId: "user-008",
    userName: "Moussa Diarra",
    userEmail: "moussa.d@gmail.com",
    userPhone: "+225 05 12 34 56 78",
    bootcampSlug: "creation-contenu-video",
    sessionId: "video-mai-2025",
    enrolledAt: "2025-03-18",
    status: "pending",
    paymentStatus: "pending",
    amount: 300000,
  },
  {
    id: "enroll-010",
    userId: "user-009",
    userName: "Adjoua Koffi",
    userEmail: "adjoua.k@entreprise.ci",
    userPhone: "+225 01 55 66 77 88",
    bootcampSlug: "marketing-digital-fondamentaux",
    sessionId: "md-avril-2025",
    enrolledAt: "2025-03-20",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 350000,
  },
]

export function getUserEnrollmentWithBootcamp(enrollment: UserEnrollment) {
  const bootcamp = getBootcampBySlug(enrollment.bootcampSlug)
  const session = getSessionById(enrollment.sessionId)
  return { enrollment, bootcamp, session }
}
