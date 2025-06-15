'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FontCard } from '@/components/font-card';
import { Search, Filter, Grid, List, SlidersHorizontal, Gift, Zap, Crown, Hash } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { storage } from '@/lib/storage';
import { Font } from '@/types/font';

export default function Browse() {
  const searchParams = useSearchParams();
  const [fonts, setFonts] = useState<Font[]>([]);
  const [filteredFonts, setFilteredFonts] = useState<Font[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('downloads');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const allFonts = storage.getFonts();
    setFonts(allFonts);

    // Apply URL filters
    const category = searchParams.get('category');
    const pricing = searchParams.get('pricing');
    const featured = searchParams.get('featured');
    const trending = searchParams.get('trending');

    if (category) {
      setSelectedCategory(category);
    }
    
    if (pricing) {
      setSelectedPricing(pricing);
    }
    
    let filtered = allFonts;
    
    if (featured === 'true') {
      filtered = filtered.filter(font => font.featured);
    }
    
    if (trending === 'true') {
      filtered = filtered.filter(font => font.trending);
    }
    
    if (category && category !== 'all') {
      filtered = filtered.filter(font => font.category === category);
    }

    if (pricing && pricing !== 'all') {
      filtered = filtered.filter(font => font.pricingTier === pricing);
    }

    setFilteredFonts(filtered);
  }, [searchParams]);

  useEffect(() => {
    let filtered = fonts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(font =>
        font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        font.designer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        font.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(font => font.category === selectedCategory);
    }

    // Pricing filter
    if (selectedPricing !== 'all') {
      filtered = filtered.filter(font => font.pricingTier === selectedPricing);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        case 'downloads':
        default:
          return b.downloads - a.downloads;
      }
    });

    setFilteredFonts(filtered);
  }, [fonts, searchQuery, selectedCategory, selectedPricing, sortBy]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'sans-serif', label: 'Sans Serif' },
    { value: 'serif', label: 'Serif' },
    { value: 'display', label: 'Display' },
    { value: 'handwriting', label: 'Handwriting' },
    { value: 'monospace', label: 'Monospace' },
    { value: 'symbol', label: 'Symbol Fonts' }
  ];

  const pricingTiers = [
    { value: 'all', label: 'All Pricing', icon: null },
    { value: 'free', label: 'Free', icon: Gift },
    { value: 'freemium', label: 'Freemium', icon: Zap },
    { value: 'premium', label: 'Premium', icon: Crown }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 dark:from-white dark:via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Browse Fonts
        </h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Discover beautiful typography for your next project
        </p>
      </div>

      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {pricingTiers.slice(1).map((tier) => (
          <Button
            key={tier.value}
            variant={selectedPricing === tier.value ? "default" : "outline"}
            onClick={() => setSelectedPricing(selectedPricing === tier.value ? 'all' : tier.value)}
            className={`border-white/10 hover:border-white/20 ${
              selectedPricing === tier.value 
                ? tier.value === 'free' 
                  ? 'bg-gradient-to-r from-green-500 to-blue-500'
                  : tier.value === 'freemium'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'hover:bg-white/5'
            }`}
          >
            {tier.icon && <tier.icon className="h-4 w-4 mr-2" />}
            {tier.label}
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 h-4 w-4" />
              <Input
                placeholder="Search fonts, designers, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-white/10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 bg-background/50 border-white/10">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 bg-background/50 border-white/10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                  <SelectItem value="date">Newest</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border border-white/10 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchQuery && (
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                Search: {searchQuery}
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-2 hover:text-white"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="bg-pink-500/20 text-pink-300">
                Category: {categories.find(c => c.value === selectedCategory)?.label}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="ml-2 hover:text-white"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedPricing !== 'all' && (
              <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300">
                Pricing: {pricingTiers.find(p => p.value === selectedPricing)?.label}
                <button
                  onClick={() => setSelectedPricing('all')}
                  className="ml-2 hover:text-white"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-foreground/60">
            {filteredFonts.length} font{filteredFonts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredFonts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredFonts.map((font) => (
              <FontCard key={font.id} font={font} />
            ))}
          </div>
        ) : (
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-foreground/40 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No fonts found</h3>
              <p className="text-foreground/60 text-center">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                variant="outline"
                className="mt-4 border-white/10 hover:border-white/20 hover:bg-white/5"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedPricing('all');
                }}
              >
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}