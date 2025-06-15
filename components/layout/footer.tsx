import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                FontSpace
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover and share beautiful fonts for your Web3 projects. Free, open, and decentralized.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/browse" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Fonts
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-muted-foreground hover:text-foreground transition-colors">
                  Upload Font
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/browse?category=sans-serif" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sans Serif
                </Link>
              </li>
              <li>
                <Link href="/browse?category=serif" className="text-muted-foreground hover:text-foreground transition-colors">
                  Serif
                </Link>
              </li>
              <li>
                <Link href="/browse?category=display" className="text-muted-foreground hover:text-foreground transition-colors">
                  Display
                </Link>
              </li>
              <li>
                <Link href="/browse?category=monospace" className="text-muted-foreground hover:text-foreground transition-colors">
                  Monospace
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@fontspace.web3"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 FontSpace. Built for the Web3 community. Free and open source.</p>
        </div>
      </div>
    </footer>
  );
}