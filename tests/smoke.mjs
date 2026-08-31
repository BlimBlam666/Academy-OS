import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "sw.js",
  "assets/crest.svg",
  "PROJECT_CHARTER.md",
  "docs/F201_PILOT.md",
  "docs/CONTENT_SYSTEM.md",
  "config/integrations.json",
  "omarchy-theme/academy/colors.toml"
];

for (const file of requiredFiles) {
  if (!existsSync(file)) throw new Error(`Missing required file: ${file}`);
}

const html = readFileSync("index.html", "utf8");
for (const marker of ["command-hall", "practice-forge", "content-foundry", "gatehouse", "f201"]) {
  if (!html.toLowerCase().includes(marker)) throw new Error(`Missing interface marker: ${marker}`);
}

const app = readFileSync("app.js", "utf8");
new vm.Script(app, { filename: "app.js" });

const manifest = JSON.parse(readFileSync("manifest.webmanifest", "utf8"));
if (!manifest.name || !manifest.start_url) throw new Error("PWA manifest is incomplete");

const integrations = JSON.parse(readFileSync("config/integrations.json", "utf8"));
if (!Array.isArray(integrations.integrations)) throw new Error("Integration map is invalid");

const trackedText = requiredFiles
  .filter((file) => !file.endsWith(".svg"))
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");
const forbiddenSecrets = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /gh[pousr]_[A-Za-z0-9_]{30,}/,
  /AIza[0-9A-Za-z_-]{35}/
];
for (const pattern of forbiddenSecrets) {
  if (pattern.test(trackedText)) throw new Error(`Potential secret matched ${pattern}`);
}

console.log("Academy OS smoke tests passed.");
