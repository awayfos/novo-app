import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions para DarkStudio Engine

export async function saveVideoProject(project: any) {
  const { data, error } = await supabase
    .from('video_projects')
    .insert([project])
    .select()
  
  if (error) throw error
  return data[0]
}

export async function getVideoProjects(userId: string) {
  const { data, error } = await supabase
    .from('video_projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function updateVideoProject(id: string, updates: any) {
  const { data, error } = await supabase
    .from('video_projects')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data[0]
}

export async function uploadVideoFile(file: File, path: string) {
  const { data, error } = await supabase.storage
    .from('videos')
    .upload(path, file)
  
  if (error) throw error
  return data
}

export async function getVideoUrl(path: string) {
  const { data } = supabase.storage
    .from('videos')
    .getPublicUrl(path)
  
  return data.publicUrl
}
