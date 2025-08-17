// components/TimelineHorizontalClient.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Row = {
  id: number;
  year?: number | null;
  date?: string | null;        // ISO tarih string (örn "2024-10-05") ya da null
  title?: string | null;       // 2-3 kelimelik kısa etiket (örn "Fermilab", "Mezuniyet")
  description?: string | null; // Baloncukta detay
  tags?: string[] | null;
};

type Item = {
  id: number;
  label: string;
  date: string | null;
  year: number | null;
  details: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TimelineHorizontalClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // Verileri çek
  useEffect(() => {
    let isMounted = true;

    async function load() {
      // Not: “date” varsa önce ona göre, yoksa “year”a göre sıralıyoruz
      const { data, error } = await supabase
        .from("timeline")
        .select("*")
        .order("date", { ascending: true, nullsFirst: true })
        .order("year", { ascending: true, nullsFirst: true });

      if (error) {
        console.error(error);
        return;
      }
      if (!isMounted) return;

      const mapped: Item[] = (data as Row[]).map((r) => ({
        id: r.id,
        label: (r.title || (r.tags?.[0] ?? "") || "Etiket").toString(),
        date: r.date ?? null,
        year: r.year ?? null,
        details: (r.description || "").toString(),
      }));

      setItems(mapped);
    }

    load();
    return () => { isMounted = false; };
  }, []);

  // Eşit aralıklı (index’e göre) yerleşim — sonra istersen tarih ölçekli yapıya geçebiliriz
  const nodes = useMemo(() => items, [items]);

  // Mouse tekerleği ile yatay kaydırma
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Dikey delta’yı yatay kaydırmaya çevir
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 1.1;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, []);

  return (
    <main className="container">
      <h1 className="text-3xl font-bold my-6">Zaman Çizgisi</h1>

      <div className="timeline-wrap" ref={scrollerRef}>
        {/* Orta çizgi */}
        <div className="timeline-rail" />

        <div className="timeline-row">
          {nodes.map((n, i) => (
            <div className="timeline-item" key={n.id}>
              {/* Nokta */}
              <div
                className={`dot ${hoverId === n.id ? "dot-active" : ""}`}
                onMouseEnter={() => setHoverId(n.id)}
                onMouseLeave={() => setHoverId(null)}
                aria-label={n.label}
              />
              {/* Etiket (2-3 kelime) */}
              <div className="label">
                {n.label}
                <div className="sub">
                  {n.date ? new Date(n.date).toLocaleDateString("tr-TR") : (n.year ?? "")}
                </div>
              </div>

              {/* Baloncuk (hover’da) */}
              {hoverId === n.id && (
                <div className="tooltip" role="tooltip">
                  <div className="tooltip-arrow" />
                  <div className="tooltip-card">
                    <div className="tooltip-title">
                      {n.label}{" "}
                      <span className="tooltip-date">
                        {n.date
                          ? new Date(n.date).toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" })
                          : (n.year ?? "")}
                      </span>
                    </div>
                    <div className="tooltip-body">
                      {n.details || "Detay eklenmemiş."}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sağ/sol gradient “edge” efektleri */}
        <div className="edge edge-left" />
        <div className="edge edge-right" />
      </div>

      <p className="muted mt-3">
        İpucu: Mouse tekerleği ile sağ/sol kaydırabilirsin. Mobilde yatay sürükle.
      </p>
    </main>
  );
}
