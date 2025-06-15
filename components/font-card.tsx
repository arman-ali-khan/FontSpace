'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Download, Eye, Star, Crown, Zap, Gift, Lock, ShoppingCart, Check, ChevronDown } from 'lucide-react';
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
        return 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30';
      case 'freemium':
        return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30';
      case 'premium':
        return 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPricingGradient = (tier: string) => {
    switch (tier) {
      case 'free':
        return 'from-green-500 to-blue-500';
      case 'freemium':
        return 'from-yellow-500 to-orange-500';
      case 'premium':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const premiumFeatures = [
    'Commercial license included',
    'Multiple font weights',
    'Extended character set',
    'Premium support',
    'Web font formats',
    'Lifetime updates'
  ];

  return (
    <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
      {/* Featured/Trending Badges */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        {font.featured && (
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        )}
        {font.trending && (
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
            Trending
          </Badge>
        )}
      </div>

      {/* Pricing Badge */}
      <div className="absolute top-3 right-3 z-10">
        <Badge className={`${getPricingColor(font.pricingTier)} capitalize flex items-center gap-1 border`}>
          {getPricingIcon(font.pricingTier)}
          {font.pricingTier}
          {font.price && <span className="font-bold">${font.price}</span>}
        </Badge>
      </div>

      <CardContent className="p-6">
        {/* Font Preview */}
        <div className="mb-4 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg flex items-center justify-center border border-border/50 relative overflow-hidden">
          {font.pricingTier === 'premium' && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-[1px]" />
          )}
          {font.category === 'symbol' ? (
            <div className="flex space-x-2 text-2xl text-foreground/80">
              <span>★</span>
              <span>♦</span>
              <span>●</span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-foreground/80" style={{ fontFamily: 'serif' }}>
              Aa
            </span>
          )}
          {font.pricingTier === 'premium' && (
            <div className="absolute bottom-2 right-2">
              <Lock className="h-4 w-4 text-purple-500" />
            </div>
          )}
        </div>

        {/* Font Info */}
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg text-foreground group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
              {font.name}
            </h3>
            <p className="text-sm text-muted-foreground">by {font.designer}</p>
          </div>

          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground capitalize border-border/50">
              {font.category === 'symbol' ? 'Symbol' : font.category.replace('-', ' ')}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground border-border/50">
              {font.fileFormat.toUpperCase()}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground border-border/50">
              {formatFileSize(font.fileSize)}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{font.description}</p>

          {/* Premium Features Accordion */}
          {font.pricingTier === 'premium' && (
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="premium-features" className="border-none">
                  <AccordionTrigger className="px-3 py-2 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-semibold text-foreground">Premium Features</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3">
                    <div className="space-y-2">
                      {premiumFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
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
          <Button variant="outline" className="w-full border-border/50 hover:border-border hover:bg-accent">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </Link>
        
        {font.pricingTier === 'premium' ? (
          <Button className={`bg-gradient-to-r ${getPricingGradient(font.pricingTier)} hover:opacity-90 text-white`}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            ${font.price}
          </Button>
        ) : (
          <Button className={`bg-gradient-to-r ${getPricingGradient(font.pricingTier)} hover:opacity-90 text-white`}>
            <Download className="h-4 w-4 mr-2" />
            {font.pricingTier === 'freemium' ? 'Preview' : 'Download'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}