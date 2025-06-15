'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Palette, CheckCircle, Upload, Star, Users, Globe, Twitter, Instagram, Github, Dribbble, Bean as Behance, Crown, Zap, Gift, ArrowRight, Check } from 'lucide-react';
import { auth } from '@/lib/auth';
import { storage } from '@/lib/storage';
import { User } from '@/types/font';

export default function JoinDesigner() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Form state
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [experience, setExperience] = useState('');
  const [motivation, setMotivation] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    twitter: '',
    instagram: '',
    github: '',
    dribbble: '',
    behance: ''
  });

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    
    if (!currentUser) {
      router.push('/login');
      return;
    }

    setUser(currentUser);
    setDisplayName(currentUser.username);
    setBio(currentUser.bio || '');
    setWebsite(currentUser.website || '');
    setSocialLinks(currentUser.socialLinks || {
      twitter: '',
      instagram: '',
      github: '',
      dribbble: '',
      behance: ''
    });
  }, [router]);

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!displayName.trim()) {
      setError('Display name is required');
      setIsLoading(false);
      return;
    }

    if (!bio.trim() || bio.length < 50) {
      setError('Bio must be at least 50 characters long');
      setIsLoading(false);
      return;
    }

    if (!experience.trim()) {
      setError('Please describe your typography experience');
      setIsLoading(false);
      return;
    }

    if (!motivation.trim()) {
      setError('Please explain your motivation for joining');
      setIsLoading(false);
      return;
    }

    try {
      // Create designer application
      const application = {
        id: Date.now().toString(),
        userId: user!.id,
        displayName: displayName.trim(),
        bio: bio.trim(),
        website: website.trim(),
        portfolio: portfolio.trim(),
        experience: experience.trim(),
        motivation: motivation.trim(),
        socialLinks,
        applicationDate: new Date().toISOString().split('T')[0],
        status: 'pending' as const
      };

      storage.saveDesignerApplication(application);
      setSuccess(true);

      // Reset form
      setExperience('');
      setMotivation('');
      setPortfolio('');

      // Redirect after delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);

    } catch (error) {
      setError('Failed to submit application. Please try again.');
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
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h2>
            <p className="text-foreground/60 mb-4">
              Your designer application has been submitted successfully. We'll review it and get back to you within 3-5 business days.
            </p>
            <p className="text-sm text-foreground/40">
              Redirecting to dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const benefits = [
    {
      icon: Upload,
      title: 'Upload Fonts',
      description: 'Share your typography creations with the community'
    },
    {
      icon: Crown,
      title: 'Premium Features',
      description: 'Access to premium tools and analytics'
    },
    {
      icon: Star,
      title: 'Featured Profile',
      description: 'Get featured on our designers page'
    },
    {
      icon: Users,
      title: 'Community Access',
      description: 'Join our exclusive designer community'
    }
  ];

  const requirements = [
    'Portfolio showcasing typography work',
    'At least 1 year of design experience',
    'Understanding of font formats and licensing',
    'Commitment to quality and originality'
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Palette className="h-8 w-8 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 dark:from-white dark:via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Join as Designer
            </h1>
          </div>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Share your typography expertise with our community and start earning from your font creations
          </p>
        </div>

        {/* Benefits */}
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Designer Benefits
            </CardTitle>
            <CardDescription>
              What you get as a FontSpace designer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-foreground/60">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Requirements
            </CardTitle>
            <CardDescription>
              What we look for in designer applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-foreground/80">{requirement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Designer Application
            </CardTitle>
            <CardDescription>
              Tell us about yourself and your typography work
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <Alert className="border-red-500/20 bg-red-500/10">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}

              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name *</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your professional name"
                      required
                      className="bg-background/50 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="bg-background/50 border-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself, your design background, and your typography expertise..."
                    rows={4}
                    required
                    className="bg-background/50 border-white/10"
                  />
                  <p className="text-xs text-foreground/60">
                    {bio.length}/50 characters minimum
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Social Links</h3>
                <p className="text-sm text-foreground/60">
                  Help us verify your work and connect with your audience
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="flex items-center gap-2">
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </Label>
                    <Input
                      id="twitter"
                      value={socialLinks.twitter}
                      onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                      placeholder="https://twitter.com/username"
                      className="bg-background/50 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="flex items-center gap-2">
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      value={socialLinks.instagram}
                      onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                      placeholder="https://instagram.com/username"
                      className="bg-background/50 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dribbble" className="flex items-center gap-2">
                      <Dribbble className="h-4 w-4" />
                      Dribbble
                    </Label>
                    <Input
                      id="dribbble"
                      value={socialLinks.dribbble}
                      onChange={(e) => handleSocialLinkChange('dribbble', e.target.value)}
                      placeholder="https://dribbble.com/username"
                      className="bg-background/50 border-white/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="behance" className="flex items-center gap-2">
                      <Behance className="h-4 w-4" />
                      Behance
                    </Label>
                    <Input
                      id="behance"
                      value={socialLinks.behance}
                      onChange={(e) => handleSocialLinkChange('behance', e.target.value)}
                      placeholder="https://behance.net/username"
                      className="bg-background/50 border-white/10"
                    />
                  </div>
                </div>
              </div>

              {/* Portfolio */}
              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio Link</Label>
                <Input
                  id="portfolio"
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="Link to your typography portfolio or best work"
                  className="bg-background/50 border-white/10"
                />
                <p className="text-xs text-foreground/60">
                  Share a link to your best typography work (Dribbble, Behance, personal site, etc.)
                </p>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience">Typography Experience *</Label>
                <Textarea
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Describe your experience with typography, font design, and any relevant projects..."
                  rows={4}
                  required
                  className="bg-background/50 border-white/10"
                />
              </div>

              {/* Motivation */}
              <div className="space-y-2">
                <Label htmlFor="motivation">Why Join FontSpace? *</Label>
                <Textarea
                  id="motivation"
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="Tell us why you want to become a FontSpace designer and what you hope to contribute..."
                  rows={4}
                  required
                  className="bg-background/50 border-white/10"
                />
              </div>

              {/* Terms */}
              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold text-foreground mb-2">Application Process</h4>
                <ul className="text-sm text-foreground/80 space-y-1">
                  <li>• Applications are reviewed within 3-5 business days</li>
                  <li>• We may request additional portfolio samples</li>
                  <li>• Approved designers get access to upload tools immediately</li>
                  <li>• All uploaded fonts must be original work</li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting Application...' : 'Submit Designer Application'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </form>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Share Your Typography?
            </h2>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              Join our community of talented designers and start earning from your font creations. 
              Help shape the future of Web3 typography.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <Gift className="h-3 w-3 mr-1" />
                Free to Join
              </Badge>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <Zap className="h-3 w-3 mr-1" />
                Instant Access
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Crown className="h-3 w-3 mr-1" />
                Premium Features
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}