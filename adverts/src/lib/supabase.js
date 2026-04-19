// lib/supabase.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rhrhhejzbniuugjbupcv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJocmhoZWp6Ym5pdXVnamJ1cGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MTIwOTAsImV4cCI6MjA5MjE4ODA5MH0.iehTcVYMO_aBLqLmK1p4B8px7mW8q1RanqGTR81nF8c'

export const supabase = createClient(supabaseUrl, supabaseKey)