import { User } from '@/types/font';
import { storage } from './storage';

export const auth = {
  login: async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    // Simple authentication - in real app would use proper auth
    const user = storage.getUserByEmail(email);
    
    if (user && password === 'password') { // Mock password check
      storage.setCurrentUser(user);
      return { success: true, user };
    }
    
    return { success: false, error: 'Invalid credentials' };
  },

  register: async (username: string, email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    const existingUser = storage.getUserByEmail(email);
    
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      joinDate: new Date().toISOString().split('T')[0],
      uploadedFonts: [],
      totalDownloads: 0
    };

    storage.saveUser(newUser);
    storage.setCurrentUser(newUser);
    
    return { success: true, user: newUser };
  },

  logout: (): void => {
    storage.setCurrentUser(null);
  },

  getCurrentUser: (): User | null => {
    return storage.getCurrentUser();
  },

  isAuthenticated: (): boolean => {
    return storage.getCurrentUser() !== null;
  }
};