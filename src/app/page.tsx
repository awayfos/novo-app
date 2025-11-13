"use client"

import { useState } from "react"
import { VideoGenerator } from "./components/VideoGenerator"
import { VideoHistory } from "./components/VideoHistory"
import { Settings } from "./components/Settings"
import { DevPanel } from "./components/DevPanel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Film, History, Settings as SettingsIcon, Code } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("generator")

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-gradient-to-r from-black via-gray-950 to-black backdrop-blur-xl sticky top-0 z-50 shadow-2xl shadow-red-900/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-purple-700 rounded-xl blur-lg opacity-50"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-red-600 via-red-700 to-purple-700 rounded-xl flex items-center justify-center shadow-xl">
                  <Film className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 via-red-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                  DarkStudio Engine
                </h1>
                <p className="text-xs text-gray-500 font-medium mt-0.5">v1_launch • AI Video Generator Pro</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-400 text-sm rounded-lg border border-green-500/20 font-semibold backdrop-blur-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Active
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border border-gray-800/50 mb-8 p-1.5 backdrop-blur-sm rounded-xl h-auto">
            <TabsTrigger 
              value="generator" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-900/50 transition-all duration-300 rounded-lg py-3 text-sm font-medium"
            >
              <Film className="w-4 h-4 mr-2" />
              Gerar Vídeo
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-900/50 transition-all duration-300 rounded-lg py-3 text-sm font-medium"
            >
              <History className="w-4 h-4 mr-2" />
              Histórico
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-900/50 transition-all duration-300 rounded-lg py-3 text-sm font-medium"
            >
              <SettingsIcon className="w-4 h-4 mr-2" />
              Configurações
            </TabsTrigger>
            <TabsTrigger 
              value="dev"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-red-900/50 transition-all duration-300 rounded-lg py-3 text-sm font-medium"
            >
              <Code className="w-4 h-4 mr-2" />
              Dev Panel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="mt-0">
            <VideoGenerator />
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <VideoHistory />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <Settings />
          </TabsContent>

          <TabsContent value="dev" className="mt-0">
            <DevPanel />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 bg-gradient-to-r from-black via-gray-950 to-black backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p className="flex items-center gap-2">
              <span className="font-semibold text-gray-400">DarkStudio Engine</span>
              <span className="text-gray-700">•</span>
              <span>Powered by GPT-5 & Stable Diffusion XL</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded border border-cyan-500/20">Supabase</span>
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded border border-blue-500/20">Vercel</span>
              <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded border border-purple-500/20">GitHub</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
