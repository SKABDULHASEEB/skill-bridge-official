import React, { useState, useEffect } from 'react';
import type { CourseItem, UserProfile } from './lib/storage';
import { getHistory, getEnrolledCourses } from './lib/storage';

interface DashboardPageProps {
  user: UserProfile;
  onBack: () => void;
  onLogout: () => void;
}

const TABS = ['My Free Courses', 'My Paid Courses', 'My Certifications', 'History'];

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [history, setHistory] = useState<CourseItem[]>([]);
  const [enrolled, setEnrolled] = useState<CourseItem[]>([]);

  useEffect(() => {
    setHistory(getHistory(user.name));
    setEnrolled(getEnrolledCourses(user.name));
  }, [user.name]);

  const getFilteredCourses = () => {
    if (activeTab === 'History') return history;
    if (activeTab === 'My Free Courses') return enrolled.filter(c => c.type === 'free');
    if (activeTab === 'My Paid Courses') return enrolled.filter(c => c.type === 'paid');
    if (activeTab === 'My Certifications') return enrolled.filter(c => c.type === 'certification');
    return [];
  };

  const displayedCourses = getFilteredCourses();

  const handleCourseClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-40 bg-black overflow-y-auto animate-fade-in custom-scrollbar">
      {/* Background stays transparent to show the video behind it if it's rendered,
          but actually App.tsx will just render this inside the main container. 
          Let's make sure it has its own glass effects */}
      <div className="min-h-screen pb-20">
        
        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-8 sm:px-12 pt-10 pb-4">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              <span className="font-medium tracking-wide text-lg">Explore</span>
            </button>
            <div className="w-px h-6 bg-white/20 hidden sm:block"></div>
            <h1 className="text-3xl sm:text-4xl tracking-tight text-white hidden sm:block" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Commander's Log
            </h1>
          </div>

          <div className="flex items-center gap-6 mr-8 md:mr-16 lg:mr-24">
            <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-xl font-bold text-white shadow-lg overflow-hidden">
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.initial
                )}
              </div>
              <span className="text-white/90 font-medium text-xl pr-4">{user.name}</span>
            </div>
            
            <button 
              onClick={onLogout}
              className="p-3.5 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors border border-red-500/20"
              title="Logout"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="px-8 sm:px-12 max-w-7xl mx-auto mt-12 relative z-10">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-12 border-b border-white/10 pb-1">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm sm:text-base font-medium rounded-t-xl transition-all relative ${
                  activeTab === tab 
                    ? 'text-white' 
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                )}
              </button>
            ))}
          </div>

          {/* Grid */}
          {displayedCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
              <div className="w-24 h-24 mb-6 opacity-40">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <h3 className="text-3xl text-white/70 font-medium mb-4 text-center">It's quiet out here...</h3>
              <p className="text-white/40 text-lg max-w-xl text-center">
                You haven't added any courses to this section yet. Explore the universe to find your next mission!
              </p>
              <button 
                onClick={onBack}
                className="mt-10 px-10 py-4 shadow-lg rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all border border-blue-500/30 text-lg font-bold tracking-wide"
              >
                Go Explore
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedCourses.map((course, idx) => (
                <div 
                  key={course.id || idx}
                  className="group relative bg-[#0f172a]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-[#1e293b]/80 hover:border-blue-500/30 transition-all duration-300 cursor-pointer flex flex-col h-full"
                  onClick={() => handleCourseClick(course.url)}
                >
                  <div className="mb-4">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full">
                      {course.source}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white/90 leading-snug mb-3 group-hover:text-blue-300 transition-colors flex-1">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-xs text-white/40">
                      {new Date(course.timestamp).toLocaleDateString()}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-hover:text-blue-400 transition-colors transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
