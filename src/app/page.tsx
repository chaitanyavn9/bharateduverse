import Link from "next/link";
import Image from "next/image";
import {
  Compass, ArrowRight, Scale, Map, BookOpen,
  FlaskConical, Building2, ShieldCheck, Sprout,
  TrendingUp, Star, ChevronRight, Zap
} from "lucide-react";

const discoveryModes = [
  { icon: Star, label: "Interest First", desc: "What excites you?", href: "/discover?mode=interest", color: "#FF8C00" },
  { icon: Zap, label: "Problem First", desc: "What problem do you want to solve?", href: "/discover?mode=problem", color: "#1E8E3E" },
  { icon: Building2, label: "Industry First", desc: "Which industry do you want to work in?", href: "/discover?mode=industry", color: "#0F52BA" },
  { icon: TrendingUp, label: "Job First", desc: "Which job role excites you?", href: "/discover?mode=job", color: "#9333ea" },
  { icon: FlaskConical, label: "Research First", desc: "Want to push science forward?", href: "/discover?mode=research", color: "#ec4899" },
  { icon: Sprout, label: "Entrepreneur First", desc: "Want to build a company?", href: "/discover?mode=entrepreneur", color: "#f59e0b" },
];

const universes = [
  { icon: "⚙️", label: "Engineering", count: "50+ branches", href: "/discover?universe=Engineering" },
  { icon: "🏥", label: "Medical", count: "NEET, MBBS, Pharmacy", href: "/discover?universe=Medical" },
  { icon: "🏛️", label: "Government", count: "UPSC, SSC, Banking", href: "/discover?universe=Government" },
  { icon: "🛡️", label: "Defence", count: "NDA, CDS, DRDO", href: "/discover?universe=Defence" },
  { icon: "🔬", label: "Research & PhD", count: "NET, JRF, GATE", href: "/discover?universe=Research" },
  { icon: "📐", label: "Professional", count: "CA, CS, CMA, Actuarial", href: "/discover?universe=Professional" },
  { icon: "🌿", label: "Sustainability", count: "Green, Climate, Water", href: "/discover?universe=Sustainability" },
  { icon: "🎨", label: "Design", count: "Architecture, Interior", href: "/discover?universe=Design" },
  { icon: "💹", label: "Finance", count: "Stock, CA, FinTech", href: "/discover?universe=Finance" },
  { icon: "🌾", label: "Agriculture", count: "AgriTech, Horticulture", href: "/discover?universe=Agriculture" },
  { icon: "🍱", label: "Food Tech", count: "Processing, Nutrition", href: "/discover?universe=Food" },
  { icon: "⚛️", label: "Emerging Tech", count: "Quantum, Space, Oceans", href: "/discover?universe=Emerging" },
];

const stats = [
  { value: "800+", label: "Career Paths Mapped" },
  { value: "28+", label: "States & UTs Covered" },
  { value: "Free", label: "Always Free for Students" },
  { value: "0", label: "Paid Rankings" },
];

const apOpportunities = [
  "Google AI Data Center — Amaravati",
  "AMCA Fighter Jet Programme",
  "Aerospace City — Orvakal, Kurnool",
  "Drone City — Orvakal Industrial Hub",
  "AP Quantum Valley Initiative",
  "Pharma City — Visakhapatnam",
  "Aquaculture Export Capital",
  "INCOIS — Ocean Science HQ",
];

