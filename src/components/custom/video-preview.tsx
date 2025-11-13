"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, Play } from 'lucide-react';

interface VideoPreviewProps {
  videoUrl: string | null;
  isGenerating: boolean;
}

export function VideoPreview({ videoUrl, isGenerating }: VideoPreviewProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Preview</h3>
          {videoUrl && (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button size="sm" variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          )}
        </div>

        <div className="aspect-video bg-black rounded-lg overflow-hidden border border-gray-700 flex items-center justify-center">
          {isGenerating ? (
            <div className="text-center space-y-3">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-gray-400 text-sm">Renderizando vídeo dark...</p>
            </div>
          ) : videoUrl ? (
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <Play className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-500 text-sm">Nenhum vídeo gerado ainda</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
