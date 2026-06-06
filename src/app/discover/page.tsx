"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronRight, ChevronLeft, Compass, CheckCircle2, LayoutGrid, List } from "lucide-react";
import { DiscoveryAnswer, GoalType, ScoredPath } from "@/types";
import { recommend } from "@/lib/recommendationEngine";
import { careerPaths } from "@/data/careerPaths";
import ResultsView from "@/components/discovery/ResultsView";
import Link from "next/link";

const STAGES = ["After 10th", "After 12th", "After Graduation", "After PG"];
const INTERESTS = [
  "Technology", "Medicine", "Space", "Environment", "Finance",
  "Design", "Defence", "Government", "Agriculture", "Research",
  "Engineering", "Business", "Food", "Ocean", "Law",
  "Media", "Language", "Policy", "Mapping", "Chips",
  "Skilled", "Logistics", "Aviation",
];

const STEPS = [
  "stage", "interests", "goalType", "sector", "budget",
  "stability", "income", "research", "location", "results",
] as const;
type Step = typeof STEPS[number];

const defaultAnswers: DiscoveryAnswer = {
  currentStage: "After 10th",
  interests: [],
  goalType: "Job",
  sector: "Both",
  budget: "Medium",
  location: "India",
  incomeExpectation: "Medium",
  stability: "High",
  researchInterest: false,
  difficultyTolerance: "Medium",
  riskAppetite: "Medium",
  workStyle: "Mixed",
};

// ── UNIVERSE CONFIG ────────────────────────────────────────────────────────────
const UNIVERSE_META: Record<string, { icon: string; color: string }> = {
  Engineering:    { icon: "⚙️",  color: "#FF8C00" },
  Medical:        { icon: "🏥",  color: "#ef4444" },
  Professional:   { icon: "📐",  color: "#0F52BA" },
  Government:     { icon: "🏛️", color: "#1E8E3E" },
  Defence:        { icon: "🛡️", color: "#9333ea" },
  Research:       { icon: "🔬",  color: "#ec4899" },
  Sustainability: { icon: "🌿",  color: "#1E8E3E" },
  Design:         { icon: "🎨",  color: "#f59e0b" },
  Finance:        { icon: "💹",  color: "#06b6d4" },
  Agriculture:    { icon: "🌾",  color: "#84cc16" },
  Food:           { icon: "🍱",  color: "#f97316" },
  Emerging:       { icon: "⚛️", color: "#a855f7" },
  Education:      { icon: "📰",  color: "#0ea5e9" },
  Vocational:     { icon: "🔧",  color: "#78716c" },
};

