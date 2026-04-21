import { useState, useCallback } from "react";
import ResourcePage from "./ResourcePage";

// ── Subject-to-Specializations mapping ──────────────────────
const SPECIALIZATIONS: Record<string, string[]> = {
  "Computer Science": [
    "Java", "C++",
    "Algorithms & Data Structures", "Internet of Things", "Information Technology",
    "Computer Networking", "Machine Learning", "DevOps", "Deep Learning",
    "Cryptography", "Quantum Computing", "Human-Computer Interaction",
    "Distributed Systems", "Blockchain Development", "Computer Graphics",
    "Automata Theory", "Compilers",
  ],
  "Health & Medicine": [
    "Anatomy", "Pharmacology", "Public Health", "Nursing",
    "Medical Imaging", "Epidemiology", "Nutrition", "Pathology",
    "Biostatistics", "Clinical Research", "Mental Health", "Surgery Basics",
    "Emergency Medicine", "Genetics", "Immunology",
  ],
  Mathematics: [
    "Linear Algebra", "Calculus", "Probability & Statistics", "Discrete Mathematics",
    "Number Theory", "Real Analysis", "Complex Analysis", "Topology",
    "Graph Theory", "Differential Equations", "Abstract Algebra",
    "Numerical Methods", "Mathematical Logic", "Game Theory", "Optimization",
  ],
  Business: [
    "Marketing", "Finance", "Accounting", "Entrepreneurship",
    "Supply Chain Management", "Human Resources", "Business Analytics",
    "Organizational Behavior", "International Business", "Digital Marketing",
    "Project Management", "Economics", "Business Strategy", "E-Commerce", "Leadership",
  ],
  Humanities: [
    "Philosophy", "History", "Linguistics", "Literature",
    "Religious Studies", "Cultural Studies", "Ethics", "Archaeology",
    "Anthropology", "Political Science", "Sociology", "Psychology",
    "Art History", "Music Theory", "Creative Writing",
  ],
  Engineering: [
    "Mechanical Engineering", "Civil Engineering", "Electrical Engineering",
    "Chemical Engineering", "Aerospace Engineering", "Robotics",
    "Structural Engineering", "Environmental Engineering", "Mechatronics",
    "Materials Science", "Control Systems", "Signal Processing",
    "Thermodynamics", "Fluid Mechanics", "CAD/CAM",
  ],
  Science: [
    "Physics", "Chemistry", "Biology", "Astronomy",
    "Geology", "Environmental Science", "Biochemistry", "Biophysics",
    "Marine Biology", "Ecology", "Zoology", "Botany",
    "Neuroscience", "Organic Chemistry", "Quantum Physics",
  ],
  "Education & Teaching": [
    "Curriculum Design", "Classroom Management", "Special Education",
    "Educational Psychology", "E-Learning", "Assessment & Evaluation",
    "Pedagogy", "Child Development", "STEM Education", "Literacy Education",
    "Higher Education", "Inclusive Education", "Instructional Technology",
    "Language Teaching", "Educational Leadership",
  ],
  "Social Sciences": [
    "Sociology", "Psychology", "Political Science", "Anthropology",
    "Economics", "Geography", "Criminology", "Demography",
    "International Relations", "Public Administration", "Urban Studies",
    "Gender Studies", "Social Work", "Communication Studies", "Peace Studies",
  ],
  "Artificial Intelligence": [
    "Machine Learning", "Natural Language Processing", "Computer Vision",
    "Reinforcement Learning", "Neural Networks", "Generative AI",
    "AI Ethics", "Robotics AI", "Speech Recognition", "Expert Systems",
    "Knowledge Representation", "Bayesian Networks", "Autonomous Systems",
    "AI in Healthcare", "AI for Business",
  ],
  "Data Science": [
    "Data Analysis", "Data Visualization", "Big Data", "Data Engineering",
    "Statistical Modeling", "SQL & Databases", "R Programming",
    "Python for Data Science", "Data Mining", "Feature Engineering",
    "Time Series Analysis", "A/B Testing", "ETL Pipelines",
    "Data Governance", "Cloud Analytics",
  ],
  Programming: [
    "JavaScript", "TypeScript", "Rust", "Go", "Swift",
    "Kotlin", "Ruby", "PHP", "Scala", "Dart",
    "React.js", "Node.js", "Django", "Spring Boot", "Flutter",
    "REST APIs", "GraphQL", "Testing", "Version Control", "CI/CD",
  ],
  "Personal Development": [
    "Time Management", "Public Speaking", "Critical Thinking",
    "Emotional Intelligence", "Productivity", "Goal Setting",
    "Mindfulness", "Negotiation", "Networking", "Communication Skills",
    "Leadership", "Decision Making", "Stress Management",
    "Financial Literacy", "Career Planning",
  ],
  "Information Security": [
    "Ethical Hacking", "Network Security", "Cryptography",
    "Penetration Testing", "Malware Analysis", "Digital Forensics",
    "Cloud Security", "Application Security", "Security Operations",
    "Risk Management", "Identity & Access Management", "SIEM",
    "Incident Response", "Compliance & Governance", "Reverse Engineering",
  ],
};

