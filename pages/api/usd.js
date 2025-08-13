// pages/api/usd.js
export default async function handler(req, res) {
  // 10 saniye CDN cache; 30 sn stale-while-revalidate
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');

  // Önce exchangerate.host, olmazsa Frankfurter'a düş
  try {
    const r = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=TRY', { cache: 'no-store' });
    const data = await r.json();
    const rate = data?.rates?.TRY;
    if (!rate) throw new Error('no rate from exchangerate.host');
    return res.status(200).json({ rate, source: 'exchangerate.host', ts: new Date().toISOString() });
  } catch (e) {
    try {
      const r2 = await fetch('https://api.frankfurter.app/latest?from=USD&to=TRY', { cache: 'no-store' });
      const d2 = await r2.json();
      const rate = d2?.rates?.TRY;
      if (!rate) throw new Error('no rate from frankfurter');
      return res.status(200).json({ rate, source: 'frankfurter.app', ts: new Date().toISOString() });
    } catch (err) {
      return res.status(500).json({ error: 'Kur alınamadı' });
    }
  }
}
