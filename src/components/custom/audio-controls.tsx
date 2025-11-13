"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Volume2, Music, Waves, Zap } from 'lucide-react';

export function AudioControls() {
  const [voiceVolume, setVoiceVolume] = useState([80]);
  const [ambientVolume, setAmbientVolume] = useState([40]);
  const [musicVolume, setMusicVolume] = useState([60]);
  const [effectsVolume, setEffectsVolume] = useState([50]);

  return (
    <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border-gray-700 p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AudioFusion Adaptive</h3>
            <p className="text-gray-400 text-xs">Mixagem inteligente em tempo real</p>
          </div>
        </div>

        {/* Voice Volume */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-white flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-purple-400" />
              Voz
            </Label>
            <span className="text-purple-400 font-mono text-sm">{voiceVolume[0]}%</span>
          </div>
          <Slider
            value={voiceVolume}
            onValueChange={setVoiceVolume}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Ambient Volume */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-white flex items-center gap-2">
              <Waves className="w-4 h-4 text-blue-400" />
              Ambiente
            </Label>
            <span className="text-blue-400 font-mono text-sm">{ambientVolume[0]}%</span>
          </div>
          <Slider
            value={ambientVolume}
            onValueChange={setAmbientVolume}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Music Volume */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-white flex items-center gap-2">
              <Music className="w-4 h-4 text-pink-400" />
              Música
            </Label>
            <span className="text-pink-400 font-mono text-sm">{musicVolume[0]}%</span>
          </div>
          <Slider
            value={musicVolume}
            onValueChange={setMusicVolume}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Effects Volume */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              Efeitos
            </Label>
            <span className="text-yellow-400 font-mono text-sm">{effectsVolume[0]}%</span>
          </div>
          <Slider
            value={effectsVolume}
            onValueChange={setEffectsVolume}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
}
