// SPDX-License-Identifier: AGPL-3.0-or-later

import express from "express";

import {
  incidentLane,
  payload,
  restartPosture,
  rootCauseMap,
  summary,
  verification
} from "./services/plantDowntimeService";
import {
  renderDocs,
  renderIncidentLane,
  renderOverview,
  renderRestartPosture,
  renderRootCauseMap,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5474);
const host = process.env.HOST || "0.0.0.0";

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/incident-lane", (_req, res) => res.type("html").send(renderIncidentLane()));
app.get("/root-cause-map", (_req, res) => res.type("html").send(renderRootCauseMap()));
app.get("/restart-posture", (_req, res) => res.type("html").send(renderRestartPosture()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/incident-lane", (_req, res) => res.json(incidentLane()));
app.get("/api/root-cause-map", (_req, res) => res.json(rootCauseMap()));
app.get("/api/restart-posture", (_req, res) => res.json(restartPosture()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, host, () => {
    console.log(`Plant Downtime Root Cause Hub listening on http://${host}:${port}`);
  });
}

export default app;
