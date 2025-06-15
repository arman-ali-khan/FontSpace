'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FontCard } from '@/components/font-card';
import { ArrowRight, Sparkles, TrendingUp, Star, Download, Gift, Zap, Crown, Hash } from 'lucide-react';
import { Font } from '@/types/font';
import { storage } from '@/lib/storage';

export default function Home() {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [featuredFonts, setFeaturedFonts] = useState<Font[]>([]);
  const [trendingFonts, setTrendingFonts] = useState<Font[]>([]);

  useEffect(() => {
    const allFonts = storage.getFonts();
    setFonts(allFonts);
    setFeaturedFonts(allFonts.filter(font => font.featured).slice(0, 3));
    setTrendingFonts(allFonts.filter(font => font.trending).slice(0, 6));
  }, []);

  const pricingCategories = [
    { 
      name: 'Free Fonts', 
      count: fonts.filter(f => f.pricingTier === 'free').length, 
      gradient: 'from-green-500 to-blue-500',
      icon: Gift,
      href: '/browse?pricing=free'
    },
    { 
      name: 'Freemium', 
      count: fonts.filter(f => f.pricingTier === 'freemium').length, 
      gradient: 'from-yellow-500 to-orange-500',
      icon: Zap,
      href: '/browse?pricing=freemium'
    },
    { 
      name: 'Premium', 
      count: fonts.filter(f => f.pricingTier === 'premium').length, 
      gradient: 'from-purple-500 to-pink-500',
      icon: Crown,
      href: '/browse?pricing=premium'
    },
    { 
      name: 'Symbol Fonts', 
      count: fonts.filter(f => f.category === 'symbol').length, 
      gradient: 'from-cyan-500 to-blue-500',
      icon: Hash,
      href: '/browse?category=symbol'
    }
  ];

  const styleCategories = [
    { name: 'Sans Serif', count: fonts.filter(f => f.category === 'sans-serif').length, gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Serif', count: fonts.filter(f => f.category === 'serif').length, gradient: 'from-purple-500 to-pink-500' },
    { name: 'Display', count: fonts.filter(f => f.category === 'display').length, gradient: 'from-green-500 to-blue-500' },
    { name: 'Handwriting', count: fonts.filter(f => f.category === 'handwriting').length, gradient: 'from-yellow-500 to-orange-500' },
    { name: 'Monospace', count: fonts.filter(f => f.category === 'monospace').length, gradient: 'from-red-500 to-pink-500' }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Web3 Typography Revolution
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 dark:from-white dark:via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                Discover Fonts for the
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Decentralized Web
                </span>
              </h1>
              
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                Explore our curated collection of premium fonts designed for Web3 projects, 
                NFT platforms, and the future of digital design. From free to premium, find the perfect typography.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/browse">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3">
                  <Download className="h-5 w-5 mr-2" />
                  Browse Fonts
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              
              <Link href="/upload">
                <Button size="lg" variant="outline" className="border-white/20 hover:border-white/40 hover:bg-white/5 px-8 py-3">
                  Upload Your Font
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-purple-400">{fonts.length}+</div>
                  <div className="text-foreground/60">Premium Fonts</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-pink-400">
                    {fonts.reduce((sum, font) => sum + font.downloads, 0).toLocaleString()}+
                  </div>
                  <div className="text-foreground/60">Downloads</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-cyan-400">
                    {fonts.filter(f => f.pricingTier === 'free').length}+
                  </div>
                  <div className="text-foreground/60">Free Fonts</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Categories */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Browse by Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingCategories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-foreground/60">{category.count} fonts available</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fonts */}
      {featuredFonts.length > 0 && (
        <section className="px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Star className="h-6 w-6 text-yellow-400" />
                <h2 className="text-3xl font-bold text-foreground">Featured Fonts</h2>
              </div>
              <Link href="/browse?featured=true">
                <Button variant="ghost" className="hover:bg-white/5">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredFonts.map((font) => (
                <FontCard key={font.id} font={font} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Fonts */}
      {trendingFonts.length > 0 && (
        <section className="px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-6 w-6 text-pink-400" />
                <h2 className="text-3xl font-bold text-foreground">Trending Now</h2>
              </div>
              <Link href="/browse?trending=true">
                <Button variant="ghost" className="hover:bg-white/5">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingFonts.map((font) => (
                <FontCard key={font.id} font={font} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Style Categories */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Browse by Style</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {styleCategories.map((category) => (
              <Link key={category.name} href={`/browse?category=${category.name.toLowerCase().replace(' ', '-')}`}>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-lg mx-auto mb-3 flex items-center justify-center`}>
                      <span className="text-white font-bold text-lg">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <p className="text-sm text-foreground/60">{category.count} fonts</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Ready to Share Your Typography?
              </h2>
              <p className="text-xl text-foreground/70 mb-8">
                Join our community of designers and developers. Upload your fonts and reach thousands of creators worldwide.
              </p>
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3">
                  Get Started Today
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}