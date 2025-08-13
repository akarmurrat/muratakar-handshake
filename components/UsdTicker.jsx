// components/UsdTicker.jsx
import { useEffect, useMemo, useRef, useState } from 'react';

function formatTRY(v) {
  try {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 4 }).format(v);
  } catch {
    return `${v.toFixed(4)} ₺`;
  }
}

export default function UsdTicker({ intervalMs = 30000, maxPoints = 30 }) {
  const [rate, setRate] = useState(null);
  const [prev, setPrev] = useState(null);
  const [history, setHistory] = useState([]); // son N değer
  const [updatedAt, setUpdatedAt] = useState(null);
  const timerRef = useRef(null);

  async function fetchRate() {
    try {
      const r = await fetch('/api/usd', { cache: 'no-store' });
      const data = await r.json();
      if (typeof data?.rate === 'number') {
        setPrev(rate);
        setRate(data.rate);
        setUpdatedAt(new Date(data.ts || Date.now()));
        setHistory((h) => {
          const next = [...h, data.rate];
          return next.slice(-maxPoints);
        });
      }
    } catch (e) {
      // sessiz geç
    }
  }

  useEffect(() => {
    fetchRate(); // ilk yüklemede çek
    timerRef.current = setInterval(fetchRate, intervalMs);
    return () => clearInterval(timerRef.current);
  }, []); // eslint-disable-line

  const diff = useMemo(() => (rate != null && prev != null ? rate - prev : 0), [rate, prev]);
  const trending = diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat';
  const color = trending === 'up' ? '#22c55e' : trending === 'down' ? '#ef4444' : '#94a3b8';
  const bgPulse = trending === 'up' ? 'rgba(34,197,94,0.12)' : trending === 'down' ? 'rgba(239,68,68,0.12)' : 'rgba(148,163,184,0.12)';

  // Sparkline hesapla
  const { pathD, min, max } = useMemo(() => {
    const w = 70, h = 22;
    if (history.length < 2) return { pathD: '', min: 0, max: 0 };
    const mi = Math.min(...history);
    const ma = Math.max(...history);
    const span = ma - mi || 1;
    const pts = history.map((v, i) => {
      const x = (i / (history.length - 1)) * w;
      const y = h - ((v - mi) / span) * h;
      return [x, y];
    });
    const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
    return { pathD: d, min: mi, max: ma };
  }, [history]);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 10px',
        borderRadius: 999,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.04)',
        boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
        transition: 'transform .18s ease, box-shadow .18s ease',
        cursor: 'default'
      }}
      className="usd-ticker"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.18)';
      }}
      title={updatedAt ? `Güncellendi: ${updatedAt.toLocaleTimeString('tr-TR')}` : 'Yükleniyor...'}
    >
      {/* Sol renk noktası + animasyon */}
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: color,
          boxShadow: `0 0 0 6px ${bgPulse}`,
          transition: 'background .2s ease, box-shadow .2s ease'
        }}
      />

      {/* Değerler */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <div style={{ fontSize: 13, color: '#94a3b8' }}>USD / TRY</div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>
          {rate != null ? formatTRY(rate) : '—'}
          <span style={{ marginLeft: 8, fontSize: 12, color }}>
            {diff > 0 ? '▲' : diff < 0 ? '▼' : '—'} {prev != null ? Math.abs(diff).toFixed(4) : ''}
          </span>
        </div>
      </div>

      {/* Sparkline */}
      <svg width="70" height="22" viewBox="0 0 70 22" aria-hidden>
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}
