import Link from "next/link";
import { careerPaths } from "@/data/careerPaths";

const allExams = [
  {
    name: "JEE Main & Advanced",
    full: "Joint Entrance Examination",
    body: "NTA / IITs",
    for: "Engineering (BTech) at IITs, NITs, IIITs",
    date: "Jan & April (Main), May (Advanced)",
    attempts: "2/year, max 3 years",
    difficulty: "9/10",
    seats: "~1.5 lakh (NIT+IIT+IIIT combined)",
    color: "#FF8C00",
    paths: ["cse", "ece", "mechanical", "civil", "aerospace"],
  },
  {
    name: "NEET UG",
    full: "National Eligibility cum Entrance Test",
    body: "NTA",
    for: "MBBS, BDS, BAMS, BHMS, Veterinary",
    date: "May every year",
    attempts: "Unlimited until age 25",
    difficulty: "9/10",
    seats: "~1 lakh MBBS seats",
    color: "#ef4444",
    paths: ["mbbs", "pharmacy"],
  },
  {
    name: "UPSC CSE",
    full: "Civil Services Examination",
    body: "UPSC",
    for: "IAS, IPS, IFS, IRS, all central services",
    date: "June Prelims, Sept Mains",
    attempts: "6 attempts (General), 9 (OBC), Unlimited (SC/ST)",
    difficulty: "10/10",
    seats: "~1000 IAS/IPS/IFS posts",
    color: "#1E8E3E",
    paths: ["ias"],
  },
  {
    name: "GATE",
    full: "Graduate Aptitude Test in Engineering",
    body: "IITs / IISc",
    for: "MTech admissions + PSU recruitment",
    date: "February every year",
    attempts: "Unlimited",
    difficulty: "8/10",
    seats: "All PSUs: BHEL, HPCL, GAIL, NTPC etc.",
    color: "#0F52BA",
    paths: ["cse", "ece", "mechanical", "civil", "research-phd"],
  },
  {
    name: "NDA",
    full: "National Defence Academy",
    body: "UPSC",
    for: "Indian Army, Navy, Air Force officer",
    date: "April & September",
    attempts: "2/year, only for unmarried males/females after 12th",
    difficulty: "7/10",
    seats: "~400 per batch",
    color: "#9333ea",
    paths: ["nda"],
  },
  {
    name: "CA Foundation",
    full: "Chartered Accountancy Foundation",
    body: "ICAI",
    for: "Entry to CA programme",
    date: "May & November",
    attempts: "Unlimited",
    difficulty: "7/10",
    seats: "Open — merit based",
    color: "#f59e0b",
    paths: ["ca"],
  },
  {
    name: "IBPS PO",
    full: "Institute of Banking Personnel Selection",
    body: "IBPS",
    for: "Probationary Officer at public sector banks",
    date: "October every year",
    attempts: "Unlimited (age limit 20-30)",
    difficulty: "6/10",
    seats: "~4000 PO posts across banks",
    color: "#06b6d4",
    paths: ["banking"],
  },
  {
    name: "SSC CGL",
    full: "Combined Graduate Level",
    body: "SSC",
    for: "Income Tax Inspector, CSS, Auditor, etc.",
    date: "Multiple rounds per year",
    attempts: "Unlimited (age 18-32)",
    difficulty: "6/10",
    seats: "~20,000 posts per year",
    color: "#1E8E3E",
    paths: ["ssc"],
  },
  {
    name: "CSIR NET / UGC NET",
    full: "National Eligibility Test",
    body: "CSIR / NTA",
    for: "JRF fellowship + PhD + Lectureship",
    date: "June & December",
    attempts: "Unlimited",
    difficulty: "8/10",
    seats: "JRF: ~5000 per year",
    color: "#ec4899",
    paths: ["research-phd"],
  },
  {
    name: "NATA",
    full: "National Aptitude Test in Architecture",
    body: "COA",
    for: "B.Arch admissions",
    date: "April & July",
    attempts: "2/year",
    difficulty: "6/10",
    seats: "~40,000 B.Arch seats",
    color: "#FF8C00",
    paths: ["architecture"],
  },
  {
    name: "ICAR AIEEA",
    full: "All India Entrance Examination for Admission",
    body: "ICAR",
    for: "BSc Agriculture, Horticulture, Fisheries",
    date: "June every year",
    attempts: "Unlimited",
    difficulty: "5/10",
    seats: "~15,000 seats in ICAR universities",
    color: "#1E8E3E",
    paths: ["agriculture"],
  },
  {
    name: "EAMCET (AP/TS)",
    full: "Engineering, Agriculture, Medical CET",
    body: "JNTU Kakinada / KNRTU Warangal",
    for: "Engineering & Agriculture seats in AP/TS",
    date: "May every year",
    attempts: "Unlimited",
    difficulty: "6/10",
    seats: "~1.5 lakh seats in AP alone",
    color: "#FF8C00",
    paths: ["cse", "ece", "civil", "agriculture", "pharmacy"],
  },
];

export default function ExamsPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: 36, fontWeight: 800, marginBottom: 12 }}>
          India&apos;s Key Entrance Exams
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16 }}>
          Every major exam in India — eligibility, dates, difficulty, and which career paths they unlock.
        </p>
      </div>

      <div style={{ display: "grid", gap: 20 }}>
        {allExams.map((exam) => (
          <div
            key={exam.name}
            className="card"
            style={{
              padding: 28,
              borderLeft: `4px solid ${exam.color}`,
            }}
          >
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: "1 1 300px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <h2 style={{ fontWeight: 700, fontSize: 20 }}>{exam.name}</h2>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      background: `${exam.color}18`,
                      color: exam.color,
                      border: `1px solid ${exam.color}30`,
                      padding: "2px 8px",
                      borderRadius: 12,
                    }}
                  >
                    Difficulty: {exam.difficulty}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>{exam.full}</div>
                <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.6, marginBottom: 12 }}>
                  <strong style={{ color: "#FF8C00" }}>For:</strong> {exam.for}
                </p>
              </div>

              <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Conducted by", value: exam.body },
                  { label: "Exam Date", value: exam.date },
                  { label: "Attempts", value: exam.attempts },
                  { label: "Seats", value: exam.seats },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", gap: 8, fontSize: 13 }}>
                    <span style={{ color: "var(--muted)", minWidth: 110 }}>{label}:</span>
                    <span style={{ color: "var(--text)", fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 16, borderTop: "1px solid var(--border)", paddingTop: 16 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>Unlocks these career paths:</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {exam.paths.map((id) => {
                  const p = careerPaths.find((x) => x.id === id);
                  return p ? (
                    <Link
                      key={id}
                      href={`/path/${id}`}
                      style={{
                        fontSize: 12,
                        color: exam.color,
                        background: `${exam.color}10`,
                        border: `1px solid ${exam.color}25`,
                        padding: "3px 10px",
                        borderRadius: 12,
                        textDecoration: "none",
                      }}
                    >
                      {p.shortName}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
