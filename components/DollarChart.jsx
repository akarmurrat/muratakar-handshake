// components/DollarChart.jsx
import { useEffect, useRef } from "react";

export default function DollarChart() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Temizle
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    // TradingView script
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    // Widget ayarları
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "FX_IDC:USDTRY",   // USD/TRY
      interval: "60",            // 1 saatlik
      timezone: "Europe/Istanbul",
      theme: "dark",
      style: "1",
      locale: "tr",
      enable_publishing: false,
      hide_legend: false,
      allow_symbol_change: true,
      calendar: false,
      studies: ["RSI@tv-basicstudies"], // örnek indikatör
      withdateranges: true,
      range: "12M",              // varsayılan 12 ay
      save_image: false,
      hide_volume: false,
      support_host: "https://www.tradingview.com",
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div className="tradingview-widget-container" style={{ height: "560px" }}>
      <div
        className="tradingview-widget-container__widget"
        ref={containerRef}
        style={{ height: "100%", width: "100%" }}
      />
      <style jsx>{`
        .tradingview-widget-container {
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
        }
      `}</style>
    </div>
  );
}
