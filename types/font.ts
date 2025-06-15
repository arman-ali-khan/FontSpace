export interface Font {
  id: string;
  name: string;
  designer: string;
  category: 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace' | 'symbol';
  pricingTier: 'free' | 'freemium' | 'premium';
  languages: string[];
  tags: string[];
  description: string;
  previewImage?: string;
  fileUrl: string;
  fileFormat: 'ttf' | 'otf' | 'zip';
  fileSize: number;
  downloads: number;
  uploadDate: string;
  uploadedBy: string;
  featured: boolean;
  trending: boolean;
  price?: number; // For premium fonts
  previewUrl?: string; // For freemium fonts
}

export interface User {
  id: string;
  username: string;
  email: string;
  joinDate: string;
  uploadedFonts: string[];
  totalDownloads: number;
  bio?: string;
  website?: string;
  avatar?: string;
  title?: string;
  location?: string;
  verified?: boolean;
  isDesigner?: boolean; // New field to track designer status
  designerApplicationStatus?: 'none' | 'pending' | 'approved' | 'rejected'; // New field
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    github?: string;
    dribbble?: string;
    behance?: string;
  };
}

export interface Designer {
  id: string;
  name: string;
  bio: string;
  website?: string;
  avatar?: string;
  joinDate: string;
  totalFonts: number;
  totalDownloads: number;
  featured: boolean;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    dribbble?: string;
    behance?: string;
  };
}

export interface DesignerApplication {
  id: string;
  userId: string;
  displayName: string;
  bio: string;
  website?: string;
  portfolio?: string;
  experience: string;
  motivation: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    github?: string;
    dribbble?: string;
    behance?: string;
  };
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewDate?: string;
  reviewNotes?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: number;
  tags: string[];
  featured: boolean;
  coverImage?: string;
}

export interface Purchase {
  id: string;
  userId: string;
  fontId: string;
  amount: number;
  purchaseDate: string;
  public: boolean; // Whether to show this purchase publicly
  font?: Font; // Populated font data
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}