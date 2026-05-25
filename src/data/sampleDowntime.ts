export type DowntimeIncident = {
  incidentId: string;
  line: string;
  issueType: string;
  evidencePacket: string;
  owner: string;
  downtimeHours: number;
  status: "green" | "yellow" | "red";
  risk: "low" | "watch" | "critical";
  nextAction: string;
  excerpt: string;
};

export type RootCauseRule = {
  ruleId: string;
  failureMode: string;
  ruleTitle: string;
  requirementType: "maintenance" | "quality" | "safety" | "controls";
  targetEvidence: string;
  owner: string;
  readiness: "green" | "yellow" | "red";
  impactArea: string;
  blocker: string;
};

export type RestartPacket = {
  packetId: string;
  incidentId: string;
  line: string;
  audience: string;
  completenessScore: number;
  status: "green" | "yellow" | "red";
  dueInHours: number;
  blocker: string;
  decisionNote: string;
};

export const downtimeIncidents: DowntimeIncident[] = [
  {
    incidentId: "DT-5104",
    line: "Mixer Line 2",
    issueType: "Motor overheat trip",
    evidencePacket: "Thermal trace + maintenance note + reset history",
    owner: "Maintenance Control",
    downtimeHours: 3,
    status: "red",
    risk: "critical",
    nextAction: "Confirm bearing inspection evidence before restart approval opens.",
    excerpt: "Restart cannot proceed until the overheat trip cause is isolated and inspection proof is attached."
  },
  {
    incidentId: "DT-5141",
    line: "Packaging Cell 7",
    issueType: "Sensor drift hold",
    evidencePacket: "Calibration log + QA hold note + controls screenshot",
    owner: "Quality Engineering",
    downtimeHours: 5,
    status: "yellow",
    risk: "watch",
    nextAction: "Bundle calibration proof with QA release note before restarting the cell.",
    excerpt: "Sensor drift incidents require calibration proof and QA signoff before release."
  },
  {
    incidentId: "DT-5193",
    line: "Press Line 1",
    issueType: "Hydraulic pressure collapse",
    evidencePacket: "Pressure trend + valve inspection + safety walkthrough",
    owner: "Reliability Engineering",
    downtimeHours: 2,
    status: "red",
    risk: "critical",
    nextAction: "Resolve valve-inspection gap before the line returns under production load.",
    excerpt: "Pressure-loss restart is blocked until valve inspection and safety walkthrough evidence align."
  },
  {
    incidentId: "DT-5230",
    line: "Filling Line 4",
    issueType: "Batch contamination suspicion",
    evidencePacket: "Lab sample note + cleaning cycle proof + QA deviation record",
    owner: "Plant Quality",
    downtimeHours: 6,
    status: "yellow",
    risk: "watch",
    nextAction: "Attach cleaning-cycle evidence before QA closes the deviation.",
    excerpt: "Contamination holds require cleaning proof and a closed deviation record before release."
  },
  {
    incidentId: "DT-5288",
    line: "Assembly Cell 3",
    issueType: "Robot guard interlock fault",
    evidencePacket: "Interlock log + reset confirmation + safety validation",
    owner: "Controls Team",
    downtimeHours: 1,
    status: "green",
    risk: "low",
    nextAction: "Finalize restart packet and monitor only for post-restart drift.",
    excerpt: "Guard interlock faults can clear once the reset path and safety validation are recorded."
  }
];

export const rootCauseRules: RootCauseRule[] = [
  {
    ruleId: "RC-21",
    failureMode: "Motor overheat",
    ruleTitle: "Bearing inspection proof",
    requirementType: "maintenance",
    targetEvidence: "Inspection note plus thermal trace and reset history",
    owner: "Maintenance Control",
    readiness: "yellow",
    impactArea: "Mechanical restart safety",
    blocker: "The thermal trace exists, but the bearing inspection note is still missing from the packet."
  },
  {
    ruleId: "RC-28",
    failureMode: "Hydraulic collapse",
    ruleTitle: "Valve integrity confirmation",
    requirementType: "safety",
    targetEvidence: "Valve inspection plus pressure-trend confirmation and safety walkthrough",
    owner: "Reliability Engineering",
    readiness: "red",
    impactArea: "High-load restart risk",
    blocker: "Valve inspection proof is incomplete across the last maintenance cycle."
  },
  {
    ruleId: "RC-34",
    failureMode: "Sensor drift",
    ruleTitle: "Calibration and QA release",
    requirementType: "quality",
    targetEvidence: "Calibration log and signed QA release note",
    owner: "Quality Engineering",
    readiness: "yellow",
    impactArea: "Release quality confidence",
    blocker: "QA release note has not yet been bundled with the calibration log."
  },
  {
    ruleId: "RC-39",
    failureMode: "Interlock fault",
    ruleTitle: "Safety validation replay",
    requirementType: "controls",
    targetEvidence: "Interlock replay log and safety validation signoff",
    owner: "Controls Team",
    readiness: "green",
    impactArea: "Protected restart",
    blocker: "No blocker; only packet packaging remains."
  }
];

export const restartPackets: RestartPacket[] = [
  {
    packetId: "RST-11",
    incidentId: "DT-5104",
    line: "Mixer Line 2",
    audience: "Operations lead",
    completenessScore: 68,
    status: "red",
    dueInHours: 3,
    blocker: "Bearing inspection proof is still incomplete.",
    decisionNote: "Treat as immediate throughput-risk exposure until inspection evidence lands."
  },
  {
    packetId: "RST-15",
    incidentId: "DT-5193",
    line: "Press Line 1",
    audience: "Plant manager",
    completenessScore: 64,
    status: "red",
    dueInHours: 2,
    blocker: "Valve integrity evidence is still incomplete for high-load restart.",
    decisionNote: "Escalate before restart turns into repeat downtime or safety exposure."
  },
  {
    packetId: "RST-18",
    incidentId: "DT-5141",
    line: "Packaging Cell 7",
    audience: "Quality reviewer",
    completenessScore: 83,
    status: "yellow",
    dueInHours: 4,
    blocker: "QA release note still needs one final proof bundle.",
    decisionNote: "Packet is recoverable if the QA note lands before the next production window."
  }
];
