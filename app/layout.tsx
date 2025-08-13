import './globals.css'

export const metadata = {
  title: 'Murat Akar — Kişisel Site',
  description: 'Murat Akar | Hakkımda, Projeler, Yazılar, İletişim',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <header className="site-header">
          <div className="row container">
            <div className="brand">Murat Akar</div>
            <nav>
              <ul className="nav">
                <li><a href="/">Ana Sayfa</a></li>
                <li><a href="/timeline">Zaman Çizgisi</a></li>
                <li><a href="/blog">Yazılar</a></li>
                <li><a href="/work">Projeler</a></li>
                <li><a href="/about">Hakkımda</a></li>
                <li><a className="btn" href="/contact">İletişim</a></li>
              </ul>
            </nav>
            <div className="cta">
              <a className="btn primary" href="/admin/login">Giriş</a>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
