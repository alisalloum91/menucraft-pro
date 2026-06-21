/**
 * MenuCraft Pro — Supabase Configuration
 * Replace SUPABASE_URL and SUPABASE_ANON_KEY with your project values
 * from: https://supabase.com/dashboard/project/_/settings/api
 */

const SUPABASE_URL  = 'https://hdzhpczmbjcmgvdxuyub.supabase.co';
const SUPABASE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkemhwY3ptYmpjbWd2ZHh1eXViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwMzU3MzcsImV4cCI6MjA5NzYxMTczN30.lSLCRQypSvDNNf5vRMTpDIyCBbL3B5uPOA58w7cDKzg';

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
