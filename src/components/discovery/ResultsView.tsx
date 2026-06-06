"use client";
import { useState } from "react";
import Link from "next/link";
import { ScoredPath, DiscoveryAnswer, CareerPath } from "@/types";
import {
  ArrowLeft, ExternalLink, Star, TrendingUp, Shield,
  Zap, Globe, FlaskConical, Sprout, ChevronDown, ChevronUp,
  IndianRupee, Clock, Scale
} from "lucide-react";

function ScoreBar({ label, value, color = "#FF8C00" }: { label: string; value: number; color?: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color }}>{value}/10</span>
      </div>
      <div className="score-bar">
        <div className="score-fill" style={{ width: `${value * 10}%`, background: color }} />
      </div>
    </div>
  );
}

function PathCard({ sp, rank, onSelect, selected }: {
  sp: ScoredPath; rank: number; onSelect: () => void; selected: boolean;
}) {
  const { path, score, matchReasons } = sp;
  const [expanded, setExpanded] = useState(false);

  const matchColor = score >= 75 ? "#1E8E3E" : score >= 55 ? "#FF8C00" : "#94a3b8";
  const matchLabel = score >= 75 ? "Strong Match" : score >= 55 ? "Good Match" : "Possible Match";

  return (
    <div
      className="card"
      style={{
        marginBottom: 16,
        border: `2px solid ${selected ? "#FF8C00" : "var(--border)"}`,
        transition: "border-color 0.2s",
      }}
    >
      {/* Card Header */}
      <div style={{ padding: "20px 24px 16px", display: "flex", gap: 16, alignItems: "flex-start" }}>
        {/* Rank badge */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: rank <= 3 ? "linear-gradient(135deg, #FF8C00, #e07b00)" : "var(--bg-card2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            color: rank <= 3 ? "white" : "var(--muted)",
            flexShrink: 0,
          }}
        >
          #{rank}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <h3 style={{ fontWeight: 700, fontSize: 17, color: "var(--text)" }}>{path.name}</h3>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: matchColor,
                background: `${matchColor}18`,
                border: `1px solid ${matchColor}30`,
                borderRadius: 12,
                padding: "2px 8px",
              }}
            >
              {matchLabel}
            </span>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>
              <span style={{ color: "#1E8E3E" }}>Mid Income:</span> {path.incomeRange.mid}
            </span>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>
              <span style={{ color: "#0F52BA" }}>Duration:</span> {path.duration}
            </span>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>
              <span style={{ color: "#FF8C00" }}>Universe:</span> {path.universe}
            </span>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{path.description}</p>
        </div>

        {/* Match score */}
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: matchColor,
              fontFamily: "var(--font-poppins)",
              lineHeight: 1,
            }}
          >
            {score}
          </div>
          <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>match</div>
        </div>
      </div>

      {/* Match reasons */}
      <div style={{ padding: "0 24px 12px" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {matchReasons.slice(0, 2).map((r, i) => (
            <span key={i} className="tag" style={{ fontSize: 11 }}>✓ {r}</span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div style={{ padding: "0 24px 16px", display: "flex", gap: 6, flexWrap: "wrap" }}>
        {path.tags.slice(0, 4).map((t) => (
          <span key={t} style={{ fontSize: 11, color: "var(--muted)", background: "var(--bg-card2)", padding: "2px 8px", borderRadius: 10, border: "1px solid var(--border)" }}>
            {t}
          </span>
        ))}
      </div>

      {/* Expand / Actions */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "12px 24px",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "none",
            border: "none",
            color: "var(--muted)",
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: 0,
          }}
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? "Show less" : "Full details"}
        </button>
        <button
          onClick={onSelect}
          style={{
            marginLeft: "auto",
            background: "none",
            border: `1px solid ${selected ? "#FF8C00" : "var(--border)"}`,
            color: selected ? "#FF8C00" : "var(--muted)",
            borderRadius: 6,
            padding: "6px 14px",
            fontSize: 12,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          {selected ? "✓ Selected for Compare" : "Add to Compare"}
        </button>
        <Link
          href={`/path/${path.id}`}
          className="btn-primary"
          style={{ textDecoration: "none", fontSize: 12, padding: "7px 14px" }}
        >
          Full Roadmap <ExternalLink size={12} />
        </Link>
      </div>

      {/* Expanded Detail */}
      {expanded && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Scores */}
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: "#FF8C00" }}>Scores</h4>
              <ScoreBar label="Job Security" value={path.scores.jobSecurity} color="#1E8E3E" />
              <ScoreBar label="Future Scope" value={path.scores.futureScope} color="#0F52BA" />
              <ScoreBar label="AI Resistance" value={path.scores.aiResistance} color="#FF8C00" />
              <ScoreBar label="Entrepreneurship" value={path.scores.entrepreneurship} color="#9333ea" />
              <ScoreBar label="Research" value={path.scores.researchPotential} color="#ec4899" />
              <ScoreBar label="Work-Life Balance" value={path.scores.workLifeBalance} color="#f59e0b" />
            </div>

            {/* Key Info */}
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: "#1E8E3E" }}>Opportunities</h4>
              {path.andhraOpportunities.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", marginBottom: 6 }}>ANDHRA PRADESH</div>
                  {path.andhraOpportunities.slice(0, 3).map((o) => (
                    <div key={o} style={{ fontSize: 12, color: "#34d058", marginBottom: 4 }}>• {o}</div>
                  ))}
                </div>
              )}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", marginBottom: 6 }}>UPCOMING</div>
                {path.upcomingOpportunities.slice(0, 3).map((o) => (
                  <div key={o} style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>• {o}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", marginBottom: 6 }}>KEY EXAMS</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {path.keyExams.map((e) => (
                    <span key={e} className="tag" style={{ fontSize: 11 }}>{e}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <div style={{ marginTop: 20 }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: "#0F52BA" }}>Your Roadmap</h4>
            <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
              {path.roadmap.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  <div
                    style={{
                      background: "var(--bg-card2)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      padding: "8px 12px",
                      fontSize: 12,
                    }}
                  >
                    <div style={{ fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{r.stage}</div>
                    <div style={{ color: "var(--muted)", fontSize: 11 }}>{r.duration}</div>
                  </div>
                  {i < path.roadmap.length - 1 && (
                    <div style={{ color: "var(--muted)", fontSize: 16, padding: "0 4px" }}>→</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Goal path */}
          {path.goalPaths && (
            <div style={{ marginTop: 16, background: "rgba(255,140,0,0.05)", border: "1px solid rgba(255,140,0,0.15)", borderRadius: 8, padding: "12px 16px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#FF8C00", marginBottom: 4 }}>YOUR GOAL PATH</div>
              <div style={{ fontSize: 13, color: "var(--text)" }}>
                {Object.entries(path.goalPaths).map(([type, roadmap]) => (
                  <div key={type} style={{ marginBottom: 6 }}>
                    <span style={{ color: "var(--muted)", fontSize: 11 }}>{type}: </span>
                    {roadmap}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ResultsView({
  results,
  answers,
  onBack,
}: {
  results: ScoredPath[];
  answers: DiscoveryAnswer;
  onBack: () => void;
}) {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const top = results.slice(0, 10);

  function toggleCompare(id: string) {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  }

  const compareQuery = compareIds.join(",");

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "var(--muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            marginBottom: 20,
          }}
        >
          <ArrowLeft size={16} /> Back to questions
        </button>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-poppins)", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
              Your Top Career Matches
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 15 }}>
              Based on your profile — scored across 10 parameters, no paid influence.
            </p>
          </div>
          {compareIds.length >= 2 && (
            <Link
              href={`/compare?paths=${compareQuery}`}
              className="btn-primary"
              style={{ textDecoration: "none", flexShrink: 0 }}
            >
              <Scale size={16} />
              Compare {compareIds.length} Paths
            </Link>
          )}
        </div>

        {/* Summary chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
          <span style={{ fontSize: 12, color: "var(--muted)", background: "var(--bg-card)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 16 }}>
            Stage: {answers.currentStage}
          </span>
          <span style={{ fontSize: 12, color: "var(--muted)", background: "var(--bg-card)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 16 }}>
            Goal: {answers.goalType}
          </span>
          <span style={{ fontSize: 12, color: "var(--muted)", background: "var(--bg-card)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 16 }}>
            Budget: {answers.budget}
          </span>
          {answers.interests.slice(0, 3).map((i) => (
            <span key={i} className="tag" style={{ fontSize: 11 }}>{i}</span>
          ))}
        </div>

        {compareIds.length > 0 && compareIds.length < 2 && (
          <div style={{ marginTop: 12, fontSize: 13, color: "#FF8C00" }}>
            Add {2 - compareIds.length} more to compare →
          </div>
        )}
      </div>

      {/* Results */}
      {top.map((sp, i) => (
        <PathCard
          key={sp.path.id}
          sp={sp}
          rank={i + 1}
          selected={compareIds.includes(sp.path.id)}
          onSelect={() => toggleCompare(sp.path.id)}
        />
      ))}
    </div>
  );
}
