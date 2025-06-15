import { Font, User, Designer, BlogPost, Purchase } from '@/types/font';

// Mock data for demonstration
const mockFonts: Font[] = [
  {
    id: '1',
    name: 'Cyber Grotesk',
    designer: 'Digital Studio',
    category: 'sans-serif',
    pricingTier: 'free',
    languages: ['English', 'Latin'],
    tags: ['modern', 'tech', 'futuristic'],
    description: 'A futuristic sans-serif font perfect for Web3 and tech projects.',
    fileUrl: '/fonts/cyber-grotesk.ttf',
    fileFormat: 'ttf',
    fileSize: 245000,
    downloads: 1250,
    uploadDate: '2024-01-15',
    uploadedBy: 'admin',
    featured: true,
    trending: true
  },
  {
    id: '2',
    name: 'Neon Dreams',
    designer: 'Future Type',
    category: 'display',
    pricingTier: 'freemium',
    languages: ['English'],
    tags: ['neon', 'glow', 'display', 'headers'],
    description: 'Bold display font with neon-inspired aesthetics for headlines.',
    fileUrl: '/fonts/neon-dreams.otf',
    fileFormat: 'otf',
    fileSize: 180000,
    downloads: 890,
    uploadDate: '2024-01-10',
    uploadedBy: 'admin',
    featured: true,
    trending: false,
    previewUrl: '/fonts/neon-dreams-preview.otf'
  },
  {
    id: '3',
    name: 'Holographic Serif',
    designer: 'Quantum Design',
    category: 'serif',
    pricingTier: 'premium',
    languages: ['English', 'French', 'German'],
    tags: ['elegant', 'holographic', 'premium'],
    description: 'Elegant serif with holographic-inspired details.',
    fileUrl: '/fonts/holographic-serif.ttf',
    fileFormat: 'ttf',
    fileSize: 320000,
    downloads: 675,
    uploadDate: '2024-01-08',
    uploadedBy: 'admin',
    featured: false,
    trending: true,
    price: 29.99
  },
  {
    id: '4',
    name: 'Crypto Icons',
    designer: 'Symbol Masters',
    category: 'symbol',
    pricingTier: 'free',
    languages: ['Universal'],
    tags: ['crypto', 'blockchain', 'icons', 'symbols'],
    description: 'Complete set of cryptocurrency and blockchain symbols.',
    fileUrl: '/fonts/crypto-icons.ttf',
    fileFormat: 'ttf',
    fileSize: 150000,
    downloads: 2100,
    uploadDate: '2024-01-12',
    uploadedBy: 'admin',
    featured: true,
    trending: true
  }
];

const mockDesigners: Designer[] = [
  {
    id: '1',
    name: 'Digital Studio',
    bio: 'Pioneering digital typography for the Web3 era. Specializing in futuristic and tech-inspired fonts.',
    website: 'https://digitalstudio.design',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    joinDate: '2023-06-15',
    totalFonts: 12,
    totalDownloads: 15420,
    featured: true,
    socialLinks: {
      twitter: 'https://twitter.com/digitalstudio',
      dribbble: 'https://dribbble.com/digitalstudio'
    }
  },
  {
    id: '2',
    name: 'Future Type',
    bio: 'Creating tomorrow\'s typography today. Award-winning type foundry focused on innovative display fonts.',
    website: 'https://futuretype.co',
    avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    joinDate: '2023-08-22',
    totalFonts: 8,
    totalDownloads: 9850,
    featured: true,
    socialLinks: {
      instagram: 'https://instagram.com/futuretype',
      behance: 'https://behance.net/futuretype'
    }
  },
  {
    id: '3',
    name: 'Quantum Design',
    bio: 'Exploring the intersection of quantum physics and typography. Creating fonts that bend reality.',
    joinDate: '2023-09-10',
    totalFonts: 6,
    totalDownloads: 7200,
    featured: false
  }
];

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Typography in Web3',
    slug: 'future-typography-web3',
    excerpt: 'Exploring how blockchain technology and decentralized design are reshaping the world of digital typography.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    author: 'Digital Studio',
    publishDate: '2024-01-20',
    readTime: 8,
    tags: ['web3', 'typography', 'blockchain', 'design'],
    featured: true,
    coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'Creating Neon Effects with Display Fonts',
    slug: 'neon-effects-display-fonts',
    excerpt: 'Learn how to create stunning neon glow effects using modern display fonts and CSS techniques.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    author: 'Future Type',
    publishDate: '2024-01-18',
    readTime: 6,
    tags: ['design', 'css', 'neon', 'effects'],
    featured: false,
    coverImage: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    title: 'Symbol Fonts: The Ultimate Guide',
    slug: 'symbol-fonts-ultimate-guide',
    excerpt: 'Everything you need to know about creating and using symbol fonts in modern web design.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    author: 'Symbol Masters',
    publishDate: '2024-01-15',
    readTime: 10,
    tags: ['symbols', 'icons', 'fonts', 'guide'],
    featured: true,
    coverImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const mockUsers: User[] = [
  {
    id: 'admin',
    username: 'admin',
    email: 'admin@fontspace.web3',
    joinDate: '2024-01-01',
    uploadedFonts: ['1', '2', '3', '4'],
    totalDownloads: 4915
  },
  {
    id: 'user1',
    username: 'TypeMaster',
    email: 'typemaster@example.com',
    joinDate: '2024-01-15',
    uploadedFonts: [],
    totalDownloads: 0,
    bio: 'Passionate about typography and design. Always looking for the perfect font for my projects.',
    title: 'UI/UX Designer',
    location: 'San Francisco, CA',
    website: 'https://typemaster.design',
    verified: true,
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    socialLinks: {
      twitter: 'https://twitter.com/typemaster',
      github: 'https://github.com/typemaster',
      dribbble: 'https://dribbble.com/typemaster'
    }
  }
];

