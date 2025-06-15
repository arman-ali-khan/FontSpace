'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Plus, Gift, Zap, Crown } from 'lucide-react';
import { auth } from '@/lib/auth';
import { storage } from '@/lib/storage';
import { Font } from '@/types/font';

export default function UploadFont() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Form state
  const [fontName, setFontName] = useState('');
  const [designer, setDesigner] = useState('');
  const [category, setCategory] = useState('');
  const [pricingTier, setPricingTier] = useState<'free' | 'freemium' | 'premium'>('free');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [languages, setLanguages] = useState<string[]>(['English']);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [fileFormat, setFileFormat] = useState<'ttf' | 'otf' | 'zip'>('ttf');

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    
    if (!currentUser) {
      router.push('/login');
      return;
    }

    setUser(currentUser);
    setDesigner(currentUser.username);
  }, [router]);

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    if (languages.length > 1) { // Keep at least one language
      setLanguages(languages.filter(lang => lang !== languageToRemove));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!fontName.trim()) {
      setError('Font name is required');
      setIsLoading(false);
      return;
    }

    if (!category) {
      setError('Please select a category');
      setIsLoading(false);
      return;
    }

    if (pricingTier === 'premium' && (!price || parseFloat(price) <= 0)) {
      setError('Please enter a valid price for premium fonts');
      setIsLoading(false);
      return;
    }

    // Create new font object
    const newFont: Font = {
      id: Date.now().toString(),
      name: fontName.trim(),
      designer: designer.trim(),
      category: category as Font['category'],
      pricingTier,
      languages,
      tags,
      description: description.trim(),
      fileUrl: `/fonts/${fontName.toLowerCase().replace(/\s+/g, '-')}.${fileFormat}`,
      fileFormat,
      fileSize: Math.floor(Math.random() * 500000) + 100000, // Mock file size
      downloads: 0,
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: user.id,
      featured: false,
      trending: false,
      ...(pricingTier === 'premium' && { price: parseFloat(price) }),
      ...(pricingTier === 'freemium' && { previewUrl: `/fonts/${fontName.toLowerCase().replace(/\s+/g, '-')}-preview.${fileFormat}` })
    };

    try {
      storage.saveFont(newFont);
      setSuccess(true);
      
      // Reset form
      setFontName('');
      setDesigner(user.username);
      setCategory('');
      setPricingTier('free');
      setPrice('');
      setDescription('');
      setLanguages(['English']);
      setTags([]);
      setFileFormat('ttf');

      // Redirect to font detail page after a delay
      setTimeout(() => {
        router.push(`/font/${newFont.id}`);
      }, 2000);

    } catch (error) {
      setError('Failed to upload font. Please try again.');
    }

    setIsLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="bg-card/50 backdrop-blur-sm border-white/10 max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Font Uploaded Successfully!</h2>
            <p className="text-foreground/60 mb-4">
              Your font "{fontName}" has been uploaded and is now available for download.
            </p>
            <p className="text-sm text-foreground/40">
              Redirecting to font page...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Upload Font
          </h1>
          <p className="text-xl text-foreground/70">
            Share your typography with the community
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Font Details
            </CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <Alert className="border-red-500/20 bg-red-500/10">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fontName">Font Name *</Label>
                  <Input
                    id="fontName"
                    value={fontName}
                    onChange={(e) => setFontName(e.target.value)}
                    placeholder="e.g., Modern Sans Pro"
                    required
                    className="bg-background/50 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designer">Designer *</Label>
                  <Input
                    id="designer"
                    value={designer}
                    onChange={(e) => setDesigner(e.target.value)}
                    placeholder="Your name or studio"
                    required
                    className="bg-background/50 border-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your font, its inspiration, and best use cases..."
                  rows={4}
                  className="bg-background/50 border-white/10"
                />
              </div>

              {/* Category and Format */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sans-serif">Sans Serif</SelectItem>
                      <SelectItem value="serif">Serif</SelectItem>
                      <SelectItem value="display">Display</SelectItem>
                      <SelectItem value="handwriting">Handwriting</SelectItem>
                      <SelectItem value="monospace">Monospace</SelectItem>
                      <SelectItem value="symbol">Symbol Fonts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>File Format</Label>
                  <Select value={fileFormat} onValueChange={(value: 'ttf' | 'otf' | 'zip') => setFileFormat(value)}>
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ttf">TTF (TrueType Font)</SelectItem>
                      <SelectItem value="otf">OTF (OpenType Font)</SelectItem>
                      <SelectItem value="zip">ZIP (Font Family)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Pricing Tier */}
              <div className="space-y-4">
                <Label>Pricing Tier *</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'free', label: 'Free', icon: Gift, color: 'from-green-500 to-blue-500', desc: 'Free for everyone' },
                    { value: 'freemium', label: 'Freemium', icon: Zap, color: 'from-yellow-500 to-orange-500', desc: 'Preview available, full version paid' },
                    { value: 'premium', label: 'Premium', icon: Crown, color: 'from-purple-500 to-pink-500', desc: 'Paid font with full features' }
                  ].map((tier) => (
                    <Card 
                      key={tier.value}
                      className={`cursor-pointer transition-all duration-300 ${
                        pricingTier === tier.value 
                          ? 'border-white/30 bg-white/10' 
                          : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                      }`}
                      onClick={() => setPricingTier(tier.value as 'free' | 'freemium' | 'premium')}
                    >
                      <CardContent className="p-4 text-center">
                        <div className={`w-12 h-12 bg-gradient-to-r ${tier.color} rounded-lg mx-auto mb-3 flex items-center justify-center`}>
                          <tier.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground">{tier.label}</h3>
                        <p className="text-xs text-foreground/60 mt-1">{tier.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {pricingTier === 'premium' && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="29.99"
                      className="bg-background/50 border-white/10"
                    />
                  </div>
                )}
              </div>

              {/* Languages */}
              <div className="space-y-4">
                <Label>Language Support</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {languages.map((language) => (
                    <Badge key={language} variant="secondary" className="bg-cyan-500/20 text-cyan-300">
                      {language}
                      {languages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLanguage(language)}
                          className="ml-2 hover:text-white"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Add language (e.g., Spanish, French)"
                    className="bg-background/50 border-white/10"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                  />
                  <Button type="button" onClick={addLanguage} variant="outline" className="border-white/10">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-purple-500/20 text-purple-300">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tags (e.g., modern, bold, elegant)"
                    className="bg-background/50 border-white/10"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline" className="border-white/10">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* File Upload Note */}
              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                <p className="text-sm text-foreground/80">
                  <strong>Note:</strong> This is a demo application. In a real implementation, you would upload your font file here. 
                  The system will automatically handle file validation and storage.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={isLoading}
              >
                {isLoading ? 'Uploading...' : 'Upload Font'}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}