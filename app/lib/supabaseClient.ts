'use client'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !anon) {
  // Geliştirici uyarısı — runtime'da konsola düşer
  console.warn('Supabase URL veya ANON KEY eksik. Vercel Env Vars ayarlarını kontrol edin.')
}

export const supabase = createClient(url as string, anon as string)
