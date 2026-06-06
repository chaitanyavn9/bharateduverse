import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--bg-card)",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 32 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Image src="/logo.png" alt="BharatEduVerse" width={32} height={32} style={{ borderRadius: 6, objectFit: "contain" }} />
              <span style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: 16 }}>
                <span style={{ color: "#FF8C00" }}>Bharat</span>
                <span style={{ color: "#f1f5f9" }}>Edu</span>
                <span style={{ color: "#1E8E3E" }}>Verse</span>
              </span>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}>
              Choose Studies Based on Opportunities, Not Trends.
            </p>
            <p style={{ color: "var(--muted)", fontSize: 12 }}>
              Learn for Tomorrow • Build for India
            </p>
          </div>

          {/* Discover */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: "#FF8C00" }}>Discover</h4>
            {[
              ["After 10th", "/discover?stage=10th"],
              ["After 12th", "/discover?stage=12th"],
              ["After Graduation", "/discover?stage=graduation"],
              ["Compare Paths", "/compare"],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: "block", color: "var(--muted)", fontSize: 13, textDecoration: "none", marginBottom: 6 }}>
                {label}
              </Link>
            ))}
          </div>

          {/* Universes */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: "#1E8E3E" }}>Career Universes</h4>
            {["Engineering", "Medical", "Government", "Defence", "Research", "Finance"].map((u) => (
              <Link key={u} href={`/discover?universe=${u}`} style={{ display: "block", color: "var(--muted)", fontSize: 13, textDecoration: "none", marginBottom: 6 }}>
                {u}
              </Link>
            ))}
          </div>

          {/* Key Exams */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: "#0F52BA" }}>Key Exams</h4>
            {["JEE", "NEET", "UPSC CSE", "GATE", "SSC CGL", "IBPS PO"].map((e) => (
              <Link key={e} href={`/exams?q=${e}`} style={{ display: "block", color: "var(--muted)", fontSize: 13, textDecoration: "none", marginBottom: 6 }}>
                {e}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
          <p style={{ color: "var(--muted)", fontSize: 12 }}>
            © 2025 BharatEduVerse. Built for India. Free for students and parents — always.
          </p>
          <p style={{ color: "var(--muted)", fontSize: 12 }}>
            Data from MoE, UGC, AICTE, NTA, NIRF, UPSC, SSC, ISRO, DRDO
          </p>
        </div>
      </div>
    </footer>
  );
}
