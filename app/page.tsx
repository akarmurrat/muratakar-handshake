// app/page.tsx
import Link from "next/link";
import { hero, highlights } from "@/lib/siteContent";

export default function HomePage() {
  return (
    <main className="container">
      {/* HERO */}
      <section className="hero">
        <div className="card">
          <h1>{hero.title}</h1>
          <p className="muted">{hero.subtitle}</p>

          <div className="badges" style={{ marginTop: 12 }}>
            {hero.badges.map((b) => (
              <span className="badge" key={b}>{b}</span>
            ))}
          </div>

          <div className="cta">
            {hero.ctas.map((c) =>
              c.primary ? (
                <Link key={c.href} className="primary" href={c.href}>{c.label}</Link>
              ) : (
                <Link key={c.href} href={c.href}>{c.label}</Link>
              )
            )}
          </div>
        </div>

        <div className="card">
          <h2>Öne çıkanlar</h2>
          <ul>
            {highlights.map((h, i) => <li key={i}>{h.text}</li>)}
          </ul>
          <p className="muted" style={{ marginTop: 8 }}>Bu alanı zamanla güncelleyebilirsin.</p>
        </div>
      </section>
    </main>
  );
}
