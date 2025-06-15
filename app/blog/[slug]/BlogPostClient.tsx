'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen } from 'lucide-react';
import { BlogPost } from '@/types/font';

export default function BlogPostClient({ post, relatedPosts }: {
  post: BlogPost | null,
  relatedPosts: BlogPost[]
}) {
  const router = useRouter();

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="bg-card/50 backdrop-blur-sm border-white/10 max-w-md w-full text-center">
          <CardContent className="p-8">
            <BookOpen className="h-12 w-12 text-foreground/40 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Article Not Found</h2>
            <p className="text-foreground/60 mb-4">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/blog">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Back to Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="hover:bg-white/5 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Blog
      </Button>

      <article className="space-y-8">
        <div className="space-y-6">
          {post.coverImage && (
            <div className="h-64 md:h-96 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-purple-500/20 text-purple-300">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-foreground/70 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-foreground/60">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Share2 className="h-4 w-4 mr-2" />
                Share Article
              </Button>
            </div>
          </div>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardContent className="p-8">
            <div className="prose prose-invert max-w-none">
              <div className="text-foreground/80 leading-relaxed space-y-6">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {relatedPosts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="group bg-card/50 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {relatedPost.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-white/5 text-foreground/70 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="font-bold text-foreground group-hover:text-purple-400 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-sm text-foreground/70 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-foreground/60">
                        <span>{relatedPost.author}</span>
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                      
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Button variant="outline" className="w-full border-white/10 hover:border-white/20 hover:bg-white/5">
                          Read Article
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
