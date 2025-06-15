'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FontPreview } from '@/components/font-preview';
import { Download, Globe, Tag, ArrowLeft, Share2, User } from 'lucide-react';
import { storage } from '@/lib/storage';
import { Font } from '@/types/font';

export default function FontDetailClient({ font: initialFont }: { font: Font }) {
  const router = useRouter();
  const [font, setFont] = useState(initialFont);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!font) return;

    setDownloading(true);

    // Update download count in storage (simulated)
    storage.updateFontDownloads(font.id);
    setFont((prev) =>
      prev ? { ...prev, downloads: prev.downloads + 1 } : null
    );

    setTimeout(() => {
      setDownloading(false);
    }, 1000);
  };

  const formatFileSize = (bytes: number) => `${(bytes / 1024).toFixed(0)}KB`;

  const formatDownloads = (downloads: number) =>
    downloads >= 1000 ? `${(downloads / 1000).toFixed(1)}k` : downloads.toString();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="hover:bg-white/5"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Font Header */}
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {font.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      Featured
                    </Badge>
                  )}
                  {font.trending && (
                    <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                      Trending
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-foreground">{font.name}</h1>
                <p className="text-xl text-foreground/70">by {font.designer}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Stat label="Downloads" value={formatDownloads(font.downloads)} color="text-purple-400" />
                <Stat label="Format" value={font.fileFormat.toUpperCase()} color="text-pink-400" />
                <Stat label="File Size" value={formatFileSize(font.fileSize)} color="text-cyan-400" />
                <Stat label="Languages" value={font.languages.length.toString()} color="text-green-400" />
              </div>

              {font.description && (
                <Section title="Description">
                  <p className="text-foreground/70 leading-relaxed">{font.description}</p>
                </Section>
              )}

              {font.tags.length > 0 && (
                <Section title="Tags" icon={<Tag className="h-4 w-4" />}>
                  <div className="flex flex-wrap gap-2">
                    {font.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-white/5 text-foreground/70">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Section>
              )}

              <Section title="Language Support" icon={<Globe className="h-4 w-4" />}>
                <div className="flex flex-wrap gap-2">
                  {font.languages.map((language) => (
                    <Badge key={language} variant="secondary" className="bg-cyan-500/20 text-cyan-300">
                      {language}
                    </Badge>
                  ))}
                </div>
              </Section>
            </CardContent>
          </Card>

          <FontPreview fontName={font.name} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Download */}
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-center">Download Font</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-foreground">FREE</div>
                <p className="text-sm text-foreground/60">
                  Free for personal and commercial use
                </p>
              </div>
              <Button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {downloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download {font.fileFormat.toUpperCase()}
                  </>
                )}
              </Button>

              <Button variant="outline" className="w-full border-white/10 hover:border-white/20 hover:bg-white/5">
                <Share2 className="h-4 w-4 mr-2" />
                Share Font
              </Button>
            </CardContent>
          </Card>

          {/* Font Info */}
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Font Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Info label="Category" value={font.category.replace('-', ' ')} />
              <Info label="Upload Date" value={new Date(font.uploadDate).toLocaleDateString()} />
              <Info label="File Size" value={formatFileSize(font.fileSize)} />
              <Info label="Downloads" value={font.downloads.toLocaleString()} />
            </CardContent>
          </Card>

          {/* Designer Info */}
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Designer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {font.designer.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{font.designer}</p>
                  <p className="text-sm text-foreground/60">Font Creator</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Reusable stat block
const Stat = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="text-center">
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-foreground/60">{label}</div>
  </div>
);

// Reusable section
const Section = ({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
      {icon}
      {title}
    </h3>
    {children}
  </div>
);

// Reusable info row
const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-foreground/60">{label}</span>
    <span className="text-foreground text-sm">{value}</span>
  </div>
);
