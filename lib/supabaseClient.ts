import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ukpwdhkwbvhkyebcqrwq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcHdkaGt3YnZoa3llYmNxcndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDgxMDEsImV4cCI6MjA3NjEyNDEwMX0.Mevou607M0UTLgQDzsfAQ0O_54oK_3u9b1axsJu_FZM';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