const mockPurchases: Purchase[] = [
  {
    id: 'purchase1',
    userId: 'user1',
    fontId: '3',
    amount: 29.99,
    purchaseDate: '2024-01-20',
    public: true
  }
];

export const storage = {
  // Fonts
  getFonts: (): Font[] => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fonts');
      return stored ? JSON.parse(stored) : mockFonts;
    }
    return mockFonts;
  },

  saveFont: (font: Font): void => {
    if (typeof window !== 'undefined') {
      const fonts = storage.getFonts();
      const updatedFonts = [...fonts, font];
      localStorage.setItem('fonts', JSON.stringify(updatedFonts));
    }
  },

  getFontById: (id: string): Font | undefined => {
    return storage.getFonts().find(font => font.id === id);
  },

  updateFontDownloads: (id: string): void => {
    if (typeof window !== 'undefined') {
      const fonts = storage.getFonts();
      const updatedFonts = fonts.map(font => 
        font.id === id ? { ...font, downloads: font.downloads + 1 } : font
      );
      localStorage.setItem('fonts', JSON.stringify(updatedFonts));
    }
  },

  // Designers
  getDesigners: (): Designer[] => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('designers');
      return stored ? JSON.parse(stored) : mockDesigners;
    }
    return mockDesigners;
  },

  getDesignerById: (id: string): Designer | undefined => {
    return storage.getDesigners().find(designer => designer.id === id);
  },

  getDesignerByName: (name: string): Designer | undefined => {
    return storage.getDesigners().find(designer => designer.name === name);
  },

  // Blog Posts
  getBlogPosts: (): BlogPost[] => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('blogPosts');
      return stored ? JSON.parse(stored) : mockBlogPosts;
    }
    return mockBlogPosts;
  },

  getBlogPostBySlug: (slug: string): BlogPost | undefined => {
    return storage.getBlogPosts().find(post => post.slug === slug);
  },

  // Users
  getUsers: (): User[] => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('users');
      return stored ? JSON.parse(stored) : mockUsers;
    }
    return mockUsers;
  },

  saveUser: (user: User): void => {
    if (typeof window !== 'undefined') {
      const users = storage.getUsers();
      const updatedUsers = [...users, user];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  },

  getUserByEmail: (id: string): User | undefined => {
    return storage.getUsers().find(user => user?.id === id);
  },

  getUserById: (id: string): User | undefined => {
    return storage.getUsers().find(user => user.id === id);
  },

  // Purchases
  getPurchases: (): Purchase[] => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('purchases');
      return stored ? JSON.parse(stored) : mockPurchases;
    }
    return mockPurchases;
  },

  getUserPurchases: (userId: string): Purchase[] => {
    const purchases = storage.getPurchases();
    const fonts = storage.getFonts();
    
    return purchases
      .filter(purchase => purchase.userId === userId)
      .map(purchase => ({
        ...purchase,
        font: fonts.find(font => font.id === purchase.fontId)
      }));
  },

  savePurchase: (purchase: Purchase): void => {
    if (typeof window !== 'undefined') {
      const purchases = storage.getPurchases();
      const updatedPurchases = [...purchases, purchase];
      localStorage.setItem('purchases', JSON.stringify(updatedPurchases));
    }
  },

  // Auth
  getCurrentUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  },

  setCurrentUser: (user: User | null): void => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser');
      }
    }
  }
};

export {mockUsers}