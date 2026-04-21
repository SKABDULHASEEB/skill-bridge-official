export interface CourseItem {
  id: string;
  title: string;
  source: string;
  type: 'free' | 'paid' | 'certification' | 'history';
  url: string;
  timestamp: number;
}

export interface UserProfile {
  name: string;
  initial: string;
  imageUrl?: string;
}

const STORAGE_KEYS = {
  USER: 'sb_user_profile',
};

const getKeys = (userName: string) => ({
  HISTORY: `sb_history_${userName}`,
  ENROLLED: `sb_enrolled_${userName}`
});

// Accounts Registry (Mock Database)
export const registerAccount = (username: string, password: string): boolean => {
  if (!username || !password) return false;
  const accountsStr = localStorage.getItem('sb_accounts');
  const accounts: Record<string, { password: string }> = accountsStr ? JSON.parse(accountsStr) : {};
  
  if (accounts[username]) {
    return false; // Account already exists
  }
  
  accounts[username] = { password };
  localStorage.setItem('sb_accounts', JSON.stringify(accounts));
  return true;
};

export const verifyLogin = (username: string, password: string): boolean => {
  if (!username) return false;
  const accountsStr = localStorage.getItem('sb_accounts');
  const accounts: Record<string, { password: string }> = accountsStr ? JSON.parse(accountsStr) : {};
  
  const acct = accounts[username];
  if (!acct) return false; // Username does not exist
  
  return acct.password === password;
};

// User Profile
export const getUserProfile = (): UserProfile | null => {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
};

export const saveUserProfile = (name: string, imageUrl?: string): UserProfile => {
  const profile: UserProfile = {
    name,
    initial: name.charAt(0).toUpperCase(),
    imageUrl
  };
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(profile));
  return profile;
};

export const logoutUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Course History (Last 50 items)
export const getHistory = (userName: string): CourseItem[] => {
  if (!userName) return [];
  const keys = getKeys(userName);
  const data = localStorage.getItem(keys.HISTORY);
  return data ? JSON.parse(data) : [];
};

export const addToHistory = (userName: string, item: Omit<CourseItem, 'id' | 'timestamp'>) => {
  if (!userName) return;
  const history = getHistory(userName);
  const newItem: CourseItem = {
    ...item,
    id: `${item.title}-${Date.now()}`,
    timestamp: Date.now()
  };
  
  // Remove duplicate if it already exists (move to top)
  const filtered = history.filter(h => h.title !== item.title || h.url !== item.url);
  const updated = [newItem, ...filtered].slice(0, 50); // Keep last 50
  
  const keys = getKeys(userName);
  localStorage.setItem(keys.HISTORY, JSON.stringify(updated));
};

// Enrolled Courses (Free, Paid, Certifications)
export const getEnrolledCourses = (userName: string): CourseItem[] => {
  if (!userName) return [];
  const keys = getKeys(userName);
  const data = localStorage.getItem(keys.ENROLLED);
  return data ? JSON.parse(data) : [];
};

export const enrollInCourse = (userName: string, item: Omit<CourseItem, 'id' | 'timestamp'>) => {
  if (!userName) return;
  const enrolled = getEnrolledCourses(userName);
  
  // Prevent duplicate enrollment
  if (enrolled.some(c => c.url === item.url)) {
    return;
  }
  
  const newItem: CourseItem = {
    ...item,
    id: `${item.title}-${Date.now()}`,
    timestamp: Date.now()
  };
  
  const keys = getKeys(userName);
  localStorage.setItem(keys.ENROLLED, JSON.stringify([newItem, ...enrolled]));
};

export const unenrollCourse = (userName: string, url: string) => {
  if (!userName) return;
  const enrolled = getEnrolledCourses(userName);
  const updated = enrolled.filter(c => c.url !== url);
  const keys = getKeys(userName);
  localStorage.setItem(keys.ENROLLED, JSON.stringify(updated));
};
