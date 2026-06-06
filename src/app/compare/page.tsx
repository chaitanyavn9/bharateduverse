"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { careerPaths } from "@/data/careerPaths";
import { CareerPath } from "@/types";
import Link from "next/link";
import { Plus, X, ExternalLink, ArrowLeft } from "lucide-react";

const ALL_METRICS: { key: keyof CareerPath["scores"]; label: string; color: string }[] = [
  { key: "jobSecurity", label: "Job Security", color: "#1E8E3E" },
  { key: "futureScope", label: "Future Scope", color: "#0F52BA" },
  { key: "aiResistance", label: "AI Resistance", color: "#FF8C00" },
  { key: "entrepreneurship", label: "Entrepreneurship", color: "#9333ea" },
  { key: "researchPotential", label: "Research Potential", color: "#ec4899" },
  { key: "workLifeBalance", label: "Work-Life Balance", color: "#f59e0b" },
  { key: "globalScope", label: "Global Scope", color: "#06b6d4" },
  { key: "nationalImportance", label: "National Importance", color: "#1E8E3E" },
  { key: "difficultyLevel", label: "Difficulty", color: "#ef4444" },
  { key: "educationCost", label: "Education Cost", color: "#6b7280" },
];

function ScoreCell({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ padding: "12px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color, fontFamily: "var(--font-poppins)" }}>{value}</div>
        <div style={{ fontSize: 11, color: "var(--muted)" }}>/10</div>
      </div>
      <div className="score-bar">
        <div className="score-fill" style={{ width: `${value * 10}%`, background: color }} />
      </div>
    </div>
  );
}

