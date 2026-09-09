const { test, expect } = require("@playwright/test");

const NOW = new Date("2027-01-05T12:00:00-07:00");
const SCHEDULED_CODE = "F104";
const PREVIEW_CODE = "F105";
const RINCON_CODE = "RC-FULL";
const browserErrors = new WeakMap();

test.beforeEach(async ({ page }, testInfo) => {
  const errors = [];
  browserErrors.set(page, errors);
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  const startsBeforeRinCon = testInfo.title === "RinCon remains an explicit reference after its final rehearsal" ||
    testInfo.title === "each RinCon Wednesday rolls to the intended next rehearsal" ||
    testInfo.title === "automatic track changes from RinCon to Academy at the Phoenix event cutoff";
  await page.clock.install({ time: startsBeforeRinCon ? new Date("2026-09-01T12:00:00-07:00") : NOW });
  await page.goto("/");
});

async function openForge(page) {
  await page.getByRole("button", { name: "Practice Forge", exact: true }).click();
  await expect(page.locator("#view-practice")).toHaveClass(/active/);
  await expect(page.locator("#practice-title")).toContainText(SCHEDULED_CODE);
}

function previewButton(page, code = PREVIEW_CODE) {
  return page.getByRole("button", { name: new RegExp(`^Preview ${code}\\b`) });
}

test("Academy Command Hall loads without browser console errors", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Command Hall", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Now / Next", level: 2 })).toBeVisible();
  await expect.poll(() => browserErrors.get(page)).toEqual([]);
});

test("scheduled Forge content is visible and preview is transient", async ({ page }) => {
  await openForge(page);
  const scheduledTitle = await page.locator("#practice-title").innerText();
  await expect(page.locator("#practice-label")).toContainText("Academy course");
  await expect(page.locator("#practice-meta")).toContainText("January 6, 2027");
  await expect(page.locator("#practice-timeline").getByRole("checkbox")).toHaveCount(7);

  await previewButton(page).click();
  await expect(page.locator("#practice-title")).toContainText(PREVIEW_CODE);
  await expect(page.locator("#practice-title")).not.toHaveText(scheduledTitle);
  await expect(page.locator("#practice-preview-notice")).toContainText(`scheduled operational course remains ${SCHEDULED_CODE}`);

  await page.reload();
  await openForge(page);
  await expect(page.locator("#practice-title")).toHaveText(scheduledTitle);
  await expect(page.locator("#practice-preview-notice")).toBeHidden();
});

test("Return restores the scheduled course and keyboard focus", async ({ page }) => {
  await openForge(page);
  const preview = previewButton(page);
  await preview.focus();
  await page.keyboard.press("Enter");
  const returnButton = page.getByRole("button", { name: "Return to scheduled course" });
  await expect(returnButton).toBeFocused();
  await expect(page.locator("#practice-title")).toContainText(PREVIEW_CODE);

  await page.keyboard.press("Enter");
  await expect(page.locator("#practice-title")).toContainText(SCHEDULED_CODE);
  await expect(previewButton(page)).toBeFocused();
  await expect(returnButton).toBeHidden();
});

