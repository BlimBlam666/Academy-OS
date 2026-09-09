const { test, expect } = require("@playwright/test");

async function station(page, iso = "2026-09-08T12:00:00-07:00") {
  await page.clock.install({ time: new Date(iso) });
  await page.goto("/");
  return page.evaluate(() => ({
    timezone: window.ACADEMY_COMMAND_STATION.timezone,
    states: window.ACADEMY_COMMAND_STATION.preceptorStates,
  }));
}

async function nowNext(page, iso, events) {
  return page.evaluate(({ iso, events }) => window.ACADEMY_COMMAND_STATION.nowNext({
    instant: new Date(iso), events,
  }), { iso, events });
}

test("contract is Phoenix-authoritative and contains no telemetry states", async ({ page }) => {
  const contract = await station(page);
  expect(contract.timezone).toBe("America/Phoenix");
  expect(contract.states).toEqual(["Brief Ready", "Running Externally", "Review Needed", "Accepted"]);
  expect(contract.states.join(" ")).not.toMatch(/online|progress|percent|eta|active agent/i);
  const brief = await page.evaluate(() => window.ACADEMY_COMMAND_STATION.preceptorBrief({
    title: "Review launch brief", state: "Working 73%", eta: "2m",
  }));
  expect(brief).toEqual({ title: "Review launch brief", state: "Brief Ready", note: "" });
  await expect(page.getByRole("heading", { name: "Command Hall", level: 1 })).toBeVisible();
});

test("pre-, active-, and post-RinCon selection uses dated work instead of season status", async ({ page }) => {
  await station(page);
  const pre = await page.evaluate(() => window.ACADEMY_COMMAND_STATION.nowNext({ instant:new Date("2026-09-29T12:00:00-07:00") }));
  expect(pre.now.title).toContain("RC-FULL");
  const active = await page.evaluate(() => window.ACADEMY_COMMAND_STATION.nowNext({ instant:new Date("2026-10-03T12:00:00-07:00") }));
  expect(active.now.title).toContain("RinCon Saturday");
  const post = await page.evaluate(() => window.ACADEMY_COMMAND_STATION.nowNext({ instant:new Date("2026-10-05T12:00:00-07:00") }));
  expect(post.now.title).toContain("RinCon AAR");
});

test("Wednesday practice rolls at exactly 21:00 Phoenix", async ({ page }) => {
  await station(page);
  const events = [
    { id:"practice-a", date:"2027-01-06", kind:"practice", title:"F104", sourceOrder:0 },
    { id:"sunday-a", date:"2027-01-10", kind:"sunday", title:"Sunday", sourceOrder:1 },
  ];
  expect((await nowNext(page, "2027-01-06T20:59:59-07:00", events)).now.id).toBe("practice-a");
  expect((await nowNext(page, "2027-01-06T21:00:00-07:00", events)).now.id).toBe("sunday-a");
});

test("Sunday selection stays on today and never returns a past Sunday", async ({ page }) => {
  await station(page);
  const today = await page.evaluate(() => window.ACADEMY_COMMAND_STATION.sunday({ instant:new Date("2027-01-10T23:59:59-07:00") }));
  const monday = await page.evaluate(() => window.ACADEMY_COMMAND_STATION.sunday({ instant:new Date("2027-01-11T00:00:00-07:00") }));
  expect(today.date).toBe("2027-01-10");
  expect(monday.date).toBe("2027-01-17");
});

test("milestone precedence wins a same-day tie and ties remain exposed", async ({ page }) => {
  await station(page);
  const result = await nowNext(page, "2027-02-01T12:00:00-07:00", [
    { id:"sun", date:"2027-02-02", kind:"sunday", title:"Sunday", sourceOrder:0 },
    { id:"practice", date:"2027-02-02", kind:"practice", title:"Practice", sourceOrder:1 },
    { id:"gate", date:"2027-02-02", kind:"milestone", title:"Deadline", sourceOrder:2 },
  ]);
  expect(result.now.id).toBe("gate");
  expect(result.next.id).toBe("practice");
  expect(result.nowTies.map((item) => item.id)).toEqual(["practice", "sun"]);
  expect(result.nextTies.map((item) => item.id)).toEqual(["sun"]);
});

test("week boundaries are Monday inclusive to next Monday exclusive", async ({ page }) => {
  await station(page);
  const result = await page.evaluate(() => window.ACADEMY_COMMAND_STATION.thisWeek({
    instant:new Date("2027-01-06T12:00:00-07:00"),
    events:[
      {id:"before", date:"2027-01-03", kind:"other"},
      {id:"monday", date:"2027-01-04", kind:"other"},
      {id:"sunday", date:"2027-01-10", kind:"sunday"},
      {id:"after", date:"2027-01-11", kind:"other"},
    ],
  }));
  expect(result.startDate).toBe("2027-01-04");
  expect(result.endDateExclusive).toBe("2027-01-11");
  expect(result.events.map((item) => item.id)).toEqual(["monday", "sunday"]);
  expect(result.actionable.map((item) => item.id)).toEqual(["sunday"]);
});

test("quest attention is honest when empty and capped at five in stable order", async ({ page }) => {
  await station(page);
  const empty = await page.evaluate(() => window.ACADEMY_COMMAND_STATION.attention({ quests:[] }));
  expect(empty.quests).toEqual([]);
  const capped = await page.evaluate(() => window.ACADEMY_COMMAND_STATION.attention({
    quests:Array.from({ length:8 }, (_, index) => ({ id:`q${index}`, done:index === 2 })),
  }));
  expect(capped.quests.map((quest) => quest.id)).toEqual(["q0", "q1", "q3", "q4", "q5"]);
  const live = await page.evaluate(() => window.ACADEMY_COMMAND_STATION.attention());
  expect(live.quests.length).toBeGreaterThan(0);
});

test("public selectors cannot override Phoenix scheduling", async ({ page }) => {
  await station(page);
  const result = await page.evaluate(() => window.ACADEMY_COMMAND_STATION.nowNext({
    instant:new Date("2027-01-07T03:30:00Z"),
    timeZone:"UTC",
    events:[
      {id:"practice", date:"2027-01-06", kind:"practice", sourceOrder:0},
      {id:"next", date:"2027-01-10", kind:"sunday", sourceOrder:1},
    ],
  }));
  expect(result.now.id).toBe("practice");
});

test("only Captured and Drafted content requires attention", async ({ page }) => {
  await station(page);
  const content = await page.evaluate(() => window.ACADEMY_COMMAND_STATION.attention({ contentQueue:[
    {id:"captured", stage:"Captured"}, {id:"draft", stage:"Drafted"},
    {id:"reviewed", stage:"Reviewed"}, {id:"scheduled", stage:"Scheduled"},
    {id:"published", stage:"Published"},
  ] }));
  expect(content.content.map((item) => item.id)).toEqual(["captured", "draft"]);
  const publishedOnly = await page.evaluate(() => window.ACADEMY_COMMAND_STATION.attention({
    contentQueue:[{id:"published", stage:"Published"}],
  }));
  expect(publishedOnly.content).toEqual([]);
});
