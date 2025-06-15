'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FontPreview } from '@/components/font-preview';
import { 
  Download, Globe, Tag, ArrowLeft, Share2, User, 
  Crown, Lock, ShoppingCart, CreditCard, Shield, 
  Check, Star, Zap, Gift, FileText, Palette, 
  Languages, Layers, Headphones, RefreshCw 
} from 'lucide-react';
import { storage } from '@/lib/storage';
import { Font } from '@/types/font';

export default function FontDetailClient({ font: initialFont }: { font: Font }) {
  const router = useRouter();
  const [font, setFont] = useState(initialFont);
  const [downloading, setDownloading] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  const handleDownload = async () => {
    if (!font) return;

    setDownloading(true);

    // Update download count in storage (simulated)
    storage.updateFontDownloads(font.id);
    setFont((prev) =>
      prev ? { ...prev, downloads: prev.downloads + 1 } : null
    );

    setTimeout(() => {
      setDownloading(false);
    }, 1000);
  };

  const handlePurchase = async () => {
    if (!font || font.pricingTier !== 'premium') return;

    setPurchasing(true);
    
    // Simulate purchase process
    setTimeout(() => {
      setPurchasing(false);
      // In a real app, this would redirect to payment processor
      alert('Redirecting to secure payment...');
    }, 2000);
  };

  const formatFileSize = (bytes: number) => `${(bytes / 1024).toFixed(0)}KB`;

  const formatDownloads = (downloads: number) =>
    downloads >= 1000 ? `${(downloads / 1000).toFixed(1)}k` : downloads.toString();

  const getPricingIcon = (tier: string) => {
    switch (tier) {
      case 'free': return Gift;
      case 'freemium': return Zap;
      case 'premium': return Crown;
      default: return null;
    }
  };

  const getPricingColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'from-green-500 to-blue-500';
      case 'freemium': return 'from-yellow-500 to-orange-500';
      case 'premium': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const PricingIcon = getPricingIcon(font.pricingTier);

  // Premium features data
  const premiumFeatures = [
    {
      category: 'Licensing & Usage',
      icon: Shield,
      features: [
        { name: 'Commercial License Included', description: 'Use in any commercial project without restrictions' },
        { name: 'Unlimited Projects', description: 'No limit on the number of projects you can use this font in' },
        { name: 'Resale Rights', description: 'Include the font in products you sell to clients' },
        { name: 'Lifetime License', description: 'One-time purchase, use forever' }
      ]
    },
    {
      category: 'Font Variations',
      icon: Layers,
      features: [
        { name: 'Multiple Weights', description: 'Thin, Light, Regular, Medium, Bold, Black variations' },
        { name: 'Italic Styles', description: 'Complete italic family for all weights' },
        { name: 'Variable Font Support', description: 'Smooth weight and style transitions' },
        { name: 'OpenType Features', description: 'Ligatures, alternates, and stylistic sets' }
      ]
    },
    {
      category: 'Character Support',
      icon: Languages,
      features: [
        { name: 'Extended Character Set', description: 'Over 1,200 glyphs including special characters' },
        { name: 'Multi-Language Support', description: 'Latin, Cyrillic, and Greek character sets' },
        { name: 'Currency Symbols', description: 'Complete set of international currency symbols' },
        { name: 'Mathematical Symbols', description: 'Mathematical operators and scientific notation' }
      ]
    },
    {
      category: 'File Formats',
      icon: FileText,
      features: [
        { name: 'Desktop Fonts', description: 'TTF and OTF formats for desktop applications' },
        { name: 'Web Fonts', description: 'WOFF and WOFF2 optimized for web performance' },
        { name: 'App Fonts', description: 'Formats optimized for mobile and desktop applications' },
        { name: 'Print Fonts', description: 'High-quality formats for professional printing' }
      ]
    },
    {
      category: 'Design Tools',
      icon: Palette,
      features: [
        { name: 'Figma Plugin', description: 'Direct integration with Figma design tool' },
        { name: 'Adobe CC Integration', description: 'Seamless integration with Creative Cloud apps' },
        { name: 'Sketch Support', description: 'Native support for Sketch design files' },
        { name: 'Font Preview Tool', description: 'Advanced preview tool with customization options' }
      ]
    },
    {
      category: 'Support & Updates',
      icon: Headphones,
      features: [
        { name: 'Priority Support', description: '24/7 premium customer support via email and chat' },
        { name: 'Free Updates', description: 'Lifetime access to font updates and improvements' },
        { name: 'Installation Guide', description: 'Detailed installation guides for all platforms' },
        { name: 'Usage Examples', description: 'Design examples and best practice guidelines' }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="hover:bg-accent"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Font Header */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-2">
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
                  <Badge className={`bg-gradient-to-r ${getPricingColor(font.pricingTier)} text-white border-0 capitalize`}>
                    {PricingIcon && <PricingIcon className="h-3 w-3 mr-1" />}
                    {font.pricingTier}
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold text-foreground">{font.name}</h1>
                <p className="text-xl text-muted-foreground">by {font.designer}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Stat label="Downloads" value={formatDownloads(font.downloads)} color="text-purple-500" />
                <Stat label="Format" value={font.fileFormat.toUpperCase()} color="text-pink-500" />
                <Stat label="File Size" value={formatFileSize(font.fileSize)} color="text-cyan-500" />
                <Stat label="Languages" value={font.languages.length.toString()} color="text-green-500" />
              </div>

              {font.description && (
                <Section title="Description">
                  <p className="text-muted-foreground leading-relaxed">{font.description}</p>
                </Section>
              )}

              {/* Premium Features Accordion */}
              {font.pricingTier === 'premium' && (
                <Section title="Premium Features" icon={<Crown className="h-4 w-4" />}>
                  <Accordion type="single" collapsible className="w-full">
                    {premiumFeatures.map((category, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <category.icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-semibold text-left">{category.category}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-11">
                            {category.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="font-medium text-foreground text-sm">{feature.name}</h4>
                                  <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Section>
              )}

              {font.tags.length > 0 && (
                <Section title="Tags" icon={<Tag className="h-4 w-4" />}>
                  <div className="flex flex-wrap gap-2">
                    {font.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground border-border/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Section>
              )}

              <Section title="Language Support" icon={<Globe className="h-4 w-4" />}>
                <div className="flex flex-wrap gap-2">
                  {font.languages.map((language) => (
                    <Badge key={language} variant="secondary" className="bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
                      {language}
                    </Badge>
                  ))}
                </div>
              </Section>
            </CardContent>
          </Card>

          {/* Font Preview - Limited for Premium */}
          {font.pricingTier === 'premium' ? (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-500" />
                  Premium Font Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="border-purple-500/20 bg-purple-500/10">
                  <Lock className="h-4 w-4" />
                  <AlertDescription className="text-foreground">
                    This is a premium font. Purchase to unlock full preview and download access.
                  </AlertDescription>
                </Alert>
                <div className="mt-6 p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 relative">
                  <div className="text-center space-y-4 filter blur-sm">
                    <div className="text-4xl font-bold text-foreground">Sample Text</div>
                    <div className="text-2xl text-muted-foreground">The quick brown fox</div>
                    <div className="text-lg text-muted-foreground">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                      <Lock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <p className="text-sm text-center text-muted-foreground">Purchase to unlock</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <FontPreview fontName={font.name} />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Download/Purchase */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                {font.pricingTier === 'premium' ? (
                  <>
                    <Crown className="h-5 w-5 text-purple-500" />
                    Purchase Font
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Download Font
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                {font.pricingTier === 'premium' ? (
                  <>
                    <div className="text-3xl font-bold text-foreground">${font.price}</div>
                    <p className="text-sm text-muted-foreground">
                      One-time purchase • Commercial license included
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-green-500">FREE</div>
                    <p className="text-sm text-muted-foreground">
                      Free for personal and commercial use
                    </p>
                  </>
                )}
              </div>

              {font.pricingTier === 'premium' ? (
                <>
                  <Button
                    onClick={handlePurchase}
                    disabled={purchasing}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    {purchasing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Purchase ${font.price}
                      </>
                    )}
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3" />
                    <span>Secure payment with Stripe</span>
                  </div>
                </>
              ) : (
                <Button
                  onClick={handleDownload}
                  disabled={downloading}
                  className={`w-full bg-gradient-to-r ${getPricingColor(font.pricingTier)} hover:opacity-90 text-white`}
                >
                  {downloading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download {font.fileFormat.toUpperCase()}
                    </>
                  )}
                </Button>
              )}

              <Button variant="outline" className="w-full border-border/50 hover:border-border hover:bg-accent">
                <Share2 className="h-4 w-4 mr-2" />
                Share Font
              </Button>
            </CardContent>
          </Card>

          {/* Font Info */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Font Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Info label="Category" value={font.category.replace('-', ' ')} />
              <Info label="Pricing" value={font.pricingTier} />
              <Info label="Upload Date" value={new Date(font.uploadDate).toLocaleDateString()} />
              <Info label="File Size" value={formatFileSize(font.fileSize)} />
              <Info label="Downloads" value={font.downloads.toLocaleString()} />
              {font.price && <Info label="Price" value={`$${font.price}`} />}
            </CardContent>
          </Card>

          {/* Designer Info */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Designer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {font.designer.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{font.designer}</p>
                  <p className="text-sm text-muted-foreground">Font Creator</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* License Info for Premium */}
          {font.pricingTier === 'premium' && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  License
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Commercial use allowed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Unlimited projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Resale rights included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>Lifetime license</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable stat block
const Stat = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="text-center">
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

// Reusable section
const Section = ({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
      {icon}
      {title}
    </h3>
    {children}
  </div>
);

// Reusable info row
const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-foreground text-sm capitalize">{value}</span>
  </div>
);