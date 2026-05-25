import { payload, summary } from "../src/services/plantDowntimeService";

console.log("plant-downtime-root-cause-hub demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().rules, null, 2));