export default function HomePage() {
  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "radial-gradient(ellipse at top, rgba(255,140,0,0.08) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(30,142,62,0.06) 0%, transparent 60%), var(--bg)",
          padding: "80px 20px 64px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Hero logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <Image
              src="/logo.png"
              alt="BharatEduVerse"
              width={160}
              height={160}
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 8px 32px rgba(255,140,0,0.25))",
                WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 80%)",
                maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 80%)",
              }}
              priority
            />
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,140,0,0.1)",
              border: "1px solid rgba(255,140,0,0.2)",
              borderRadius: 20,
              padding: "6px 16px",
              fontSize: 13,
              color: "#FF8C00",
              marginBottom: 24,
              fontWeight: 500,
            }}
          >
            <Compass size={14} />
            India&apos;s Education + Career Discovery Platform
          </div>

          <h1
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 20,
              letterSpacing: "-0.02em",
            }}
          >
            Choose Studies Based on{" "}
            <span className="gradient-text">Opportunities</span>
            <br />
            Not{" "}
            <span className="gradient-text-green">Trends</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: "var(--muted)",
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto 32px",
            }}
          >
            From after 10th to PhD — discover every career path in India. Compare income, job security,
            future scope. Find where the jobs and opportunities actually are.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/discover" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "12px 28px" }}>
              <Compass size={18} />
              Discover My Path
            </Link>
            <Link href="/compare" className="btn-secondary" style={{ textDecoration: "none", fontSize: 16, padding: "12px 28px" }}>
              <Scale size={18} />
              Compare Careers
            </Link>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
              marginTop: 48,
              padding: "24px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 12,
            }}
          >
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#FF8C00", fontFamily: "var(--font-poppins)" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DISCOVERY MODES ────────────────────────────────────────────────────── */}
      <section style={{ padding: "64px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, marginBottom: 12 }}>
            How Do You Want to Explore?
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 16 }}>
            Every student is different. Start with what matters to you.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {discoveryModes.map((mode) => (
            <Link
              key={mode.label}
              href={mode.href}
              style={{ textDecoration: "none" }}
            >
              <div
                className="card card-hover"
                style={{ padding: 24, cursor: "pointer" }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: `${mode.color}20`,
                    border: `1px solid ${mode.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 14,
                  }}
                >
                  <mode.icon size={22} color={mode.color} />
                </div>
                <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 6, color: "var(--text)" }}>
                  {mode.label}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 12 }}>{mode.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4, color: mode.color, fontSize: 13, fontWeight: 500 }}>
                  Explore <ChevronRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CAREER UNIVERSES ────────────────────────────────────────────────────── */}
      <section style={{ padding: "0 20px 64px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, marginBottom: 12 }}>
            Career Universes
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 16 }}>
            From ITI to PhD — every path in India mapped in one place
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {universes.map((u) => (
            <Link key={u.label} href={u.href} style={{ textDecoration: "none" }}>
              <div
                className="card card-hover"
                style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
              >
                <span style={{ fontSize: 24 }}>{u.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{u.label}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{u.count}</div>
                </div>
                <ArrowRight size={14} color="var(--muted)" style={{ marginLeft: "auto", flexShrink: 0 }} />
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/discover" className="btn-secondary" style={{ textDecoration: "none" }}>
            View All Career Paths
          </Link>
        </div>
      </section>

      {/* ─── ANDHRA PRADESH SPOTLIGHT ────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(30,142,62,0.05), rgba(15,82,186,0.05))",
          border: "1px solid var(--border)",
          margin: "0 20px 64px",
          borderRadius: 16,
          padding: "40px 32px",
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>🗺️</span>
              <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 24, fontWeight: 700 }}>
                <span className="gradient-text-green">Andhra Pradesh</span> Opportunity Map
              </h2>
            </div>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 20 }}>
              AP is undergoing a transformation. Google, Reliance, Aerospace, Drones, Quantum — plan your
              studies around what&apos;s actually being built in your state.
            </p>
            <Link href="/discover?state=AndhraPradesh" className="btn-primary" style={{ textDecoration: "none" }}>
              <Map size={16} />
              Explore AP Opportunities
            </Link>
          </div>
          <div style={{ flex: "1 1 300px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {apOpportunities.map((opp) => (
              <div
                key={opp}
                style={{
                  background: "rgba(30,142,62,0.08)",
                  border: "1px solid rgba(30,142,62,0.15)",
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 12,
                  color: "#34d058",
                  fontWeight: 500,
                }}
              >
                {opp}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "0 20px 64px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, marginBottom: 12 }}>
          Your Journey, Step by Step
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: 40 }}>
          No paid AI. No biased rankings. Just structured data and your answers.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { step: "1", title: "Tell us about you", desc: "Current stage, interests, goals, budget, and what matters most to you." },
            { step: "2", title: "We score every career path", desc: "Our rule engine calculates fit across 10 parameters — no hidden bias, no paid placements." },
            { step: "3", title: "Compare your top matches", desc: "Side-by-side: income, job security, AI resistance, research potential, entrepreneurship scope." },
            { step: "4", title: "Get your full roadmap", desc: "Studies → Exams → Colleges → Jobs → Companies → Opportunities — the complete picture." },
          ].map((item, i, arr) => (
            <div key={item.step} style={{ display: "flex", gap: 20, textAlign: "left" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #FF8C00, #e07b00)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: 2, flex: 1, minHeight: 32, background: "var(--border)", margin: "4px 0" }} />
                )}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 32 : 0, paddingTop: 6 }}>
                <h3 style={{ fontWeight: 600, fontSize: 17, marginBottom: 6 }}>{item.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <Link href="/discover" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "14px 32px" }}>
            <BookOpen size={18} />
            Start Discovering — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* ─── PHILOSOPHY BANNER ────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(255,140,0,0.06), rgba(15,82,186,0.04))",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <ShieldCheck size={32} color="#1E8E3E" style={{ marginBottom: 12 }} />
          <h3 style={{ fontFamily: "var(--font-poppins)", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
            Our Promise
          </h3>
          <p style={{ color: "var(--muted)", lineHeight: 1.8 }}>
            No college pays to rank higher. No career is promoted because someone paid us.
            Every recommendation is based purely on fit — your interests, your goals, India&apos;s real opportunities.
            <br />
            <span style={{ color: "#FF8C00", fontWeight: 600 }}>BharatEduVerse is free for students and parents — forever.</span>
          </p>
        </div>
      </section>
    </div>
  );
}
