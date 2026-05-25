import { describe, expect, test } from "vitest";

import {
  incidentLane,
  lineCoverage,
  payload,
  restartPosture,
  rootCauseMap,
  summary,
  verification
} from "./services/plantDowntimeService";

describe("plant-downtime-root-cause-hub", () => {
  test("summary exposes downtime pressure and blocked restarts", () => {
    const stats = summary();
    expect(stats.incidentCount).toBeGreaterThan(2);
    expect(stats.urgentDowntime).toBeGreaterThan(0);
    expect(stats.blockedRestarts).toBeGreaterThan(0);
  });

  test("root cause map and line coverage stay operationally legible", () => {
    expect(rootCauseMap().length).toBe(4);
    expect(lineCoverage().length).toBeGreaterThan(3);
    expect(restartPosture().some((packet) => packet.completenessScore < 80)).toBe(true);
  });

  test("payload bundles the full industrial operator surface", () => {
    expect(incidentLane().length).toBe(5);
    expect(verification().length).toBe(3);
    expect(payload()).toHaveProperty("incidents");
    expect(payload()).toHaveProperty("rules");
    expect(payload()).toHaveProperty("restarts");
  });
});
