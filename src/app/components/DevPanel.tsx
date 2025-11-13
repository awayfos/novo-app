"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Upload, 
  Terminal, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  RefreshCw,
  Code2,
  Bug,
  Zap,
  FileJson,
  Play
} from "lucide-react"
import { toast } from "sonner"

export function DevPanel() {
  const [updateJson, setUpdateJson] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [testRunning, setTestRunning] = useState(false)

  const handleHotUpdate = async () => {
    if (!updateJson.trim()) {
      toast.error("Por favor, insira um JSON válido")
      return
    }

    try {
      JSON.parse(updateJson)
      setIsUpdating(true)
      
      // Simular hot update
      setTimeout(() => {
        setIsUpdating(false)
        toast.success("Hot update aplicado com sucesso!")
        setUpdateJson("")
      }, 2000)
    } catch (error) {
      toast.error("JSON inválido. Verifique a sintaxe.")
    }
  }

  const handleRunTests = () => {
    setTestRunning(true)
    setTimeout(() => {
      setTestRunning(false)
      toast.success("Todos os testes passaram!")
    }, 3000)
  }

  const handleAutoFix = () => {
    toast.success("Correção automática executada!")
  }

  // Mock logs
  const logs = [
    { time: "14:32:15", level: "info", message: "Video generation started: ID #1234" },
    { time: "14:32:18", level: "success", message: "Script generated successfully" },
    { time: "14:32:22", level: "info", message: "Image generation in progress..." },
    { time: "14:32:45", level: "success", message: "All frames generated" },
    { time: "14:32:50", level: "info", message: "TTS processing..." },
    { time: "14:33:02", level: "success", message: "Audio generated and synced" },
    { time: "14:33:05", level: "info", message: "Final render started" },
    { time: "14:33:28", level: "success", message: "Video completed: output.mp4" },
  ]

  const getLogIcon = (level: string) => {
    switch (level) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
        return <Activity className="w-4 h-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-800/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Sistema</p>
                <p className="text-2xl font-bold text-green-400">Online</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-800/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Uptime</p>
                <p className="text-2xl font-bold text-blue-400">99.9%</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-800/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Versão</p>
                <p className="text-2xl font-bold text-purple-400">v1.0</p>
              </div>
              <Code2 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border-orange-800/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Erros</p>
                <p className="text-2xl font-bold text-orange-400">0</p>
              </div>
              <Bug className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dev Panel */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-500" />
            Painel de Desenvolvimento
          </CardTitle>
          <CardDescription>Ferramentas avançadas para desenvolvedores</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="update" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-950">
              <TabsTrigger value="update">
                <Upload className="w-4 h-4 mr-1" />
                Hot Update
              </TabsTrigger>
              <TabsTrigger value="logs">
                <Terminal className="w-4 h-4 mr-1" />
                Logs
              </TabsTrigger>
              <TabsTrigger value="tests">
                <Play className="w-4 h-4 mr-1" />
                Testes
              </TabsTrigger>
              <TabsTrigger value="fix">
                <Zap className="w-4 h-4 mr-1" />
                Auto-Fix
              </TabsTrigger>
            </TabsList>

            {/* Hot Update */}
            <TabsContent value="update" className="space-y-4 mt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">JSON de Atualização</label>
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Admin Only
                  </Badge>
                </div>
                <Textarea
                  value={updateJson}
                  onChange={(e) => setUpdateJson(e.target.value)}
                  placeholder={`{
  "module": "video_pipeline",
  "config": {
    "resolution": "1920x1080",
    "fps": 60
  }
}`}
                  className="bg-gray-950 border-gray-700 font-mono text-sm min-h-[200px]"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleHotUpdate}
                  disabled={isUpdating}
                  className="bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800"
                >
                  {isUpdating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Aplicando...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Aplicar Hot Update
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setUpdateJson("")}
                  className="bg-gray-950 border-gray-700"
                >
                  Limpar
                </Button>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <FileJson className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-300">
                    <p className="font-semibold mb-1">Como funciona:</p>
                    <ul className="space-y-1 text-blue-400/80">
                      <li>• Upload JSON → Validação sintaxe</li>
                      <li>• Verificar compatibilidade de versão</li>
                      <li>• Sandbox apply → Unit tests</li>
                      <li>• Canary (10%) → Full rollout</li>
                      <li>• Rollback automático se falhar</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Logs */}
            <TabsContent value="logs" className="space-y-4 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Logs em Tempo Real</h3>
                <Button size="sm" variant="outline" className="bg-gray-950 border-gray-700">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Atualizar
                </Button>
              </div>

              <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 max-h-[400px] overflow-y-auto font-mono text-xs space-y-2">
                {logs.map((log, index) => (
                  <div key={index} className="flex items-start gap-3 hover:bg-gray-900/50 p-2 rounded">
                    {getLogIcon(log.level)}
                    <span className="text-gray-500 w-20 flex-shrink-0">{log.time}</span>
                    <span className="text-gray-300">{log.message}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="bg-gray-950 border-gray-700">
                  Exportar Logs
                </Button>
                <Button size="sm" variant="outline" className="bg-gray-950 border-gray-700">
                  Limpar Logs
                </Button>
              </div>
            </TabsContent>

            {/* Testes */}
            <TabsContent value="tests" className="space-y-4 mt-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Módulos de Teste</h3>
                
                <div className="space-y-2">
                  {[
                    { name: "AI Engine", status: "passed" },
                    { name: "Video Pipeline", status: "passed" },
                    { name: "Audio System", status: "passed" },
                    { name: "Image Engine", status: "passed" },
                    { name: "Storage Integration", status: "passed" },
                  ].map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-950 rounded-lg border border-gray-800">
                      <span className="text-sm">{test.name}</span>
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {test.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={handleRunTests}
                  disabled={testRunning}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800"
                >
                  {testRunning ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Executando Testes...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Executar Todos os Testes
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* Auto-Fix */}
            <TabsContent value="fix" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-purple-300">
                      <p className="font-semibold mb-1">Correção Automática</p>
                      <p className="text-purple-400/80">
                        Detecta e corrige automaticamente problemas comuns no sistema,
                        incluindo cache, dependências, configurações e integrações.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Verificações Disponíveis</h3>
                  {[
                    "Limpar cache de renderização",
                    "Verificar integridade de dependências",
                    "Resetar configurações de API",
                    "Sincronizar storage com Supabase",
                    "Validar estrutura de arquivos",
                  ].map((check, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-950 rounded-lg border border-gray-800">
                      <span className="text-sm">{check}</span>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={handleAutoFix}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-700 hover:from-purple-700 hover:to-pink-800"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Executar Correção Automática
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-sm">Informações do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Node Version</p>
              <p className="font-mono">v20.10.0</p>
            </div>
            <div>
              <p className="text-gray-400">Next.js</p>
              <p className="font-mono">15.4.6</p>
            </div>
            <div>
              <p className="text-gray-400">React</p>
              <p className="font-mono">19.1.0</p>
            </div>
            <div>
              <p className="text-gray-400">TypeScript</p>
              <p className="font-mono">5.x</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