function PathSelector({ onSelect, exclude }: { onSelect: (path: CareerPath) => void; exclude: string[] }) {
  const [q, setQ] = useState("");
  const filtered = careerPaths
    .filter((p) => !exclude.includes(p.id))
    .filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.universe.toLowerCase().includes(q.toLowerCase()));

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 20,
        maxHeight: 400,
        overflow: "auto",
      }}
    >
      <input
        type="text"
        placeholder="Search career path..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: 8,
          border: "1px solid var(--border)",
          background: "var(--bg)",
          color: "var(--text)",
          fontSize: 14,
          marginBottom: 12,
          outline: "none",
        }}
      />
      {filtered.slice(0, 10).map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "10px 12px",
            background: "none",
            border: "none",
            borderBottom: "1px solid var(--border)",
            cursor: "pointer",
            color: "var(--text)",
            textAlign: "left",
            borderRadius: 6,
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{p.universe} • {p.incomeRange.mid}</div>
          </div>
          <Plus size={14} color="#FF8C00" />
        </button>
      ))}
    </div>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();
  const initialIds = searchParams.get("paths")?.split(",").filter(Boolean) ?? [];

  const [paths, setPaths] = useState<CareerPath[]>(
    initialIds.map((id) => careerPaths.find((p) => p.id === id)).filter(Boolean) as CareerPath[]
  );
  const [showSelector, setShowSelector] = useState(paths.length === 0);

  function addPath(p: CareerPath) {
    if (paths.length < 3 && !paths.find((x) => x.id === p.id)) {
      setPaths([...paths, p]);
      setShowSelector(false);
    }
  }

  function removePath(id: string) {
    setPaths(paths.filter((p) => p.id !== id));
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <Link href="/discover" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted)", textDecoration: "none", fontSize: 14, marginBottom: 20 }}>
          <ArrowLeft size={16} /> Back to Discovery
        </Link>
        <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          Compare Career Paths
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 16 }}>
          Side-by-side comparison across income, job security, future scope, and 7 more parameters.
        </p>
      </div>

      {/* Path selector */}
      {showSelector && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            Add a career path to compare ({paths.length}/3)
          </h3>
          <PathSelector onSelect={addPath} exclude={paths.map((p) => p.id)} />
        </div>
      )}

      {paths.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚖️</div>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>No paths selected yet</h2>
          <p style={{ color: "var(--muted)" }}>Search and add career paths above to compare them side by side.</p>
        </div>
      ) : (
        <>
          {/* Column headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `200px repeat(${paths.length}, 1fr)${paths.length < 3 ? " auto" : ""}`,
              gap: 0,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "12px 12px 0 0",
              overflow: "hidden",
            }}
          >
            {/* Empty corner */}
            <div style={{ padding: "20px 16px", borderRight: "1px solid var(--border)" }}>
              <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>COMPARE</div>
              {paths.length < 3 && (
                <button
                  onClick={() => setShowSelector(!showSelector)}
                  style={{
                    marginTop: 8,
                    background: "rgba(255,140,0,0.1)",
                    border: "1px dashed #FF8C00",
                    borderRadius: 6,
                    color: "#FF8C00",
                    fontSize: 11,
                    cursor: "pointer",
                    padding: "4px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Plus size={12} /> Add
                </button>
              )}
            </div>

            {paths.map((path) => (
              <div
                key={path.id}
                style={{
                  padding: "20px 16px",
                  borderRight: "1px solid var(--border)",
                  position: "relative",
                }}
              >
                <button
                  onClick={() => removePath(path.id)}
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--muted)",
                  }}
                >
                  <X size={14} />
                </button>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{path.name}</div>
                <div style={{ fontSize: 11, color: "#FF8C00", marginBottom: 4 }}>{path.universe}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{path.duration}</div>
                <Link
                  href={`/path/${path.id}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "#0F52BA", textDecoration: "none", marginTop: 8 }}
                >
                  Full Roadmap <ExternalLink size={10} />
                </Link>
              </div>
            ))}
          </div>

          {/* Income rows */}
          <div
            style={{
              background: "rgba(30,142,62,0.04)",
              border: "1px solid var(--border)",
              borderTop: "none",
            }}
          >
            {/* Income header */}
            {[
              { label: "Entry Income", key: "entry" as const },
              { label: "Mid-Career Income", key: "mid" as const },
              { label: "Senior Income", key: "senior" as const },
            ].map(({ label, key }) => (
              <div
                key={key}
                style={{
                  display: "grid",
                  gridTemplateColumns: `200px repeat(${paths.length}, 1fr)`,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div style={{ padding: "12px 16px", borderRight: "1px solid var(--border)", display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>{label}</span>
                </div>
                {paths.map((p) => (
                  <div key={p.id} style={{ padding: "12px 16px", borderRight: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#1E8E3E" }}>
                      {p.incomeRange[key]}
                    </span>
                  </div>
                ))}
              </div>
            ))}

            {/* Time to earn */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `200px repeat(${paths.length}, 1fr)`,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div style={{ padding: "12px 16px", borderRight: "1px solid var(--border)", display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>Years to First Job</span>
              </div>
              {paths.map((p) => (
                <div key={p.id} style={{ padding: "12px 16px", borderRight: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#0F52BA" }}>
                    ~{p.timeToEarnYears} years
                  </span>
                </div>
              ))}
            </div>

            {/* Key exams */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `200px repeat(${paths.length}, 1fr)`,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div style={{ padding: "12px 16px", borderRight: "1px solid var(--border)", display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>Key Exams</span>
              </div>
              {paths.map((p) => (
                <div key={p.id} style={{ padding: "12px 16px", borderRight: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {p.keyExams.map((e) => (
                      <span key={e} className="tag" style={{ fontSize: 10 }}>{e}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Score rows */}
          {ALL_METRICS.map((metric) => {
            const values = paths.map((p) => p.scores[metric.key]);
            const max = Math.max(...values);

            return (
              <div
                key={metric.key}
                style={{
                  display: "grid",
                  gridTemplateColumns: `200px repeat(${paths.length}, 1fr)`,
                  border: "1px solid var(--border)",
                  borderTop: "none",
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    borderRight: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>{metric.label}</span>
                </div>
                {paths.map((p) => {
                  const v = p.scores[metric.key];
                  const isMax = v === max && values.filter((x) => x === max).length === 1;
                  return (
                    <div
                      key={p.id}
                      style={{
                        borderRight: "1px solid var(--border)",
                        background: isMax ? `${metric.color}08` : "transparent",
                      }}
                    >
                      <ScoreCell value={v} color={metric.color} />
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Footer row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `200px repeat(${paths.length}, 1fr)`,
              border: "1px solid var(--border)",
              borderTop: "none",
              borderRadius: "0 0 12px 12px",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "16px", borderRight: "1px solid var(--border)" }} />
            {paths.map((p) => (
              <div key={p.id} style={{ padding: "16px", borderRight: "1px solid var(--border)" }}>
                <Link
                  href={`/path/${p.id}`}
                  className="btn-primary"
                  style={{ textDecoration: "none", fontSize: 13, width: "100%", justifyContent: "center" }}
                >
                  Full Roadmap
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center", color: "var(--muted)" }}>Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}
