
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ggnsfttbhciizqpektor.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnbnNmdHRiaGNpaXpxcGVrdG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MDYyOTgsImV4cCI6MjA2MzI4MjI5OH0.d2KLYpOyyIbmo2jD-VwwXTa5yPvSvFyurbSzHW1zcsA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
