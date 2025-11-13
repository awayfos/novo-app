"use client";

import { useState } from 'react';
import { VideoGenerator } from '@/components/custom/video-generator';
import { AudioControls } from '@/components/custom/audio-controls';
import { RenderProgress } from '@/components/custom/render-progress';
import { VideoPreview } from '@/components/custom/video-preview';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Settings, Database, Zap } from 'lucide-react';
import type { GenerationRequest, RenderProgress as RenderProgressType } from '@/lib/types';

export default function DarkStudioV46() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [renderProgress, setRenderProgress] = useState<RenderProgressType | null>(null);

  const handleGenerate = async (request: GenerationRequest) => {
    setIsGenerating(true);
    setVideoUrl(null);
    
    // Simulate render progress
    const stages: RenderProgressType['stage'][] = [
      'parsing', 'video-gen', 'audio-gen', 'lip-sync', 'mixing', 'encoding'
    ];
    
    for (let i = 0; i < stages.length; i++) {
      setRenderProgress({
        jobId: 'job-' + Math.random().toString(36).substr(2, 9),
        stage: stages[i],
        progress: Math.floor((i + 1) * (100 / stages.length)),
        eta: (stages.length - i) * 30,
        currentFrame: i * 100,
        totalFrames: 600
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Simulate completion
    setTimeout(() => {
      setIsGenerating(false);
      setRenderProgress(null);
      setVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Dark Studio V46 Supreme</h1>
                <p className="text-gray-400 text-sm">IA Adaptativa • Renderização Profissional • Dublagem Sincronizada</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-green-500 text-green-400 hidden sm:flex">
                <Zap className="w-3 h-3 mr-1" />
                Supabase Connected
              </Badge>
              <Badge variant="outline" className="border-blue-500 text-blue-400 hidden sm:flex">
                <Database className="w-3 h-3 mr-1" />
                AI Learning Active
              </Badge>
              <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-800">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Generator */}
          <div className="lg:col-span-2 space-y-6">
            <VideoGenerator onGenerate={handleGenerate} isGenerating={isGenerating} />
            
            {renderProgress && (
              <RenderProgress progress={renderProgress} />
            )}
            
            <VideoPreview videoUrl={videoUrl} isGenerating={isGenerating} />
          </div>

          {/* Right Column - Controls */}
          <div className="space-y-6">
            <AudioControls />
            
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">Estatísticas IA</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Projetos Gerados</span>
                  <span className="text-white font-mono">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Taxa de Conclusão</span>
                  <span className="text-green-400 font-mono">0%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Tempo Médio</span>
                  <span className="text-purple-400 font-mono">0min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Nível de Otimização</span>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                    Aprendendo
                  </Badge>
                </div>
              </div>
            </div>

            {/* Providers Status */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">Provedores IA</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
                  <span className="text-gray-300 text-sm">Runway ML</span>
                  <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                    Ready
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
                  <span className="text-gray-300 text-sm">ElevenLabs</span>
                  <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                    Ready
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
                  <span className="text-gray-300 text-sm">Wav2Lip</span>
                  <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                    Ready
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-800/30 rounded">
                  <span className="text-gray-300 text-sm">Pika Labs</span>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-400 text-xs">
                    Fallback
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Settings (Hidden by default) */}
        <div className="mt-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="bg-gray-800 border border-gray-700">
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="advanced">Avançado</TabsTrigger>
              <TabsTrigger value="learning">IA Learning</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="mt-4">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 rounded-lg p-6">
                <p className="text-gray-400">Configurações básicas estão no painel principal acima.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="mt-4">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 rounded-lg p-6">
                <h3 className="text-white font-bold mb-4">Configurações Avançadas</h3>
                <p className="text-gray-400 text-sm">Resolução, FPS, Codec, Bitrate, Color Grading...</p>
                <p className="text-gray-500 text-xs mt-2">Em desenvolvimento - Módulo 2</p>
              </div>
            </TabsContent>
            
            <TabsContent value="learning" className="mt-4">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 rounded-lg p-6">
                <h3 className="text-white font-bold mb-4">IA Adaptive Learning</h3>
                <p className="text-gray-400 text-sm">Sistema de aprendizado contínuo baseado em engajamento...</p>
                <p className="text-gray-500 text-xs mt-2">Em desenvolvimento - Módulo 3</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-xl mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              Dark Studio V46 Supreme • Powered by Supabase + Vercel + Edge AI
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">
                v46.0.0
              </Badge>
              <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                Módulo 1 Active
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
