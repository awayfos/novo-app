// Dark Studio V46 Supreme - Type Definitions

export interface VideoProject {
  id: string;
  userId: string;
  prompt: string;
  style: 'dark-cinematic' | 'dark-minimal' | 'dark-neon' | 'dark-horror';
  duration: number;
  status: 'draft' | 'generating' | 'rendering' | 'completed' | 'failed';
  videoUrl?: string;
  audioUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata: ProjectMetadata;
}

export interface ProjectMetadata {
  voiceId?: string;
  voiceProvider?: 'elevenlabs' | 'custom';
  videoProvider?: 'runway' | 'pika';
  lipSync?: boolean;
  colorGrading?: string;
  audioMix?: AudioMixSettings;
  renderSettings?: RenderSettings;
}

export interface AudioMixSettings {
  voiceVolume: number;
  ambientVolume: number;
  musicVolume: number;
  effectsVolume: number;
}

export interface RenderSettings {
  resolution: '720p' | '1080p' | '4k';
  fps: 24 | 30 | 60;
  codec: 'h264' | 'h265' | 'vp9';
  bitrate: number;
}

export interface AIAdaptiveSettings {
  learningEnabled: boolean;
  userPreferences: UserPreferences;
  engagementMetrics: EngagementMetrics;
  optimizationLevel: 'low' | 'medium' | 'high' | 'extreme';
}

export interface UserPreferences {
  favoriteStyles: string[];
  preferredVoices: string[];
  avgDuration: number;
  colorPalette: string[];
}

export interface EngagementMetrics {
  totalProjects: number;
  completionRate: number;
  avgRenderTime: number;
  userRating: number;
  feedbackScore: number;
}

export interface GenerationRequest {
  prompt: string;
  style: string;
  duration: number;
  voiceId?: string;
  lipSync?: boolean;
  advanced?: Partial<ProjectMetadata>;
}

export interface GenerationResponse {
  jobId: string;
  status: string;
  estimatedTime: number;
  message: string;
}

export interface RenderProgress {
  jobId: string;
  stage: 'parsing' | 'video-gen' | 'audio-gen' | 'lip-sync' | 'mixing' | 'encoding';
  progress: number;
  eta: number;
  currentFrame?: number;
  totalFrames?: number;
}
