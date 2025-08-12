# hardshake-site (Next.js - pages router)

Koyu temalı kişisel site (Hakkımda, Projelerim, Zaman Çizelgesi, Yazılar, CV, İletişim).

## Kurulum
```bash
npm install
npm run dev
```
http://localhost:3000

## Vercel
- Repo'yu GitHub'a yükle, Vercel'de import et
- Build: `next build`
- Node 22.x (package.json > engines)

## Blog (Markdown)
`content/posts/*.md` dosyalarından otomatik okur.
Örnek: `content/posts/merhaba-dunya.md`

## Projeler / Timeline
`content/projects.json`, `content/timeline.json`

## CV
`public/cv.pdf` dosyasını kendi CV'nin PDF'i ile değiştir.

## Formspree
`pages/contact.js` içindeki `yourFormID` kısmını kendi Form ID'inle değiştir.
