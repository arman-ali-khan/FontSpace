import { storage } from '@/lib/storage';
import FontDetailClient from './FontDetailClient';

export async function generateStaticParams() {
  const fonts = storage.getFonts(); // or fetch from DB
  return fonts.map((font) => ({ id: font.id }));
}

export default async function FontPage({ params }: { params: { id: string } }) {
  const font = storage.getFontById(params.id);

  if (!font) return <div>Font not found</div>;

  return <FontDetailClient font={font} />;
}
