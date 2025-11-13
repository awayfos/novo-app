"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Code, Terminal, Play, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export function DevPanel() {
  const [jsonInput, setJsonInput] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)

  const handleExecute = async () => {
    if (!jsonInput.trim()) {
      toast.error("Por favor, insira um JSON válido")
      return
    }

    setIsExecuting(true)
    
    try {
      // Validar JSON
      JSON.parse(jsonInput)
      
      // Simular execução
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success("Comando executado com sucesso!")
    } catch (error) {
      toast.error("JSON inválido. Verifique a sintaxe.")
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border-gray-800 shadow-2xl backdrop-blur-sm">
      <CardHeader className="border-b border-gray-800 pb-6">
        <CardTitle className="flex items-center gap-3 text-white text-2xl font-black">
          <Code className="w-7 h-7 text-orange-500" />
          Dev Panel
        </CardTitle>
        <CardDescription className="text-gray-400 text-base">
          Painel de desenvolvimento para atualizações e testes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold">
            <Terminal className="w-5 h-5 text-cyan-500" />
            <span>Hot Update JSON</span>
          </div>
          <Textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{\n  "action": "update",\n  "module": "engine",\n  "params": {}\n}'
            className="bg-black/70 border-gray-700 text-white font-mono min-h-[300px] text-sm"
          />
        </div>

        <Button
          onClick={handleExecute}
          disabled={isExecuting}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold h-14 text-base"
        >
          {isExecuting ? (
            <>
              <Terminal className="w-5 h-5 mr-2 animate-pulse" />
              Executando...
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Executar Comando
            </>
          )}
        </Button>

        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-400 font-bold mb-2">Sistema de Hot Update</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Use este painel para atualizar configurações do sistema em tempo real sem reiniciar o servidor.
                Todas as atualizações são validadas antes da aplicação.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-white font-bold">Logs do Sistema</h3>
          <div className="bg-black/70 border border-gray-800 rounded-xl p-4 font-mono text-xs text-gray-400 space-y-1 max-h-[200px] overflow-y-auto">
            <div className="text-green-400">[OK] Sistema inicializado</div>
            <div className="text-cyan-400">[INFO] AI Engine: GPT-5 carregado</div>
            <div className="text-cyan-400">[INFO] Supabase: Conectado</div>
            <div className="text-cyan-400">[INFO] Vercel: Deploy ativo</div>
            <div className="text-green-400">[OK] Todos os módulos operacionais</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
