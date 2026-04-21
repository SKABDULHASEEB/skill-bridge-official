import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import SpecializationPage from "./SpecializationPage";
import AuthModal from "./AuthModal";
import DashboardPage from "./DashboardPage";
import type { UserProfile } from "./lib/storage";
import { getUserProfile, saveUserProfile, logoutUser } from "./lib/storage";

const SUBJECTS = [
  { name: "Computer Science", icon: "💻", gradient: "from-blue-600 to-cyan-500" },
  { name: "Health & Medicine", icon: "🩺", gradient: "from-emerald-600 to-teal-400" },
  { name: "Mathematics", icon: "📐", gradient: "from-purple-600 to-violet-400" },
  { name: "Business", icon: "📊", gradient: "from-amber-600 to-orange-400" },
  { name: "Humanities", icon: "📖", gradient: "from-rose-600 to-pink-400" },
  { name: "Engineering", icon: "⚙️", gradient: "from-slate-600 to-zinc-400" },
  { name: "Science", icon: "🔬", gradient: "from-green-600 to-emerald-400" },
  { name: "Education & Teaching", icon: "🎓", gradient: "from-sky-600 to-blue-400" },
  { name: "Social Sciences", icon: "🌍", gradient: "from-indigo-600 to-blue-400" },
  { name: "Artificial Intelligence", icon: "🤖", gradient: "from-cyan-600 to-teal-400" },
  { name: "Data Science", icon: "📈", gradient: "from-violet-600 to-purple-400" },
  { name: "Programming", icon: "🖥️", gradient: "from-blue-700 to-indigo-400" },
  { name: "Personal Development", icon: "🚀", gradient: "from-orange-600 to-amber-400" },
  { name: "Information Security", icon: "🔒", gradient: "from-red-600 to-rose-400" },
];

