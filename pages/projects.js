import Navbar from '@/components/Navbar'
import projects from '@/content/projects.json'

export default function Projects(){
  return (
    <>
      <Navbar />
      <main className="container">
        <h1>Projelerim</h1>
        <div className="grid">
          {projects.map((p, idx) => (
            <div className="card" key={idx}>
              <h3>{p.title}</h3>
              <p className="muted">{p.description}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="container"><div className="muted">© {new Date().getFullYear()} Murat Akar</div></footer>
    </>
  )
}
