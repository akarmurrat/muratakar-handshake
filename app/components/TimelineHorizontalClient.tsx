"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Row = {
  id: number;
  year?: number | null;
  date?: string | null;
  title?: string | null;
  description?: string | null;
  tags?: string[] | null;
};

type Item = {
  id: number;
  label: string;
  date: string | null;
  year: number | null;
  details: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnon);

export default function TimelineHorizontalClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        if (!supabaseUrl || !supabaseAnon) {
          throw new Error("Supabase ENV eksik (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY).");
        }
        const { data, error } = await supabase
          .from("timeline")
          .select("*")
          .order("date", { ascending: true, nullsFirst: true })
          .order("year", { ascending: true, nullsFirst: true });

        if (error) throw error;
        if (!alive) return;

        const mapped: Item[] = (data as Row[]).map((r) => ({
          id: r.id,
          label: (r.title || (r.tags?.[0] ?? "") || "Etiket").toString(),
          date: r.date ?? null,
          year: r.year ?? null,
          details: (r.description || "").toString(),
        }));
        setItems(mapped);
      } catch (e: any) {
        setErr(e?.message || "Veri yüklenemedi.");
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 1.1;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, []);

  const nodes = useMemo(() => items, [items]);

  return (
    <main className="container">
      <h1 className="text-3xl font-bold my-6">Zaman Çizgisi</h1>

      {loading && <div className="muted">Yükleniyor…</div>}
      {err && <div className="muted">Hata: {err}</div>}
      {!loading && !err && nodes.length === 0 && (
        <div className="muted">Henüz veri yok. Supabase “timeline” tablosuna kayıt ekle.</div>
      )}

      {!loading && !err && nodes.length > 0 && (
        <div className="timeline-wrap" ref={scrollerRef}>
          <div className="timeline-rail" />
          <div className="timeline-row">
            {nodes.map((n) => (
              <div className="timeline-item" key={n.id}>
                <div
                  className={`dot ${hoverId === n.id ? "dot-active" : ""}`}
                  onMouseEnter={() => setHoverId(n.id)}
                  onMouseLeave={() => setHoverId(null)}
                  aria-label={n.label}
                  title={n.label}
                />
                <div className="label">
                  {n.label}
                  <div className="sub">
                    {n.date
                      ? new Date(n.date).toLocaleDateString("tr-TR")
                      : (n.year ?? "")}
                  </div>
                </div>

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
                      <div className="tooltip-body">{n.details || "Detay eklenmemiş."}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="edge edge-left" />
          <div className="edge edge-right" />
        </div>
      )}

      <p className="muted mt-3">Mouse tekerleği ile sağ/sol kaydır.</p>
    </main>
  );
}
