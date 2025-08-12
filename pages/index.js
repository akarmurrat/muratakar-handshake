import Navbar from '@/components/Navbar'

export default function Home(){
  return (
    <>
      <Navbar />
      <main className="container">
        <section className="hero">
          <div className="card">
            <h1>Merhaba, ben <span style={{color:'var(--accent)'}}>Murat</span> 👋</h1>
            <p className="muted">Robotik & otomasyon, iş geliştirme ve proje yönetimi odağında çalışan bir mühendis adayıyım. Bu sitede hakkımda bilgi, projelerim, yazılarım ve iletişim bilgilerimi bulabilirsiniz.</p>
            <div className="badges">
              <span className="badge">Satış & İş Geliştirme</span>
              <span className="badge">Proje Yönetimi</span>
              <span className="badge">Robotik / Otomasyon</span>
            </div>
            <div className="cta">
              <a className="primary" href="/contact">Benimle iletişime geç</a>
              <a href="/projects">Projelerimi gör</a>
            </div>
          </div>
          <div className="card">
            <h2>Öne çıkanlar</h2>
            <ul>
              <li>🔧 Üretim/otomasyon süreçlerinde verimlilik projeleri</li>
              <li>🤝 Çok-disiplinli ekiplerle proje koordinasyonu</li>
              <li>🚀 Öğrenme & yazma: blog yazıları ve notlar</li>
            </ul>
            <p className="muted" style={{marginTop:8}}>Detaylar sayfalarda 👇</p>
          </div>
        </section>
      </main>
      <footer className="container"><div className="muted">© {new Date().getFullYear()} Murat Akar</div></footer>
    </>
  )
}
