"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Sparkles, 
  Play, 
  Download, 
  Eye, 
  Wand2, 
  Clock, 
  Globe, 
  Video, 
  Mic, 
  Image as ImageIcon,
  Palette,
  Upload,
  Loader2,
  CheckCircle2,
  FileJson,
  Zap
} from "lucide-react"
import { toast } from "sonner"
import { darkStudioEngine } from "@/lib/darkstudio-engine"
import type { VideoGenerationInput, VideoGenerationOutput } from "@/lib/types"

export function VideoGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationOutput, setGenerationOutput] = useState<VideoGenerationOutput | null>(null)
  const [showOutput, setShowOutput] = useState(false)
  
  // Form state
  const [temaTitulo, setTemaTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [duration, setDuration] = useState([60])
  const [idioma, setIdioma] = useState<"pt" | "en" | "es">("pt")
  const [estiloNarrativo, setEstiloNarrativo] = useState<"sinistro" | "psicológico" | "found_footage" | "documental" | "surreal">("sinistro")
  const [nivelVoz, setNivelVoz] = useState<"deep_male" | "calm_female" | "neutral" | "whisper">("deep_male")
  const [presetVisual, setPresetVisual] = useState<"vhs_grain" | "cinematic_dark" | "noir_highcontrast" | "minimal_animated">("cinematic_dark")
  const [formatosExport, setFormatosExport] = useState<("vertical_tiktok" | "widescreen_youtube" | "square_instagram")[]>(["vertical_tiktok"])
  const [autoPublish, setAutoPublish] = useState(false)

  const handleGenerate = async () => {
    if (!temaTitulo.trim()) {
      toast.error("Por favor, insira um tema ou título para o vídeo")
      return
    }

    setIsGenerating(true)
    setShowOutput(false)

    try {
      const input: VideoGenerationInput = {
        tema_titulo: temaTitulo,
        duracao: duration[0],
        idioma_principal: idioma,
        formatos_export: formatosExport,
        estilo_narrativo: estiloNarrativo,
        nivel_voz: nivelVoz,
        preset_visual: presetVisual,
        publicar_automatico: autoPublish,
        descricao_adicional: descricao
      }

      toast.loading("Iniciando geração do vídeo...", { id: "generation" })

      // Gerar vídeo completo
      const output = await darkStudioEngine.generateVideo(input)
      
      setGenerationOutput(output)
      setShowOutput(true)
      
      toast.success("Vídeo gerado com sucesso!", { id: "generation" })
      
      // Mostrar resumo
      toast.success(
        `✅ Roteiro: ${output.roteiro.num_cenas} cenas\n` +
        `✅ Storyboard: ${output.storyboard.total_frames} frames\n` +
        `✅ Assets: ${output.assets.length} arquivos\n` +
        `✅ Qualidade: ${output.quality.originality_score}% originalidade`,
        { duration: 5000 }
      )

    } catch (error) {
      console.error("Erro na geração:", error)
      toast.error("Erro ao gerar vídeo. Tente novamente.", { id: "generation" })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadJSON = () => {
    if (!generationOutput) return
    
    const dataStr = JSON.stringify(generationOutput, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `darkstudio_${generationOutput.video_id}.json`
    link.click()
    URL.revokeObjectURL(url)
    
    toast.success("JSON exportado com sucesso!")
  }

  const toggleFormato = (formato: "vertical_tiktok" | "widescreen_youtube" | "square_instagram") => {
    setFormatosExport(prev => 
      prev.includes(formato) 
        ? prev.filter(f => f !== formato)
        : [...prev, formato]
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Painel de Configuração */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-gray-800/50 shadow-2xl backdrop-blur-sm">
          <CardHeader className="border-b border-gray-800/50 pb-4">
            <CardTitle className="flex items-center gap-2 text-white text-xl">
              <Wand2 className="w-6 h-6 text-purple-500" />
              Configuração do Vídeo
            </CardTitle>
            <CardDescription className="text-gray-400">Configure os parâmetros para gerar seu vídeo dark profissional</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Tema/Título */}
            <div className="space-y-2">
              <Label htmlFor="tema" className="flex items-center gap-2 text-gray-200 text-sm font-medium">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                Tema ou Título *
              </Label>
              <Input
                id="tema"
                value={temaTitulo}
                onChange={(e) => setTemaTitulo(e.target.value)}
                placeholder="Ex: O aparelho que sussurra no ônibus"
                className="bg-black/50 border-gray-700/50 focus:border-purple-500 text-white placeholder:text-gray-600 h-12 text-base"
              />
            </div>

            {/* Descrição Adicional */}
            <div className="space-y-2">
              <Label htmlFor="descricao" className="text-gray-200 text-sm font-medium">Descrição Adicional (Opcional)</Label>
              <Textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Adicione detalhes sobre a história, personagens, atmosfera..."
                className="bg-black/50 border-gray-700/50 focus:border-purple-500 min-h-[100px] text-white placeholder:text-gray-600"
              />
            </div>

            {/* Duração */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-gray-200 text-sm font-medium">
                <Clock className="w-4 h-4 text-blue-500" />
                Duração: <span className="text-purple-400 font-bold">{duration[0]} segundos</span> 
                <span className="text-gray-500">({Math.floor(duration[0] / 60)}:{(duration[0] % 60).toString().padStart(2, '0')})</span>
              </Label>
              <Slider
                value={duration}
                onValueChange={setDuration}
                min={15}
                max={600}
                step={15}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>15s (Curto)</span>
                <span>180s (Médio)</span>
                <span>600s (Longo)</span>
              </div>
            </div>

            {/* Tabs de Configurações Avançadas */}
            <Tabs defaultValue="style" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-black/50 border border-gray-800/50 p-1 rounded-lg">
                <TabsTrigger value="style" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white rounded-md text-sm">
                  <Palette className="w-4 h-4 mr-1.5" />
                  Estilo
                </TabsTrigger>
                <TabsTrigger value="voice" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white rounded-md text-sm">
                  <Mic className="w-4 h-4 mr-1.5" />
                  Voz
                </TabsTrigger>
                <TabsTrigger value="visual" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white rounded-md text-sm">
                  <ImageIcon className="w-4 h-4 mr-1.5" />
                  Visual
                </TabsTrigger>
                <TabsTrigger value="export" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white rounded-md text-sm">
                  <Video className="w-4 h-4 mr-1.5" />
                  Export
                </TabsTrigger>
              </TabsList>

              <TabsContent value="style" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-gray-200 text-sm font-medium">Estilo Narrativo</Label>
                  <Select value={estiloNarrativo} onValueChange={(v: any) => setEstiloNarrativo(v)}>
                    <SelectTrigger className="bg-black/50 border-gray-700/50 text-white h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="sinistro">🌑 Sinistro</SelectItem>
                      <SelectItem value="psicológico">🧠 Psicológico</SelectItem>
                      <SelectItem value="found_footage">📹 Found Footage</SelectItem>
                      <SelectItem value="documental">📄 Documental</SelectItem>
                      <SelectItem value="surreal">🌀 Surreal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="voice" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-gray-200 text-sm font-medium">Tipo de Voz</Label>
                  <Select value={nivelVoz} onValueChange={(v: any) => setNivelVoz(v)}>
                    <SelectTrigger className="bg-black/50 border-gray-700/50 text-white h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="deep_male">🎙️ Deep Male (Grave Masculina)</SelectItem>
                      <SelectItem value="calm_female">🎤 Calm Female (Suave Feminina)</SelectItem>
                      <SelectItem value="neutral">🔊 Neutral (Narrador Neutro)</SelectItem>
                      <SelectItem value="whisper">🤫 Whisper (Sussurro)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="visual" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-gray-200 text-sm font-medium">Preset Visual</Label>
                  <Select value={presetVisual} onValueChange={(v: any) => setPresetVisual(v)}>
                    <SelectTrigger className="bg-black/50 border-gray-700/50 text-white h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="cinematic_dark">🎬 Dark Cinematic</SelectItem>
                      <SelectItem value="noir_highcontrast">🎭 Noir High Contrast</SelectItem>
                      <SelectItem value="vhs_grain">📼 VHS Grain</SelectItem>
                      <SelectItem value="minimal_animated">✨ Minimal Animated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="export" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <Label className="text-gray-200 text-sm font-medium">Formatos de Exportação</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button 
                      variant={formatosExport.includes("vertical_tiktok") ? "default" : "outline"}
                      onClick={() => toggleFormato("vertical_tiktok")}
                      className={formatosExport.includes("vertical_tiktok") 
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 h-11" 
                        : "bg-black/50 border-gray-700/50 text-gray-300 hover:bg-gray-800/50 h-11"
                      }
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Vertical
                    </Button>
                    <Button 
                      variant={formatosExport.includes("widescreen_youtube") ? "default" : "outline"}
                      onClick={() => toggleFormato("widescreen_youtube")}
                      className={formatosExport.includes("widescreen_youtube") 
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 h-11" 
                        : "bg-black/50 border-gray-700/50 text-gray-300 hover:bg-gray-800/50 h-11"
                      }
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Widescreen
                    </Button>
                    <Button 
                      variant={formatosExport.includes("square_instagram") ? "default" : "outline"}
                      onClick={() => toggleFormato("square_instagram")}
                      className={formatosExport.includes("square_instagram") 
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 h-11" 
                        : "bg-black/50 border-gray-700/50 text-gray-300 hover:bg-gray-800/50 h-11"
                      }
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Square
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Idioma */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-200 text-sm font-medium">
                <Globe className="w-4 h-4 text-green-500" />
                Idioma
              </Label>
              <Select value={idioma} onValueChange={(v: any) => setIdioma(v)}>
                <SelectTrigger className="bg-black/50 border-gray-700/50 text-white h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="pt">🇧🇷 Português (PT)</SelectItem>
                  <SelectItem value="en">🇺🇸 English (EN)</SelectItem>
                  <SelectItem value="es">🇪🇸 Español (ES)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Publicação Automática */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-lg border border-orange-500/20">
              <div className="space-y-1">
                <Label htmlFor="auto-publish" className="flex items-center gap-2 text-gray-200 text-sm font-medium cursor-pointer">
                  <Upload className="w-4 h-4 text-orange-500" />
                  Publicação Automática
                </Label>
                <p className="text-xs text-gray-500">Preparar metadata para upload direto</p>
              </div>
              <Switch 
                id="auto-publish" 
                checked={autoPublish}
                onCheckedChange={setAutoPublish}
              />
            </div>

            {/* Botão de Geração */}
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !temaTitulo.trim()}
              className="w-full bg-gradient-to-r from-red-600 via-red-700 to-purple-700 hover:from-red-700 hover:via-red-800 hover:to-purple-800 text-white font-bold py-7 text-lg shadow-2xl shadow-red-900/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Gerando Vídeo Dark...
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 mr-3" />
                  Gerar Vídeo Profissional
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Card */}
        {showOutput && generationOutput && (
          <Card className="bg-gradient-to-br from-green-900/30 via-emerald-900/30 to-green-950/30 border-green-700/50 shadow-2xl shadow-green-900/30 backdrop-blur-sm">
            <CardHeader className="border-b border-green-700/30 pb-4">
              <CardTitle className="flex items-center gap-2 text-green-400 text-xl">
                <CheckCircle2 className="w-6 h-6" />
                Vídeo Gerado com Sucesso!
              </CardTitle>
              <CardDescription className="text-gray-300">Confira os detalhes da geração abaixo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-black/30 p-4 rounded-lg border border-green-700/20">
                  <p className="text-gray-400 text-xs mb-1">Video ID</p>
                  <p className="font-mono text-xs text-green-400 truncate">{generationOutput.video_id}</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-green-700/20">
                  <p className="text-gray-400 text-xs mb-1">Duração Total</p>
                  <p className="font-bold text-white text-lg">{generationOutput.roteiro.duracao_total}s</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-green-700/20">
                  <p className="text-gray-400 text-xs mb-1">Número de Cenas</p>
                  <p className="font-bold text-white text-lg">{generationOutput.roteiro.num_cenas}</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-green-700/20">
                  <p className="text-gray-400 text-xs mb-1">Total de Frames</p>
                  <p className="font-bold text-white text-lg">{generationOutput.storyboard.total_frames}</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-green-700/20">
                  <p className="text-gray-400 text-xs mb-1">Assets Gerados</p>
                  <p className="font-bold text-white text-lg">{generationOutput.assets.length}</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-green-700/20">
                  <p className="text-gray-400 text-xs mb-1">Qualidade</p>
                  <p className="font-bold text-green-400 text-lg">{generationOutput.quality.originality_score}%</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleDownloadJSON}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold h-12"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Baixar JSON Completo
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowOutput(false)}
                  className="bg-black/50 border-gray-700/50 text-gray-300 hover:bg-gray-800/50 h-12 px-6"
                >
                  Fechar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Painel Lateral */}
      <div className="space-y-6">
        {/* Preview */}
        <Card className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-gray-800/50 shadow-2xl backdrop-blur-sm">
          <CardHeader className="border-b border-gray-800/50 pb-3">
            <CardTitle className="flex items-center gap-2 text-sm text-white font-semibold">
              <Eye className="w-5 h-5 text-cyan-500" />
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="aspect-[9/16] bg-gradient-to-br from-black to-gray-950 rounded-xl border border-gray-800/50 flex items-center justify-center overflow-hidden shadow-inner">
              {isGenerating ? (
                <div className="text-center">
                  <Loader2 className="w-16 h-16 mx-auto mb-3 animate-spin text-purple-500" />
                  <p className="text-sm text-gray-400 font-medium">Gerando vídeo...</p>
                  <p className="text-xs text-gray-600 mt-1">Aguarde alguns instantes</p>
                </div>
              ) : showOutput ? (
                <div className="text-center text-green-400 p-6">
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-3" />
                  <p className="text-base font-bold">Vídeo Gerado!</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {generationOutput?.roteiro.num_cenas} cenas • {generationOutput?.roteiro.duracao_total}s
                  </p>
                </div>
              ) : (
                <div className="text-center text-gray-600">
                  <Video className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">Preview aparecerá aqui</p>
                  <p className="text-xs text-gray-700 mt-1">Configure e gere seu vídeo</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Status do Sistema */}
        <Card className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-gray-800/50 shadow-2xl backdrop-blur-sm">
          <CardHeader className="border-b border-gray-800/50 pb-3">
            <CardTitle className="text-sm text-white font-semibold">Status do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 font-medium">AI Engine</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 font-semibold">
                GPT-5 Active
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 font-medium">Image Model</span>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 font-semibold">
                SDXL Ready
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 font-medium">TTS Engine</span>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 font-semibold">
                Ultra Realistic
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400 font-medium">Storage</span>
              <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 font-semibold">
                Supabase
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="bg-gradient-to-br from-purple-900/20 via-red-900/20 to-purple-950/20 border-purple-800/30 shadow-2xl shadow-purple-900/20 backdrop-blur-sm">
          <CardHeader className="border-b border-purple-800/30 pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-white font-semibold">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Dicas Profissionais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 text-xs text-gray-400 pt-4 leading-relaxed">
            <p className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span>Vídeos curtos (15-60s) são ideais para TikTok/Reels</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span>Use descrições detalhadas para melhores resultados</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span>O estilo "Sinistro" é o mais popular</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span>Lip sync adiciona +30% de engajamento</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span>JSON completo inclui roteiro, storyboard e assets</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
