import Navbar from '@/components/Navbar'

export default function Thanks(){
  return (
    <>
      <Navbar />
      <main className="container">
        <h1>Teşekkürler!</h1>
        <div className="card">
          <p>Mesajın bana ulaştı. En kısa sürede dönüş yapacağım.</p>
          <p className="muted" style={{marginTop:8}}><a href="/">Ana sayfaya dön</a></p>
        </div>
      </main>
    </>
  )
}
