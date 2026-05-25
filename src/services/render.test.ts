import { describe, expect, test } from "vitest";

import {
  renderDocs,
  renderIncidentLane,
  renderOverview,
  renderRestartPosture,
  renderRootCauseMap,
  renderVerification
} from "./render";
import {
  downtimeIncidents,
  restartPackets,
  rootCauseRules
} from "../data/sampleDowntime";

const renderers = [
  ["overview", renderOverview],
  ["incident-lane", renderIncidentLane],
  ["root-cause-map", renderRootCauseMap],
  ["restart-posture", renderRestartPosture],
  ["verification", renderVerification],
  ["docs", renderDocs]
] as const;

describe("render", () => {
  test.each(renderers)("%s produces a full HTML document with nav", (_label, fn) => {
    const html = fn();
    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
    expect(html).toContain("</html>");
    expect(html).toContain("Plant Downtime Root Cause Hub");
    expect(html).toContain('href="/incident-lane"');
    expect(html).toContain('href="/docs"');
  });

  test("overview surfaces incident data and risk tags", () => {
    const html = renderOverview();
    expect(html).toContain(downtimeIncidents[0].incidentId);
    expect(html).toContain(downtimeIncidents[0].owner);
    expect(html).toContain('class="tag critical"');
  });

  test("incident lane lists every incident with owner", () => {
    const html = renderIncidentLane();
    for (const item of downtimeIncidents) {
      expect(html).toContain(item.incidentId);
      expect(html).toContain(item.owner);
    }
  });

  test("root cause map shows rules, owners, and all readiness tag classes", () => {
    const html = renderRootCauseMap();
    for (const rule of rootCauseRules) {
      expect(html).toContain(rule.ruleId);
      expect(html).toContain(rule.owner);
    }
    expect(html).toContain('class="tag red"');
    expect(html).toContain('class="tag green"');
    expect(html).toContain('class="tag yellow"');
  });

  test("restart posture shows packets, completeness scores, and audiences", () => {
    const html = renderRestartPosture();
    for (const packet of restartPackets) {
      expect(html).toContain(packet.packetId);
      expect(html).toContain(String(packet.completenessScore));
      expect(html).toContain(packet.audience);
    }
  });

  test("verification renders proof statements", () => {
    const html = renderVerification();
    expect(html).toContain("Verification");
  });

  test("docs page enumerates the route surface", () => {
    const html = renderDocs();
    expect(html).toContain("/root-cause-map");
    expect(html).toContain("/restart-posture");
  });
});
