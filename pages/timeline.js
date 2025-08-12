import Navbar from '@/components/Navbar'
import items from '@/content/timeline.json'

export default function Timeline(){
  return (
    <>
      <Navbar />
      <main className="container">
        <h1>Zaman Çizelgesi</h1>
        <div className="card" style={{paddingLeft:24, position:'relative'}}>
          <div style={{position:'absolute', left:12, top:20, bottom:20, width:2, background:'rgba(255,255,255,.1)'}} />
          {items.map((it, idx) => (
            <div key={idx} style={{position:'relative', margin:'18px 0 18px 0'}}>
              <div style={{position:'absolute', left:-2, top:6, width:10, height:10, borderRadius:999, background:'linear-gradient(90deg,#22d3ee,#60a5fa)'}} />
              <div style={{marginLeft:12}}>
                <div className="muted" style={{fontSize:13}}>{it.year}</div>
                <div style={{fontWeight:600}}>{it.title}</div>
                <div className="muted" style={{marginTop:4}}>{it.description}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="container"><div className="muted">© {new Date().getFullYear()} Murat Akar</div></footer>
    </>
  )
}
