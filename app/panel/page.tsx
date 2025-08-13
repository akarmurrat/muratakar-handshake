'use client'
import AdminGuard from '../components/AdminGuard'
import AboutEditor from '../components/AboutEditor'
import TimelineAdmin from '../components/TimelineAdmin'

export default function PanelPage(){
  return (
    <AdminGuard>
      <main className="container" style={{padding:24}}>
        <h1>Yönetim Paneli</h1>
        <div style={{display:'grid', gap:16}}>
          <section className="card">
            <h2 style={{marginTop:0}}>Hakkımda</h2>
            <AboutEditor />
          </section>
          <section className="card">
            <h2 style={{marginTop:0}}>Zaman Çizgisi</h2>
            <TimelineAdmin />
          </section>
        </div>
      </main>
    </AdminGuard>
  )
}
