"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Play, 
  Download, 
  Trash2, 
  Search, 
  Calendar, 
  Clock, 
  Eye,
  Share2,
  BarChart3,
  Filter
} from "lucide-react"

interface VideoItem {
  id: string
  title: string
  duration: number
  createdAt: string
  views: number
  format: string
  status: "completed" | "processing" | "failed"
  thumbnail: string
}

export function VideoHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  
  // Mock data
  const videos: VideoItem[] = [
    {
      id: "1",
      title: "O Aparelho que Sussurra no Ônibus",
      duration: 60,
      createdAt: "2024-01-15T10:30:00",
      views: 15420,
      format: "vertical",
      status: "completed",
      thumbnail: ""
    },
    {
      id: "2",
      title: "A Casa no Fim da Rua",
      duration: 180,
      createdAt: "2024-01-14T15:20:00",
      views: 8930,
      format: "widescreen",
      status: "completed",
      thumbnail: ""
    },
    {
      id: "3",
      title: "Mensagens do Além",
      duration: 90,
      createdAt: "2024-01-14T09:15:00",
      views: 0,
      format: "vertical",
      status: "processing",
      thumbnail: ""
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Completo</Badge>
      case "processing":
        return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Processando</Badge>
      case "failed":
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Falhou</Badge>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", { 
      day: "2-digit", 
      month: "short", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      {/* Header com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-800/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total de Vídeos</p>
                <p className="text-3xl font-bold text-purple-400">127</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-800/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Visualizações</p>
                <p className="text-3xl font-bold text-blue-400">1.2M</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-800/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Tempo Total</p>
                <p className="text-3xl font-bold text-green-400">18h</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border-orange-800/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Taxa de Sucesso</p>
                <p className="text-3xl font-bold text-orange-400">98%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle>Histórico de Vídeos</CardTitle>
          <CardDescription>Gerencie e visualize todos os seus vídeos gerados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Buscar vídeos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-950 border-gray-700"
              />
            </div>
            <Button variant="outline" className="bg-gray-950 border-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Lista de Vídeos */}
          <div className="space-y-4">
            {videos.map((video) => (
              <Card key={video.id} className="bg-gray-950 border-gray-800 hover:border-purple-800/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Thumbnail */}
                    <div className="w-full sm:w-32 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Play className="w-8 h-8 text-gray-600" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-white">{video.title}</h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(video.createdAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDuration(video.duration)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {video.views.toLocaleString()} views
                            </span>
                          </div>
                        </div>
                        {getStatusBadge(video.status)}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          className="bg-purple-600 hover:bg-purple-700"
                          disabled={video.status !== "completed"}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Assistir
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="bg-gray-900 border-gray-700"
                          disabled={video.status !== "completed"}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="bg-gray-900 border-gray-700"
                          disabled={video.status !== "completed"}
                        >
                          <Share2 className="w-3 h-3 mr-1" />
                          Compartilhar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="bg-gray-900 border-gray-700 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Paginação */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-400">Mostrando 3 de 127 vídeos</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-gray-950 border-gray-700">
                Anterior
              </Button>
              <Button variant="outline" size="sm" className="bg-gray-950 border-gray-700">
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
