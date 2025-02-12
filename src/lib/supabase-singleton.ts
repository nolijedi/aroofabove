import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single instance for the browser
let browserInstance: ReturnType<typeof createClient<Database>> | null = null;

// Create a single instance for the server
let serverInstance: ReturnType<typeof createClient<Database>> | null = null;

export function getBrowserSupabase() {
  if (typeof window === 'undefined') {
    throw new Error('getBrowserSupabase should only be called in browser context');
  }
  
  if (!browserInstance) {
    browserInstance = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        storageKey: 'aroofabove-auth',
        storage: window.localStorage
      },
      db: {
        schema: 'public'
      }
    });
  }
  return browserInstance;
}

export function getServerSupabase() {
  if (typeof window !== 'undefined') {
    throw new Error('getServerSupabase should only be called in server context');
  }
  
  if (!serverInstance) {
    serverInstance = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false
      },
      db: {
        schema: 'public'
      }
    });
  }
  return serverInstance;
}

// Export a default instance for backward compatibility
export const supabase = typeof window !== 'undefined' ? getBrowserSupabase() : getServerSupabase();
