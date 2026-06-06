import Link from "next/link";

const govtPaths = [
  {
    category: "IAS / IPS / IFS",
    exam: "UPSC CSE",
    eligibility: "Any graduation",
    posts: "IAS, IPS, IFS, IRS, IES + all central services",
    salary: "₹56,100–₹2,50,000/month (+ perks)",
    vacancies: "~900–1100 posts per year",
    color: "#FF8C00",
    id: "ias",
  },
  {
    category: "SSC CGL / CHSL",
    exam: "SSC CGL / CHSL / MTS",
    eligibility: "12th or Graduation",
    posts: "Income Tax, CSS, Auditor, Steno, MTS",
    salary: "₹25,000–₹75,000/month",
    vacancies: "50,000+ posts per year",
    color: "#1E8E3E",
    id: "ssc",
  },
  {
    category: "Bank PO / Clerk",
    exam: "IBPS PO/Clerk, SBI PO",
    eligibility: "Any graduation (age 20-30)",
    posts: "Bank PO, Clerk, Specialist Officer",
    salary: "₹35,000–₹65,000/month",
    vacancies: "15,000–20,000 per year",
    color: "#0F52BA",
    id: "banking",
  },
  {
    category: "RBI / SEBI / NABARD",
    exam: "RBI Grade B, SEBI Grade A, NABARD Grade A",
    eligibility: "Graduation (70%+ marks)",
    posts: "Grade A/B Officers in finance regulators",
    salary: "₹55,000–₹1,00,000/month",
    vacancies: "200–500 per year",
    color: "#9333ea",
    id: "banking",
  },
  {
    category: "Defence (Army/Navy/Air Force)",
    exam: "NDA / CDS / AFCAT",
    eligibility: "12th (NDA), Graduation (CDS/AFCAT)",
    posts: "Officer in Indian Army, Navy, Air Force",
    salary: "₹60,000–₹2,00,000/month (+ allowances)",
    vacancies: "400–600 per year (NDA alone)",
    color: "#ef4444",
    id: "nda",
  },
  {
    category: "Railway Jobs",
    exam: "RRB NTPC / ALP / Group D",
    eligibility: "10th / 12th / Graduation",
    posts: "Station Master, ALP, Technician, Group D",
    salary: "₹20,000–₹60,000/month",
    vacancies: "10,000–35,000 per year",
    color: "#f59e0b",
    id: "ssc",
  },
  {
    category: "APPSC Group 1 / 2 / 3",
    exam: "APPSC / TSPSC",
    eligibility: "12th or Graduation",
    posts: "DSP, Deputy Collector, Tax Asst, VRO/VRA",
    salary: "₹25,000–₹90,000/month",
    vacancies: "5,000–15,000 per year in AP",
    color: "#1E8E3E",
    id: "ias",
  },
  {
    category: "Teaching / Lectureship (NET/SET)",
    exam: "UGC NET / AP SET",
    eligibility: "PG Degree",
    posts: "Assistant Professor, Lecturer in degree colleges",
    salary: "₹57,700–₹1,44,200/month (7th Pay)",
    vacancies: "Thousands per year",
    color: "#06b6d4",
    id: "research-phd",
  },
];

const upscPrepStrategy = [
  { phase: "Phase 1 — Foundation", duration: "4–6 months", desc: "NCERT 6–12 across History, Geography, Polity, Economics, Science. Build base." },
  { phase: "Phase 2 — Standard Books", duration: "6–8 months", desc: "Laxmikant (Polity), Bipin Chandra (History), G.C. Leong (Geography), IGNOU Economy." },
  { phase: "Phase 3 — Current Affairs", duration: "Ongoing", desc: "The Hindu / Indian Express daily. Yojana, Kurukshetra monthly. Mains answer writing practice." },
  { phase: "Phase 4 — Prelims Mock Tests", duration: "2–3 months before exam", desc: "Minimum 30 mock tests. Time management is the key to Prelims." },
  { phase: "Phase 5 — Mains Writing", duration: "3 months", desc: "Essay, GS 1–4, Optional. 1500 words answers in 3 hours. Practice daily." },
  { phase: "Phase 6 — Interview", duration: "1 month", desc: "Personality test. Current affairs, Daf-based, district knowledge. Mock interviews." },
];

export default function GovernmentPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: 36, fontWeight: 800, marginBottom: 12 }}>
          Government Career Paths in India
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16 }}>
          From IAS to Railway — every government career path with salary, vacancies, and exam details.
        </p>
      </div>

      {/* Government paths grid */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 24, fontWeight: 700, marginBottom: 20 }}>
          All Government Career Tracks
        </h2>
        <div style={{ display: "grid", gap: 16 }}>
          {govtPaths.map((p) => (
            <div key={p.category} className="card" style={{ padding: 24, borderLeft: `4px solid ${p.color}` }}>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ flex: "1 1 260px" }}>
                  <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{p.category}</h3>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>Exam: {p.exam}</div>
                  <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>
                    <strong style={{ color: "var(--text)" }}>Posts:</strong> {p.posts}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--muted)" }}>
                    <strong style={{ color: "var(--text)" }}>Eligibility:</strong> {p.eligibility}
                  </p>
                </div>
                <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>Salary Range</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1E8E3E" }}>{p.salary}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>Annual Vacancies</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FF8C00" }}>{p.vacancies}</div>
                  </div>
                  <Link href={`/path/${p.id}`} className="btn-secondary" style={{ textDecoration: "none", fontSize: 13, padding: "6px 14px" }}>
                    Full Roadmap →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UPSC Strategy */}
      <section>
        <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
          UPSC CSE Preparation Strategy
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 24 }}>
          The most tested roadmap for clearing India&apos;s hardest exam.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {upscPrepStrategy.map((s, i, arr) => (
            <div key={s.phase} style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #FF8C00, #e07b00)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {i + 1}
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: 2, flex: 1, minHeight: 24, background: "var(--border)", margin: "4px 0" }} />
                )}
              </div>
              <div style={{ paddingBottom: 28, flex: 1 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{s.phase}</span>
                  <span style={{ fontSize: 12, color: "#FF8C00", background: "rgba(255,140,0,0.1)", padding: "1px 8px", borderRadius: 10 }}>{s.duration}</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
