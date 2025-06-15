'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Moon, Sun, Upload, User, LogOut, Menu, X, 
  Home, Search, Users, BookOpen, Crown, 
  Zap, Gift, Hash
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { auth } from '@/lib/auth';
import { User as UserType } from '@/types/font';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<UserType | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    auth.logout();
    setUser(null);
    window.location.href = '/';
  };

  const categories = [
    { name: 'Free Fonts', href: '/browse?pricing=free', icon: Gift, color: 'text-green-400' },
    { name: 'Freemium', href: '/browse?pricing=freemium', icon: Zap, color: 'text-yellow-400' },
    { name: 'Premium', href: '/browse?pricing=premium', icon: Crown, color: 'text-purple-400' },
    { name: 'Symbol Fonts', href: '/browse?category=symbol', icon: Hash, color: 'text-cyan-400' }
  ];

  const fontTypes = [
    { name: 'Sans Serif', href: '/browse?category=sans-serif' },
    { name: 'Serif', href: '/browse?category=serif' },
    { name: 'Display', href: '/browse?category=display' },
    { name: 'Handwriting', href: '/browse?category=handwriting' },
    { name: 'Monospace', href: '/browse?category=monospace' }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              FontSpace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <button className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
                <Search className="h-4 w-4" />
                <span>Browse Fonts</span>
              </button>
              
              {/* Mega Menu */}
              {showMegaMenu && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-card/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl p-6">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Categories */}
                    <div>
                      <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wide mb-3">
                        By Pricing
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                          >
                            <category.icon className={`h-5 w-5 ${category.color} group-hover:scale-110 transition-transform`} />
                            <span className="text-sm font-medium text-foreground group-hover:text-white">
                              {category.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Font Types */}
                    <div>
                      <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wide mb-3">
                        By Style
                      </h3>
                      <div className="space-y-1">
                        {fontTypes.map((type) => (
                          <Link
                            key={type.name}
                            href={type.href}
                            className="block px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                          >
                            {type.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/designers" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
              <Users className="h-4 w-4" />
              <span>Designers</span>
            </Link>

            <Link href="/blog" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
              <BookOpen className="h-4 w-4" />
              <span>Blog</span>
            </Link>

            {user && (
              <Link href="/upload" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="hover:bg-white/10"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/dashboard">
                  <Button variant="ghost" className="hover:bg-white/10">
                    <User className="h-4 w-4 mr-2" />
                    {user.username}
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="hover:bg-white/10">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" className="hover:bg-white/10">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              
              {/* Mobile Categories */}
              <div className="space-y-2">
                <span className="text-sm font-semibold text-foreground/60 uppercase tracking-wide">Browse Fonts</span>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="flex items-center space-x-3 pl-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
                  >
                    <category.icon className={`h-4 w-4 ${category.color}`} />
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>

              <Link href="/designers" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
                <Users className="h-4 w-4" />
                <span>Designers</span>
              </Link>

              <Link href="/blog" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
                <BookOpen className="h-4 w-4" />
                <span>Blog</span>
              </Link>

              {user && (
                <Link href="/upload" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
                  <Upload className="h-4 w-4" />
                  <span>Upload Font</span>
                </Link>
              )}
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="hover:bg-white/10"
                >
                  {theme === 'light' ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                  {theme === 'light' ? 'Dark' : 'Light'}
                </Button>

                {user ? (
                  <div className="flex items-center space-x-2">
                    <Link href="/dashboard">
                      <Button variant="ghost" size="sm" className="hover:bg-white/10">
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:bg-white/10">
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link href="/login">
                      <Button variant="ghost" size="sm" className="hover:bg-white/10">Login</Button>
                    </Link>
                    <Link href="/register">
                      <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}