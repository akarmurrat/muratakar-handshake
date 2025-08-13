'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import AdminGuard from '../../components/AdminGuard'

type Row = { id?: number; year: number; date?: string; title: string; description?: string; tags?: string[] }

export default function TimelineAdmin(){
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<Row>({year: new Date().getFullYear(), title:'', description:'', date:''})

  async function load(){
    setLoading(true)
    const { data, error } = await supabase.from('timeline').select('*').order('year', {ascending:false}).order('date', {ascending:false})
    if (!error && Array.isArray(data)) setRows(data as Row[])
    setLoading(false)
  }

  useEffect(()=>{ load() }, [])

  async function save(e: React.FormEvent){
    e.preventDefault()
    const { error } = await supabase.from('timeline').insert({
      year: form.year,
      date: form.date || null,
      title: form.title,
      description: form.description || null,
      tags: form.tags || null,
    })
    if (!error){ setForm({year:new Date().getFullYear(), title:'', description:'', date:''}); load() }
  }

  async function remove(id?: number){
    if (!id) return
    await supabase.from('timeline').delete().eq('id', id)
    load()
  }

  return (
    <AdminGuard>
      <main className="container" style={{padding:24}}>
        <h1>Zaman Çizgisi (Admin)</h1>
        <div className="card" style={{marginBottom:16}}>
          <form onSubmit={save} style={{display:'grid', gap:10, gridTemplateColumns:'120px 1fr 1fr', alignItems:'center'}}>
            <input type="number" value={form.year} onChange={e=>setForm({...form, year: parseInt(e.target.value||'0',10)})} placeholder="Yıl" required />
            <input value={form.date||''} onChange={e=>setForm({...form, date:e.target.value})} placeholder="Tarih (ops.) 2025-08-01" />
            <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Başlık" required />
            <textarea style={{gridColumn:'1 / -1'}} rows={3} value={form.description||''} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Açıklama (ops.)" />
            <button className="btn primary" type="submit" style={{justifySelf:'start'}}>Ekle</button>
          </form>
        </div>

        <div className="card">
          {loading ? <div>Yükleniyor…</div> : (
            <table className="table">
              <thead>
                <tr><th>Yıl</th><th>Tarih</th><th>Başlık</th><th>Açıklama</th><th></th></tr>
              </thead>
              <tbody>
                {rows.map(r=> (
                  <tr key={r.id}>
                    <td>{r.year}</td>
                    <td>{r.date}</td>
                    <td>{r.title}</td>
                    <td style={{maxWidth:420}}>{r.description}</td>
                    <td><button className="btn" onClick={()=>remove(r.id)}>Sil</button></td>
                  </tr>
                ))}
                {rows.length===0 && <tr><td colSpan={5} className="muted">Kayıt yok</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </AdminGuard>
  )
}
