import Navbar from '@/components/Navbar'

export default function About(){
  return (
    <>
      <Navbar />
      <main className="container">
        <h1>Hakkımda</h1>
        <div className="card">
          <p>Mekatronik, otomasyon ve proje yönetimi ekseninde kendimi geliştiren; akademik araştırma ve sanayi uygulamalarını birleştirmeyi hedefleyen bir profesyonelim. Bu sitede deneyimlerimi, projelerimi ve notlarımı paylaşıyorum.</p>
        </div>
      </main>
      <footer className="container"><div className="muted">© {new Date().getFullYear()} Murat Akar</div></footer>
    </>
  )
}
