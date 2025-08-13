'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type AboutRow = { id?: number; content?: string }

export default function AboutEditor(){
  const [row, setRow] = useState<AboutRow | null>(null)
  const [text, setText] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function load(){
    const { data, error } = await supabase.from('about').select('*').limit(1).maybeSingle()
    if (!error) {
      setRow(data)
      setText((data?.content as string) || '')
    }
  }

  useEffect(()=>{ load() }, [])

  async function save(){
    setSaving(true); setMsg(null)
    if (row?.id){
      const { error } = await supabase.from('about').update({ content: text }).eq('id', row.id)
      if (error) setMsg(error.message); else setMsg('Kaydedildi.')
    } else {
      const { error } = await supabase.from('about').insert({ content: text })
      if (error) setMsg(error.message); else setMsg('Oluşturuldu.'); 
    }
    setSaving(false)
  }

  return (
    <div style={{display:'grid', gap:10}}>
      <textarea rows={8} value={text} onChange={e=>setText(e.target.value)} placeholder="Hakkımda metni..." />
      <div style={{display:'flex', gap:10}}>
        <button className="btn primary" onClick={save} disabled={saving}>{saving? 'Kaydediliyor…' : 'Kaydet'}</button>
        {msg && <span className="muted">{msg}</span>}
      </div>
    </div>
  )
}