function App() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeftState] = useState(0);

  // Page 3 navigation
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // User Account & Dashboard
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const profile = getUserProfile();
    if (profile) setUserProfile(profile);
  }, []);

  useEffect(() => {
    // Sync Clerk Auth state with application
    if (isLoaded && isSignedIn && user) {
      const name = user.fullName || user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User';
      setUserProfile(saveUserProfile(name, user.imageUrl));
      setShowAuthModal(false);
      
      // If returning from Google OAuth redirect, clear the parameter but don't force dashboard
      if (window.location.search.includes('login=true')) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } else if (isLoaded && !isSignedIn) {
      // We check if we ALREADY have a local profile. 
      // If we do, we DON'T want to clear it just because Clerk is signed out 
      // (since we support local mock accounts).
      const localProfile = getUserProfile();
      if (!localProfile) {
        setUserProfile(null);
      }
    }
  }, [isLoaded, isSignedIn, user]);

  const handleLogin = (name: string, isSignUp?: boolean) => {
    // This is a fallback local login method (for if they mock login without Clerk)
    setUserProfile(saveUserProfile(name));
    setIsNewUser(!!isSignUp);
    setShowAuthModal(false);
    // Automatically returning them to the main page where the Welcome text animation plays
  };

  const handleLogout = async () => {
    await signOut();
    logoutUser();
    setUserProfile(null);
    setShowDashboard(false);
  };

  // Comet animation phases:
  //   "hidden"    → not visible yet
  //   "streaking" → comet streaks left→right on splash, stops above "Skill Bridge"
  //   "resting"   → comet sits above title with glow pulse
  //   "exiting"   → comet sweeps off to the far right (page transition)
  //   "entering"  → page 2 appears, comet re-enters from far left
  //   "landing"   → comet streaks across page 2, heading to "Explore Subjects"
  //   "landed"    → settled above "Explore Subjects" with gentle float
  const [cometPhase, setCometPhase] = useState<
    | "hidden"
    | "streaking"
    | "resting"
    | "exiting"
    | "entering"
    | "landing"
    | "landed"
    | "page2-exiting"
    | "page3-entering"
    | "page3-landing"
    | "page3-landed"
    | "page3-exiting"
  >("hidden");
  const cometRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const splashCometSlotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Timeline:
    // 0.0s  — Splash appears, title fades in
    // 1.0s  — Comet starts streaking left→right above title (1.2s)
    // 2.2s  — Comet arrives, rests with glow pulse
    // 3.2s  — Comet sweeps off to the right (exit transition, 1s)
    // 4.2s  — Splash fades, page 2 reveals, comet positioned off-screen left
    // 4.4s  — Comet enters from left on page 2 (streaks to "Explore Subjects")
    // 5.8s  — Comet arrives, settles with float

    const streakTimer = setTimeout(() => setCometPhase("streaking"), 1000);
    const restTimer = setTimeout(() => setCometPhase("resting"), 2200);
    const exitTimer = setTimeout(() => setCometPhase("exiting"), 3200);

    const revealTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3800);

    const hideTimer = setTimeout(() => {
      setShowSplash(false);
      // Position comet off-screen left immediately (no transition)
      setCometPhase("entering");
    }, 4200);

    const landingTimer = setTimeout(() => {
      // Now animate comet from left to its landing spot
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCometPhase("landing");
        });
      });
    }, 4400);

    const landTimer = setTimeout(() => setCometPhase("landed"), 5800);

    return () => {
      clearTimeout(streakTimer);
      clearTimeout(restTimer);
      clearTimeout(exitTimer);
      clearTimeout(revealTimer);
      clearTimeout(hideTimer);
      clearTimeout(landingTimer);
      clearTimeout(landTimer);
    };
  }, []);

  // Comet positioning for each phase
  const getCometStyle = useCallback((): React.CSSProperties => {
    if (cometPhase === "hidden") {
      // Off-screen far left, invisible
      return {
        position: "fixed",
        top: "50%",
        left: "0%",
        transform: "translate(-100%, -120px) scale(1)",
        opacity: 0,
        transition: "none",
        zIndex: 60,
      };
    }

    if (cometPhase === "streaking") {
      // Animate from far left to center (above the title on splash)
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -120px) scale(1)",
        opacity: 1,
        transition: "all 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
        zIndex: 60,
      };
    }

    if (cometPhase === "resting") {
      // Sitting above title, comet glow pulse
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -120px) scale(1)",
        opacity: 1,
        transition: "none",
        zIndex: 60,
      };
    }

    if (cometPhase === "exiting") {
      // Sweep off to the far right edge of screen (from Splash)
      return {
        position: "fixed",
        top: "50%",
        left: "100%",
        transform: "translate(50%, -120px) scale(1.1)",
        opacity: 1,
        transition: "all 1s cubic-bezier(0.42, 0, 0.58, 1)",
        zIndex: 60,
      };
    }

    if (cometPhase === "page2-exiting") {
      if (landingRef.current) {
        const rect = landingRef.current.getBoundingClientRect();
        return {
          position: "fixed",
          top: `${rect.top + rect.height / 2 - 110}px`,
          left: "100%",
          transform: "translate(50%, 0) scale(1.3)",
          opacity: 1,
          transition: "all 0.45s cubic-bezier(0.42, 0, 0.58, 1)",
          zIndex: 60,
        };
      }
      return {
        position: "fixed",
        top: "35%",
        left: "100%",
        transform: "translate(50%, 0) scale(1.3)",
        opacity: 1,
        transition: "all 1s cubic-bezier(0.42, 0, 0.58, 1)",
        zIndex: 60,
      };
    }

    if (cometPhase === "entering") {
      // Instantly positioned off-screen left on page 2, at the SAME vertical
      // position as the landing target so the comet travels in a straight line.
      if (landingRef.current) {
        const rect = landingRef.current.getBoundingClientRect();
        return {
          position: "fixed",
          top: `${rect.top + rect.height / 2 - 110}px`,
          left: "-320px",
          transform: "translate(0, 0) scale(1.3)",
          opacity: 0,
          transition: "none",
          zIndex: 60,
        };
      }
      return {
        position: "fixed",
        top: "35%",
        left: "-320px",
        transform: "translate(0, 0) scale(1.3)",
        opacity: 0,
        transition: "none",
        zIndex: 60,
      };
    }

    if (cometPhase === "landing") {
      // Streak from left to landing spot above "Explore Subjects"
      if (landingRef.current) {
        const rect = landingRef.current.getBoundingClientRect();
        return {
          position: "fixed",
          top: `${rect.top + rect.height / 2 - 110}px`,
          left: `${rect.left + rect.width / 2 - 160}px`,
          transform: "translate(0, 0) scale(1.3)",
          opacity: 1,
          transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          zIndex: 60,
        };
      }
      return {
        position: "fixed",
        top: "35%",
        left: "50%",
        transform: "translate(-50%, 0) scale(1.3)",
        opacity: 1,
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        zIndex: 60,
      };
    }

    // "landed"
    if (cometPhase === "landed") {
      if (landingRef.current) {
        const rect = landingRef.current.getBoundingClientRect();
        return {
          position: "fixed",
          top: `${rect.top + rect.height / 2 - 110}px`,
          left: `${rect.left + rect.width / 2 - 160}px`,
          transform: "translate(0, 0) scale(1.3)",
          opacity: 1,
          transition: "opacity 0.5s ease",
          zIndex: 20,
        };
      }
      return {
        position: "fixed",
        top: "35%",
        left: "50%",
        transform: "translate(-50%, 0) scale(1.3)",
        opacity: 1,
        zIndex: 20,
      };
    }

    if (cometPhase === "page3-entering") {
      if (landingRef.current) {
        const rect = landingRef.current.getBoundingClientRect();
        return {
          position: "fixed",
          top: `${rect.top + rect.height / 2 - 110}px`,
          left: "-320px",
          transform: "translate(0, 0) scale(1.3)",
          opacity: 0,
          transition: "none",
          zIndex: 60,
        };
      }
      return {
        position: "fixed",
        top: "35%",
        left: "-320px",
        transform: "translate(0, 0) scale(1.3)",
        opacity: 0,
        transition: "none",
        zIndex: 60,
      };
    }

    if (cometPhase === "page3-landing") {
      if (landingRef.current) {
        const rect = landingRef.current.getBoundingClientRect();
        return {
          position: "fixed",
          top: `${rect.top + rect.height / 2 - 110}px`,
          left: `${rect.left + rect.width / 2 - 160}px`,
          transform: "translate(0, 0) scale(1.3)",
          opacity: 1,
          transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          zIndex: 60,
        };
      }
      return {
        position: "fixed",
        top: "35%",
        left: "50%",
        transform: "translate(-50%, 0) scale(1.3)",
        opacity: 1,
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        zIndex: 60,
      };
    }

    if (cometPhase === "page3-landed") {
      if (landingRef.current) {
        const rect = landingRef.current.getBoundingClientRect();
        return {
          position: "fixed",
          top: `${rect.top + rect.height / 2 - 110}px`,
          left: `${rect.left + rect.width / 2 - 160}px`,
          transform: "translate(0, 0) scale(1.3)",
          opacity: 1,
          transition: "opacity 0.5s ease",
          zIndex: 60, // Above Page 3 backdrop
        };
      }
      return {
        position: "fixed",
        top: "35%",
        left: "50%",
        transform: "translate(-50%, 0) scale(1.3)",
        opacity: 1,
        zIndex: 60,
      };
    }

    if (cometPhase === "page3-exiting") {
      if (landingRef.current) {
        const rect = landingRef.current.getBoundingClientRect();
        return {
          position: "fixed",
          top: `${rect.top + rect.height / 2 - 110}px`,
          left: "100%",
          transform: "translate(50%, 0) scale(1.3)",
          opacity: 1,
          transition: "all 0.45s cubic-bezier(0.42, 0, 0.58, 1)",
          zIndex: 60, 
        };
      }
      return {
        position: "fixed",
        top: "35%",
        left: "100%",
        transform: "translate(50%, 0) scale(1.3)",
        opacity: 1,
        transition: "all 1s cubic-bezier(0.42, 0, 0.58, 1)",
        zIndex: 60,
      };
    }

    if (cometPhase === "page4-entering") {
      const el = document.getElementById("page4-landing-target");
      const top = el ? `${el.getBoundingClientRect().top - 60}px` : "15%";
      return {
        position: "fixed", top, left: "-320px", transform: "translate(0, 0) scale(1.3)", opacity: 1, transition: "none", zIndex: 60,
      };
    }

    if (cometPhase === "page4-landing") {
      const el = document.getElementById("page4-landing-target");
      const top = el ? `${el.getBoundingClientRect().top - 60}px` : "15%";
      const left = el ? `${el.getBoundingClientRect().left}px` : "50%";
      return {
        position: "fixed", top, left, transform: left === "50%" ? "translate(-50%, 0) scale(1.3)" : "translate(0, 0) scale(1.3)", opacity: 1, 
        transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)", zIndex: 60,
      };
    }

    if (cometPhase === "page4-landed") {
      const el = document.getElementById("page4-landing-target");
      const top = el ? `${el.getBoundingClientRect().top - 60}px` : "15%";
      const left = el ? `${el.getBoundingClientRect().left}px` : "50%";
      return {
        position: "fixed", top, left, transform: left === "50%" ? "translate(-50%, 0) scale(1.3)" : "translate(0, 0) scale(1.3)", opacity: 1, 
        transition: "opacity 0.5s ease", zIndex: 60,
      };
    }

    if (cometPhase === "page4-exiting") {
      const el = document.getElementById("page4-landing-target");
      const top = el ? `${el.getBoundingClientRect().top - 60}px` : "15%";
      return {
        position: "fixed", top, left: "100%", transform: "translate(50%, 0) scale(1.3)", opacity: 1, 
        transition: "all 0.4s cubic-bezier(0.42, 0, 0.58, 1)", zIndex: 60,
      };
    }

    if (cometPhase === "page5-hidden") {
      return {
        position: "fixed", top: "-200px", left: "-400px",
        opacity: 0, transition: "opacity 0.3s ease", zIndex: 60,
      };
    }

  }, [cometPhase]);

  // Generate random stars for the splash background
  const stars = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 4,
      duration: Math.random() * 2 + 2,
      opacity: Math.random() * 0.6 + 0.4,
    }));
  }, []);

  // Filter subjects based on search
  const filteredSubjects = SUBJECTS.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  const sweepComet = useCallback((callback: () => void, fromPhase: string, toPhase: string) => {
    setCometPhase(`${fromPhase}-exiting`);
    setTimeout(() => {
      callback();
      setCometPhase(`${toPhase}-entering`);
      setTimeout(() => {
        setCometPhase(`${toPhase}-landing`);
      }, 100);
      setTimeout(() => {
        setCometPhase(`${toPhase}-landed`);
      }, 850); 
    }, 500); 
  }, []);

  const handleSubjectClick = (subject: string) => {
    // Sweep off to right from Page 2 fast
    setCometPhase("page2-exiting");
    setTimeout(() => {
      setSelectedSubject(subject);
      setCometPhase("page3-entering");
      setTimeout(() => {
        setCometPhase("page3-landing");
      }, 100);
      setTimeout(() => {
        setCometPhase("page3-landed");
      }, 850); 
    }, 500); 
  };

  const handleBackToPage2 = () => {
    // Sweep off to right from Page 3 fast
    setCometPhase("page3-exiting");
    setTimeout(() => {
      // Render Page 2
      setSelectedSubject(null);
      // Move offstage left
      setCometPhase("entering");
      setTimeout(() => {
        setCometPhase("landing");
      }, 100);
      setTimeout(() => {
        setCometPhase("landed");
      }, 1250);
    }, 500);
  };

  return (
    <>
      {/* ── Persistent Flying Comet ─────────────────────── */}
      <div
        ref={cometRef}
        className={`flying-comet pointer-events-none ${cometPhase === "landed" ? "comet-float" : ""
          } ${cometPhase === "resting" ? "comet-glow-pulse" : ""}`}
        style={getCometStyle()}
      >
        <svg
          width="320"
          height="70"
          viewBox="0 0 320 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="tail-fade-fly" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id="star-glow-fly" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="40%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <polygon points="20,35 288,28 288,42" fill="url(#tail-fade-fly)" />
          <line x1="80" y1="35" x2="288" y2="35" stroke="white" strokeOpacity="0.85" strokeWidth="2" strokeLinecap="round" />
          <circle cx="290" cy="35" r="30" fill="url(#star-glow-fly)" />
          <polygon points="290,10 295.5,25.5 312,25.5 299,35 303.5,50 290,40 276.5,50 281,35 268,25.5 284.5,25.5" fill="white" />
        </svg>
      </div>

      {/* ── Splash Screen ───────────────────────────────── */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center splash-bg transition-opacity duration-700 ${fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
          {/* Starfield background */}
          <div className="absolute inset-0 overflow-hidden">
            {stars.map((star) => (
              <div
                key={star.id}
                className="star-dot"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                }}
              />
            ))}
          </div>

          {/* Invisible spacer to keep layout — real comet is the persistent one above */}
          <div ref={splashCometSlotRef} className="mb-10" style={{ width: 320, height: 70 }} />

          <h1
            className="text-5xl sm:text-7xl md:text-8xl tracking-tight text-foreground animate-fade-rise"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Skill Bridge
          </h1>

          <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg mt-5 tracking-wide">
            A comet's path to smarter learning.
          </p>
        </div>
      )}

      {/* ── Main Homepage ───────────────────────────────── */}
      <div className="relative min-h-screen overflow-hidden flex flex-col">
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

        {/* Lighter overlay for brighter background */}
        <div className="absolute inset-0 z-[1] bg-black/20" />

        {/* ── Top Bar: Title left, Search right ────────────── */}
        <header className="relative z-10 flex items-center justify-between px-8 sm:px-12 pt-10 pb-4">
          <div className="animate-fade-rise">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl tracking-tight text-foreground leading-none"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Skill Bridge
            </h1>
          </div>

          <div className="animate-fade-rise-delay hidden sm:flex items-center gap-6 mt-6 md:mr-6 lg:mr-12">
            <div className="search-glass flex items-center rounded-full px-7 py-7 w-[420px] md:w-[500px]">
              <svg
                className="w-5 h-5 text-white/50 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search subjects, courses, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-white text-base placeholder:text-white/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-white/50 hover:text-white ml-2 cursor-pointer text-sm"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-3">
              {userProfile && (
                <span className="text-white/90 font-medium animate-fade-in pr-1 truncate max-w-[100px] sm:max-w-none">
                  {userProfile.name}
                </span>
              )}
              <button 
                onClick={() => userProfile ? setShowDashboard(true) : setShowAuthModal(true)}
                className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full border border-white/20 bg-black/40 hover:bg-white/10 transition-colors shadow-lg overflow-hidden relative group"
              >
                {userProfile ? (
                  userProfile.imageUrl ? (
                    <img src={userProfile.imageUrl} alt={userProfile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                      {userProfile.initial}
                    </div>
                  )
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 transition-opacity"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* ── Mobile Search (visible on small screens) ─────── */}
        <div className="relative z-10 px-8 sm:hidden mb-4">
          <div className="search-glass flex items-center rounded-full px-7 py-7">
            <svg className="w-5 h-5 text-white/50 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-white text-base placeholder:text-white/40"
            />
          </div>
        </div>

        {/* ── Center content vertically in remaining space ──── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center">

          {/* Comet landing target — invisible marker */}
          <div className="relative w-full flex justify-center">
            {userProfile && (
              <div 
                className="absolute bottom-[calc(100%+5rem)] sm:bottom-[calc(100%+7rem)] animate-fade-rise-and-out w-max max-w-[90vw] text-center" 
                style={{ animationDelay: '0.4s' }}
              >
                <h3 
                  className="text-3xl sm:text-4xl md:text-5xl tracking-tight" 
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  <span className="text-white/60">
                    {isNewUser ? 'Welcome ' : 'Welcome back '}
                  </span>
                  <span className="text-foreground">{userProfile.name}</span>
                </h3>
              </div>
            )}
            <div ref={landingRef} className="comet-landing-target" />
          </div>

          {/* Section Label */}
          <div className="text-center mb-12">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Explore Subjects
            </h2>
            <p className="text-white/40 text-sm sm:text-base mt-2">Swipe to explore →</p>
          </div>

          {/* Subject Cards */}
          <div className="w-full px-8 sm:px-12">
            <div className="subject-scroll flex gap-5 overflow-x-auto pb-8">
              {filteredSubjects.map((subject, index) => (
                <button
                  key={subject.name}
                  onClick={() => handleSubjectClick(subject.name)}
                  className="subject-card group shrink-0 cursor-pointer"
                  style={{ animationDelay: `${0.04 * index}s` }}
                >
                  <div className="water-drop-card rounded-3xl px-8 py-8 flex items-center justify-center w-[240px] sm:w-[260px] h-[140px] sm:h-[160px] relative overflow-hidden">
                    <h3 className="text-white font-medium text-base sm:text-lg text-center leading-snug relative z-10 group-hover:scale-105 transition-transform duration-300">
                      {subject.name}
                    </h3>
                  </div>
                </button>
              ))}

              {filteredSubjects.length === 0 && (
                <div className="flex items-center justify-center min-w-[300px] min-h-[160px] text-white/60">
                  <p className="text-lg">No subjects match "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Page 3: Specialization Page ──────────────────── */}
      {!showDashboard && selectedSubject && (
        <SpecializationPage
          subject={selectedSubject}
          onBack={handleBackToPage2}
          onHome={handleBackToPage2}
          sweepComet={sweepComet}
          setCometPhase={setCometPhase}
        />
      )}

      {/* ── Dashboard Page ───────────────────────────────── */}
      {showDashboard && userProfile && (
        <DashboardPage 
          user={userProfile} 
          onBack={() => setShowDashboard(false)} 
          onLogout={handleLogout} 
        />
      )}

      {/* ── Auth Modal ───────────────────────────────────── */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}
    </>
  );
}

export default App;

