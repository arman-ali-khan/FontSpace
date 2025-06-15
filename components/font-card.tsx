'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye, Star, Crown, Zap, Gift, Lock } from 'lucide-react';
import { Font } from '@/types/font';

interface FontCardProps {
  font: Font;
}

export function FontCard({ font }: FontCardProps) {
  const formatFileSize = (bytes: number) => {
    return `${(bytes / 1024).toFixed(0)}KB`;
  };

  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}k`;
    }
    return downloads.toString();
  };

  const getPricingIcon = (tier: string) => {
    switch (tier) {
      case 'free':
        return <Gift className="h-3 w-3" />;
      case 'freemium':
        return <Zap className="h-3 w-3" />;
      case 'premium':
        return <Crown className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getPricingColor = (tier: string) => {
    switch (tier) {
      case 'free':
        return 'bg-green-500/20 text-green-300';
      case 'freemium':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'premium':
        return 'bg-purple-500/20 text-purple-300';
      default:
        return 'bg-white/5 text-foreground/70';
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
      {/* Featured/Trending Badges */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        {font.featured && <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">Featured</Badge>}
        {font.trending && <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">Trending</Badge>}
      </div>

      {/* Pricing Badge */}
      <div className="absolute top-3 right-3 z-10">
        <Badge className={`${getPricingColor(font.pricingTier)} capitalize flex items-center gap-1`}>
          {getPricingIcon(font.pricingTier)}
          {font.pricingTier}
          {font.price && <span>${font.price}</span>}
        </Badge>
      </div>

      <CardContent className="p-6">
        {/* Font Preview */}
        <div className="mb-4 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg flex items-center justify-center border border-white/5">
          {font.category === 'symbol' ? (
            <div className="flex space-x-2 text-2xl">
              <span>★</span>
              <span>♦</span>
              <span>●</span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-foreground" style={{ fontFamily: 'serif' }}>
              Aa
            </span>
          )}
        </div>

        {/* Font Info */}
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg text-foreground group-hover:text-purple-400 transition-colors">
              {font.name}
            </h3>
            <p className="text-sm text-foreground/60">by {font.designer}</p>
          </div>

          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs bg-white/5 text-foreground/70 capitalize">
              {font.category === 'symbol' ? 'Symbol' : font.category.replace('-', ' ')}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-white/5 text-foreground/70">
              {font.fileFormat.toUpperCase()}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-white/5 text-foreground/70">
              {formatFileSize(font.fileSize)}
            </Badge>
          </div>

          <p className="text-sm text-foreground/60 line-clamp-2">{font.description}</p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-foreground/60">
            <span className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              {formatDownloads(font.downloads)}
            </span>
            <span>{new Date(font.uploadDate).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        <Link href={`/font/${font.id}`} className="flex-1">
          <Button variant="outline" className="w-full border-white/10 hover:border-white/20 hover:bg-white/5">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </Link>
        <Button 
          className={`${
            font.pricingTier === 'premium' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
              : font.pricingTier === 'freemium'
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
              : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
          }`}
          disabled={font.pricingTier === 'premium'}
        >
          {font.pricingTier === 'premium' ? (
            <>
              <Lock className="h-4 w-4 mr-2" />
              ${font.price}
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              {font.pricingTier === 'freemium' ? 'Preview' : 'Download'}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}