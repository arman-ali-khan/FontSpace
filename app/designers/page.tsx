'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Search, Download, Upload, ExternalLink, Star, Twitter, Instagram, Globe } from 'lucide-react';
import { storage } from '@/lib/storage';
import { Designer } from '@/types/font';

export default function Designers() {
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [filteredDesigners, setFilteredDesigners] = useState<Designer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const allDesigners = storage.getDesigners();
    setDesigners(allDesigners);
    setFilteredDesigners(allDesigners);
  }, []);

  useEffect(() => {
    let filtered = designers;

    if (searchQuery) {
      filtered = filtered.filter(designer =>
        designer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        designer.bio.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by featured first, then by total downloads
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.totalDownloads - a.totalDownloads;
    });

    setFilteredDesigners(filtered);
  }, [designers, searchQuery]);

  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}k`;
    }
    return downloads.toString();
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Users className="h-8 w-8 text-purple-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 dark:from-white dark:via-purple-200 dark:to-pink-400 to-pink-400 bg-clip-text text-transparent">
            Featured Designers
          </h1>
        </div>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Meet the talented creators behind our beautiful font collection
        </p>
      </div>

      {/* Search */}
      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardContent className="p-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 h-4 w-4" />
            <Input
              placeholder="Search designers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 border-white/10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-400">{designers.length}</div>
            <div className="text-foreground/60">Total Designers</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-pink-400">
              {designers.reduce((sum, designer) => sum + designer.totalFonts, 0)}
            </div>
            <div className="text-foreground/60">Fonts Created</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-cyan-400">
              {formatDownloads(designers.reduce((sum, designer) => sum + designer.totalDownloads, 0))}
            </div>
            <div className="text-foreground/60">Total Downloads</div>
          </CardContent>
        </Card>
      </div>

      {/* Designers Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-foreground/60">
            {filteredDesigners.length} designer{filteredDesigners.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredDesigners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDesigners.map((designer) => (
              <Card key={designer.id} className="group bg-card/50 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
                {designer.featured && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Avatar and Basic Info */}
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={designer.avatar} alt={designer.name} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-bold">
                          {designer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-purple-400 transition-colors">
                          {designer.name}
                        </h3>
                        <p className="text-sm text-foreground/60">
                          Member since {new Date(designer.joinDate).getFullYear()}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-foreground/70 line-clamp-3">
                      {designer.bio}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">{designer.totalFonts}</div>
                        <div className="text-xs text-foreground/60">Fonts</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-pink-400">
                          {formatDownloads(designer.totalDownloads)}
                        </div>
                        <div className="text-xs text-foreground/60">Downloads</div>
                      </div>
                    </div>

                    {/* Social Links */}
                    {designer.socialLinks && (
                      <div className="flex justify-center space-x-3">
                        {designer.socialLinks.twitter && (
                          <a
                            href={designer.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/60 hover:text-blue-400 transition-colors"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        {designer.socialLinks.instagram && (
                          <a
                            href={designer.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/60 hover:text-pink-400 transition-colors"
                          >
                            <Instagram className="h-4 w-4" />
                          </a>
                        )}
                        {designer.website && (
                          <a
                            href={designer.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/60 hover:text-purple-400 transition-colors"
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link href={`/browse?designer=${encodeURIComponent(designer.name)}`} className="flex-1">
                        <Button variant="outline" className="w-full border-white/10 hover:border-white/20 hover:bg-white/5">
                          <Upload className="h-4 w-4 mr-2" />
                          View Fonts
                        </Button>
                      </Link>
                      {designer.website && (
                        <a href={designer.website} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon" className="hover:bg-white/5">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-foreground/40 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No designers found</h3>
              <p className="text-foreground/60 text-center">
                Try adjusting your search terms to find designers.
              </p>
              <Button
                variant="outline"
                className="mt-4 border-white/10 hover:border-white/20 hover:bg-white/5"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}