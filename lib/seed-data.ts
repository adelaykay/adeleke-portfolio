import type { ProjectFormData } from "@/types/project";

export const SEED_PROJECTS: ProjectFormData[] = [
  {
    slug: "bizdocx",
    name: "BizDocx",
    icon: "📄",
    color: "#7c6af7",
    shortDesc:
      "AI-powered business document hub for African SMEs — proposals, invoices, and reports generated in seconds.",
    status: "live",
    platform: "Google Play Store",
    storeUrl: "https://play.google.com/store/apps/details?id=com.empyrealworks.bizdocx",
    isNda: false,
    isPublished: true,
    displayOrder: 1,
    tags: ["AI", "Next.js", "Firebase", "Gemini", "PDF"],
    techStack: ["Next.js", "React", "Firebase", "Google Gemini", "Playwright", "Paystack", "Stripe"],
    inception:
      "Nigerian SMEs were drowning in document creation — manually building invoices, proposals, and reports cost hours every week. BizDocx was built to automate that entire pipeline, from prompt to polished PDF, using AI.",
    journey:
      "Started as a single PDF generator experiment and evolved into a full document management hub. The challenge was making AI output feel structured and professionally branded, not like raw generated text. Multiple iterations of the Gemini prompt layer were needed before output quality was reliable.",
    challenges:
      "Building a reliable PDF generation engine at scale using Playwright and Chromium, handling Gemini API token constraints for long documents, and implementing offline-first caching for low-bandwidth users in Nigeria.",
    outcome:
      "Live on the Play Store with active users across Nigerian SMEs. Consistently rated 4.5★ and used to generate thousands of documents monthly.",
  },
  {
    slug: "resumate",
    name: "Resumate",
    icon: "📝",
    color: "#4fd1c5",
    shortDesc:
      "AI-driven resume creation and tailoring tool. Feed it a job description and get a perfectly matched CV instantly.",
    status: "live",
    platform: "Google Play Store",
    storeUrl: "https://play.google.com/store/apps/details?id=com.empyrealworks.resumate",
    isNda: false,
    isPublished: true,
    displayOrder: 2,
    tags: ["AI", "Resume", "Career", "Mobile"],
    techStack: ["React Native", "Firebase", "Google Gemini", "Expo"],
    inception:
      "Job seekers were manually customising resumes for every single application — a painful, time-consuming process that reduced their chances of getting noticed. Resumate was built to make that instant.",
    journey:
      "The core insight was semantic matching: feeding both the candidate profile and the target JD into Gemini to identify gaps and rephrase experience in the employer's language. Several design iterations were needed to make the output feel genuinely tailored rather than templated.",
    challenges:
      "Achieving accurate semantic matching between the job description and candidate profile, maintaining consistent formatting across diverse PDF export targets, and handling multi-page resumes without layout breaking.",
    outcome: "Live on the Play Store. Actively used by job seekers across Nigeria and West Africa.",
  },
  {
    slug: "empyreal-keys",
    name: "Empyreal Keys",
    icon: "🔑",
    color: "#f6ad55",
    shortDesc:
      "A secure, elegant key and credential management app built for professionals who need fast, reliable offline access.",
    status: "live",
    platform: "Google Play Store",
    storeUrl: "https://play.google.com/store/apps",
    isNda: false,
    isPublished: true,
    displayOrder: 3,
    tags: ["Security", "Mobile", "Offline-first", "Credentials"],
    techStack: ["React Native", "SQLite", "Biometric Auth", "AES Encryption", "Expo"],
    inception:
      "Professionals needed a trustworthy, fast way to store and retrieve sensitive credentials without depending entirely on cloud-based solutions. Existing tools were either too complex or required permanent internet connectivity.",
    journey:
      "The design principle was local-first: all data encrypted on-device with AES, biometric unlock for fast retrieval, and cloud sync as an optional layer rather than a requirement. This approach forced careful thinking about the encryption key lifecycle.",
    challenges:
      "Designing a robust local-first encryption model with biometric auth, handling key recovery scenarios without compromising security, and building a UX smooth enough that users don't feel like they're using a security tool.",
    outcome: "Live on the Play Store. Actively maintained with a growing user base of professionals.",
  },
  {
    slug: "flixell",
    name: "Flixell",
    icon: "🎬",
    color: "#e879f9",
    shortDesc:
      "Movie community and social discovery app. Find films, build lists, and see what your circle is watching.",
    status: "testing",
    platform: "Closed Testing",
    isNda: false,
    isPublished: true,
    displayOrder: 4,
    tags: ["Social", "Movies", "Discovery", "Community"],
    techStack: ["React Native", "Supabase", "TMDB API", "Redis", "Node.js"],
    inception:
      "Movie fans had no dedicated space that merged social activity with film discovery. Existing apps were either pure catalogs or generic social networks — Flixell was built to combine both in one focused experience.",
    journey:
      "The core challenge was the cold-start recommendation problem: new users need value immediately before they've added any watch history. A onboarding taste-profiling flow was built specifically to seed the recommendation engine from day one.",
    challenges:
      "Designing a scalable real-time feed architecture, integrating the TMDB API for comprehensive film metadata, and solving cold-start recommendations for new users without asking them too many questions upfront.",
    outcome: "Currently in closed testing. Public launch pending final UX refinement and performance tuning.",
  },
  {
    slug: "calculator-rush",
    name: "Calculator Rush",
    icon: "🧮",
    color: "#48bb78",
    shortDesc:
      "A fast-paced arithmetic challenge game that makes mental maths addictive and competitive.",
    status: "testing",
    platform: "Closed Testing",
    isNda: false,
    isPublished: true,
    displayOrder: 5,
    tags: ["Game", "Education", "Speed", "Mobile"],
    techStack: ["React Native", "Firebase Realtime DB", "Expo", "Zustand"],
    inception:
      "Maths anxiety in students is real — but gamification can flip that dynamic entirely. Calculator Rush was built to make speed arithmetic feel genuinely fun and competitive rather than like homework.",
    journey:
      "The 'Rush' feel required sub-16ms input response — any perceptible lag kills the competitive tension. Significant time was spent optimising the state management layer to keep every frame budget tight during peak gameplay.",
    challenges:
      "Achieving sub-16ms input latency for a truly 'fast' feel, syncing leaderboards reliably with offline-first gameplay, and building an adaptive difficulty engine that scales well without feeling unfair.",
    outcome: "Currently in closed testing with a small group of student testers. Launching publicly soon.",
  },
  {
    slug: "vocal-memo",
    name: "Vocal Memo",
    icon: "🎙️",
    color: "#38bdf8",
    shortDesc:
      "Voice recording app with AI transcription — turn spoken thoughts into searchable, shareable text notes instantly.",
    status: "testing",
    platform: "Closed Testing",
    isNda: false,
    isPublished: true,
    displayOrder: 6,
    tags: ["Voice", "AI", "Transcription", "Notes"],
    techStack: ["React Native", "Whisper API", "Firebase", "Expo AV"],
    inception:
      "Professionals and students needed a smarter voice memo experience beyond basic recording. The goal was an app that could transcribe, organise, and make spoken thoughts searchable — without requiring manual cleanup.",
    journey:
      "Early testing revealed that Whisper API accuracy dropped significantly for Nigerian-accented English. A fine-tuning and prompt-engineering layer was added specifically to improve accuracy for West African speech patterns.",
    challenges:
      "Achieving accurate transcription for Nigerian and West African English accents, balancing on-device vs cloud processing trade-offs for cost and latency, and implementing effective real-time noise suppression.",
    outcome:
      "Currently in closed testing. The transcription accuracy improvements for African English are a key differentiator being validated before launch.",
  },
  {
    slug: "boredom",
    name: "Boredom",
    icon: "⚡",
    color: "#fb7185",
    shortDesc:
      "A mood-first entertainment discovery app. Available globally on Android and iOS. Built under a UK-based NDA.",
    status: "live",
    platform: "Google Play Store & Apple App Store",
    isNda: true,
    isPublished: true,
    displayOrder: 7,
    tags: ["Entertainment", "Lifestyle", "Social", "iOS", "Android"],
    techStack: undefined,
    inception:
      "Millions of people open their phones without knowing what they want to do. Boredom solves the paralysis of choice — surfacing the right activity, content, or experience based on how you feel right now, not what algorithm thinks you want.",
    journey:
      "Built end-to-end for a UK company under a strict NDA. The product went from concept to global launch on both iOS and Android. Architectural and technology decisions are confidential, but the scope covered full-stack development, cross-platform parity, and a personalised recommendation engine.",
    challenges:
      "Achieving high-quality cross-platform parity on iOS and Android simultaneously, building a personalisation engine that works without requiring extensive user history, and maintaining strict feature and technical confidentiality throughout the engagement.",
    outcome:
      "Live globally on both the Google Play Store and Apple App Store. The most widely distributed product in the Empyreal Works portfolio.",
  },
];
