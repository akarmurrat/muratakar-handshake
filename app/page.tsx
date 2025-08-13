export default function HomePage(){
  return (
    <main className="container" style={{paddingTop:32}}>
      <section className="card" style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:20}}>
        <div>
          <h1 style={{fontSize:40, margin:'0 0 8px'}}>Merhaba, ben <span style={{color:'var(--accent)'}}>Murat</span> 👋</h1>
          <p className="muted">Robotik & otomasyon odağında iş geliştirme, proje yönetimi ve üretim teknolojileri üzerine çalışıyorum.</p>
          <div style={{display:'flex', gap:8, flexWrap:'wrap', marginTop:12}}>
            <span className="btn">Satış & İş Geliştirme</span>
            <span className="btn">Proje Yönetimi</span>
            <span className="btn">Robotik / Otomasyon</span>
          </div>
          <div style={{display:'flex', gap:12, marginTop:18}}>
            <a className="btn primary" href="/contact">Benimle iletişime geç</a>
            <a className="btn" href="/work">Projelerimi gör</a>
          </div>
        </div>
        <div className="card">
          <h2 style={{marginTop:0}}>Öne çıkanlar</h2>
          <ul>
            <li>🔧 Endüstriyel otomasyon projesi — verimlilik +%18</li>
            <li>🤝 20+ B2B iş birliği & teklif yönetimi</li>
            <li>🚀 Hat optimizasyonu ve IoT izleme pilotu</li>
          </ul>
          <p className="muted" style={{marginTop:8}}>Detayları zaman çizelgesinde ve projelerde bulabilirsin.</p>
        </div>
      </section>
    </main>
  )
}
