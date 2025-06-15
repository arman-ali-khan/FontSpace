'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FontCard } from '@/components/font-card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  User, Upload, Download, Calendar, TrendingUp, Plus, 
  Palette, Clock, CheckCircle, XCircle, AlertCircle 
} from 'lucide-react';
import { auth } from '@/lib/auth';
import { storage } from '@/lib/storage';
import { Font, User as UserType } from '@/types/font';

export default function Dashboard() {
  const [user, setUser] = useState<UserType | null>(null);
  const [userFonts, setUserFonts] = useState<Font[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    
    if (!currentUser) {
      router.push('/login');
      return;
    }

    setUser(currentUser);
    
    // Get user's uploaded fonts (only if they're a designer)
    if (currentUser.isDesigner) {
      const allFonts = storage.getFonts();
      const myFonts = allFonts.filter(font => font.uploadedBy === currentUser.id);
      setUserFonts(myFonts);
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalDownloads = userFonts.reduce((sum, font) => sum + font.downloads, 0);
  const designerApplication = storage.getUserDesignerApplication(user.id);

  const getApplicationStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user.username}!
          </h1>
          <p className="text-foreground/60">
            {user.isDesigner 
              ? "Manage your fonts and track your impact on the community"
              : "Discover amazing fonts and manage your collection"
            }
          </p>
        </div>
        
        {user.isDesigner ? (
          <Link href="/upload">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="h-4 w-4 mr-2" />
              Upload New Font
            </Button>
          </Link>
        ) : user.designerApplicationStatus === 'none' ? (
          <Link href="/join-designer">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Palette className="h-4 w-4 mr-2" />
              Become a Designer
            </Button>
          </Link>
        ) : null}
      </div>

      {/* Designer Application Status */}
      {user.designerApplicationStatus === 'pending' && (
        <Alert className="border-yellow-500/20 bg-yellow-500/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-foreground">
            <div className="flex items-center justify-between">
              <span>
                Your designer application is under review. We'll get back to you within 3-5 business days.
              </span>
              {getApplicationStatusBadge('pending')}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {user.designerApplicationStatus === 'rejected' && (
        <Alert className="border-red-500/20 bg-red-500/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-foreground">
            <div className="flex items-center justify-between">
              <span>
                Your designer application was not approved this time. You can reapply after improving your portfolio.
              </span>
              {getApplicationStatusBadge('rejected')}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {user.isDesigner ? (
          <>
            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Fonts</CardTitle>
                <Upload className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{userFonts.length}</div>
                <p className="text-xs text-foreground/60">
                  Fonts uploaded
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                <Download className="h-4 w-4 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalDownloads.toLocaleString()}</div>
                <p className="text-xs text-foreground/60">
                  Across all fonts
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Featured Fonts</CardTitle>
                <TrendingUp className="h-4 w-4 text-pink-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {userFonts.filter(font => font.featured).length}
                </div>
                <p className="text-xs text-foreground/60">
                  Currently featured
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fonts Downloaded</CardTitle>
                <Download className="h-4 w-4 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">0</div>
                <p className="text-xs text-foreground/60">
                  Free downloads
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fonts Purchased</CardTitle>
                <TrendingUp className="h-4 w-4 text-pink-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {storage.getUserPurchases(user.id).length}
                </div>
                <p className="text-xs text-foreground/60">
                  Premium fonts owned
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                <TrendingUp className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">0</div>
                <p className="text-xs text-foreground/60">
                  Saved fonts
                </p>
              </CardContent>
            </Card>
          </>
        )}

        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Member Since</CardTitle>
            <Calendar className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {new Date(user.joinDate).getFullYear()}
            </div>
            <p className="text-xs text-foreground/60">
              {new Date(user.joinDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue={user.isDesigner ? "fonts" : "purchases"} className="space-y-6">
        <TabsList className="bg-card/50 backdrop-blur-sm border-white/10">
          {user.isDesigner ? (
            <>
              <TabsTrigger value="fonts">My Fonts ({userFonts.length})</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger value="purchases">My Purchases</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
            </>
          )}
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        {user.isDesigner && (
          <TabsContent value="fonts" className="space-y-6">
            {userFonts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userFonts.map((font) => (
                  <FontCard key={font.id} font={font} />
                ))}
              </div>
            ) : (
              <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Upload className="h-12 w-12 text-foreground/40 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No fonts uploaded yet</h3>
                  <p className="text-foreground/60 text-center mb-6 max-w-md">
                    Start building your font library by uploading your first font. Share your creativity with the community!
                  </p>
                  <Link href="/upload">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Upload Your First Font
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}

        {user.isDesigner && (
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Download Statistics</CardTitle>
                  <CardDescription>Font performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userFonts.slice(0, 5).map((font) => (
                      <div key={font.id} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">{font.name}</span>
                        <span className="text-sm text-foreground/60">{font.downloads} downloads</span>
                      </div>
                    ))}
                    {userFonts.length === 0 && (
                      <p className="text-foreground/60 text-center py-8">No data available yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>Your fonts by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(
                      userFonts.reduce((acc, font) => {
                        acc[font.category] = (acc[font.category] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([category, count]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground capitalize">
                          {category.replace('-', ' ')}
                        </span>
                        <span className="text-sm text-foreground/60">{count} fonts</span>
                      </div>
                    ))}
                    {userFonts.length === 0 && (
                      <p className="text-foreground/60 text-center py-8">No data available yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {!user.isDesigner && (
          <TabsContent value="purchases" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Download className="h-12 w-12 text-foreground/40 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No purchases yet</h3>
                <p className="text-foreground/60 text-center mb-6 max-w-md">
                  Discover premium fonts in our marketplace and start building your collection.
                </p>
                <Link href="/browse?pricing=premium">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Browse Premium Fonts
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {!user.isDesigner && (
          <TabsContent value="downloads" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-white/10">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Download className="h-12 w-12 text-foreground/40 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No downloads yet</h3>
                <p className="text-foreground/60 text-center mb-6 max-w-md">
                  Start downloading free fonts to build your typography collection.
                </p>
                <Link href="/browse?pricing=free">
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 text-white">
                    Browse Free Fonts
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">{user.username}</h3>
                    {user.isDesigner && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        <Palette className="h-3 w-3 mr-1" />
                        Designer
                      </Badge>
                    )}
                  </div>
                  <p className="text-foreground/60">{user.email}</p>
                  <p className="text-sm text-foreground/40">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {user.isDesigner ? 'Total Uploads' : 'Total Purchases'}
                  </p>
                  <p className="text-2xl font-bold text-purple-400">
                    {user.isDesigner ? userFonts.length : storage.getUserPurchases(user.id).length}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {user.isDesigner ? 'Total Downloads' : 'Account Status'}
                  </p>
                  <p className="text-2xl font-bold text-pink-400">
                    {user.isDesigner ? totalDownloads.toLocaleString() : 'Active'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}