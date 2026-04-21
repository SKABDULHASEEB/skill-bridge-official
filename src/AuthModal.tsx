import React, { useState, useEffect } from 'react';
import { useSignIn, useSignUp } from '@clerk/clerk-react';
import type { UserProfile } from './lib/storage';
import { getUserProfile, logoutUser, registerAccount, verifyLogin } from './lib/storage';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (name: string, isSignUp?: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setCurrentUser(getUserProfile());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError("Passwords do not match. Please try again!");
        return;
      }
      
      const success = registerAccount(username, password);
      if (!success) {
        setError("Username already exists! Please choose a different one or login to your existing account.");
        return;
      }
      
      onLogin(username, true);
    } else {
      const success = verifyLogin(username, password);
      if (!success) {
        setError("Invalid username or password. Please try again!");
        return;
      }
      
      onLogin(username, false);
    }
  };

  const handleGoogleLogin = () => {
    if (!signIn) return;
    try {
      signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/?login=true",
        redirectUrlComplete: "/?login=true"
      });
    } catch (e) {
      alert("Error parsing OAuth request");
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'signup' : 'login');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
  };

  const handleSwitchAccount = () => {
    logoutUser();
    setCurrentUser(null);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal - Highly transparent glassmorphic */}
      <div 
        className="relative w-full bg-black/40 border border-white/20 rounded-[2rem] shadow-2xl backdrop-blur-2xl animate-fade-rise flex flex-col gap-6"
        style={{ 
          maxWidth: '34rem',
          padding: '3.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.05)' 
        }}
      >
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {currentUser ? (
          /* Welcome Back Screen */
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-500 shadow-lg shadow-fuchsia-500/20 flex items-center justify-center text-3xl text-white font-bold border-2 border-white/30 uppercase">
                {currentUser.imageUrl ? (
                  <img src={currentUser.imageUrl} alt={currentUser.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  currentUser.initial
                )}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
                Welcome back,
              </h2>
              <p className="text-2xl text-white font-medium mt-1">
                {currentUser.name}
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full mt-4">
              <button
                onClick={() => onLogin(currentUser.name)}
                className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-lg shadow-fuchsia-500/20 text-white font-bold text-sm sm:text-base py-3.5 sm:py-4 tracking-wider transition-all transform hover:scale-[1.02] active:scale-95 uppercase"
              >
                CONTINUE TO YOUR MISSION
              </button>
              
              <button
                onClick={handleSwitchAccount}
                className="text-white/50 hover:text-white text-sm font-medium transition-colors uppercase tracking-widest mt-2"
              >
                Sign out / Switch account
              </button>
            </div>
          </div>
        ) : (
          /* Login/Signup Forms */
          <>
            {/* Photo Circle */}
            <div className="flex justify-center mt-2">
              <button className="w-16 h-16 rounded-full border border-dashed border-white/40 bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-1 transition-colors group cursor-pointer overflow-hidden shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 group-hover:text-white group-hover:scale-110 transition-transform">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                <span className="text-[8px] text-white/50 font-medium uppercase tracking-wider group-hover:text-white transition-colors">Add Photo</span>
              </button>
            </div>

            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                {mode === 'login' ? 'Login' : 'Sign Up'}
              </h2>
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium py-3 px-4 rounded-xl text-center shadow-lg shadow-red-500/5 animate-fade-rise">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full mt-2">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-sm font-medium text-white/70">Username</label>
                <div className="relative flex items-center border-b border-white/30 focus-within:border-white transition-colors pb-2 mt-2">
                  <svg className="w-5 h-5 text-white/50 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Type your username"
                    className="w-full bg-transparent text-white text-base placeholder:text-white/30 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label className="text-sm font-medium text-white/70">Password</label>
                <div className="relative flex items-center border-b border-white/30 focus-within:border-white transition-colors pb-2 mt-2">
                  <svg className="w-5 h-5 text-white/50 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type your password"
                    className="w-full bg-transparent text-white text-base placeholder:text-white/30 focus:outline-none min-w-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-white/40 hover:text-white transition-colors ml-2 focus:outline-none shrink-0"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-sm font-medium text-white/70">Confirm Password</label>
                  <div className="relative flex items-center border-b border-white/30 focus-within:border-white transition-colors pb-2 mt-2">
                    <svg className="w-5 h-5 text-white/50 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full bg-transparent text-white text-base placeholder:text-white/30 focus:outline-none min-w-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-white/40 hover:text-white transition-colors ml-2 focus:outline-none shrink-0"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div className="flex justify-end pt-1">
                  <button type="button" className="text-xs sm:text-sm font-medium text-white/60 hover:text-white transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <div className="mt-2 text-center w-full">
                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-lg shadow-fuchsia-500/20 text-white font-bold text-sm sm:text-base py-3.5 sm:py-4 tracking-wider transition-all transform hover:scale-[1.02] active:scale-95 uppercase"
                >
                  {mode === 'login' ? 'LOGIN' : 'SIGN UP'}
                </button>
              </div>
            </form>

            
            {/* Footer */}
            <div className="flex flex-col items-center gap-2 mt-4 pb-2">
              <p className="text-white/50 text-xs sm:text-sm font-medium">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button 
                onClick={toggleMode}
                className="text-white font-semibold text-sm hover:text-cyan-400 transition-colors tracking-wide uppercase"
              >
                {mode === 'login' ? 'SIGN UP' : 'LOGIN'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
