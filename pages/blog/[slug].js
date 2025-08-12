import Navbar from '@/components/Navbar'
import { getAllSlugs, getPost } from '@/lib/posts'

export async function getStaticPaths(){
  const slugs = getAllSlugs().map(s => s.replace(/\.md$/, ''))
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }){
  const post = await getPost(params.slug)
  return { props: { post } }
}

export default function PostPage({ post }){
  return (
    <>
      <Navbar />
      <main className="container">
        <h1>{post.title}</h1>
        <div className="muted" style={{marginBottom:12}}>{new Date(post.date).toLocaleDateString('tr-TR')}</div>
        <div className="card" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </main>
      <footer className="container"><div className="muted">© {new Date().getFullYear()} Murat Akar</div></footer>
    </>
  )
}
