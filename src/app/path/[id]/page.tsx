import { careerPaths, getPathById } from "@/data/careerPaths";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ExternalLink, Scale, Building2,
  MapPin, BookOpen, TrendingUp, Shield, Zap,
  FlaskConical, Globe, Sprout, Clock, IndianRupee,
  ChevronRight
} from "lucide-react";

export async function generateStaticParams() {
  return careerPaths.map((p) => ({ id: p.id }));
}

function ScoreItem({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}/10</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: "var(--border)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            borderRadius: 4,
            width: `${value * 10}%`,
            background: color,
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

export default async function PathPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const path = getPathById(id);
  if (!path) notFound();

  const related = careerPaths
    .filter((p) => p.universe === path.universe && p.id !== path.id)
    .slice(0, 3);

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 20px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 13, color: "var(--muted)" }}>
        <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</Link>
        <ChevronRight size={12} />
        <Link href="/discover" style={{ color: "var(--muted)", textDecoration: "none" }}>Discover</Link>
        <ChevronRight size={12} />
        <span style={{ color: "var(--text)" }}>{path.name}</span>
      </div>

      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(255,140,0,0.08), rgba(30,142,62,0.04))",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "32px",
          marginBottom: 32,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              <span className="tag">{path.universe}</span>
              {path.entryPoints.map((e) => (
                <span key={e} style={{ fontSize: 11, color: "#1E8E3E", background: "rgba(30,142,62,0.1)", border: "1px solid rgba(30,142,62,0.2)", padding: "2px 8px", borderRadius: 12 }}>{e}</span>
              ))}
            </div>
            <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>
              {path.name}
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.7, marginBottom: 20 }}>
              {path.description}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/compare" className="btn-primary" style={{ textDecoration: "none" }}>
                <Scale size={16} /> Compare with Others
              </Link>
              <Link href="/discover" className="btn-secondary" style={{ textDecoration: "none" }}>
                <ArrowLeft size={16} /> Find More Paths
              </Link>
            </div>
          </div>

          {/* Quick stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              minWidth: 220,
            }}
          >
            {[
              { label: "Entry Income", value: path.incomeRange.entry, color: "#1E8E3E" },
              { label: "Mid Income", value: path.incomeRange.mid, color: "#FF8C00" },
              { label: "Senior Income", value: path.incomeRange.senior, color: "#0F52BA" },
              { label: "Years to Job", value: `~${path.timeToEarnYears} yrs`, color: "#9333ea" },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
        {/* Left column */}
        <div>
          {/* Roadmap */}
          <div className="card" style={{ padding: 28, marginBottom: 24 }}>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
              📍 Your Roadmap
            </h2>
            <div style={{ position: "relative" }}>
              {path.roadmap.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < path.roadmap.length - 1 ? 0 : 0 }}>
                  {/* Timeline */}
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
                        zIndex: 1,
                      }}
                    >
                      {i + 1}
                    </div>
                    {i < path.roadmap.length - 1 && (
                      <div style={{ width: 2, flex: 1, minHeight: 24, background: "var(--border)", margin: "4px 0" }} />
                    )}
                  </div>
                  {/* Content */}
                  <div style={{ paddingBottom: 24, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, fontSize: 16 }}>{step.stage}</span>
                      <span style={{ fontSize: 12, color: "#FF8C00", background: "rgba(255,140,0,0.1)", padding: "1px 8px", borderRadius: 10 }}>
                        {step.duration}
                      </span>
                    </div>
                    <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginBottom: step.options ? 8 : 0 }}>
                      {step.description}
                    </p>
                    {step.options && (
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {step.options.map((o) => (
                          <span key={o} style={{ fontSize: 11, color: "var(--muted)", background: "var(--bg-card2)", padding: "2px 8px", borderRadius: 8, border: "1px solid var(--border)" }}>
                            {o}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goal Paths */}
          <div className="card" style={{ padding: 28, marginBottom: 24 }}>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
              🎯 Goal-Based Paths
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {Object.entries(path.goalPaths).map(([type, roadmap]) => {
                const emoji = { Job: "🎯", Entrepreneur: "🚀", Research: "🔬", "Government Service": "🏛️" }[type] ?? "→";
                return (
                  <div
                    key={type}
                    style={{
                      background: "var(--bg-card2)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      padding: "14px 16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span>{emoji}</span>
                      <span style={{ fontWeight: 600, fontSize: 14, color: "#FF8C00" }}>{type}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{roadmap}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Andhra Pradesh Opportunities */}
          {path.andhraOpportunities.length > 0 && (
            <div
              style={{
                background: "linear-gradient(135deg, rgba(30,142,62,0.05), rgba(15,82,186,0.03))",
                border: "1px solid rgba(30,142,62,0.2)",
                borderRadius: 12,
                padding: 28,
                marginBottom: 24,
              }}
            >
              <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
                🗺️ Andhra Pradesh Opportunities
              </h2>
              <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 16 }}>
                AP-specific companies, projects, and upcoming developments for this career path.
              </p>
              <div style={{ display: "grid", gap: 8 }}>
                {path.andhraOpportunities.map((o) => (
                  <div
                    key={o}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      background: "rgba(30,142,62,0.06)",
                      border: "1px solid rgba(30,142,62,0.12)",
                      borderRadius: 8,
                      padding: "10px 14px",
                    }}
                  >
                    <MapPin size={14} color="#1E8E3E" />
                    <span style={{ fontSize: 14, color: "var(--text)" }}>{o}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Opportunities */}
          <div className="card" style={{ padding: 28 }}>
            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
              🚀 Upcoming Opportunities
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {path.upcomingOpportunities.map((o) => (
                <div key={o} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <TrendingUp size={14} color="#FF8C00" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Scores */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Parameter Scores</h3>
            <ScoreItem label="Job Security" value={path.scores.jobSecurity} color="#1E8E3E" />
            <ScoreItem label="Future Scope" value={path.scores.futureScope} color="#0F52BA" />
            <ScoreItem label="AI Resistance" value={path.scores.aiResistance} color="#FF8C00" />
            <ScoreItem label="Entrepreneurship" value={path.scores.entrepreneurship} color="#9333ea" />
            <ScoreItem label="Research" value={path.scores.researchPotential} color="#ec4899" />
            <ScoreItem label="Work-Life Balance" value={path.scores.workLifeBalance} color="#f59e0b" />
            <ScoreItem label="Global Scope" value={path.scores.globalScope} color="#06b6d4" />
            <ScoreItem label="National Importance" value={path.scores.nationalImportance} color="#1E8E3E" />
          </div>

          {/* Key Exams */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>🎓 Key Exams</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {path.exams.map((e) => (
                <div
                  key={e}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    background: "var(--bg-card2)",
                    borderRadius: 6,
                    fontSize: 13,
                  }}
                >
                  <span>{e}</span>
                  <Link href={`/exams?q=${e}`} style={{ color: "#FF8C00", textDecoration: "none", fontSize: 11 }}>
                    Guide →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Top Colleges */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>🏛️ Top Colleges</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {path.topColleges.map((c) => (
                <div key={c} style={{ fontSize: 13, color: "var(--muted)", padding: "4px 0", borderBottom: "1px solid var(--border)" }}>
                  {c}
                </div>
              ))}
            </div>
            <Link href="/colleges" style={{ display: "block", marginTop: 12, fontSize: 12, color: "#0F52BA", textDecoration: "none" }}>
              Browse all colleges →
            </Link>
          </div>

          {/* Top Companies */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>🏢 Top Employers</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {path.topCompanies.map((c) => (
                <span key={c} style={{ fontSize: 11, color: "var(--muted)", background: "var(--bg-card2)", padding: "3px 8px", borderRadius: 8, border: "1px solid var(--border)" }}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Govt Opportunities */}
          {path.govtOpportunities.length > 0 && (
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>🏛️ Government Opportunities</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {path.govtOpportunities.map((g) => (
                  <div key={g} style={{ fontSize: 13, color: "#1E8E3E" }}>• {g}</div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Tags</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {path.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related paths */}
      {related.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            Related Career Paths in {path.universe}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {related.map((p) => (
              <Link key={p.id} href={`/path/${p.id}`} style={{ textDecoration: "none" }}>
                <div className="card card-hover" style={{ padding: 20 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#FF8C00", marginBottom: 8 }}>
                    Mid: {p.incomeRange.mid}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{p.description.slice(0, 80)}...</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
