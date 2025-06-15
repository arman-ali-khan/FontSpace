'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FontCard } from '@/components/font-card';
import { User, Upload, Download, Calendar, TrendingUp, Plus } from 'lucide-react';
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
    
    // Get user's uploaded fonts
    const allFonts = storage.getFonts();
    const myFonts = allFonts.filter(font => font.uploadedBy === currentUser.id);
    setUserFonts(myFonts);
    
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

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user.username}!
          </h1>
          <p className="text-foreground/60">
            Manage your fonts and track your impact on the community
          </p>
        </div>
        
        <Link href="/upload">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Plus className="h-4 w-4 mr-2" />
            Upload New Font
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
      <Tabs defaultValue="fonts" className="space-y-6">
        <TabsList className="bg-card/50 backdrop-blur-sm border-white/10">
          <TabsTrigger value="fonts">My Fonts ({userFonts.length})</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

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
                  <h3 className="text-lg font-semibold text-foreground">{user.username}</h3>
                  <p className="text-foreground/60">{user.email}</p>
                  <p className="text-sm text-foreground/40">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Total Uploads</p>
                  <p className="text-2xl font-bold text-purple-400">{userFonts.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Total Downloads</p>
                  <p className="text-2xl font-bold text-pink-400">{totalDownloads.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}