// lib/siteContent.ts
export const hero = {
  title: "Murat Akar — Mekatronik Mühendisi",
  subtitle:
    "Yüksek enerji/nükleer fizik ve nötrino deneylerine odaklanan bir mekatronik mühendisiyim. Dedektör teknolojileri, deneysel enstrümantasyon ve veri analizi üzerine çalışıyorum.",
  badges: [
    "Dedektör Teknolojileri & Kalorimetri",
    "ANNIE Nötrino Deneyi (Fermilab)",
    "C/C++, Python, VHDL, ROOT, Geant4",
    "CAD/EDA: Solidworks, NX, Creo, AutoCAD, Altium, Proteus",
  ],
  ctas: [
    { label: "Projelerimi gör", href: "/projects", primary: false },
    { label: "Benimle iletişime geç", href: "/contact", primary: true },
  ],
};

export const highlights: { text: string }[] = [
  { text: "Fermilab / ANNIE’de lisans araştırmacısı: deney izleme, veri analizi ve operasyon desteği." },
  { text: "Erciyes Nötrino Araştırma Grubu: PMT kart tasarımı, simülasyon/analiz ve enstrümantasyon Ar-Ge." },
  { text: "BAP & TÜBİTAK projelerinde parçacık dedektörleri ve yeni nesil sintilatörler üzerine çalışmalar." },
  { text: "AÜB Ar-Ge Proje Pazarı Birinciliği (2025) — Mühendislik/Temel Bilimler." },
];

export const about = {
  paragraph:
    "Mekatronik mühendisliği eğitimimi; yüksek enerji, nükleer ve nötrino fiziğindeki Ür-Ge/Ar-Ge çalışmalarım ile birleştiriyorum. Üniversite boyunca bilimsel projelerde ve teknik kulüplerde aktif görevler üstlenerek ekip çalışması, problem çözme ve liderlik becerilerimi güçlendirdim. Hedefim; endüstri 4.0 ve ileri teknoloji alanlarında, dedektör teknolojileri ve deneysel enstrümantasyon odağında yenilikçi çözümler üretmek.",
};

export const projects = [
  {
    title: "Parçacık Dedektörleri için Ar-Ge ve Nanoteknolojik Uygulamalar",
    desc: "Sensör/dedektör bileşenlerinin tasarımı ve karakterizasyonu. (BAP)",
  },
  {
    title: "Yeni Nesil Nanoteknolojik Sintilatörler (Deneysel YEF)",
    desc: "Deneysel yüksek enerji fiziği için sintilatör geliştirme.",
  },
  {
    title: "Parçacık Kalorimetreleri için Uzaktan Kumandalı Dinamik Devre",
    desc: "Okuma-elektroniği ve kontrol mimarisi.",
  },
  {
    title: "PEN-PET Tabanlı Sintilatör Kopolimerler (Yüksek Radyasyon)",
    desc: "Malzeme geliştirme ve test.",
  },
  {
    title: "TÜBİTAK 2209-A",
    desc: "“Nötron Etkileşiminin Nötrino Deneyleri için Simülasyonu.”",
  },
  {
    title: "TEKNOFEST — ENEG-HARD (SMR için Radyasyon Dedektörleri)",
    desc: "Özgün dedektör tasarımı ve okuma-kontrol elektroniği.",
  },
];

export const experience = [
  {
    place: "Fermilab — ANNIE (Chicago, ABD)",
    role: "Lisans Araştırmacısı",
    details: "Deney süreçlerinin izlenmesi, veri analizi ve sistem operasyonu; dedektör teknolojileriyle Ar-Ge.",
  },
  {
    place: "Erciyes Nötrino Araştırma Grubu (Kayseri, TR)",
    role: "Lisans Araştırmacısı",
    details: "PMT devre kart tasarımı ve optimizasyonu; simülasyon, veri analizi ve enstrümantasyon çözümleri.",
  },
];

export const timeline = [
  { when: "2025", label: "AÜB Ar-Ge Proje Pazarı", details: "Mühendislik/Temel Bilimler birinciliği." },
  { when: "2024", label: "YEFIST’24 Poster", details: "“İkincil Emisyon İyonizasyon Kalorimetrisi Ar-Ge.”" },
  { when: "Halen", label: "Fermilab — ANNIE", details: "Shifter/gözlem, veri analizi ve deney operasyonu." },
  { when: "Halen", label: "ENRG", details: "Dedektör/kalorimetri, simülasyon ve enstrümantasyon." },
];

export const skills = {
  tech: ["C/C++", "Python", "VHDL", "ROOT", "Geant4"],
  cad: ["Solidworks", "Siemens NX", "PTC Creo", "AutoCAD", "Altium", "Proteus"],
  soft: ["Takım çalışması", "İletişim", "Zaman yönetimi", "Problem çözme", "Liderlik"],
};

export const blogIntro =
  "Nötrino deneyleri, dedektör teknolojileri, akademi-sanayi Ar-Ge deneyimlerim ve İHA/robotik projeler üzerine notlarımı paylaşıyorum.";

export const contact = {
  email: "info@muratakar.net",
  linkedin: "https://www.linkedin.com/in/akar-murat",
};
