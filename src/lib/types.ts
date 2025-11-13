// DarkStudio Engine - Types

export interface VideoGenerationInput {
  tema_titulo: string
  duracao: number // em segundos
  idioma_principal: "pt" | "en" | "es"
  formatos_export: ("vertical_tiktok" | "widescreen_youtube" | "square_instagram")[]
  estilo_narrativo: "sinistro" | "psicológico" | "found_footage" | "documental" | "surreal"
  nivel_voz: "deep_male" | "calm_female" | "neutral" | "whisper"
  preset_visual: "vhs_grain" | "cinematic_dark" | "noir_highcontrast" | "minimal_animated"
  actor_profile?: string
  publicar_automatico?: boolean
  descricao_adicional?: string
}

export interface Cena {
  numero: number
  duracao: number // segundos
  descricao_visual: string
  narracao: string
  efeitos_sonoros: string[]
  camera: {
    tipo: "static" | "pan" | "zoom" | "tracking"
    movimento?: string
  }
  iluminacao: string
  paleta_cores: string[]
}

export interface Roteiro {
  titulo: string
  duracao_total: number
  num_cenas: number
  cenas: Cena[]
  tema: string
  estilo: string
  idioma: string
}

export interface StoryboardFrame {
  cena_id: number
  frame_numero: number
  timestamp: number
  prompt_imagem: string
  camera_angle: string
  lighting: string
  mood: string
  elementos_chave: string[]
}

export interface StoryboardJSON {
  video_id: string
  titulo: string
  frames: StoryboardFrame[]
  total_frames: number
  fps: number
}

export interface Asset {
  tipo: "imagem" | "audio" | "efeito" | "trilha"
  nome: string
  prompt?: string
  url?: string
  duracao?: number
  tags: string[]
}

export interface AudioScript {
  texto_completo: string
  segmentos: {
    inicio: number
    fim: number
    texto: string
    voz: string
    emocao: string
  }[]
  voz_principal: string
  idioma: string
  ssml?: string
}

export interface VisemeData {
  timestamp: number
  viseme: string
  duracao: number
}

export interface LipSyncPack {
  audio_url: string
  duracao_total: number
  visemes: VisemeData[]
  fps: number
  erro_sincronizacao_ms: number
}

export interface RenderConfig {
  resolucao: string
  fps: number
  codec: "H.265" | "H.264"
  bitrate: string
  formatos: {
    tipo: string
    resolucao: string
    aspect_ratio: string
  }[]
}

export interface Thumbnail {
  prompt: string
  url?: string
  titulo_overlay: string
  estilo: string
}

export interface MetadataPublicacao {
  titulo: string
  descricao: string
  hashtags: string[]
  categoria: string
  idioma: string
  thumbnail_url?: string
  scheduling?: string // ISO timestamp
}

export interface QualityChecklist {
  visual_coherence: number // 0-100
  audio_sync_ms: number
  originality_score: number // 0-100
  mos_estimate: number // Mean Opinion Score 1-5
  safety_check: boolean
  issues: string[]
}

export interface PipelineStep {
  ordem: number
  nome: string
  descricao: string
  status: "pending" | "processing" | "completed" | "failed"
  duracao_estimada: number
  comando?: string
}

export interface VideoGenerationOutput {
  video_id: string
  timestamp: string
  input: VideoGenerationInput
  roteiro: Roteiro
  storyboard: StoryboardJSON
  assets: Asset[]
  audio_script: AudioScript
  lipsync_pack: LipSyncPack
  render_config: RenderConfig
  thumbnails: Thumbnail[]
  metadata: MetadataPublicacao
  quality: QualityChecklist
  pipeline: PipelineStep[]
  output_files: {
    formato: string
    url: string
    tamanho_mb: number
  }[]
}

export interface VideoProject {
  id: string
  user_id: string
  titulo: string
  status: "draft" | "generating" | "completed" | "failed"
  input: VideoGenerationInput
  output?: VideoGenerationOutput
  created_at: string
  updated_at: string
  completed_at?: string
  views?: number
  downloads?: number
}

export interface HotUpdatePayload {
  module: string
  version: string
  config: Record<string, unknown>
  timestamp: string
  author: string
}

export interface SystemLog {
  timestamp: string
  level: "info" | "warning" | "error" | "success"
  module: string
  message: string
  data?: Record<string, unknown>
}