test("Academy and RinCon switching works and safely clears preview", async ({ page }) => {
  await openForge(page);
  await previewButton(page).click();
  await page.getByRole("button", { name: "RinCon Rehearsals" }).click();
  await expect(page.getByRole("button", { name: "RinCon Rehearsals" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#practice-label")).toContainText("RinCon reference");
  await expect(page.locator("#practice-title")).toContainText(RINCON_CODE);
  await expect(page.locator("#practice-title")).not.toContainText(PREVIEW_CODE);
  await expect(page.locator("#practice-preview-notice")).toContainText("rehearsal rotation is complete");
  await expect(page.getByRole("button", { name: "Return to scheduled course" })).toBeHidden();

  await page.getByRole("button", { name: "Academy Wednesdays" }).click();
  await expect(page.getByRole("button", { name: "Academy Wednesdays" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#practice-title")).toContainText(SCHEDULED_CODE);
});

test("checklist state is isolated by track and course", async ({ page }) => {
  await openForge(page);
  const firstScheduledCheck = page.locator("[data-practice-check]").first();
  await firstScheduledCheck.check();

  await previewButton(page).click();
  const firstPreviewCheck = page.locator("[data-practice-check]").first();
  await expect(firstPreviewCheck).not.toBeChecked();
  await firstPreviewCheck.check();
  await page.getByRole("button", { name: "Return to scheduled course" }).click();
  await expect(page.locator("[data-practice-check]").first()).toBeChecked();

  await page.getByRole("button", { name: "RinCon Rehearsals" }).click();
  await expect(page.locator("[data-practice-check]").first()).not.toBeChecked();
  await page.getByRole("button", { name: "Academy Wednesdays" }).click();
  await expect(page.locator("[data-practice-check]").first()).toBeChecked();
  await previewButton(page).click();
  await expect(page.locator("[data-practice-check]").first()).toBeChecked();
});

test("AAR attribution remains tied to scheduled practice during preview", async ({ page }) => {
  await openForge(page);
  await previewButton(page).click();
  await page.locator("#aar-happened").fill("A factual practice event");
  await page.locator("#aar-worked").fill("Clear demonstrations");
  await page.locator("#aar-improve").fill("More repetitions");
  await page.locator("#aar-next").fill("Repeat the drill");
  await page.getByRole("button", { name: "Seal Chronicle Entry" }).click();
  const entry = await page.evaluate(() => JSON.parse(localStorage.getItem("academyOS.phase1.v1")).aars.at(-1));
  expect(entry.event).toContain(SCHEDULED_CODE);
  expect(entry.event).not.toContain(PREVIEW_CODE);
});

test("Content Foundry attribution remains tied to scheduled practice during preview", async ({ page }) => {
  await openForge(page);
  await previewButton(page).click();
  await page.locator("#aar-happened").fill("A consent-safe moment");
  await page.locator("#aar-worked").fill("The scheduled lesson worked");
  await page.getByRole("button", { name: "Send to Foundry" }).click();
  await expect(page.locator("#view-content")).toHaveClass(/active/);
  await expect(page.locator("#content-event")).toHaveValue(new RegExp(`^${SCHEDULED_CODE} ·`));
  await expect(page.locator("#content-event")).not.toHaveValue(new RegExp(`^${PREVIEW_CODE} ·`));
});

test("Send to Foundry restores schedule ownership for the next rollover", async ({ page }) => {
  await page.clock.pauseAt(new Date("2027-01-06T20:59:59.999-07:00"));
  await page.reload();
  await openForge(page);
  await page.getByRole("button", { name: "Content Foundry", exact: true }).click();
  await page.locator("#content-event").fill("My earlier custom title");
  await page.getByRole("button", { name: "Practice Forge", exact: true }).click();
  await page.getByRole("button", { name: "Send to Foundry" }).click();
  await expect(page.locator("#content-event")).toHaveValue(/^F104 ·/);

  await page.clock.runFor(1);
  await expect(page.locator("#content-event")).toHaveValue(/^F105 ·/);
});

test("Command Hall operation remains independent of preview", async ({ page }) => {
  await expect(page.locator("#command-now-item")).toContainText(SCHEDULED_CODE);
  await openForge(page);
  await previewButton(page).click();
  await page.getByRole("button", { name: "Command Hall", exact: true }).click();
  await expect(page.locator("#command-now-item")).toContainText(SCHEDULED_CODE);
  await expect(page.locator("#command-now-item")).not.toContainText(PREVIEW_CODE);
});

test("an open Forge advances exactly at the configured Phoenix rollover", async ({ page }) => {
  await page.clock.pauseAt(new Date("2027-01-06T20:59:59.999-07:00"));
  await page.reload();
  await openForge(page);
  await expect(page.locator("#practice-review-status")).toHaveText("Runs today");

  await page.clock.runFor(1);
  await expect(page.locator("#practice-title")).toContainText("F105");
  await expect(page.locator("#practice-label")).toContainText("Academy course 2 of 22");
  await expect(page.locator("#command-now-item")).toContainText("Sunday operation");
  await expect(page.locator("#content-event")).toHaveValue(/^F105 ·/);
  await page.clock.runFor(1);
  await expect(page.locator("#practice-title")).toContainText("F105");
});

test("the following Wednesday retains F105 until its exact boundary", async ({ page }) => {
  await page.clock.pauseAt(new Date("2027-01-13T20:59:59.999-07:00"));
  await page.reload();
  await page.getByRole("button", { name: "Practice Forge", exact: true }).click();
  await expect(page.locator("#practice-title")).toContainText("F105");
  await page.clock.runFor(1);
  await expect(page.locator("#practice-title")).toContainText("F106");
  await page.clock.runFor(1);
  await expect(page.locator("#practice-title")).toContainText("F106");
});

test("rolloverHour is read from validated schedule configuration", async ({ page }) => {
  await page.clock.pauseAt(new Date("2027-01-06T19:59:59.999-07:00"));
  await page.evaluate(() => {
    window.ACADEMY_PRACTICE_SCHEDULE.rolloverHour = 20;
    window.dispatchEvent(new Event("pageshow"));
  });
  await page.getByRole("button", { name: "Practice Forge", exact: true }).click();
  await expect(page.locator("#practice-title")).toContainText("F104");
  await page.clock.runFor(1);
  await expect(page.locator("#practice-title")).toContainText("F105");
});

test("previewing the next course clears preview when it becomes scheduled", async ({ page }) => {
  await page.clock.pauseAt(new Date("2027-01-06T20:59:59.999-07:00"));
  await page.reload();
  await openForge(page);
  await previewButton(page, "F105").click();
  await expect(page.locator("#practice-label")).toContainText("Preview");
  await page.clock.runFor(1);
  await expect(page.locator("#practice-title")).toContainText("F105");
  await expect(page.locator("#practice-label")).not.toContainText("Preview");
  await expect(page.locator("#practice-preview-notice")).toBeHidden();
});

test("manual track, focus, checklist, and user Foundry text survive rollover", async ({ page }) => {
  await page.clock.pauseAt(new Date("2027-01-06T20:59:59.999-07:00"));
  await page.reload();
  await openForge(page);
  await page.locator("[data-practice-check]").first().check();
  await page.getByRole("button", { name: "Content Foundry", exact: true }).click();
  await page.locator("#content-event").fill("My hand-written Foundry title");
  await page.getByRole("button", { name: "Practice Forge", exact: true }).click();
  const rincon = page.getByRole("button", { name: "RinCon Rehearsals" });
  await rincon.click();
  await rincon.focus();

  await page.clock.runFor(1);
  await expect(rincon).toHaveAttribute("aria-pressed", "true");
  await expect(rincon).toBeFocused();
  await expect(page.locator("#practice-title")).toContainText("RC-FULL");
  await expect(page.locator("#content-event")).toHaveValue("My hand-written Foundry title");
  await page.getByRole("button", { name: "Academy Wednesdays" }).click();
  await previewButton(page, "F104").click();
  await expect(page.locator("[data-practice-check]").first()).toBeChecked();
});

test("preview remains transient when the scheduled course rolls underneath it", async ({ page }) => {
  await page.clock.pauseAt(new Date("2027-01-06T20:59:59.999-07:00"));
  await page.reload();
  await openForge(page);
  await previewButton(page, "F106").click();

  await page.clock.runFor(1);
  await expect(page.locator("#practice-title")).toContainText("F106");
  await expect(page.locator("#practice-label")).toContainText("Preview");
  await expect(page.locator("#practice-preview-notice")).toContainText("scheduled operational course remains F105");
});

test("the final Academy course becomes an explicit completed rotation", async ({ page }) => {
  await page.clock.pauseAt(new Date("2027-06-02T20:59:59.999-07:00"));
  await page.reload();
  await page.getByRole("button", { name: "Practice Forge", exact: true }).click();
  await expect(page.locator("#practice-title")).toContainText("F215");

  await page.clock.runFor(1);
  await expect(page.locator("#practice-title")).toHaveText("Academy rotation complete · F215 concluded");
  await expect(page.locator("#practice-review-status")).toHaveText("Rotation complete");
  await expect(page.locator("#practice-preview-notice")).toContainText("all courses remain available as references");
  await expect(page.locator("#practice-rotation .scheduled")).toHaveCount(0);
});

test("RinCon remains an explicit reference after its final rehearsal", async ({ page }) => {
  await page.clock.pauseAt(new Date("2026-09-30T21:00:00-07:00"));
  await page.reload();
  await page.getByRole("button", { name: "Practice Forge", exact: true }).click();
  await expect(page.locator("#practice-label")).toContainText("RinCon reference");
  await expect(page.locator("#practice-title")).toContainText("RC-FULL");
  await expect(page.locator("#practice-preview-notice")).toContainText("rehearsal rotation is complete");
});

test("each RinCon Wednesday rolls to the intended next rehearsal", async ({ page }) => {
  const boundaries = [
    ["2026-09-09", "RC-SWORD", "RC-THROWIE"],
    ["2026-09-16", "RC-THROWIE", "F102-RC"],
    ["2026-09-23", "F102-RC", "RC-FULL"],
  ];
  for (const [date, before, after] of boundaries) {
    await page.clock.pauseAt(new Date(`${date}T20:59:59.999-07:00`));
    await page.reload();
    await page.getByRole("button", { name: "Practice Forge", exact: true }).click();
    await expect(page.locator("#practice-title")).toContainText(before);
    await page.clock.runFor(1);
    await expect(page.locator("#practice-title")).toContainText(after);
  }
});

test("automatic track changes from RinCon to Academy at the Phoenix event cutoff", async ({ page }) => {
  await page.clock.pauseAt(new Date("2026-10-04T23:59:59.999-07:00"));
  await page.reload();
  await page.getByRole("button", { name: "Practice Forge", exact: true }).click();
  await expect(page.getByRole("button", { name: "RinCon Rehearsals" })).toHaveAttribute("aria-pressed", "true");
  await page.clock.runFor(1);
  await expect(page.getByRole("button", { name: "Academy Wednesdays" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#practice-title")).toContainText("F104");
});

test("completed Academy attribution is explicit in AAR and Foundry", async ({ page }) => {
  await page.clock.pauseAt(new Date("2027-06-02T21:00:00-07:00"));
  await page.reload();
  await page.getByRole("button", { name: "Practice Forge", exact: true }).click();
  await page.locator("#aar-happened").fill("The final course concluded");
  await page.locator("#aar-worked").fill("The rotation closed predictably");
  await page.locator("#aar-improve").fill("Plan the next rotation");
  await page.locator("#aar-next").fill("Publish the closeout");
  await page.getByRole("button", { name: "Seal Chronicle Entry" }).click();
  const entry = await page.evaluate(() => JSON.parse(localStorage.getItem("academyOS.phase1.v1")).aars.at(-1));
  expect(entry.event).toBe("Academy rotation complete");
  await page.getByRole("button", { name: "Send to Foundry" }).click();
  await expect(page.locator("#content-event")).toHaveValue("Academy rotation complete");
});

test("Phoenix summer scheduling is authoritative in a browser outside Arizona", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: "http://127.0.0.1:8000", timezoneId: "America/New_York" });
  const page = await context.newPage();
  await page.clock.install({ time: new Date("2027-06-02T20:58:00-07:00") });
  await page.goto("/");
  await page.clock.pauseAt(new Date("2027-06-02T20:59:59.999-07:00"));
  await page.getByRole("button", { name: "Practice Forge", exact: true }).click();
  await expect(page.locator("#practice-title")).toContainText("F215");
  await page.clock.runFor(1);
  await expect(page.locator("#practice-title")).toContainText("Academy rotation complete");
  await context.close();
});

test("configured viewport keeps the hall and Forge usable", async ({ page }, testInfo) => {
  const expected = testInfo.project.name === "mobile" ? { width: 390, height: 844 } : { width: 1440, height: 900 };
  expect(page.viewportSize()).toEqual(expected);
  await expect(page.getByRole("navigation", { name: "Academy OS sections" })).toBeVisible();
  await openForge(page);
  const trackControls = page.getByRole("article", { name: "Practice Forge track controls" });
  const practiceTitle = page.locator("#practice-title");
  await trackControls.scrollIntoViewIfNeeded();
  await expect(trackControls).toBeInViewport();
  await practiceTitle.scrollIntoViewIfNeeded();
  await expect(practiceTitle).toBeInViewport();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
