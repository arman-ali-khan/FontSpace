'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FontCard } from '@/components/font-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, Calendar, MapPin, Globe, Twitter, Instagram, 
  Github, Mail, Download, Upload, Star, Crown, 
  ShoppingBag, Heart, Eye, Share2, Edit
} from 'lucide-react';
import { Font, User as UserType, Purchase } from '@/types/font';
import { auth } from '@/lib/auth';

interface UserProfileClientProps {
  user: UserType;
  userFonts: Font[];
  purchasedFonts: Purchase[];
}

export default function UserProfileClient({ user, userFonts, purchasedFonts }: UserProfileClientProps) {
  const currentUser = auth.getCurrentUser();
  const isOwnProfile = currentUser?.id === user.id;
  const [activeTab, setActiveTab] = useState('overview');

  const totalDownloads = userFonts.reduce((sum, font) => sum + font.downloads, 0);
  const featuredFonts = userFonts.filter(font => font.featured);
  const totalSpent = purchasedFonts.reduce((sum, purchase) => sum + purchase.amount, 0);

  const stats = [
    {
      label: 'Fonts Uploaded',
      value: userFonts.length,
      icon: Upload,
      color: 'text-purple-500'
    },
    {
      label: 'Total Downloads',
      value: totalDownloads.toLocaleString(),
      icon: Download,
      color: 'text-cyan-500'
    },
    {
      label: 'Featured Fonts',
      value: featuredFonts.length,
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      label: 'Fonts Purchased',
      value: purchasedFonts.length,
      icon: ShoppingBag,
      color: 'text-pink-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Profile Header */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-4xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              {isOwnProfile && (
                <Link href="/dashboard">
                  <Button variant="outline" className="border-border/50 hover:border-border hover:bg-accent">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              )}
            </div>

            {/* User Details */}
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-foreground">{user.username}</h1>
                  {user.verified && (
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                {user.title && (
                  <p className="text-lg text-muted-foreground">{user.title}</p>
                )}
                
                {user.bio && (
                  <p className="text-foreground/80 leading-relaxed max-w-2xl">{user.bio}</p>
                )}
              </div>

              {/* User Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.joinDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}</span>
                </div>
                
                {user.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                
                {user.website && (
                  <a 
                    href={user.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Website</span>
                  </a>
                )}
              </div>

              {/* Social Links */}
              {user.socialLinks && (
                <div className="flex gap-3">
                  {user.socialLinks.twitter && (
                    <a
                      href={user.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-blue-400 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {user.socialLinks.instagram && (
                    <a
                      href={user.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-pink-400 transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {user.socialLinks.github && (
                    <a
                      href={user.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {user.email && !isOwnProfile && (
                    <a
                      href={`mailto:${user.email}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {!isOwnProfile && (
                  <>
                    <Button variant="outline" className="border-border/50 hover:border-border hover:bg-accent">
                      <Heart className="h-4 w-4 mr-2" />
                      Follow
                    </Button>
                    <Button variant="outline" className="border-border/50 hover:border-border hover:bg-accent">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Profile
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 ${stat.color} mx-auto mb-3 flex items-center justify-center`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card/50 backdrop-blur-sm border-border/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fonts">Fonts ({userFonts.length})</TabsTrigger>
          {(isOwnProfile || purchasedFonts.length > 0) && (
            <TabsTrigger value="purchases">
              Purchases ({purchasedFonts.length})
            </TabsTrigger>
          )}
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Uploads */}
          {userFonts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Recent Uploads</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userFonts.slice(0, 6).map((font) => (
                  <FontCard key={font.id} font={font} />
                ))}
              </div>
              {userFonts.length > 6 && (
                <div className="text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('fonts')}
                    className="border-border/50 hover:border-border hover:bg-accent"
                  >
                    View All Fonts
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Purchase History Preview */}
          {purchasedFonts.length > 0 && (isOwnProfile || purchasedFonts.some(p => p.public)) && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Recent Purchases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedFonts
                  .filter(purchase => isOwnProfile || purchase.public)
                  .slice(0, 3)
                  .map((purchase) => {
                    const font = purchase.font;
                    return font ? <FontCard key={font.id} font={font} /> : null;
                  })}
              </div>
              {purchasedFonts.length > 3 && (
                <div className="text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('purchases')}
                    className="border-border/50 hover:border-border hover:bg-accent"
                  >
                    View All Purchases
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {userFonts.length === 0 && purchasedFonts.length === 0 && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <User className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {isOwnProfile ? "Start Your Typography Journey" : "No Activity Yet"}
                </h3>
                <p className="text-muted-foreground text-center max-w-md">
                  {isOwnProfile 
                    ? "Upload your first font or browse our collection to get started."
                    : `${user.username} hasn't uploaded any fonts or made any purchases yet.`
                  }
                </p>
                {isOwnProfile && (
                  <div className="flex gap-3 mt-6">
                    <Link href="/upload">
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        Upload Font
                      </Button>
                    </Link>
                    <Link href="/browse">
                      <Button variant="outline" className="border-border/50 hover:border-border hover:bg-accent">
                        Browse Fonts
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="fonts" className="space-y-6">
          {userFonts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userFonts.map((font) => (
                <FontCard key={font.id} font={font} />
              ))}
            </div>
          ) : (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No fonts uploaded</h3>
                <p className="text-muted-foreground text-center">
                  {isOwnProfile 
                    ? "Start sharing your typography with the community."
                    : `${user.username} hasn't uploaded any fonts yet.`
                  }
                </p>
                {isOwnProfile && (
                  <Link href="/upload" className="mt-4">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Upload Your First Font
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="purchases" className="space-y-6">
          {purchasedFonts.length > 0 ? (
            <div className="space-y-6">
              {/* Purchase Summary */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Purchase Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500">{purchasedFonts.length}</div>
                      <div className="text-sm text-muted-foreground">Fonts Purchased</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-500">${totalSpent.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Total Spent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-500">
                        ${purchasedFonts.length > 0 ? (totalSpent / purchasedFonts.length).toFixed(2) : '0.00'}
                      </div>
                      <div className="text-sm text-muted-foreground">Average per Font</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Purchased Fonts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedFonts
                  .filter(purchase => isOwnProfile || purchase.public)
                  .map((purchase) => {
                    const font = purchase.font;
                    if (!font) return null;
                    
                    return (
                      <div key={purchase.id} className="relative">
                        <FontCard font={font} />
                        <div className="absolute top-3 left-3 z-10">
                          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                            <Crown className="h-3 w-3 mr-1" />
                            Owned
                          </Badge>
                        </div>
                        {isOwnProfile && (
                          <div className="mt-2 text-xs text-muted-foreground text-center">
                            Purchased on {new Date(purchase.purchaseDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No purchases yet</h3>
                <p className="text-muted-foreground text-center">
                  {isOwnProfile 
                    ? "Discover premium fonts in our marketplace."
                    : `${user.username} hasn't made any public purchases.`
                  }
                </p>
                {isOwnProfile && (
                  <Link href="/browse?pricing=premium" className="mt-4">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Browse Premium Fonts
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock activity items */}
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Upload className="h-4 w-4 text-purple-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Uploaded a new font</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Font featured on homepage</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Download className="h-4 w-4 text-cyan-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Reached 1000 downloads</p>
                    <p className="text-xs text-muted-foreground">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}