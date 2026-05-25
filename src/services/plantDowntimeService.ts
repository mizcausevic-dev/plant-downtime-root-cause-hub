import { downtimeIncidents, restartPackets, rootCauseRules } from "../data/sampleDowntime";

export function summary() {
  return {
    incidentCount: downtimeIncidents.length,
    urgentDowntime: downtimeIncidents.filter((item) => item.downtimeHours <= 3).length,
    rootCauseBlockers: rootCauseRules.filter((item) => item.readiness !== "green").length,
    blockedRestarts: restartPackets.filter((item) => item.status !== "green").length,
    recommendation:
      "Clear valve and bearing inspection blockers first so restart-safe incidents do not spill into repeated downtime."
  };
}

export function incidentLane() {
  return downtimeIncidents;
}

export function rootCauseMap() {
  return rootCauseRules;
}

export function restartPosture() {
  return restartPackets;
}

export function lineCoverage() {
  const counts = new Map<string, number>();
  for (const item of downtimeIncidents) {
    counts.set(item.line, (counts.get(item.line) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([line, incidentCount]) => ({ line, incidentCount }));
}

export function verification() {
  return [
    "The surface shows that downtime expansion is often a routing and evidence-packaging defect, not just a machine event.",
    "Failure modes become operational only when owners, restart clocks, and blocker evidence are mapped into the same lane.",
    "Restart posture makes throughput and safety risk visible before an incident becomes repeat downtime or scrap."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    incidents: incidentLane(),
    rules: rootCauseMap(),
    restarts: restartPosture(),
    lines: lineCoverage(),
    verification: verification()
  };
}
