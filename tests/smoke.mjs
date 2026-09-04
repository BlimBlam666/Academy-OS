import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "config/practice-schedule.js",
  "config/academy-calendar.js",
  "config/rincon-event.js",
  "manifest.webmanifest",
  "sw.js",
  "assets/crest.svg",
  "PROJECT_CHARTER.md",
  "docs/F201_PILOT.md",
  "docs/FUNDAMENTALS_ROTATION.md",
  "docs/ACADEMY_LAUNCH_CAMPAIGN.md",
  "docs/RINCON_AMTGARD_INTRO_PACKAGE.md",
  "docs/rincon/RINCON_MISSION_CONTROL.md",
  "docs/rincon/SWORD_WORKSHOP_AGENDA.md",
  "docs/rincon/THROWIE_WORKSHOP_AGENDA.md",
  "docs/rincon/BOOTH_AND_DEMO_PLAYBOOK.md",
  "docs/rincon/STAFF_TEACHING_SYSTEM.md",
  "docs/rincon/MATERIALS_AND_PRINT_PLAN.md",
  "docs/rincon/MEDIA_CONTENT_PLAN.md",
  "docs/rincon/AAR_AND_FOLLOWUP.md",
  "docs/MAIZE_MAZE_CELEBRATION_PACKAGE.md",
  "docs/CROWN_QUALS_BUILD_PLAN.md",
  "docs/DRIVE_INVENTORY.md",
  "docs/CONTENT_SYSTEM.md",
  "config/integrations.json",
  "omarchy-theme/academy/colors.toml"
];

for (const file of requiredFiles) {
  if (!existsSync(file)) throw new Error(`Missing required file: ${file}`);
}

const html = readFileSync("index.html", "utf8");
for (const marker of ["view-hall", "view-practice", "view-rincon", "view-calendar", "view-content", "view-integrations", "practice-rotation", "practice-course-link", "campaign-calendar-grid", "rincon-programs", "rincon-readiness", "rincon-content-shots"]) {
  if (!html.toLowerCase().includes(marker)) throw new Error(`Missing interface marker: ${marker}`);
}

const pagesWorkflow = readFileSync(".github/workflows/pages.yml", "utf8");
if (!pagesWorkflow.includes("cp -R config _site/")) throw new Error("Pages deployment omits calendar configuration");

const calendarSource = readFileSync("config/academy-calendar.js", "utf8");
const calendarSandbox = { window: {} };
vm.runInNewContext(calendarSource, calendarSandbox, { filename: "academy-calendar.js" });
const campaign = calendarSandbox.window.ACADEMY_CAMPAIGN_CALENDAR;
if (!campaign || campaign.timezone !== "America/Phoenix") throw new Error("Campaign calendar is invalid");
if (campaign.firstMonth !== "2026-09") throw new Error("Pre-launch calendar does not begin this month");
if (!Array.isArray(campaign.milestones) || campaign.milestones.length < 10) throw new Error("Launch milestones are incomplete");
if (!campaign.milestones.some((item) => item.date === "2026-10-02" && item.title.includes("RinCon Friday"))) throw new Error("RinCon campaign opening is missing");
if (!campaign.milestones.some((item) => item.date === "2026-10-07" && item.title.includes("AAR"))) throw new Error("RinCon 72-hour closeout is missing");
if (campaign.sundays.length !== 27) throw new Error("Sunday campaign calendar is incomplete");
if (!campaign.sundays.some((item) => item.story && item.game === "The Masked Hunter")) throw new Error("Story game schedule is incomplete");

const scheduleSource = readFileSync("config/practice-schedule.js", "utf8");
const scheduleSandbox = { window: {} };
vm.runInNewContext(scheduleSource, scheduleSandbox, { filename: "practice-schedule.js" });
const schedule = scheduleSandbox.window.ACADEMY_PRACTICE_SCHEDULE;
if (!schedule || schedule.startDate !== "2027-01-06") throw new Error("Practice schedule start date is invalid");
if (schedule.cadenceDays !== 7 || schedule.courses.length !== 7) throw new Error("Practice rotation is incomplete");
if (schedule.courses[0].code !== "F104" || schedule.courses[6].code !== "F111") throw new Error("Practice rotation sequence is invalid");
for (const course of schedule.courses) {
  if (!course.sourceUrl.startsWith("https://docs.google.com/")) throw new Error(`Invalid course source: ${course.code}`);
  if (!course.drills.length || !course.standards.length) throw new Error(`Incomplete course data: ${course.code}`);
}

const rinconSource = readFileSync("config/rincon-event.js", "utf8");
const rinconSandbox = { window: {} };
vm.runInNewContext(rinconSource, rinconSandbox, { filename: "rincon-event.js" });
const rincon = rinconSandbox.window.ACADEMY_RINCON_EVENT;
if (!rincon || rincon.startDate !== "2026-10-02" || rincon.endDate !== "2026-10-04") throw new Error("RinCon dates are invalid");
if (rincon.programs.length !== 5 || rincon.days.length !== 3) throw new Error("RinCon program is incomplete");
if (rincon.readiness.length < 8 || rincon.contentShots.length < 10) throw new Error("RinCon operational checklists are incomplete");
for (const program of rincon.programs) {
  if (!program.agendaUrl) throw new Error(`RinCon program has no agenda: ${program.id}`);
}

const app = readFileSync("app.js", "utf8");
new vm.Script(app, { filename: "app.js" });

const manifest = JSON.parse(readFileSync("manifest.webmanifest", "utf8"));
if (!manifest.name || !manifest.start_url) throw new Error("PWA manifest is incomplete");

const integrations = JSON.parse(readFileSync("config/integrations.json", "utf8"));
if (!Array.isArray(integrations.integrations)) throw new Error("Integration map is invalid");
for (const id of ["courseLibrary", "masterIndex", "academyResources", "heraldry", "reignHandbook"]) {
  if (!integrations.integrations.some((item) => item.id === id)) throw new Error(`Missing integration: ${id}`);
}
for (const id of ["rinconSite", "rinconVolunteers"]) {
  if (!integrations.integrations.some((item) => item.id === id)) throw new Error(`Missing RinCon integration: ${id}`);
}
for (const item of integrations.integrations) {
  if (!item.url.startsWith("https://")) throw new Error(`Integration URL must use HTTPS: ${item.id}`);
}

const trackedText = requiredFiles
  .filter((file) => !/\.(?:svg|pdf|png|jpg|jpeg)$/i.test(file))
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
