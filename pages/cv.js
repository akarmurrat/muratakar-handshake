import Navbar from '@/components/Navbar'

export default function CVPage(){
  return (
    <>
      <Navbar />
      <main className="container">
        <h1>CV</h1>
        <div className="card">
          <p className="muted">CV'yi aşağıda göremiyorsan <a href="/cv.pdf" target="_blank" rel="noopener">buradan indir</a> ve <code>/public/cv.pdf</code> dosyasını güncellediğinden emin ol.</p>
          <div style={{marginTop:12}}>
            <object data="/cv.pdf" type="application/pdf" width="100%" height="720">
              <embed src="/cv.pdf" type="application/pdf" width="100%" height="720" />
            </object>
          </div>
        </div>
      </main>
      <footer className="container"><div className="muted">© {new Date().getFullYear()} Murat Akar</div></footer>
    </>
  )
}
