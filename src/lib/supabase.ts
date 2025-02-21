'use client';

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create a single instance with proper configuration
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'roofvision-auth',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});
