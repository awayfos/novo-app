"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings as SettingsIcon, Database, Zap, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function Settings() {
  return (
    <Card className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border-gray-800 shadow-2xl backdrop-blur-sm">
      <CardHeader className="border-b border-gray-800 pb-6">
        <CardTitle className="flex items-center gap-3 text-white text-2xl font-black">
          <SettingsIcon className="w-7 h-7 text-purple-500" />
          Configurações
        </CardTitle>
        <CardDescription className="text-gray-400 text-base">
          Gerencie suas preferências e integrações
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-8">
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-500" />
            Integrações
          </h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-800">
              <div>
                <p className="text-white font-bold">Supabase</p>
                <p className="text-sm text-gray-500">Banco de dados e autenticação</p>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 font-bold">
                Conectado
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-800">
              <div>
                <p className="text-white font-bold">Vercel</p>
                <p className="text-sm text-gray-500">Deploy e hospedagem</p>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 font-bold">
                Ativo
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-800">
              <div>
                <p className="text-white font-bold">GitHub</p>
                <p className="text-sm text-gray-500">Controle de versão</p>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 font-bold">
                Sincronizado
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Performance
          </h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-800">
              <div>
                <p className="text-white font-bold">AI Engine</p>
                <p className="text-sm text-gray-500">GPT-5 Turbo</p>
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 font-bold">
                Otimizado
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-gray-800">
              <div>
                <p className="text-white font-bold">Render Quality</p>
                <p className="text-sm text-gray-500">1080p @ 30fps</p>
              </div>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 font-bold">
                Alta
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Segurança
          </h3>
          <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30">
            <p className="text-green-400 font-bold mb-2">Sistema Protegido</p>
            <p className="text-sm text-gray-400">
              Todas as suas gerações são criptografadas e armazenadas com segurança.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
