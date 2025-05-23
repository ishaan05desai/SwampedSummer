import AsyncStorage from '@react-native-async-storage/async-storage';

import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
const supabaseUrl = "https://siyiejsyxwqjxhkfoyww.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpeWllanN5eHdxanhoa2ZveXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMTY0MzksImV4cCI6MjA2MzU5MjQzOX0.LgrO3JKp4VoiGNPnqRf15zZDsvBkZxRJnmC_ODtZYDs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});