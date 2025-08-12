'use client'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LINKS = [
  { href: '/',        label: 'Ana Sayfa' },
  { href: '/about',   label: 'Hakkımda' },
  { href: '/projects',label: 'Projelerim' },
  { href: '/timeline',label: 'Zaman Çizelgesi' },
  { href: '/blog',    label: 'Yazılar' },
  { href: '/cv',      label: 'CV' },
  { href: '/contact', label: 'İletişim' },
]

export default function Navbar(){
  const { pathname } = useRouter()
  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <Link href="/" className="brand">
          <span className="brand-badge">M</span>
          <span>Murat Akar</span>
        </Link>
        <div className="menu">
          {LINKS.map(link => {
            const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link key={link.href} href={link.href} className={active ? 'active' : ''}>
                <span className="pill" aria-hidden="true"></span>
                <span>{link.label}</span>
                <span className="underline" aria-hidden="true"></span>
              </Link>
            )
          })}
        </div>
      </nav>
      <div className="footer-line"></div>
    </header>
  )
}
