# Architecture

## Overview

`plant-downtime-root-cause-hub` is a lightweight TypeScript + Express control surface for modeling the operating layer between downtime incidents, root-cause signals, restart blockers, and recovery-safe escalation.

## Surfaces

- `overview`
  - incident count
  - urgent downtime events
  - root-cause blockers
  - blocked restarts
- `incident-lane`
  - incident-by-incident owner routing
  - evidence packets
  - downtime timing
  - next action
- `root-cause-map`
  - failure-mode mapping
  - evidence targets
  - readiness and blockers
- `restart-posture`
  - packet completeness
  - restart timing
  - audience-specific blockers
- `verification`
  - what the repo proves about industrial downtime systems

## Data Model

- `DowntimeIncident`
  - line, issue type, evidence packet, owner, downtime hours, risk, next action
- `RootCauseRule`
  - failure mode, evidence target, owner, readiness, blocker
- `RestartPacket`
  - audience, completeness score, restart window, blocker, decision note

## Design Principle

Downtime state should be inspectable by operations, maintenance, quality, and executive stakeholders. The system should explain:
- which line is under pressure right now
- what failure mode or evidence requirement is missing
- who owns the next move
- where restart or throughput risk is building
