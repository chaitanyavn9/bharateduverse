import Link from "next/link";

const incubators = [
  {
    name: "Tata Group Incubation Centre",
    state: "Andhra Pradesh",
    location: "Multiple — Vizag, Amaravati",
    focus: ["Deep Tech", "Manufacturing", "Agriculture"],
    funding: "Up to ₹50L seed + mentoring",
    apply: "tata-trusts.org",
  },
  {
    name: "T-Hub",
    state: "Telangana",
    location: "Hyderabad",
    focus: ["IT", "HealthTech", "EdTech", "FinTech"],
    funding: "Equity-free grants + investor access",
    apply: "t-hub.co",
  },
  {
    name: "IIT Tirupati TechInc",
    state: "Andhra Pradesh",
    location: "Tirupati",
    focus: ["Engineering", "AgriTech", "Sustainability"],
    funding: "₹25L seed + lab access",
    apply: "iitt.ac.in",
  },
  {
    name: "IISER Tirupati Research Hub",
    state: "Andhra Pradesh",
    location: "Tirupati",
    focus: ["Basic Science", "Biology", "Chemistry", "Quantum"],
    funding: "DST fellowship + lab infrastructure",
    apply: "iisertirupati.ac.in",
  },
  {
    name: "AIC-ANGRAU (Agri Innovation)",
    state: "Andhra Pradesh",
    location: "Guntur",
    focus: ["AgriTech", "Food Processing", "Horticulture"],
    funding: "AIM NITI grants up to ₹50L",
    apply: "startupindia.gov.in",
  },
  {
    name: "IISc NSRCEL",
    state: "Karnataka",
    location: "Bengaluru",
    focus: ["Deep Tech", "Biotech", "Space"],
    funding: "₹1Cr+ for select startups",
    apply: "nsrcel.org",
  },
  {
    name: "IIT Bombay SINE",
    state: "Maharashtra",
    location: "Mumbai",
    focus: ["Engineering", "HealthTech", "AI"],
    funding: "Equity + facilities",
    apply: "sineiitb.org",
  },
];

const researchFunding = [
  {
    name: "PM Research Fellowship (PMRF)",
    by: "MoE",
    amount: "₹70,000–₹80,000/month for 5 years",
    for: "Top UG students pursuing PhD at IIT/IISc/IISER",
    link: "pmrf.in",
    color: "#FF8C00",
  },
  {
    name: "CSIR Junior Research Fellowship",
    by: "CSIR",
    amount: "₹37,000/month (JRF) → ₹42,000 (SRF)",
    for: "PhD students in basic sciences",
    link: "csirhrdg.res.in",
    color: "#1E8E3E",
  },
  {
    name: "UGC JRF",
    by: "UGC",
    amount: "₹37,000/month",
    for: "PhD students in social sciences & humanities via NET",
    link: "ugcnetonline.in",
    color: "#0F52BA",
  },
  {
    name: "DST-INSPIRE Fellowship",
    by: "DST",
    amount: "₹80,000/month (post-doc) or ₹25,000 (PhD)",
    for: "Science research across all domains",
    link: "online-inspire.gov.in",
    color: "#9333ea",
  },
  {
    name: "ICMR JRF",
    by: "ICMR",
    amount: "₹37,000/month",
    for: "Biomedical and health research",
    link: "icmr.gov.in",
    color: "#ef4444",
  },
  {
    name: "ICAR SRF",
    by: "ICAR",
    amount: "₹42,000/month",
    for: "Agricultural research",
    link: "icar.org.in",
    color: "#f59e0b",
  },
];

const nationalMissions = [
  { name: "National Quantum Mission", budget: "₹6,003 Cr", period: "2023–2031", focus: "Quantum computing, communication, sensing" },
  { name: "National Research Foundation (NRF)", budget: "₹50,000 Cr", period: "2023–2028", focus: "Basic research across all domains" },
  { name: "India Semiconductor Mission", budget: "₹76,000 Cr", period: "2022–2027", focus: "Chip design, fab, packaging" },
  { name: "PM MITRA (Textiles)", budget: "₹4,445 Cr", period: "2023–2027", focus: "Textile research and parks" },
  { name: "National Hydrogen Mission", budget: "₹19,744 Cr", period: "2023–2030", focus: "Green hydrogen production" },
  { name: "Samudrayaan (Deep Sea)", budget: "₹4,077 Cr", period: "2023–2026", focus: "Ocean exploration" },
  { name: "Gaganyaan (Space)", budget: "₹9,000 Cr", period: "2023–2025", focus: "Human spaceflight" },
];

export default function ResearchPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: 36, fontWeight: 800, marginBottom: 12 }}>
          Research & Incubation in India
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16 }}>
          Fellowships, incubation centres, national missions — everything you need to pursue deep research or build a research-driven startup.
        </p>
      </div>

      {/* National Missions */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
          🇮🇳 National Research Missions
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 20 }}>Plan your research career around India&apos;s funded priorities.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {nationalMissions.map((m) => (
            <div key={m.name} className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{m.name}</div>
              <div style={{ fontSize: 13, color: "#FF8C00", marginBottom: 4 }}>{m.budget} budget • {m.period}</div>
              <p style={{ fontSize: 13, color: "var(--muted)" }}>{m.focus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fellowships */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
          💰 Research Fellowships
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 20 }}>PhD fellowships — income while doing research. No college fees needed for most.</p>
        <div style={{ display: "grid", gap: 16 }}>
          {researchFunding.map((f) => (
            <div key={f.name} className="card" style={{ padding: 24, borderLeft: `4px solid ${f.color}` }}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{f.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>By {f.by}</div>
                  <p style={{ fontSize: 13, color: "var(--muted)" }}>{f.for}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: f.color }}>{f.amount}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Incubators */}
      <section>
        <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
          🏗️ Incubation Centres
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 20 }}>Turn your research into a company. These incubators fund, mentor, and connect you.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {incubators.map((inc) => (
            <div key={inc.name} className="card" style={{ padding: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{inc.name}</div>
              <div style={{ fontSize: 12, color: "#1E8E3E", marginBottom: 8 }}>📍 {inc.location}, {inc.state}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {inc.focus.map((f) => (
                  <span key={f} className="tag" style={{ fontSize: 11 }}>{f}</span>
                ))}
              </div>
              <div style={{ fontSize: 13, color: "#FF8C00", marginBottom: 8 }}>💰 {inc.funding}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: 40, textAlign: "center" }}>
        <Link href="/path/research-phd" className="btn-primary" style={{ textDecoration: "none" }}>
          View Full Research Career Roadmap →
        </Link>
      </div>
    </div>
  );
}
