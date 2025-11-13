export interface VideoGenerationInput {
  tema_titulo: string
  duracao: number
  idioma_principal: "pt" | "en" | "es"
  formatos_export: ("vertical_tiktok" | "widescreen_youtube" | "square_instagram")[]
  estilo_narrativo: "sinistro" | "psicológico" | "found_footage" | "documental" | "surreal"
  nivel_voz: "deep_male" | "calm_female" | "neutral" | "whisper"
  preset_visual: "vhs_grain" | "cinematic_dark" | "noir_highcontrast" | "minimal_animated"
  publicar_automatico?: boolean
  descricao_adicional?: string
  actor_profile?: string
}

export interface VideoGenerationOutput {
  video_id: string
  roteiro: {
    titulo: string
    duracao_total: number
    num_cenas: number
    cenas: Array<{
      numero: number
      duracao: number
      descricao: string
      narracao: string
      som_ambiente: string
      transicao: string
    }>
  }
  storyboard: {
    total_frames: number
    frames_por_cena: number
    cenas: any[]
  }
  assets: Array<{
    tipo: string
    url: string
    cena: number
  }>
  audio: {
    voz_principal: {
      tipo: string
      idioma: string
      arquivo: string
    }
    trilha_sonora: string
    sfx: any[]
  }
  lipsync: {
    visemes: any[]
    sincronizacao_ms: number
  }
  render_config: {
    resolucao: string
    fps: number
    codec: string
    formatos: string[]
  }
  metadata: {
    thumbnail: string
    titulo: string
    descricao: string
    hashtags: string[]
  }
  pipeline: string[]
  quality: {
    visual_coherence: number
    lipsync_error_ms: number
    originality_score: number
  }
}
