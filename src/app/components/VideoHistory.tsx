"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { History, Video } from "lucide-react"

export function VideoHistory() {
  return (
    <Card className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border-gray-800 shadow-2xl backdrop-blur-sm">
      <CardHeader className="border-b border-gray-800 pb-6">
        <CardTitle className="flex items-center gap-3 text-white text-2xl font-black">
          <History className="w-7 h-7 text-blue-500" />
          Histórico de Vídeos
        </CardTitle>
        <CardDescription className="text-gray-400 text-base">
          Seus vídeos gerados aparecerão aqui
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Video className="w-24 h-24 text-gray-700 mb-6 opacity-30" />
          <p className="text-gray-400 text-lg font-bold mb-2">Nenhum vídeo gerado ainda</p>
          <p className="text-gray-600 text-sm">
            Comece gerando seu primeiro vídeo na aba "Gerar Vídeo"
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
