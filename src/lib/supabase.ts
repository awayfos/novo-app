// Dark Studio V46 Supreme - Supabase Client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database helpers
export const db = {
  // Projects
  async createProject(project: any) {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getProjects(userId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async updateProject(id: string, updates: any) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Metrics & Learning
  async saveMetrics(metrics: any) {
    const { data, error } = await supabase
      .from('metrics')
      .insert(metrics)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserPreferences(userId: string) {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async updatePreferences(userId: string, preferences: any) {
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({ user_id: userId, ...preferences })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Storage helpers
export const storage = {
  async uploadVideo(file: File, path: string) {
    const { data, error } = await supabase.storage
      .from('videos')
      .upload(path, file);
    
    if (error) throw error;
    return data;
  },

  async getVideoUrl(path: string) {
    const { data } = supabase.storage
      .from('videos')
      .getPublicUrl(path);
    
    return data.publicUrl;
  }
};