// ── The three main resource categories ──────────────────────
interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  accentFrom: string;
  accentTo: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: "spark",
    title: "The Spark",
    subtitle: "Free Classes",
    description:
      "Explore curated free resources from YouTube, Khan Academy, MIT OpenCourseWare, and community-driven platforms. Start learning without spending a dime.",
    icon: "⚡",
    accentFrom: "rgba(59, 130, 246, 0.6)",
    accentTo: "rgba(34, 211, 238, 0.4)",
  },
  {
    id: "spotlight",
    title: "The Spotlight",
    subtitle: "Paid Courses",
    description:
      "Premium courses from Coursera, Udemy, edX, and industry leaders. Deep-dive with structured programs, hands-on projects, and expert mentorship.",
    icon: "🎯",
    accentFrom: "rgba(168, 85, 247, 0.6)",
    accentTo: "rgba(236, 72, 153, 0.4)",
  },
  {
    id: "certifications",
    title: "Certifications",
    subtitle: "Get Certified",
    description:
      "Industry-recognized certifications from Google, AWS, Microsoft, Meta, and more. Boost your resume and validate your expertise globally.",
    icon: "🏆",
    accentFrom: "rgba(234, 179, 8, 0.6)",
    accentTo: "rgba(249, 115, 22, 0.4)",
  },
];

interface SpecializationPageProps {
  subject: string;
  onBack: () => void;
  onHome: () => void;
  sweepComet: (cb: () => void, fromPhase: string, toPhase: string) => void;
  setCometPhase: (phase: string) => void;
}

