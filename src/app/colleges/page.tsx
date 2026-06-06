export default function CollegesPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 20px", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🏛️</div>
      <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: 36, fontWeight: 800, marginBottom: 16 }}>
        College Directory
      </h1>
      <p style={{ color: "var(--muted)", fontSize: 18, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 32px" }}>
        We are building a comprehensive directory of government and private colleges across India.
        Each college will be listed under the career paths they offer — no paid rankings.
      </p>
      <div
        style={{
          background: "rgba(255,140,0,0.08)",
          border: "1px solid rgba(255,140,0,0.2)",
          borderRadius: 12,
          padding: "24px",
          maxWidth: 500,
          margin: "0 auto 32px",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 18, color: "#FF8C00", marginBottom: 8 }}>Coming Soon — V2</div>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
          We are starting with Andhra Pradesh government colleges and then expanding state by state.
          If you represent a college and want to list it — contact us.
        </p>
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="mailto:colleges@bharateduverse.in" className="btn-primary" style={{ textDecoration: "none" }}>
          List Your College
        </a>
      </div>

      {/* Upcoming AP Colleges Preview */}
      <div style={{ marginTop: 60, textAlign: "left" }}>
        <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 24, fontWeight: 700, marginBottom: 20 }}>
          Andhra Pradesh — Govt Colleges Preview
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
          {[
            { name: "Andhra University", type: "Central University", location: "Visakhapatnam", focus: "Engineering, Science, Law, Commerce" },
            { name: "Sri Venkateswara University", type: "State University", location: "Tirupati", focus: "Engineering, Science, Arts, Commerce" },
            { name: "ANGRAU", type: "Agricultural University", location: "Guntur", focus: "Agriculture, Horticulture, Fisheries" },
            { name: "NTR University of Health Sciences", type: "Medical University", location: "Vijayawada", focus: "MBBS, BDS, Nursing, Pharmacy" },
            { name: "JNTU Anantapur", type: "Technical University", location: "Ananthapuramu", focus: "Engineering, MBA, MCA" },
            { name: "JNTU Kakinada", type: "Technical University", location: "Kakinada", focus: "Engineering, Technology" },
            { name: "IIT Tirupati", type: "Central Institute", location: "Tirupati", focus: "BTech, MTech, PhD" },
            { name: "IISER Tirupati", type: "Central Institute", location: "Tirupati", focus: "BS-MS Dual, PhD in Sciences" },
            { name: "AIIMS Mangalagiri", type: "Central Medical", location: "Guntur", focus: "MBBS, MD, MS, Research" },
            { name: "National Law School AP", type: "Law University", location: "Visakhapatnam", focus: "BA LLB, LLM" },
            { name: "AP Tribal Welfare Residential", type: "Govt School Chain", location: "All Districts", focus: "10th, Intermediate" },
            { name: "Jawahar Navodaya Vidyalayas (AP)", type: "Central Govt Schools", location: "All Districts", focus: "6th to 12th" },
          ].map((col) => (
            <div
              key={col.name}
              className="card"
              style={{ padding: 18, opacity: 0.7, cursor: "not-allowed" }}
            >
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{col.name}</div>
              <div style={{ fontSize: 11, color: "#1E8E3E", marginBottom: 4 }}>{col.type}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>📍 {col.location}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{col.focus}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 8, fontStyle: "italic" }}>Full profile coming soon</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
