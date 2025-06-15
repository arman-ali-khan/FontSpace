'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

interface FontPreviewProps {
  fontName: string;
  className?: string;
}

export function FontPreview({ fontName, className = '' }: FontPreviewProps) {
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');
  const [fontSize, setFontSize] = useState([24]);

  return (
    <Card className={`bg-card/50 backdrop-blur-sm border-white/10 ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg">Font Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground/80 mb-2 block">
              Preview Text
            </label>
            <Input
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              placeholder="Enter text to preview..."
              className="bg-background/50 border-white/10"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground/80 mb-2 block">
              Font Size: {fontSize[0]}px
            </label>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              max={72}
              min={12}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="p-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-lg border border-white/5">
          <div
            className="text-foreground break-words"
            style={{
              fontSize: `${fontSize[0]}px`,
              fontFamily: 'serif', // In a real app, this would be the actual font
              lineHeight: 1.4
            }}
          >
            {previewText}
          </div>
        </div>

        {/* Sample Text Sizes */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground/80">Sample Sizes</h4>
          {[12, 16, 24, 32, 48].map((size) => (
            <div
              key={size}
              className="text-foreground/80"
              style={{
                fontSize: `${size}px`,
                fontFamily: 'serif'
              }}
            >
              {fontName} - {size}px
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}