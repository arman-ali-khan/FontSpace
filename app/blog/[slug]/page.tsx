import BlogPostClient from './BlogPostClient';
import { storage } from '@/lib/storage';

export async function generateStaticParams() {
  const posts = storage.getBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = storage.getBlogPostBySlug(params.slug);
  const allPosts = storage.getBlogPosts();
  const related = allPosts
    .filter(p => p.id !== post?.id && p.tags?.some(tag => post?.tags?.includes(tag)))
    .slice(0, 3);

  return (
    <BlogPostClient post={post} relatedPosts={related} />
  );
}
