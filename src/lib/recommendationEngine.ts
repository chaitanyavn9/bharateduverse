import { careerPaths } from "@/data/careerPaths";
import { DiscoveryAnswer, ScoredPath, CareerPath } from "@/types";

const WEIGHTS = {
  interest: 0.30,
  stability: 0.15,
  income: 0.15,
  future: 0.15,
  cost: 0.10,
  research: 0.10,
  entrepreneurship: 0.05,
};

const INTEREST_MAP: Record<string, string[]> = {
  technology: ["cse", "ece", "quantum", "semiconductor"],
  medicine: ["mbbs", "pharmacy"],
  space: ["aerospace", "research-phd", "quantum", "gis-remote-sensing"],
  environment: ["sustainability", "oceanography", "agriculture", "gis-remote-sensing"],
  finance: ["ca", "cma", "cs", "actuarial", "finance-stock"],
  design: ["architecture", "interior-design"],
  defence: ["nda", "aerospace", "nuclear"],
  government: ["ias", "ssc", "banking", "public-policy"],
  agriculture: ["agriculture", "food-tech"],
  research: ["research-phd", "quantum", "oceanography", "nuclear", "semiconductor"],
  engineering: ["cse", "ece", "mechanical", "civil", "aerospace", "semiconductor"],
  skilled: ["electrician-trade", "iti", "polytechnic"],
  logistics: ["supply-chain"],
  ocean: ["oceanography", "maritime"],
  aviation: ["aviation", "aerospace"],
  media: ["journalism"],
  language: ["linguistics"],
  policy: ["public-policy", "ias"],
  mapping: ["gis-remote-sensing"],
  chips: ["semiconductor", "ece"],
  business: ["ca", "cs", "finance-stock"],
};

function normalise(value: number, max = 10): number {
  return value / max;
}

function scoreInterest(path: CareerPath, interests: string[]): number {
  let matches = 0;
  for (const interest of interests) {
    const mapped = INTEREST_MAP[interest.toLowerCase()] ?? [];
    if (mapped.includes(path.id)) matches++;
    // universe match
    if (path.universe.toLowerCase().includes(interest.toLowerCase())) matches += 0.5;
    // tag match
    if (path.tags.some((t) => t.toLowerCase().includes(interest.toLowerCase()))) matches += 0.3;
  }
  return Math.min(matches / Math.max(interests.length, 1), 1);
}

function scoreStability(path: CareerPath, stability: DiscoveryAnswer["stability"]): number {
  const s = path.scores.jobSecurity;
  if (stability === "High") return normalise(s);
  if (stability === "Medium") return normalise(Math.max(0, 10 - Math.abs(s - 6)));
  return normalise(10 - s); // risk taker prefers lower job security (startup)
}

function scoreIncome(path: CareerPath, expectation: DiscoveryAnswer["incomeExpectation"]): number {
  const incomeStr = path.incomeRange.mid;
  // Extract first number from "₹15L–₹40L"
  const match = incomeStr.match(/₹(\d+(?:\.\d+)?)([LlCc])/);
  if (!match) return 0.5;
  const val = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  const lakhs = unit === "C" ? val * 100 : val;
  if (expectation === "High") return Math.min(lakhs / 30, 1);
  if (expectation === "Medium") return Math.min(lakhs / 15, 1);
  return 1 - Math.min(lakhs / 15, 1) * 0.5 + 0.5; // low expectation: stability matters more
}

function scoreFuture(path: CareerPath): number {
  return normalise((path.scores.futureScope + path.scores.aiResistance) / 2);
}

function scoreCost(path: CareerPath, budget: DiscoveryAnswer["budget"]): number {
  const costScore = path.scores.educationCost; // higher = more expensive
  if (budget === "Low") return normalise(10 - costScore);
  if (budget === "Medium") return normalise(10 - Math.max(0, costScore - 5));
  return 1;
}

function scoreResearch(path: CareerPath, interested: boolean): number {
  if (!interested) return 1 - normalise(path.scores.researchPotential) * 0.3;
  return normalise(path.scores.researchPotential);
}

function scoreEntrepreneurship(path: CareerPath, goalType: DiscoveryAnswer["goalType"]): number {
  if (goalType === "Entrepreneur") return normalise(path.scores.entrepreneurship);
  if (goalType === "Research") return normalise(path.scores.researchPotential);
  if (goalType === "Government Service") return normalise(path.scores.jobSecurity);
  return 0.7; // job — balanced
}

function scoreGoalPathMatch(path: CareerPath, goalType: DiscoveryAnswer["goalType"]): number {
  return path.goalPaths[goalType] ? 1 : 0.3;
}

function buildMatchReasons(path: CareerPath, answers: DiscoveryAnswer): string[] {
  const reasons: string[] = [];
  if (path.scores.jobSecurity >= 9 && answers.stability === "High") {
    reasons.push("Very high job security matches your stability preference");
  }
  if (path.scores.futureScope >= 9) {
    reasons.push("Strong future scope in the next 10–20 years");
  }
  if (path.goalPaths[answers.goalType]) {
    reasons.push(`Clear ${answers.goalType} pathway available`);
  }
  if (answers.researchInterest && path.scores.researchPotential >= 8) {
    reasons.push("Excellent research opportunities");
  }
  if (answers.goalType === "Entrepreneur" && path.scores.entrepreneurship >= 8) {
    reasons.push("High entrepreneurship potential");
  }
  if (path.andhraOpportunities.length > 0 && answers.location !== "Global") {
    reasons.push(`Active in Andhra Pradesh: ${path.andhraOpportunities[0]}`);
  }
  if (path.scores.educationCost <= 3 && answers.budget === "Low") {
    reasons.push("Low education cost — accessible without large investment");
  }
  return reasons.length > 0 ? reasons : ["Aligns with your overall profile"];
}

export function recommend(answers: DiscoveryAnswer): ScoredPath[] {
  const scored: ScoredPath[] = careerPaths.map((path) => {
    const interestScore = scoreInterest(path, answers.interests);
    const stabilityScore = scoreStability(path, answers.stability);
    const incomeScore = scoreIncome(path, answers.incomeExpectation);
    const futureScore = scoreFuture(path);
    const costScore = scoreCost(path, answers.budget);
    const researchScore = scoreResearch(path, answers.researchInterest);
    const entrepreneurScore = scoreEntrepreneurship(path, answers.goalType);
    const goalMatchScore = scoreGoalPathMatch(path, answers.goalType);

    const score =
      interestScore * WEIGHTS.interest +
      stabilityScore * WEIGHTS.stability +
      incomeScore * WEIGHTS.income +
      futureScore * WEIGHTS.future +
      costScore * WEIGHTS.cost +
      researchScore * WEIGHTS.research +
      entrepreneurScore * WEIGHTS.entrepreneurship +
      goalMatchScore * 0.1;

    return {
      path,
      score: Math.round(score * 100),
      matchReasons: buildMatchReasons(path, answers),
    };
  });

  return scored.sort((a, b) => b.score - a.score);
}
