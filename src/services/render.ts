import {
  incidentLane,
  lineCoverage,
  restartPosture,
  rootCauseMap,
  summary,
  verification
} from "./plantDowntimeService";

function layout(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    :root { --bg: #f0f2ee; --paper: #fcfcfa; --ink: #22291f; --muted: #6a7264; --border: #d9dfd2; --accent: #466a3b; --accent-2: #2563eb; --yellow: #a16207; --red: #b91c1c; --green: #166534; }
    * { box-sizing: border-box; }
    body { margin: 0; background: linear-gradient(180deg, #ecefe8 0%, #fafbf8 100%); color: var(--ink); font-family: Georgia, "Times New Roman", serif; }
    .shell { max-width: 1380px; margin: 0 auto; padding: 28px; }
    .topbar, .card, .table-wrap { background: rgba(252, 252, 250, 0.95); border: 1px solid var(--border); border-radius: 18px; box-shadow: 0 16px 40px rgba(34, 41, 31, 0.08); }
    .topbar { padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .brand { display: flex; gap: 14px; align-items: center; }
    .badge { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: white; display: flex; align-items: center; justify-content: center; font: 700 16px/1 Arial, sans-serif; }
    .eyebrow { font: 600 11px/1.4 Arial, sans-serif; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 4px; }
    .brand h1 { margin: 0; font: 700 28px/1.1 Arial, sans-serif; }
    .brand p { margin: 3px 0 0; color: var(--muted); font: 14px/1.5 Arial, sans-serif; }
    nav a { text-decoration: none; color: var(--muted); font: 600 13px/1 Arial, sans-serif; letter-spacing: 0.08em; text-transform: uppercase; margin-left: 16px; }
    nav a.active, nav a:hover { color: var(--ink); }
    .hero { display: grid; grid-template-columns: 1.6fr 1fr; gap: 22px; margin-bottom: 22px; }
    .card { padding: 24px; }
    .hero h2 { margin: 8px 0 10px; font: 700 54px/0.98 Georgia, serif; letter-spacing: -0.03em; }
    .hero p, .section p { color: var(--muted); font: 18px/1.6 Arial, sans-serif; margin: 0 0 18px; }
    .stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 16px; }
    .stat { border: 1px solid var(--border); border-radius: 14px; padding: 16px; background: rgba(255,255,255,0.56); }
    .stat label { display: block; color: var(--muted); font: 700 11px/1.4 Arial, sans-serif; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 8px; }
    .stat strong { display: block; font: 700 40px/1 Arial, sans-serif; margin-bottom: 8px; }
    .stat span { display: block; color: var(--muted); font: 13px/1.5 Arial, sans-serif; }
    .section-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 22px; margin-bottom: 22px; }
    .right-panel h3, .section h3 { margin: 0 0 12px; font: 700 20px/1.2 Arial, sans-serif; }
    .list { display: grid; gap: 12px; }
    .item { border-top: 1px solid var(--border); padding-top: 12px; }
    .item:first-child { border-top: 0; padding-top: 0; }
    .item strong { display: block; font: 700 15px/1.4 Arial, sans-serif; margin-bottom: 4px; }
    .item p, .item span { color: var(--muted); font: 13px/1.6 Arial, sans-serif; margin: 0; }
    .table-wrap { padding: 14px 18px 18px; }
    table { width: 100%; border-collapse: collapse; font: 14px/1.5 Arial, sans-serif; }
    th, td { text-align: left; padding: 14px 10px; border-bottom: 1px solid var(--border); vertical-align: top; }
    th { color: var(--muted); font: 700 11px/1.4 Arial, sans-serif; letter-spacing: 0.12em; text-transform: uppercase; }
    .tag { display: inline-block; padding: 4px 8px; border-radius: 999px; font: 700 11px/1 Arial, sans-serif; letter-spacing: 0.08em; text-transform: uppercase; background: #e7f3e5; color: var(--accent); }
    .tag.watch, .tag.yellow { background: #fdf1db; color: var(--yellow); }
    .tag.critical, .tag.red { background: #fee5e5; color: var(--red); }
    .tag.green { background: #e7f7ec; color: var(--green); }
    .footer-note { margin-top: 12px; color: var(--muted); font: 13px/1.6 Arial, sans-serif; }
    .card-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
    @media (max-width: 980px) { .hero, .section-grid, .card-grid { grid-template-columns: 1fr; } .stat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } nav { display: none; } }
  </style>
</head>
<body><div class="shell">${body}</div></body></html>`;
}

function topbar(active: string) {
  const links = [
    { href: "/", label: "Overview" },
    { href: "/incident-lane", label: "Incident Lane" },
    { href: "/root-cause-map", label: "Root Cause Map" },
    { href: "/restart-posture", label: "Restart Posture" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ];
  return `<div class="topbar"><div class="brand"><div class="badge">KG</div><div><div class="eyebrow">Plant Downtime Root Cause Hub</div><h1>Industrial downtime and restart control plane</h1><p>Downtime incidents, root-cause blockers, and restart-safe escalation in one operator surface.</p></div></div><nav>${links.map((link) => `<a class="${active === link.href ? "active" : ""}" href="${link.href}">${link.label}</a>`).join("")}</nav></div>`;
}

function riskClass(value: string) { return value.toLowerCase(); }
function readinessClass(value: string) { if (value === "green") return "green"; if (value === "yellow") return "yellow"; return "red"; }

export function renderOverview() {
  const stats = summary();
  const incidents = incidentLane();
  const lines = lineCoverage();
  const rules = rootCauseMap();
  return layout("Plant Downtime Root Cause Hub", `${topbar("/")}
  <div class="hero"><div class="card"><div class="eyebrow">Manufacturing / Industrial</div><h2>Downtime only stays recoverable when evidence, failure modes, and restart clocks move together.</h2><p>This control plane makes line pressure, root-cause requirements, restart blockers, and throughput risk visible before an incident becomes repeat downtime, scrap, or missed output.</p><div class="stat-grid"><div class="stat"><label>Incidents</label><strong>${stats.incidentCount}</strong><span>Active downtime incidents modeled through restart pressure.</span></div><div class="stat"><label>Urgent Downtime</label><strong>${stats.urgentDowntime}</strong><span>Lines inside the highest restart-risk window.</span></div><div class="stat"><label>Root-Cause Blockers</label><strong>${stats.rootCauseBlockers}</strong><span>Failure-mode mappings that still have blockers.</span></div><div class="stat"><label>Blocked Restarts</label><strong>${stats.blockedRestarts}</strong><span>Restart packets that still have incomplete recovery posture.</span></div></div></div><div class="card right-panel"><div class="eyebrow">Operating Recommendation</div><h3>${stats.recommendation}</h3><div class="list">${incidents.slice(0,3).map((item)=>`<div class="item"><strong>${item.line} · ${item.incidentId}</strong><p>${item.issueType}</p><span>${item.downtimeHours} hours down · ${item.nextAction}</span></div>`).join("")}</div></div></div>
  <div class="section-grid"><div class="table-wrap section"><div class="eyebrow">Incident Queue</div><h3>Which restarts are most likely to slip next.</h3><table><thead><tr><th>Incident</th><th>Packet</th><th>Owner</th><th>Hours Down</th><th>Risk</th></tr></thead><tbody>${incidents.map((item)=>`<tr><td><strong>${item.line}</strong><br />${item.incidentId}<br />${item.issueType}</td><td>${item.evidencePacket}</td><td>${item.owner}</td><td>${item.downtimeHours}</td><td><span class="tag ${riskClass(item.risk)}">${item.risk}</span></td></tr>`).join("")}</tbody></table></div><div class="card section"><div class="eyebrow">Line Coverage</div><h3>Where restart pressure is concentrated.</h3><div class="list">${lines.map((item)=>`<div class="item"><strong>${item.line}</strong><span>${item.incidentCount} modeled incident${item.incidentCount === 1 ? "" : "s"} on this line.</span></div>`).join("")}</div></div></div>
  <div class="card section"><div class="eyebrow">Root Cause Map</div><h3>Restart clarity comes from mapping the failure mode to the evidence owner, not from logging the incident alone.</h3><div class="card-grid">${rules.map((item)=>`<div class="stat"><label>${item.requirementType}</label><strong style="font-size: 24px;">${item.impactArea}</strong><span>${item.ruleTitle} → ${item.targetEvidence}</span><div class="footer-note"><span class="tag ${readinessClass(item.readiness)}">${item.readiness}</span> · ${item.owner} · ${item.blocker}</div></div>`).join("")}</div><div class="footer-note">The buyer value is not downtime visibility in the abstract. It is knowing which line is restartable, which proof is missing, and where throughput and safety risk are building.</div></div>`);
}

export function renderIncidentLane() {
  return layout("Plant Downtime Root Cause Hub — Incident Lane", `${topbar("/incident-lane")}<div class="card section"><div class="eyebrow">Incident Lane</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">A downtime queue should show restart pressure and ownership, not just a stop event.</h2><p>Each row ties incident context to the evidence packet, restart window, and next action needed to keep the recovery path intact.</p></div><div class="table-wrap section" style="margin-top: 22px;"><table><thead><tr><th>Incident</th><th>Excerpt</th><th>Owner</th><th>Next Action</th><th>Risk</th></tr></thead><tbody>${incidentLane().map((item)=>`<tr><td><strong>${item.line}</strong><br />${item.incidentId}<br />${item.issueType}</td><td>${item.excerpt}</td><td>${item.owner}</td><td>${item.nextAction}</td><td><span class="tag ${riskClass(item.risk)}">${item.risk}</span></td></tr>`).join("")}</tbody></table></div>`);
}

export function renderRootCauseMap() {
  return layout("Plant Downtime Root Cause Hub — Root Cause Map", `${topbar("/root-cause-map")}<div class="card section"><div class="eyebrow">Root Cause Map</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">The rule map is where downtime turns into executable restart work.</h2><p>This lane maps failure-mode requirements to evidence targets, owner lanes, readiness, and blockers that still prevent safe restart routing.</p></div><div class="section-grid" style="margin-top: 22px;"><div class="table-wrap section"><table><thead><tr><th>Failure Rule</th><th>Target Evidence</th><th>Owner</th><th>Readiness</th></tr></thead><tbody>${rootCauseMap().map((item)=>`<tr><td><strong>${item.ruleTitle}</strong><br />${item.failureMode}<br />${item.impactArea}</td><td>${item.targetEvidence}</td><td>${item.owner}</td><td><span class="tag ${readinessClass(item.readiness)}">${item.readiness}</span></td></tr>`).join("")}</tbody></table></div><div class="card section"><div class="eyebrow">Dependency Blockers</div><h3>Where restart recovery is likely to stall.</h3><div class="list">${rootCauseMap().map((item)=>`<div class="item"><strong>${item.ruleId} · ${item.owner}</strong><p>${item.blocker}</p><span>${item.requirementType} · ${item.impactArea}</span></div>`).join("")}</div></div></div>`);
}

export function renderRestartPosture() {
  return layout("Plant Downtime Root Cause Hub — Restart Posture", `${topbar("/restart-posture")}<div class="card section"><div class="eyebrow">Restart Posture</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">Recovery risk becomes visible when packet completeness and restart timing are mapped together.</h2><p>This lane surfaces which restart packets are ready, which still have blockers, and whether the issue is inspection proof, safety confirmation, or quality release timing.</p></div><div class="card-grid" style="margin-top: 22px;">${restartPosture().map((packet)=>`<div class="card section"><div class="eyebrow">${packet.packetId}</div><h3>${packet.line}</h3><div class="stat-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 0;"><div class="stat"><label>Completeness</label><strong style="font-size: 30px;">${packet.completenessScore}%</strong><span>${packet.audience}</span></div><div class="stat"><label>Status</label><strong style="font-size: 30px;"><span class="tag ${readinessClass(packet.status)}">${packet.status}</span></strong><span>${packet.blocker}</span></div></div><div class="footer-note">${packet.dueInHours} hours to restart window · ${packet.decisionNote}</div></div>`).join("")}</div>`);
}

export function renderVerification() {
  return layout("Plant Downtime Root Cause Hub — Verification", `${topbar("/verification")}<div class="card section"><div class="eyebrow">Verification</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">What this repo proves about industrial downtime and restart systems.</h2><div class="list">${verification().map((item)=>`<div class="item"><strong>${item}</strong></div>`).join("")}</div></div>`);
}

export function renderDocs() {
  return layout("Plant Downtime Root Cause Hub — Docs", `${topbar("/docs")}<div class="card section"><div class="eyebrow">Docs</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">A control plane for downtime incidents, failure modes, and restart-safe recovery.</h2><p>This repo models the operating layer between incident intake and restart execution: line visibility, root-cause mapping, evidence routing, restart blockers, and operator-safe handoffs.</p><div class="footer-note">Routes: <code>/</code> · <code>/incident-lane</code> · <code>/root-cause-map</code> · <code>/restart-posture</code> · <code>/verification</code> · <code>/docs</code></div></div>`);
}