// ── BROWSE ALL PATHS ───────────────────────────────────────────────────────────
function BrowseAllPaths({ filterUniverse }: { filterUniverse?: string }) {
  const [search, setSearch] = useState("");
  const [activeUniverse, setActiveUniverse] = useState(filterUniverse ?? "All");

  const universes = ["All", ...Array.from(new Set(careerPaths.map((p) => p.universe)))];

  const filtered = careerPaths.filter((p) => {
    const matchUniverse = activeUniverse === "All" || p.universe === activeUniverse;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      p.universe.toLowerCase().includes(search.toLowerCase());
    return matchUniverse && matchSearch;
  });

  // Group by universe
  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, p) => {
    if (!acc[p.universe]) acc[p.universe] = [];
    acc[p.universe].push(p);
    return acc;
  }, {});

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px 60px" }}>
      {/* Search */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search careers, skills, tags... (e.g. Pilot, VLSI, GIS, Journalism)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 20px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--card)",
            color: "var(--text)",
            fontSize: 15,
            outline: "none",
          }}
        />
      </div>

      {/* Universe filter tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {universes.map((u) => {
          const meta = UNIVERSE_META[u] ?? { icon: "🌐", color: "#FF8C00" };
          const active = activeUniverse === u;
          return (
            <button
              key={u}
              onClick={() => setActiveUniverse(u)}
              style={{
                padding: "7px 16px",
                borderRadius: 20,
                border: `1px solid ${active ? meta.color : "var(--border)"}`,
                background: active ? `${meta.color}18` : "var(--card)",
                color: active ? meta.color : "var(--muted)",
                fontSize: 13,
                fontWeight: active ? 700 : 400,
                cursor: "pointer",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {u !== "All" && <span>{meta.icon}</span>}
              {u}
              <span style={{ fontSize: 11, opacity: 0.7 }}>
                ({u === "All" ? careerPaths.length : careerPaths.filter((p) => p.universe === u).length})
              </span>
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24 }}>
        Showing <strong style={{ color: "var(--text)" }}>{filtered.length}</strong> career paths
        {search && <> matching "<strong style={{ color: "#FF8C00" }}>{search}</strong>"</>}
      </div>

      {/* Grouped path cards */}
      {Object.entries(grouped).map(([universe, paths]) => {
        const meta = UNIVERSE_META[universe] ?? { icon: "🌐", color: "#FF8C00" };
        return (
          <div key={universe} style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 22 }}>{meta.icon}</span>
              <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: 18, fontWeight: 700 }}>{universe}</h2>
              <span style={{ fontSize: 12, color: "var(--muted)", background: "var(--card)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: 10 }}>
                {paths.length} paths
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {paths.map((p) => (
                <Link key={p.id} href={`/path/${p.id}`} style={{ textDecoration: "none" }}>
                  <div
                    className="card card-hover"
                    style={{ padding: 20, cursor: "pointer", borderLeft: `3px solid ${meta.color}` }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <h3 style={{ fontWeight: 700, fontSize: 14, color: "var(--text)", lineHeight: 1.3, flex: 1 }}>
                        {p.name}
                      </h3>
                      <ChevronRight size={14} color="var(--muted)" style={{ flexShrink: 0, marginTop: 2 }} />
                    </div>
                    <div style={{ fontSize: 12, color: meta.color, fontWeight: 600, marginBottom: 6 }}>
                      {p.incomeRange.mid} mid-career
                    </div>
                    <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5, marginBottom: 10 }}>
                      {p.description.slice(0, 90)}...
                    </p>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {p.entryPoints.map((e) => (
                        <span key={e} style={{ fontSize: 10, color: "#1E8E3E", background: "rgba(30,142,62,0.1)", border: "1px solid rgba(30,142,62,0.2)", padding: "1px 7px", borderRadius: 8 }}>
                          {e}
                        </span>
                      ))}
                      {p.keyExams.slice(0, 2).map((ex) => (
                        <span key={ex} style={{ fontSize: 10, color: "var(--muted)", background: "var(--bg-card2)", border: "1px solid var(--border)", padding: "1px 7px", borderRadius: 8 }}>
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <p style={{ color: "var(--muted)" }}>No paths found for "<strong>{search}</strong>". Try a different keyword.</p>
        </div>
      )}
    </div>
  );
}

// ── QUESTIONNAIRE ──────────────────────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>Step {current + 1} of {total}</span>
        <span style={{ fontSize: 13, color: "#FF8C00", fontWeight: 600 }}>{Math.round(pct)}% done</span>
      </div>
      <div className="score-bar">
        <div className="score-fill" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #FF8C00, #FFB347)" }} />
      </div>
    </div>
  );
}

function OptionButton({ label, selected, onClick, color = "#FF8C00" }: {
  label: string; selected: boolean; onClick: () => void; color?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 20px", borderRadius: 10,
        border: `2px solid ${selected ? color : "var(--border)"}`,
        background: selected ? `${color}18` : "var(--card)",
        color: selected ? color : "var(--text)",
        cursor: "pointer", fontSize: 14, fontWeight: selected ? 600 : 400,
        transition: "all 0.15s", textAlign: "left",
        display: "flex", alignItems: "center", gap: 8,
      }}
    >
      {selected && <CheckCircle2 size={16} color={color} />}
      {label}
    </button>
  );
}

