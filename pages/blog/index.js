import Navbar from '@/components/Navbar'
import { getSortedPosts } from '@/lib/posts'

export async function getStaticProps(){
  const posts = await getSortedPosts()
  return { props: { posts } }
}

export default function Blog({ posts }){
  return (
    <>
      <Navbar />
      <main className="container">
        <h1>Yazılar</h1>
        {posts.length === 0 && <p className="muted">Henüz bir yazı yok.</p>}
        <div className="card">
          <ul>
            {posts.map(p => (
              <li key={p.slug} style={{marginBottom:12}}>
                <a href={`/blog/${p.slug}`}>
                  <strong>{p.title}</strong>
                </a>
                <div className="muted" style={{fontSize:14}}>{p.excerpt}</div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="container"><div className="muted">© {new Date().getFullYear()} Murat Akar</div></footer>
    </>
  )
}
