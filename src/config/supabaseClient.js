import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bqcuxsvxatlukquazmfx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxY3V4c3Z4YXRsdWtxdWF6bWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5NzU1MjUsImV4cCI6MjAyNzU1MTUyNX0.PIo_jnpTyVe_7FRwpP6ZjFFuEi8xB4ZxjMDxh1WPC5o";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
