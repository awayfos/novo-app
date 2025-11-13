"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Key, 
  Database, 
  Zap, 
  Github, 
  Globe,
  Bell,
  Shield,
  Palette,
  Save,
  Check
} from "lucide-react"
import { toast } from "sonner"

export function Settings() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    toast.success("Configurações salvas com sucesso!")
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
          <CardDescription>Gerencie suas preferências e integrações</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-gray-950">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-1" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="integrations">
                <Zap className="w-4 h-4 mr-1" />
                Integrações
              </TabsTrigger>
              <TabsTrigger value="api">
                <Key className="w-4 h-4 mr-1" />
                API Keys
              </TabsTrigger>
              <TabsTrigger value="preferences">
                <Palette className="w-4 h-4 mr-1" />
                Preferências
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="w-4 h-4 mr-1" />
                Notificações
              </TabsTrigger>
            </TabsList>

            {/* Perfil */}
            <TabsContent value="profile" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Nome de Usuário</Label>
                  <Input
                    id="username"
                    placeholder="seu_usuario"
                    className="bg-gray-950 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-gray-950 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="channel">Nome do Canal</Label>
                  <Input
                    id="channel"
                    placeholder="Meu Canal Dark"
                    className="bg-gray-950 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Plano Atual</Label>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-2">
                      Premium
                    </Badge>
                    <span className="text-sm text-gray-400">Recursos ilimitados</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Integrações */}
            <TabsContent value="integrations" className="space-y-6 mt-6">
              <div className="space-y-4">
                {/* Supabase */}
                <Card className="bg-gray-950 border-gray-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                          <Database className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Supabase</h3>
                          <p className="text-sm text-gray-400">Storage e Database</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                        Conectado
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Vercel */}
                <Card className="bg-gray-950 border-gray-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <Globe className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Vercel</h3>
                          <p className="text-sm text-gray-400">Deploy e Preview</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                        Conectado
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* GitHub */}
                <Card className="bg-gray-950 border-gray-800">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                          <Github className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">GitHub</h3>
                          <p className="text-sm text-gray-400">Version Control</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                        Conectado
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* API Keys */}
            <TabsContent value="api" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai-key">OpenAI API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="openai-key"
                      type="password"
                      placeholder="sk-..."
                      className="bg-gray-950 border-gray-700"
                    />
                    <Button variant="outline" className="bg-gray-950 border-gray-700">
                      <Shield className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">Usado para geração de roteiros e análise</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stability-key">Stability AI Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="stability-key"
                      type="password"
                      placeholder="sk-..."
                      className="bg-gray-950 border-gray-700"
                    />
                    <Button variant="outline" className="bg-gray-950 border-gray-700">
                      <Shield className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">Usado para geração de imagens (SDXL)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="elevenlabs-key">ElevenLabs API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="elevenlabs-key"
                      type="password"
                      placeholder="..."
                      className="bg-gray-950 border-gray-700"
                    />
                    <Button variant="outline" className="bg-gray-950 border-gray-700">
                      <Shield className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">Usado para Text-to-Speech ultra realista</p>
                </div>
              </div>
            </TabsContent>

            {/* Preferências */}
            <TabsContent value="preferences" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Idioma Padrão</Label>
                  <Select defaultValue="pt">
                    <SelectTrigger className="bg-gray-950 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">Português (PT)</SelectItem>
                      <SelectItem value="en">English (EN)</SelectItem>
                      <SelectItem value="es">Español (ES)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Qualidade de Render Padrão</Label>
                  <Select defaultValue="1080p">
                    <SelectTrigger className="bg-gray-950 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="720p">720p (HD)</SelectItem>
                      <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                      <SelectItem value="4k">4K (Premium)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-950 rounded-lg border border-gray-800">
                  <div className="space-y-1">
                    <Label>Auto-save Drafts</Label>
                    <p className="text-xs text-gray-500">Salvar automaticamente rascunhos</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-950 rounded-lg border border-gray-800">
                  <div className="space-y-1">
                    <Label>Preview em Tempo Real</Label>
                    <p className="text-xs text-gray-500">Mostrar preview durante geração</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-950 rounded-lg border border-gray-800">
                  <div className="space-y-1">
                    <Label>Marca d'água</Label>
                    <p className="text-xs text-gray-500">Adicionar marca d'água nos vídeos</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </TabsContent>

            {/* Notificações */}
            <TabsContent value="notifications" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-950 rounded-lg border border-gray-800">
                  <div className="space-y-1">
                    <Label>Vídeo Completo</Label>
                    <p className="text-xs text-gray-500">Notificar quando vídeo estiver pronto</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-950 rounded-lg border border-gray-800">
                  <div className="space-y-1">
                    <Label>Erros de Processamento</Label>
                    <p className="text-xs text-gray-500">Alertar sobre falhas na geração</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-950 rounded-lg border border-gray-800">
                  <div className="space-y-1">
                    <Label>Atualizações do Sistema</Label>
                    <p className="text-xs text-gray-500">Novos recursos e melhorias</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-950 rounded-lg border border-gray-800">
                  <div className="space-y-1">
                    <Label>Dicas e Tutoriais</Label>
                    <p className="text-xs text-gray-500">Receber dicas para melhorar vídeos</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Botão de Salvar */}
          <div className="flex justify-end mt-6 pt-6 border-t border-gray-800">
            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Salvo!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
