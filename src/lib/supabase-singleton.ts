import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        storageKey: 'aroofabove-auth',
        storage: globalThis.localStorage
      },
      db: {
        schema: 'public'
      }
    });
  }
  return supabaseInstance;
}

export const supabase = getSupabase();
