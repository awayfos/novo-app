"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Sparkles, Video, Mic, Wand2, Loader2 } from 'lucide-react';
import type { GenerationRequest } from '@/lib/types';

interface VideoGeneratorProps {
  onGenerate: (request: GenerationRequest) => void;
  isGenerating: boolean;
}

export function VideoGenerator({ onGenerate, isGenerating }: VideoGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('dark-cinematic');
  const [duration, setDuration] = useState([30]);
  const [voiceId, setVoiceId] = useState('default');
  const [lipSync, setLipSync] = useState(true);

  const handleGenerate = () => {
    if (!prompt.trim()) return;

    onGenerate({
      prompt,
      style,
      duration: duration[0],
      voiceId,
      lipSync
    });
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700 p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">IA Dark Composer</h2>
            <p className="text-gray-400 text-sm">Geração de vídeo com IA adaptativa</p>
          </div>
        </div>

        {/* Prompt Input */}
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-white flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            Prompt de Geração
          </Label>
          <Textarea
            id="prompt"
            placeholder="Descreva o vídeo que deseja criar... Ex: 'Um guerreiro solitário caminhando em uma cidade cyberpunk escura, chuva neon, atmosfera cinematográfica'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 transition-all"
            disabled={isGenerating}
          />
        </div>

        {/* Style Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="style" className="text-white flex items-center gap-2">
              <Video className="w-4 h-4" />
              Estilo Visual
            </Label>
            <Select value={style} onValueChange={setStyle} disabled={isGenerating}>
              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="dark-cinematic">Dark Cinematic</SelectItem>
                <SelectItem value="dark-minimal">Dark Minimal</SelectItem>
                <SelectItem value="dark-neon">Dark Neon</SelectItem>
                <SelectItem value="dark-horror">Dark Horror</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="voice" className="text-white flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Voz (ElevenLabs)
            </Label>
            <Select value={voiceId} onValueChange={setVoiceId} disabled={isGenerating}>
              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="default">Voz Padrão</SelectItem>
                <SelectItem value="deep-male">Deep Male</SelectItem>
                <SelectItem value="soft-female">Soft Female</SelectItem>
                <SelectItem value="narrator">Narrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Duration Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-white">Duração</Label>
            <span className="text-purple-400 font-mono text-sm">{duration[0]}s</span>
          </div>
          <Slider
            value={duration}
            onValueChange={setDuration}
            min={10}
            max={120}
            step={5}
            className="w-full"
            disabled={isGenerating}
          />
        </div>

        {/* Lip Sync Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
          <div className="space-y-0.5">
            <Label htmlFor="lipsync" className="text-white">Sincronização Labial (Wav2Lip)</Label>
            <p className="text-xs text-gray-400">Ativa lip-sync neural para dublagem perfeita</p>
          </div>
          <Switch
            id="lipsync"
            checked={lipSync}
            onCheckedChange={setLipSync}
            disabled={isGenerating}
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Gerando Vídeo...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Gerar Vídeo Dark
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