function Questionnaire() {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<DiscoveryAnswer>(defaultAnswers);
  const [results, setResults] = useState<ScoredPath[]>([]);

  const currentStep = STEPS[step];
  const stepsTotal = STEPS.length - 1;

  function next() {
    if (step === STEPS.length - 2) {
      setResults(recommend(answers));
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() { setStep((s) => Math.max(s - 1, 0)); }

  function toggleInterest(interest: string) {
    setAnswers((a) => ({
      ...a,
      interests: a.interests.includes(interest.toLowerCase())
        ? a.interests.filter((i) => i !== interest.toLowerCase())
        : [...a.interests, interest.toLowerCase()],
    }));
  }

  if (currentStep === "results") {
    return <ResultsView results={results} answers={answers} onBack={() => setStep(step - 1)} />;
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px 60px" }}>
      <ProgressBar current={step} total={stepsTotal} />

      {currentStep === "stage" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Where are you right now?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>This helps us show paths available to you.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {STAGES.map((s) => (
              <OptionButton key={s} label={s} selected={answers.currentStage === s} onClick={() => setAnswers((a) => ({ ...a, currentStage: s }))} />
            ))}
          </div>
        </div>
      )}

      {currentStep === "interests" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>What are you interested in?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>Pick all that apply.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {INTERESTS.map((interest) => (
              <OptionButton key={interest} label={interest} selected={answers.interests.includes(interest.toLowerCase())} onClick={() => toggleInterest(interest)} />
            ))}
          </div>
          {answers.interests.length === 0 && <p style={{ color: "#FF8C00", fontSize: 12, marginTop: 8 }}>Select at least one interest</p>}
        </div>
      )}

      {currentStep === "goalType" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>What is your main goal?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>This shapes the entire roadmap we suggest.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {([
              { v: "Job", label: "🎯  Get a good job", desc: "Stable employment at a company or government" },
              { v: "Entrepreneur", label: "🚀  Build a company", desc: "Start your own business or startup" },
              { v: "Research", label: "🔬  Do deep research", desc: "PhD, scientific publication, lab work" },
              { v: "Government Service", label: "🏛️  Serve the nation", desc: "IAS, IPS, Defence, SSC, PSU" },
            ] as { v: GoalType; label: string; desc: string }[]).map(({ v, label, desc }) => (
              <button key={v} onClick={() => setAnswers((a) => ({ ...a, goalType: v }))}
                style={{ padding: "16px 20px", borderRadius: 10, border: `2px solid ${answers.goalType === v ? "#FF8C00" : "var(--border)"}`, background: answers.goalType === v ? "rgba(255,140,0,0.08)" : "var(--card)", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: answers.goalType === v ? "#FF8C00" : "var(--text)", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "sector" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Government or Private sector?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>Different sectors offer different lifestyles and salaries.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { v: "Government", label: "🏛️ Government", desc: "Job security, pension, lower pay initially" },
              { v: "Private", label: "🏢 Private", desc: "Higher pay potential, less job security" },
              { v: "Both", label: "🤝 Open to Both", desc: "I want to explore all options" },
            ].map(({ v, label, desc }) => (
              <button key={v} onClick={() => setAnswers((a) => ({ ...a, sector: v as DiscoveryAnswer["sector"] }))}
                style={{ padding: "16px 20px", borderRadius: 10, border: `2px solid ${answers.sector === v ? "#1E8E3E" : "var(--border)"}`, background: answers.sector === v ? "rgba(30,142,62,0.08)" : "var(--card)", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: answers.sector === v ? "#1E8E3E" : "var(--text)", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "budget" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>What is your education budget?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>Helps us filter affordable paths and highlight scholarships.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { v: "Low", label: "💚 Low — Under ₹2L/year", desc: "Government colleges, ITI, scholarships only" },
              { v: "Medium", label: "🟡 Medium — ₹2L–₹8L/year", desc: "State private colleges, NIT, Polytechnic" },
              { v: "High", label: "🔵 High — Above ₹8L/year", desc: "IITs, premium private colleges, abroad" },
            ].map(({ v, label, desc }) => (
              <button key={v} onClick={() => setAnswers((a) => ({ ...a, budget: v as DiscoveryAnswer["budget"] }))}
                style={{ padding: "16px 20px", borderRadius: 10, border: `2px solid ${answers.budget === v ? "#0F52BA" : "var(--border)"}`, background: answers.budget === v ? "rgba(15,82,186,0.08)" : "var(--card)", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: answers.budget === v ? "#0F52BA" : "var(--text)", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "stability" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>How important is job stability?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>Be honest — both paths are valid.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { v: "High", label: "🛡️ High Stability", desc: "I want guaranteed income. No risk please." },
              { v: "Medium", label: "⚖️ Balanced", desc: "Some risk is fine if rewards are good." },
              { v: "Risk Taker", label: "🚀 Risk Taker", desc: "I want to bet on myself. High risk, high reward." },
            ].map(({ v, label, desc }) => (
              <button key={v} onClick={() => setAnswers((a) => ({ ...a, stability: v as DiscoveryAnswer["stability"] }))}
                style={{ padding: "16px 20px", borderRadius: 10, border: `2px solid ${answers.stability === v ? "#FF8C00" : "var(--border)"}`, background: answers.stability === v ? "rgba(255,140,0,0.08)" : "var(--card)", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: answers.stability === v ? "#FF8C00" : "var(--text)", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "income" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>What income do you expect in 5–8 years?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>What you're aiming for, not what seems possible right now.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { v: "Low", label: "₹3L–₹8L / year", desc: "Stable government job income" },
              { v: "Medium", label: "₹8L–₹25L / year", desc: "Good corporate or professional income" },
              { v: "High", label: "₹25L+ / year", desc: "IIT-level, CA, Doctor, or startup founder" },
            ].map(({ v, label, desc }) => (
              <button key={v} onClick={() => setAnswers((a) => ({ ...a, incomeExpectation: v as DiscoveryAnswer["incomeExpectation"] }))}
                style={{ padding: "16px 20px", borderRadius: 10, border: `2px solid ${answers.incomeExpectation === v ? "#1E8E3E" : "var(--border)"}`, background: answers.incomeExpectation === v ? "rgba(30,142,62,0.08)" : "var(--card)", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                <div style={{ fontWeight: 600, fontSize: 16, color: answers.incomeExpectation === v ? "#1E8E3E" : "var(--text)", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "research" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Are you interested in research?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>Research paths include PhD, CSIR, ISRO, incubation centres.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { v: true, label: "✅ Yes, I love research", desc: "I want to discover, experiment, publish." },
              { v: false, label: "❌ No, I prefer application", desc: "I want to apply knowledge, not create new theory." },
            ].map(({ v, label, desc }) => (
              <button key={String(v)} onClick={() => setAnswers((a) => ({ ...a, researchInterest: v }))}
                style={{ padding: "16px 20px", borderRadius: 10, border: `2px solid ${answers.researchInterest === v ? "#FF8C00" : "var(--border)"}`, background: answers.researchInterest === v ? "rgba(255,140,0,0.08)" : "var(--card)", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: answers.researchInterest === v ? "#FF8C00" : "var(--text)", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === "location" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Where do you want to work?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>Helps us highlight local vs national vs global opportunities.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { v: "Local", label: "🏠 My State / District", desc: "Stay close to family and home" },
              { v: "State", label: "🗺️ Andhra Pradesh / Telangana", desc: "Open to moving within my state" },
              { v: "India", label: "🇮🇳 Anywhere in India", desc: "Ready to relocate for the right opportunity" },
              { v: "Global", label: "🌐 Open to Global", desc: "Want to work abroad or in global companies" },
            ].map(({ v, label, desc }) => (
              <button key={v} onClick={() => setAnswers((a) => ({ ...a, location: v as DiscoveryAnswer["location"] }))}
                style={{ padding: "16px 20px", borderRadius: 10, border: `2px solid ${answers.location === v ? "#0F52BA" : "var(--border)"}`, background: answers.location === v ? "rgba(15,82,186,0.08)" : "var(--card)", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: answers.location === v ? "#0F52BA" : "var(--text)", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, gap: 12 }}>
        {step > 0 && (
          <button onClick={back} className="btn-secondary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <ChevronLeft size={16} /> Back
          </button>
        )}
        <button
          onClick={next}
          className="btn-primary"
          style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}
          disabled={currentStep === "interests" && answers.interests.length === 0}
        >
          {step === stepsTotal - 1 ? "Show My Results" : "Next"}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────────
function DiscoverContent() {
  const searchParams = useSearchParams();
  const initialUniverse = searchParams.get("universe") ?? undefined;
  const [tab, setTab] = useState<"browse" | "guided">(initialUniverse ? "browse" : "guided");

  return (
    <div>
      {/* Header */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, color: "#FF8C00" }}>
          <Compass size={20} />
          <span style={{ fontWeight: 600, fontSize: 16 }}>Career Discovery</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, marginBottom: 8 }}>
          Find Your Perfect Career Path
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 28 }}>
          Browse all {careerPaths.length} career paths, or let us guide you with a quick questionnaire.
        </p>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)", marginBottom: 36 }}>
          <button
            onClick={() => setTab("browse")}
            style={{
              padding: "12px 24px", background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: tab === "browse" ? 700 : 400,
              color: tab === "browse" ? "#FF8C00" : "var(--muted)",
              borderBottom: tab === "browse" ? "2px solid #FF8C00" : "2px solid transparent",
              display: "flex", alignItems: "center", gap: 7, transition: "all 0.15s",
            }}
          >
            <LayoutGrid size={15} /> Browse All {careerPaths.length} Paths
          </button>
          <button
            onClick={() => setTab("guided")}
            style={{
              padding: "12px 24px", background: "none", border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: tab === "guided" ? 700 : 400,
              color: tab === "guided" ? "#FF8C00" : "var(--muted)",
              borderBottom: tab === "guided" ? "2px solid #FF8C00" : "2px solid transparent",
              display: "flex", alignItems: "center", gap: 7, transition: "all 0.15s",
            }}
          >
            <Compass size={15} /> Guided Discovery (9 Questions)
          </button>
        </div>
      </div>

      {tab === "browse" ? (
        <BrowseAllPaths filterUniverse={initialUniverse} />
      ) : (
        <Questionnaire />
      )}
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center", color: "var(--muted)" }}>Loading...</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
