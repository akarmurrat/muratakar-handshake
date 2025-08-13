'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '../lib/supabaseClient'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession()
      const user = sess.session?.user
      if (!user) {
        router.replace('/admin/login?next=' + encodeURIComponent(pathname || '/admin'))
        return
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin') {
        router.replace('/admin/login?e=unauthorized')
        return
      }
      setOk(true)
    })()
  }, [router, pathname])

  if (ok === null) {
    return <div style={{padding:24}}>Kontrol ediliyor…</div>
  }
  return <>{children}</>
}
