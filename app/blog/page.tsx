'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Clock, User, Calendar, Star, ArrowRight } from 'lucide-react';
import { storage } from '@/lib/storage';
import { BlogPost } from '@/types/font';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    const allPosts = storage.getBlogPosts();
    setPosts(allPosts);
    setFilteredPosts(allPosts);
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedTag !== 'all') {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    // Sort by featured first, then by date
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedTag]);

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
  const featuredPosts = posts.filter(post => post.featured);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <BookOpen className="h-8 w-8 text-purple-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Typography Blog
          </h1>
        </div>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Insights, tutorials, and inspiration from the world of digital typography
        </p>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Star className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-foreground">Featured Articles</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredPosts.slice(0, 2).map((post) => (
              <Card key={post.id} className="group bg-card/50 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 overflow-hidden">
                {post.coverImage && (
                  <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground group-hover:text-purple-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-foreground/70 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-foreground/60">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime} min read
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        Read Article
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-white/10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag('all')}
                className="border-white/10"
              >
                All Topics
              </Button>
              {allTags.slice(0, 5).map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                  className="border-white/10 capitalize"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Posts */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">All Articles</h2>
          <p className="text-foreground/60">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group bg-card/50 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 overflow-hidden">
                {post.featured && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}

                {post.coverImage && (
                  <div className="h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                )}
                
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-white/5 text-foreground/70 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="font-bold text-lg text-foreground group-hover:text-purple-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-foreground/70 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-foreground/60">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime} min
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground/60">
                        {new Date(post.publishDate).toLocaleDateString()}
                      </span>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="hover:bg-white/5">
                          Read More
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-foreground/40 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-foreground/60 text-center">
                Try adjusting your search terms or filters.
              </p>
              <Button
                variant="outline"
                className="mt-4 border-white/10 hover:border-white/20 hover:bg-white/5"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('all');
                }}
              >
                Clear filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}