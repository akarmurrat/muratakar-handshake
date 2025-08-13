// pages/dolar.js
import Head from "next/head";
import DollarChart from "../components/DollarChart";

export default function DolarPage() {
  return (
    <>
      <Head>
        <title>USD/TRY Grafiği — muratakar.net</title>
        <meta
          name="description"
          content="Güncel USD/TRY (Dolar/TL) grafiği ve geçmiş hareketler."
        />
        <link rel="canonical" href="https://www.muratakar.net/dolar" />
      </Head>

      <main className="container" style={{ padding: "32px 20px", maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 16 }}>USD/TRY Grafiği</h1>
        <p style={{ color: "#94a3b8", marginBottom: 16 }}>
          Aşağıdaki grafik TradingView endikatif verilerini gösterir.
        </p>
        <DollarChart />
      </main>
    </>
  );
}
