import Navbar from '@/components/Navbar'

export default function Contact(){
  return (
    <>
      <Navbar />
      <main className="container">
        <h1>İletişim</h1>
        <div className="card">
          <p className="muted">Doğrudan e-posta: <a href="mailto:info@muratakar.net">info@muratakar.net</a> • LinkedIn: <a href="https://www.linkedin.com/in/akar-murat" target="_blank" rel="noopener">/in/akar-murat</a></p>
          <form action="https://formspree.io/f/yourFormID" method="POST" style={{marginTop:16, display:'grid', gap:12, maxWidth:560}}>
            <input name="name" placeholder="Adınız" required />
            <input type="email" name="email" placeholder="E-posta" required />
            <textarea name="message" placeholder="Mesajınız" rows={4} required />
            <input type="text" name="company" style={{display:'none'}} />
            <input type="hidden" name="_next" value="https://www.muratakar.net/thanks" />
            <input type="hidden" name="_subject" value="Yeni mesaj - muratakar.net" />
            <button type="submit" style={{padding:'12px 16px', borderRadius:12, background:'var(--accent)', border:0, color:'#042f2e', fontWeight:700}}>Gönder</button>
          </form>
        </div>
      </main>
      <footer className="container"><div className="muted">© {new Date().getFullYear()} Murat Akar</div></footer>
    </>
  )
}
