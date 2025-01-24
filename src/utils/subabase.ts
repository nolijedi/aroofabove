// /src/utils/supabase.ts
import { createClient } from "https://deno.land/x/supabase/mod.ts";

// Fetch Supabase URL and API key from environment variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_KEY = Deno.env.get('SUPABASE_KEY');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export { supabase };
