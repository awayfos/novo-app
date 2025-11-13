"use client";

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Film, Loader2 } from 'lucide-react';
import type { RenderProgress as RenderProgressType } from '@/lib/types';

interface RenderProgressProps {
  progress: RenderProgressType | null;
}

const stageLabels = {
  'parsing': 'Analisando Prompt',
  'video-gen': 'Gerando Vídeo (Runway/Pika)',
  'audio-gen': 'Sintetizando Áudio (ElevenLabs)',
  'lip-sync': 'Sincronização Labial (Wav2Lip)',
  'mixing': 'Mixagem AudioFusion',
  'encoding': 'Renderização Final'
};

export function RenderProgress({ progress }: RenderProgressProps) {
  if (!progress) return null;

  return (
    <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">RenderSync Engine</h3>
              <p className="text-gray-400 text-xs">Job ID: {progress.jobId.slice(0, 8)}</p>
            </div>
          </div>
          <Badge variant="outline" className="border-green-500 text-green-400">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Processando
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white font-medium">
              {stageLabels[progress.stage] || progress.stage}
            </span>
            <span className="text-purple-400 font-mono">{progress.progress}%</span>
          </div>
          <Progress value={progress.progress} className="h-2" />
        </div>

        {progress.currentFrame && progress.totalFrames && (
          <div className="flex justify-between text-xs text-gray-400">
            <span>Frame {progress.currentFrame} / {progress.totalFrames}</span>
            <span>ETA: {Math.ceil(progress.eta / 60)}min</span>
          </div>
        )}

        <div className="grid grid-cols-6 gap-2 pt-2">
          {Object.keys(stageLabels).map((stage, idx) => (
            <div
              key={stage}
              className={`h-1 rounded-full transition-all ${
                Object.keys(stageLabels).indexOf(progress.stage) >= idx
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                  : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
