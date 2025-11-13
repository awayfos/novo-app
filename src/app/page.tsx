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
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gradient-to-r from-black via-gray-950 to-black backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-purple-700 rounded-xl blur-xl opacity-60"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-red-600 via-red-700 to-purple-700 rounded-xl flex items-center justify-center shadow-2xl">
                  <Film className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-red-500 via-red-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                  DarkStudio V46
                </h1>
                <p className="text-xs text-gray-500 font-semibold mt-1">Supreme • AI Video Generator Pro</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-5 py-2.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-400 text-sm rounded-xl border border-green-500/30 font-bold backdrop-blur-sm flex items-center gap-2 shadow-lg shadow-green-500/10">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></span>
                ONLINE
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-950/80 border border-gray-800 mb-8 p-2 backdrop-blur-xl rounded-2xl h-auto shadow-2xl">
            <TabsTrigger 
              value="generator" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-red-900/50 transition-all duration-300 rounded-xl py-4 text-sm font-bold hover:bg-gray-900/50"
            >
              <Film className="w-5 h-5 mr-2" />
              Gerar Vídeo
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-red-900/50 transition-all duration-300 rounded-xl py-4 text-sm font-bold hover:bg-gray-900/50 text-gray-400"
            >
              <History className="w-5 h-5 mr-2" />
              Histórico
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-red-900/50 transition-all duration-300 rounded-xl py-4 text-sm font-bold hover:bg-gray-900/50 text-gray-400"
            >
              <SettingsIcon className="w-5 h-5 mr-2" />
              Configurações
            </TabsTrigger>
            <TabsTrigger 
              value="dev"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-red-900/50 transition-all duration-300 rounded-xl py-4 text-sm font-bold hover:bg-gray-900/50 text-gray-400"
            >
              <Code className="w-5 h-5 mr-2" />
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
      <footer className="border-t border-gray-800 bg-gradient-to-r from-black via-gray-950 to-black backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
            <div className="flex items-center gap-3">
              <span className="font-black text-gray-300 text-base">DarkStudio V46 Supreme</span>
              <span className="text-gray-700">•</span>
              <span className="text-gray-500">Powered by GPT-5 & SDXL</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-cyan-500/10 text-cyan-400 text-xs rounded-lg border border-cyan-500/30 font-bold">Supabase</span>
              <span className="px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs rounded-lg border border-blue-500/30 font-bold">Vercel</span>
              <span className="px-3 py-1.5 bg-purple-500/10 text-purple-400 text-xs rounded-lg border border-purple-500/30 font-bold">GitHub</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
