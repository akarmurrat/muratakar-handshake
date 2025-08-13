'use client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import UsdTicker from './UsdTicker'   // 👈 ekledik

const LINKS = [
  { href: '/',        label: 'Ana Sayfa' },
  { href: '/about',   label: 'Hakkımda' },
  { href: '/projects',label: 'Projelerim' },
  { href: '/timeline',label: 'Zaman Çizelgesi' },
  { href: '/blog',    label: 'Yazılar' },
  { href: '/cv',      label: 'CV' },
  { href: '/contact', label: 'İletişim' },
  { href: "/dolar", label: "Dolar" },

]

export default function Navbar(){
  const { pathname } = useRouter()
  return (
    <header className="navbar">
      <nav className="navbar-inner" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16}}>
        {/* Sol: Marka */}
        <Link href="/" className="brand" style={{display:'inline-flex',alignItems:'center',gap:8}}>
          <span className="brand-badge">M</span>
          <span>Murat Akar</span>
        </Link>

        {/* Sağ: Menü + USD Ticker */}
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div className="menu" style={{display:'flex',alignItems:'center',gap:12}}>
            {LINKS.map(link => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link key={link.href} href={link.href} className={active ? 'active' : ''} style={{position:'relative',padding:'8px 10px',borderRadius:12}}>
                  <span className="pill" aria-hidden="true"></span>
                  <span>{link.label}</span>
                  <span className="underline" aria-hidden="true"></span>
                </Link>
              )
            })}
          </div>

          {/* 👇 Canlı USD/TRY */}
          <UsdTicker intervalMs={30000} maxPoints={30} />
        </div>
      </nav>
      <div className="footer-line"></div>
    </header>
  )
}
