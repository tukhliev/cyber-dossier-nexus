import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Writeup {
  id: string;
  title: string;
  slug: string;
  platform: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'insane';
  status: 'active' | 'completed' | 'locked';
  description: string | null;
  content: string | null;
  tags: string[];
  points: number | null;
  created_at: string;
  updated_at: string;
  published: boolean;
  author_id: string | null;
}

export const useWriteups = () => {
  return useQuery({
    queryKey: ['writeups'],
    queryFn: async (): Promise<Writeup[]> => {
      const { data, error } = await supabase
        .from('writeups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as Writeup[];
    },
  });
};

export const useWriteup = (slug: string) => {
  return useQuery({
    queryKey: ['writeup', slug],
    queryFn: async (): Promise<Writeup | null> => {
      const { data, error } = await supabase
        .from('writeups')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data as Writeup | null;
    },
    enabled: !!slug,
  });
};
