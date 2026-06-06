"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronRight, ChevronLeft, Compass, CheckCircle2 } from "lucide-react";
import { DiscoveryAnswer, GoalType, ScoredPath } from "@/types";
import { recommend } from "@/lib/recommendationEngine";
import ResultsView from "@/components/discovery/ResultsView";

const STAGES = ["After 10th", "After 12th", "After Graduation", "After PG"];
const INTERESTS = [
  "Technology", "Medicine", "Space", "Environment", "Finance",
  "Design", "Defence", "Government", "Agriculture", "Research",
  "Engineering", "Business", "Food", "Ocean", "Law",
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
        padding: "12px 20px",
        borderRadius: 10,
        border: `2px solid ${selected ? color : "var(--border)"}`,
        background: selected ? `${color}18` : "var(--bg-card)",
        color: selected ? color : "var(--text)",
        cursor: "pointer",
        fontSize: 14,
        fontWeight: selected ? 600 : 400,
        transition: "all 0.15s",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {selected && <CheckCircle2 size={16} color={color} />}
      {label}
    </button>
  );
}

function DiscoverContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") ?? "";
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<DiscoveryAnswer>(defaultAnswers);
  const [results, setResults] = useState<ScoredPath[]>([]);

  const currentStep = STEPS[step];

  function next() {
    if (step === STEPS.length - 2) {
      const scored = recommend(answers);
      setResults(scored);
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function toggleInterest(interest: string) {
    setAnswers((a) => ({
      ...a,
      interests: a.interests.includes(interest.toLowerCase())
        ? a.interests.filter((i) => i !== interest.toLowerCase())
        : [...a.interests, interest.toLowerCase()],
    }));
  }

  const stepsTotal = STEPS.length - 1; // exclude results

  if (currentStep === "results") {
    return <ResultsView results={results} answers={answers} onBack={() => setStep(step - 1)} />;
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 20px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12, color: "#FF8C00" }}>
          <Compass size={20} />
          <span style={{ fontWeight: 600 }}>Career Discovery</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Find Your Perfect Career Path
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 15 }}>
          Answer a few questions. We&apos;ll match every career path in India to your profile.
        </p>
      </div>

      <ProgressBar current={step} total={stepsTotal} />

      {/* Step: Current Stage */}
      {currentStep === "stage" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Where are you right now?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
            This helps us show paths available to you.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {STAGES.map((s) => (
              <OptionButton
                key={s}
                label={s}
                selected={answers.currentStage === s}
                onClick={() => setAnswers((a) => ({ ...a, currentStage: s }))}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step: Interests */}
      {currentStep === "interests" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>What are you interested in?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
            Pick all that apply. You can be interested in multiple areas.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {INTERESTS.map((interest) => (
              <OptionButton
                key={interest}
                label={interest}
                selected={answers.interests.includes(interest.toLowerCase())}
                onClick={() => toggleInterest(interest)}
              />
            ))}
          </div>
          {answers.interests.length === 0 && (
            <p style={{ color: "#FF8C00", fontSize: 12, marginTop: 8 }}>Select at least one interest</p>
          )}
        </div>
      )}

      {/* Step: Goal Type */}
      {currentStep === "goalType" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>What is your main goal?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
            This shapes the entire roadmap we suggest.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {([
              { v: "Job", label: "🎯  Get a good job", desc: "Stable employment at a company or government" },
              { v: "Entrepreneur", label: "🚀  Build a company", desc: "Start your own business or startup" },
              { v: "Research", label: "🔬  Do deep research", desc: "PhD, scientific publication, lab work" },
              { v: "Government Service", label: "🏛️  Serve the nation", desc: "IAS, IPS, Defence, SSC, PSU" },
            ] as { v: GoalType; label: string; desc: string }[]).map(({ v, label, desc }) => (
              <button
                key={v}
                onClick={() => setAnswers((a) => ({ ...a, goalType: v }))}
                style={{
                  padding: "16px 20px",
                  borderRadius: 10,
                  border: `2px solid ${answers.goalType === v ? "#FF8C00" : "var(--border)"}`,
                  background: answers.goalType === v ? "rgba(255,140,0,0.08)" : "var(--bg-card)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 15, color: answers.goalType === v ? "#FF8C00" : "var(--text)", marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Sector */}
      {currentStep === "sector" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Government or Private sector?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
            Different sectors offer different lifestyles, salaries, and security.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { v: "Government", label: "🏛️ Government", desc: "Job security, pension, lower pay initially" },
              { v: "Private", label: "🏢 Private", desc: "Higher pay potential, less job security" },
              { v: "Both", label: "🤝 Open to Both", desc: "I want to explore all options" },
            ].map(({ v, label, desc }) => (
              <button
                key={v}
                onClick={() => setAnswers((a) => ({ ...a, sector: v as DiscoveryAnswer["sector"] }))}
                style={{
                  padding: "16px 20px",
                  borderRadius: 10,
                  border: `2px solid ${answers.sector === v ? "#1E8E3E" : "var(--border)"}`,
                  background: answers.sector === v ? "rgba(30,142,62,0.08)" : "var(--bg-card)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 15, color: answers.sector === v ? "#1E8E3E" : "var(--text)", marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Budget */}
      {currentStep === "budget" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>What is your education budget?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
            This helps us filter affordable paths and highlight scholarship options.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { v: "Low", label: "💚 Low — Under ₹2L/year", desc: "Government colleges, ITI, scholarships only" },
              { v: "Medium", label: "🟡 Medium — ₹2L–₹8L/year", desc: "State private colleges, NIT, Polytechnic" },
              { v: "High", label: "🔵 High — Above ₹8L/year", desc: "IITs, premium private colleges, abroad" },
            ].map(({ v, label, desc }) => (
              <button
                key={v}
                onClick={() => setAnswers((a) => ({ ...a, budget: v as DiscoveryAnswer["budget"] }))}
                style={{
                  padding: "16px 20px",
                  borderRadius: 10,
                  border: `2px solid ${answers.budget === v ? "#0F52BA" : "var(--border)"}`,
                  background: answers.budget === v ? "rgba(15,82,186,0.08)" : "var(--bg-card)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 15, color: answers.budget === v ? "#0F52BA" : "var(--text)", marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Stability */}
      {currentStep === "stability" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>How important is job stability to you?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
            Be honest — both paths are valid.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { v: "High", label: "🛡️ High Stability", desc: "I want guaranteed income. No risk please." },
              { v: "Medium", label: "⚖️ Balanced", desc: "Some risk is fine if rewards are good." },
              { v: "Risk Taker", label: "🚀 Risk Taker", desc: "I want to bet on myself. High risk, high reward." },
            ].map(({ v, label, desc }) => (
              <button
                key={v}
                onClick={() => setAnswers((a) => ({ ...a, stability: v as DiscoveryAnswer["stability"] }))}
                style={{
                  padding: "16px 20px",
                  borderRadius: 10,
                  border: `2px solid ${answers.stability === v ? "#FF8C00" : "var(--border)"}`,
                  background: answers.stability === v ? "rgba(255,140,0,0.08)" : "var(--bg-card)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 15, color: answers.stability === v ? "#FF8C00" : "var(--text)", marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Income */}
      {currentStep === "income" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>What income do you expect in 5–8 years?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
            This is about what you&apos;re aiming for, not what you think is possible right now.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { v: "Low", label: "₹3L–₹8L / year", desc: "Stable government job income" },
              { v: "Medium", label: "₹8L–₹25L / year", desc: "Good corporate or professional income" },
              { v: "High", label: "₹25L+ / year", desc: "IIT-level, CA, Doctor, or startup founder" },
            ].map(({ v, label, desc }) => (
              <button
                key={v}
                onClick={() => setAnswers((a) => ({ ...a, incomeExpectation: v as DiscoveryAnswer["incomeExpectation"] }))}
                style={{
                  padding: "16px 20px",
                  borderRadius: 10,
                  border: `2px solid ${answers.incomeExpectation === v ? "#1E8E3E" : "var(--border)"}`,
                  background: answers.incomeExpectation === v ? "rgba(30,142,62,0.08)" : "var(--bg-card)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 16, color: answers.incomeExpectation === v ? "#1E8E3E" : "var(--text)", marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Research */}
      {currentStep === "research" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Are you interested in research?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
            Research paths include PhD, CSIR, ISRO, incubation centres — even entrepreneurial research.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { v: true, label: "✅ Yes, I love research", desc: "I want to discover, experiment, publish." },
              { v: false, label: "❌ No, I prefer application", desc: "I want to apply knowledge, not create new theory." },
            ].map(({ v, label, desc }) => (
              <button
                key={String(v)}
                onClick={() => setAnswers((a) => ({ ...a, researchInterest: v }))}
                style={{
                  padding: "16px 20px",
                  borderRadius: 10,
                  border: `2px solid ${answers.researchInterest === v ? "#FF8C00" : "var(--border)"}`,
                  background: answers.researchInterest === v ? "rgba(255,140,0,0.08)" : "var(--bg-card)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 15, color: answers.researchInterest === v ? "#FF8C00" : "var(--text)", marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Location */}
      {currentStep === "location" && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Where do you want to work?</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
            Helps us highlight local vs national vs global opportunities.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { v: "Local", label: "🏠 My State / District", desc: "Stay close to family and home" },
              { v: "State", label: "🗺️ Andhra Pradesh / Telangana", desc: "Open to moving within my state" },
              { v: "India", label: "🇮🇳 Anywhere in India", desc: "Ready to relocate for the right opportunity" },
              { v: "Global", label: "🌐 Open to Global", desc: "Want to work abroad or in global companies" },
            ].map(({ v, label, desc }) => (
              <button
                key={v}
                onClick={() => setAnswers((a) => ({ ...a, location: v as DiscoveryAnswer["location"] }))}
                style={{
                  padding: "16px 20px",
                  borderRadius: 10,
                  border: `2px solid ${answers.location === v ? "#0F52BA" : "var(--border)"}`,
                  background: answers.location === v ? "rgba(15,82,186,0.08)" : "var(--bg-card)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 15, color: answers.location === v ? "#0F52BA" : "var(--text)", marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
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

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center", color: "var(--muted)" }}>Loading...</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