export default function SpecializationPage({
  subject,
  onBack,
  onHome,
  sweepComet,
  setCometPhase,
}: SpecializationPageProps) {
  // null = show the 3 cards, string = show specialization list for that category
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSpecialization, setActiveSpecialization] = useState<string | null>(null);

  const specializations = SPECIALIZATIONS[subject] || [];

  const activeCategoryData = CATEGORIES.find((c) => c.id === activeCategory);

  const handleCategoryClick = useCallback((categoryId: string) => {
    sweepComet(() => setActiveCategory(categoryId), "page3", "page4");
  }, [sweepComet]);

  const handleBackToCategories = useCallback(() => {
    sweepComet(() => setActiveCategory(null), "page4", "page3");
  }, [sweepComet]);

  return (
    <div className="spec-page fixed inset-0 z-40 flex flex-col">
      {/* Fullscreen Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 z-[1] bg-black/40" />

      {/* ── Header ──────────────────────────────────────── */}
      <header className="relative z-10 flex items-center px-8 sm:px-12 pt-8 pb-2 gap-5">
        <div className="flex items-center gap-5">
          <button
            onClick={activeCategory ? handleBackToCategories : onBack}
            className="spec-back-btn flex items-center gap-2 px-5 py-3 rounded-full cursor-pointer transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>
          
          <h1
            className="text-3xl sm:text-4xl md:text-5xl tracking-tight text-white leading-none animate-fade-rise"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Skill Bridge
          </h1>

          {/* Home Button */}
          <button
            onClick={onHome}
            className="spec-back-btn flex items-center justify-center p-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/10 ml-2"
            title="Go to Home"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden px-8 sm:px-12 pb-8">
        {!activeCategory ? (
          /* ── Category Cards View ─────────────────────── */
          <div className="flex-1 flex flex-col items-center justify-center">
            
            {/* Comet landing target for Page 3 */}
            <div id="page3-landing-target" className="w-[320px] h-[10px] pointer-events-none" />

            {/* Centered Subject Title */}
            <div className="text-center mb-12 w-full animate-fade-in-up">
              <h2
                className="text-5xl sm:text-6xl md:text-7xl text-foreground tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif", marginTop: "100px" }}
              >
                {subject}
              </h2>
              <p className="text-white/40 text-sm sm:text-base mt-2">
                Choose how you want to learn
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-[1200px]">
              {CATEGORIES.map((cat, index) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="category-card group text-left cursor-pointer rounded-3xl p-8 sm:p-10 transition-all duration-500 relative overflow-hidden"
                  style={{
                    animationDelay: `${0.15 * index}s`,
                    "--accent-from": cat.accentFrom,
                    "--accent-to": cat.accentTo,
                  } as React.CSSProperties}
                >
                  {/* Accent glow on hover */}
                  <div className="category-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center text-4xl sm:text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 justify-center bg-transparent">
                      {cat.icon}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="relative z-10 mb-4">
                    <h2 className="text-white text-2xl sm:text-3xl font-semibold tracking-tight mb-1">
                      {cat.title}
                    </h2>
                    <span className="category-badge inline-block text-[11px] uppercase tracking-widest px-3 py-1 rounded-full">
                      {cat.subtitle}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="relative z-10 text-white/45 text-sm sm:text-base leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* Arrow */}
                  <div className="relative z-10 flex items-center gap-2 text-white/30 group-hover:text-white/70 transition-all duration-300">
                    <span className="text-sm font-medium">Explore</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ── Specialization List View (Page 4) ────────────────── */
          <div className="flex-1 overflow-hidden spec-list-view flex flex-col items-center">
            
            {/* Comet landing target for Page 4 */}
            <div id="page4-landing-target" className="w-[320px] h-2 pointer-events-none mt-24 shrink-0" />

            {/* Centered Category Title */}
            <div className="text-center mb-10 mt-16 w-full animate-fade-in-up shrink-0">
              <h2
                className="text-5xl sm:text-6xl md:text-7xl text-foreground tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {activeCategoryData?.title}
              </h2>
              <p className="text-white/40 text-sm sm:text-base mt-2">
                {specializations.length} specializations available
              </p>
            </div>

            {/* Scrollable grid of expanded specialization boxes */}
            <div className="spec-list-scroll w-full pb-16 overflow-y-auto px-4 max-w-[1200px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {specializations.map((spec, index) => (
                  <button
                    key={spec}
                    className="category-card group text-center cursor-pointer rounded-2xl p-10 sm:p-12 transition-all duration-500 relative overflow-hidden flex flex-col items-center"
                    style={{ 
                      animationDelay: `${0.03 * index}s`,
                      backgroundColor: "rgba(10, 15, 25, 0.5)",
                      "--accent-from": activeCategoryData?.accentFrom || "rgba(255,255,255,0.2)",
                      "--accent-to": activeCategoryData?.accentTo || "rgba(255,255,255,0.05)",
                     } as React.CSSProperties}
                    onClick={() => {
                      setCometPhase("page5-hidden");
                      setActiveSpecialization(spec);
                    }}
                  >
                    <div className="category-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                    
                    <div className="relative z-10 flex flex-col flex-grow w-full items-center">
                        <div className="relative z-10 mb-4 mt-2">
                            <h2 className="text-white text-2xl sm:text-3xl font-semibold tracking-tight mb-1 text-center">
                              {spec}
                            </h2>
                        </div>
                        
                        <p className="text-white/45 text-sm sm:text-base leading-relaxed flex-grow text-center">
                          Comprehensive curriculum covering the core principles, advanced methodologies, and practical implementations of {spec}.
                        </p>

                        <div className="relative z-10 flex items-center justify-center gap-2 text-white/30 group-hover:text-white/70 transition-all duration-300 mt-6">
                            <span className="text-sm font-medium tracking-wide">Explore</span>
                            <svg
                              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                        </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Page 5: Resource Page ───────────────────────── */}
      {activeSpecialization && activeCategory && (
        <ResourcePage
          subject={subject}
          category={activeCategory}
          specialization={activeSpecialization}
          onBack={() => {
            setCometPhase("page4-landed");
            setActiveSpecialization(null);
          }}
          onHome={() => {
            onHome();
          }}
        />
      )}
    </div>
  );
}
