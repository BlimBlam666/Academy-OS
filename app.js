(function () {
  "use strict";

  var STORAGE_KEY = "academyOS.phase1.v1";
  var STAGES = ["Captured", "Drafted", "Reviewed", "Scheduled", "Published"];
  var PRACTICE_CONFIG = window.ACADEMY_PRACTICE_SCHEDULE || {courses:[]};
  var CAMPAIGN_CONFIG = window.ACADEMY_CAMPAIGN_CALENDAR || {sundays:[]};
  var RINCON_CONFIG = window.ACADEMY_RINCON_EVENT || {programs:[],resources:[],readiness:[],contentShots:[],days:[],forgeSessions:[]};
  var practiceSessions = buildPracticeSessions();
  var rinconForgeSessions = buildRinconForgeSessions();
  var practiceTrack = automaticPracticeTrack();
  var activePractice = null;
  var calendarMonth = initialCampaignMonth();
  var INTEGRATIONS = [
    {id:"drive",name:"Academy Drive Gateway",group:"Knowledge",description:"The Academy's shared Drive entry point and source network.",url:"https://drive.google.com/drive/folders/1bw6dw3yUQCiJUqgSV7lUnwkm0rTHIe6o"},
    {id:"courseLibrary",name:"Academy Course Library",group:"Curriculum",description:"Master curriculum library for fighter, civic, class, ladder, and knighthood tracks.",url:"https://drive.google.com/drive/folders/1WztnlzH92ZBptMBQWhPNRANSnYN4EHBG"},
    {id:"masterIndex",name:"Master Course Index",group:"Curriculum",description:"Authoritative catalog of 162 confirmed F-series and DS-series courses.",url:"https://docs.google.com/document/d/16SvSi0lz-DXJUWytMTI59WJ-RqfCgOunYFQTm7kwyZA/edit"},
    {id:"fighterTrack",name:"Fighter Course Track",group:"Curriculum",description:"F100 through F500 fighter development series.",url:"https://drive.google.com/drive/folders/1x8_Eca7SITmiRkp1lGcU9DbUjrjmuMHR"},
    {id:"f100",name:"F100 Recruit Foundations",group:"Curriculum",description:"Eleven recruit-foundation courses.",url:"https://drive.google.com/drive/folders/1lH4BRvPuKzKZR6VzTRh4qAHiOdQVr9LQ"},
    {id:"f200",name:"F200 Cadet Fundamentals",group:"Curriculum",description:"Fifteen cadet-fundamentals courses, including F201.",url:"https://drive.google.com/drive/folders/1nrMhYEzZjOEvJW6VEzdxbRAFonJ1H-y8"},
    {id:"f201",name:"F201 · Footwork 101",group:"Curriculum",description:"F200 footwork source retained for a later practice.",url:"https://drive.google.com/file/d/1G1nnnYGI52_RrJmtDNSTHn6YJ-EJeYJ6/view"},
    {id:"civicTrack",name:"Dragonspine Civic Arms",group:"Curriculum",description:"DS100 through DS500 civic leadership and operations courses.",url:"https://drive.google.com/drive/folders/1jwQzCyccNzgtK7NHwympeLk0qWEfYB5t"},
    {id:"classTrack",name:"Class Arts Library",group:"Reference",description:"Working class-track material; verify against the current official Rules of Play.",url:"https://drive.google.com/drive/folders/1dHXezQLGMSfxYqOulcdzK2wfd7G3C4Sg"},
    {id:"ladderTrack",name:"Ladder Awards Series",group:"Reference",description:"LA101 through LA109 reference courses.",url:"https://drive.google.com/drive/folders/1CN1SxTAIky6kKHjRw-Qwta1hrCIHauru"},
    {id:"knighthoodTrack",name:"Knighthood Path Series",group:"Reference",description:"KP101 through KP105 path reference courses.",url:"https://drive.google.com/drive/folders/1G7iSBARmB6Ec0J1CnKnxEr-oaJMpWDNi"},
    {id:"academyResources",name:"Academy Resource Library",group:"Knowledge",description:"Doctrine, manuals, rules sources, teaching aids, and creative resources.",url:"https://drive.google.com/drive/folders/1bw6dw3yUQCiJUqgSV7lUnwkm0rTHIe6o"},
    {id:"preceptorsManual",name:"Preceptor's Manual",group:"Teaching",description:"Academy teaching doctrine and the Explain–Demonstrate–Practice–Correct loop.",url:"https://docs.google.com/document/d/1sAgI7-p00wGdOURvhpUkq9kvkcrWZuuGFuix3XIrh2c/edit"},
    {id:"cadetFieldbook",name:"Cadet Fieldbook",group:"Training",description:"Cadet standards, foundational movement, reflection, and field conduct.",url:"https://docs.google.com/document/d/1ivdeQW42NpnnY7T-_cP1Pke4Odm8YbNGuQ5xQB0hWTw/edit"},
    {id:"academyCorpora",name:"Academy Corpora",group:"Governance",description:"Academy scope, roles, safeguards, and course format.",url:"https://docs.google.com/document/d/1ulSVbHtuWTzcc79tVgcSqkUTfwG5TnRpsrv0YZqz67s/edit"},
    {id:"rulesSource",name:"Rules of Play 8.7 Source",group:"Authority",description:"Academy Drive reference copy; current official rules always take precedence.",url:"https://docs.google.com/document/d/1yMKmMHu2vU3CKmlQeQyvpwv-ETx5kNNr5sfuxnk3DP0/edit"},
    {id:"teachingVisuals",name:"Teaching Flowcharts",group:"Teaching",description:"Whole-Fighter Doctrine, session structure, safeguards, and outcomes visuals.",url:"https://drive.google.com/drive/folders/1f1dtzaof2-ULh0zarj_GdTsKSdDDsnyi"},
    {id:"creativeAssets",name:"Creative Asset Foundry",group:"Publishing",description:"Academy propaganda and creative-expression source assets.",url:"https://drive.google.com/drive/folders/1OKAOEObgNh03jKNBLepytDLeO20oBurs"},
    {id:"trainingEngine",name:"Tabletop Training Engine",group:"Training",description:"Scenario-based teaching engine, maps, and sanitized player materials.",url:"https://drive.google.com/drive/folders/1zBBTAeKFhb5Y2PMF1IJyh91qOSssYk7u"},
    {id:"heraldry",name:"Academy Heraldry",group:"Identity",description:"Official Academy coat-of-arms source files.",url:"https://drive.google.com/drive/folders/1yHmetyIyWEirn6dPdzTM0oSkLhBw_Pjo"},
    {id:"reignOperations",name:"Black Root Reign Operations",group:"Operations",description:"Reign handbooks, agenda, player materials, and operational sheets.",url:"https://drive.google.com/drive/folders/1nQuXShQyDknrgEbDWuuS3sochCKyix8G"},
    {id:"reignHandbook",name:"Reign Operations Handbook",group:"Operations",description:"Weekly operating plan and published reign schedule.",url:"https://docs.google.com/document/d/1a0bKs7j8OiCUkF-p8w3nHPKVJ3mNA9EC/edit"},
    {id:"reignAgenda",name:"Black Root Reign Agenda",group:"Operations",description:"Agenda and coordination reference for the reign.",url:"https://docs.google.com/document/d/1QCjx0DLe1HtQBz_f-LGqWxhS8AmHzzCD/edit"},
    {id:"blackRootBook",name:"Black Root Reign Book",group:"Operations",description:"Black Root Reign v2 campaign and narrative source.",url:"https://docs.google.com/document/d/1NcYgnK_LOC_pzmAqaKfF6HM-LYJODPGOSaRL263JRx8/edit"},
    {id:"blackRootPublic",name:"Black Root Public Sheets",group:"Operations",description:"Participant-facing reign sheets and public operational materials.",url:"https://drive.google.com/drive/folders/10PcE5AvBzc62Cy5bB6Lptu3g1eocZBVU"},
    {id:"calendar",name:"Academy Calendar",group:"Operations",description:"Schedule practices, events, deadlines, and publishing.",url:"https://calendar.google.com/calendar/u/0/r"},
    {id:"rinconSite",name:"Amtgard at RinCon",group:"Outreach",description:"Public newcomer page for the convention and January 6 Academy invitation.",url:"https://blimblam666.github.io/AMTGARD_At_RinCon/"},
    {id:"rinconVolunteers",name:"RinCon Volunteer Sign-Up",group:"Operations",description:"Live staffing and shift-coverage sheet for October 2–4.",url:"https://docs.google.com/spreadsheets/d/1Udlmi7UVqWyJTMsczCREIsUO-GLDS_8btiwl4XsXos0/edit"},
    {id:"fighterCoach",name:"Academy Fighter Coach",group:"Training",description:"Deliberate-practice sessions, logs, and Warlord Path.",url:"https://blimblam666.github.io/foam-fighting-mobile-coach/"},
    {id:"scorer",name:"Tournament Scorer",group:"Training",description:"Bear Pit, single-elimination, and double-elimination scoring.",url:"https://blimblam666.github.io/Academy_Tournament_Scorer/"},
    {id:"ork",name:"ORK",group:"Amtgard",description:"Amtgard records, park, household, and awards resources.",url:"https://ork.amtgard.com/orkui/"},
    {id:"github",name:"Academy OS Repository",group:"System",description:"Source, documentation, releases, and change history.",url:"https://github.com/BlimBlam666/Academy-OS"},
    {id:"youtube",name:"Academy YouTube",group:"Publishing",description:"Video lessons, practice recaps, and demonstrations.",url:"https://www.youtube.com/@AcademyofMercenaryArts"},
    {id:"facebook",name:"Academy Facebook",group:"Publishing",description:"Community announcements and event stories.",url:"https://www.facebook.com/profile.php?id=61591424160727"},
    {id:"instagram",name:"Academy Instagram",group:"Publishing",description:"Short visual lessons and field moments.",url:"https://www.instagram.com/academyofmercenaryarts/"},
    {id:"patreon",name:"Academy Patreon",group:"Publishing",description:"Supporter updates and deeper behind-the-scenes material.",url:"https://www.patreon.com/cw/AcademyOfMercenaryArts"}
  ];

  var defaultState = {
    quests: [
      {id:"q-theme",text:"Install and select the Academy Omarchy theme",done:false},
      {id:"q-gates",text:"Verified Academy social gates connected",done:true},
      {id:"q-library",text:"Four Academy Drive libraries indexed",done:true},
      {id:"q-pilot",text:"Prepare the January 6 F104 fundamentals practice",done:false},
      {id:"q-rincon",text:"Complete the RinCon readiness ledger and confirm class times",done:false}
    ],
    practiceChecks:{},
    rinconChecks:{},
    rinconShots:{},
    aars:[],
    integrations:{},
    contentQueue:[],
    drafts:{facebook:"",instagram:"",youtube:"",patreon:""},
    activeDraft:"facebook"
  };

  var state = loadState();

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadState() {
    var base = clone(defaultState);
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      Object.keys(base).forEach(function (key) {
        if (saved[key] !== undefined) base[key] = saved[key];
      });
    } catch (error) {
      console.warn("Academy OS could not read saved state.", error);
    }
    base.quests = (base.quests || []).map(function (quest) {
      if (quest.id === "q-pilot") quest.text = "Prepare the January 6 F104 fundamentals practice";
      return quest;
    });
    if (!base.quests.some(function (quest) { return quest.id === "q-rincon"; })) {
      base.quests.push({id:"q-rincon",text:"Complete the RinCon readiness ledger and confirm class times",done:false});
    }
    base.rinconChecks = base.rinconChecks || {};
    base.rinconShots = base.rinconShots || {};
    return base;
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char];
    });
  }

  function toast(message) {
    var node = document.getElementById("toast");
    node.textContent = message;
    node.classList.add("show");
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(function () { node.classList.remove("show"); }, 2400);
  }

  function showView(name) {
    document.querySelectorAll(".view").forEach(function (view) {
      view.classList.toggle("active", view.id === "view-" + name);
    });
    document.querySelectorAll(".nav-button").forEach(function (button) {
      button.classList.toggle("active", button.dataset.view === name);
    });
    window.scrollTo({top:0,behavior:"smooth"});
  }

  document.querySelectorAll(".nav-button").forEach(function (button) {
    button.addEventListener("click", function () { showView(button.dataset.view); });
  });
  document.querySelectorAll("[data-go]").forEach(function (button) {
    button.addEventListener("click", function () { showView(button.dataset.go); });
  });


  function parsePracticeDate(value) {
    var parts = String(value || "").split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2], 19, 0, 0);
  }

  function practiceDateISO(date) {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }

  function buildPracticeSessions() {
    if (!PRACTICE_CONFIG.courses || !PRACTICE_CONFIG.courses.length) return [];
    var start = parsePracticeDate(PRACTICE_CONFIG.startDate);
    return PRACTICE_CONFIG.courses.map(function (course, index) {
      var date = new Date(start.getTime());
      date.setDate(start.getDate() + index * (PRACTICE_CONFIG.cadenceDays || 7));
      return Object.assign({}, course, {date:practiceDateISO(date)});
    });
  }

  function buildRinconForgeSessions() {
    return (RINCON_CONFIG.forgeSessions || []).map(function (session) { return Object.assign({}, session); });
  }

  function automaticPracticeTrack() {
    if (!RINCON_CONFIG.endDate) return "academy";
    var close = campaignDate(RINCON_CONFIG.endDate);
    close.setHours(23, 59, 59, 999);
    return new Date() <= close ? "rincon" : "academy";
  }

  function activeForgeSessions() {
    return practiceTrack === "rincon" ? rinconForgeSessions : practiceSessions;
  }

  function scheduledPractice(sessions) {
    sessions = sessions || practiceSessions;
    if (!sessions.length) return null;
    var now = new Date();
    var today = practiceDateISO(now);
    var todaySession = sessions.find(function (session) { return session.date === today; });
    var rolloverHour = PRACTICE_CONFIG.rolloverHour === undefined ? 21 : PRACTICE_CONFIG.rolloverHour;
    if (todaySession && now.getHours() >= rolloverHour) {
      return sessions.find(function (session) { return session.date > today; }) || todaySession;
    }
    return sessions.find(function (session) { return session.date >= today; }) || sessions[sessions.length - 1];
  }

  function formatPracticeDate(value, includeYear) {
    return parsePracticeDate(value).toLocaleDateString([], {
      weekday:"long", month:"long", day:"numeric", year:includeYear ? "numeric" : undefined
    });
  }

  function nextPracticeAfter(session, sessions) {
    sessions = sessions || practiceSessions;
    var index = sessions.indexOf(session);
    return index >= 0 && index + 1 < sessions.length ? sessions[index + 1] : null;
  }

  function campaignMonthDate(value) {
    var parts = String(value || "2027-01").split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, 1, 12, 0, 0);
  }

  function campaignDate(value) {
    var parts = String(value || "").split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0);
  }

  function initialCampaignMonth() {
    var first = CAMPAIGN_CONFIG.firstMonth || "2027-01";
    var last = CAMPAIGN_CONFIG.lastMonth || first;
    var now = new Date();
    var current = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
    if (current < first) current = first;
    if (current > last) current = last;
    return campaignMonthDate(current);
  }

  function campaignPracticeDetails(index) {
    var games = [
      ["Militia Team Elimination", "Shadows Gather"],
      ["Ring the Bell", "Sound the Ward"],
      ["Hold the Location", "The Black Root Stirs"],
      ["Capture the Flag", "The Masked Hunter"],
      ["Very Heavy Object", "Carry the Mask"],
      ["Castle Defense", "Ward the Prisoner"],
      ["Ring the Bell", "Crack the Mask"]
    ];
    return games[index] || ["Militia fight game", "Upcoming Sunday objective"];
  }

  function campaignEvents() {
    var parkEvents = (CAMPAIGN_CONFIG.sundays || []).map(function (item, index) {
      return Object.assign({}, item, {
        id:"park-" + index,
        type:item.story ? "story" : "park",
        title:item.game,
        sourceUrl:item.sourceUrl || CAMPAIGN_CONFIG.handbookUrl,
        calendarUrl:CAMPAIGN_CONFIG.calendarUrl
      });
    });
    var milestoneEvents = (CAMPAIGN_CONFIG.milestones || []).map(function (item, index) {
      return Object.assign({}, item, {
        id:"milestone-" + index,
        type:item.type || "launch",
        game:item.title,
        calendarUrl:CAMPAIGN_CONFIG.calendarUrl,
        sourceLabel:item.sourceLabel || "Open Plan"
      });
    });
    var courseEvents = practiceSessions.map(function (session, index) {
      var details = campaignPracticeDetails(index);
      return {
        id:"practice-" + session.code,
        type:"practice",
        date:session.date,
        time:PRACTICE_CONFIG.timeLabel,
        focus:"Wednesday Fighters Practice",
        title:session.code + " · " + session.title,
        game:details[0] + " · Sunday link: " + details[1],
        purpose:session.purpose,
        sourceUrl:session.sourceUrl,
        calendarUrl:CAMPAIGN_CONFIG.calendarUrl
      };
    });
    return parkEvents.concat(courseEvents, milestoneEvents).sort(function (a, b) {
      return a.date.localeCompare(b.date) || (a.type === "practice" ? -1 : 1);
    });
  }

  function bindCalendarEventButtons() {
    document.querySelectorAll("[data-campaign-event]").forEach(function (button) {
      button.addEventListener("click", function () { openCampaignEvent(button.dataset.campaignEvent); });
    });
  }

  function renderCampaignCalendar() {
    var grid = document.getElementById("campaign-calendar-grid");
    if (!grid) return;
    var year = calendarMonth.getFullYear();
    var month = calendarMonth.getMonth();
    var monthKey = year + "-" + String(month + 1).padStart(2, "0");
    var allEvents = campaignEvents();
    var monthEvents = allEvents.filter(function (item) { return item.date.slice(0, 7) === monthKey; });
    var firstWeekday = new Date(year, month, 1, 12).getDay();
    var dayCount = new Date(year, month + 1, 0, 12).getDate();
    var cells = [];

    document.getElementById("calendar-month").textContent = calendarMonth.toLocaleDateString([], {month:"long",year:"numeric"});
    document.getElementById("calendar-agenda-heading").textContent = calendarMonth.toLocaleDateString([], {month:"long"}) + " agenda";
    document.getElementById("calendar-event-count").textContent = monthEvents.length;

    for (var blank = 0; blank < firstWeekday; blank += 1) cells.push('<div class="calendar-day outside" aria-hidden="true"></div>');
    for (var day = 1; day <= dayCount; day += 1) {
      var iso = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(day).padStart(2, "0");
      var dayEvents = monthEvents.filter(function (item) { return item.date === iso; });
      cells.push('<div class="calendar-day' + (dayEvents.length ? " has-event" : "") + '"><span class="calendar-date">' + day + '</span>' + dayEvents.map(function (item) {
        return '<button class="calendar-chip ' + escapeHtml(item.type) + '" type="button" data-campaign-event="' + escapeHtml(item.id) + '"><b>' + escapeHtml(item.title || item.game) + '</b><small>' + escapeHtml(item.time) + '</small></button>';
      }).join("") + '</div>');
    }
    grid.innerHTML = cells.join("");

    var agenda = document.getElementById("calendar-agenda");
    agenda.innerHTML = monthEvents.length ? monthEvents.map(function (item) {
      return '<button class="agenda-event ' + escapeHtml(item.type) + '" type="button" data-campaign-event="' + escapeHtml(item.id) + '"><time datetime="' + escapeHtml(item.date) + '">' + escapeHtml(campaignDate(item.date).toLocaleDateString([], {weekday:"short",month:"short",day:"numeric"})) + '</time><span><b>' + escapeHtml(item.title || item.game) + '</b><small>' + escapeHtml(item.focus) + ' · ' + escapeHtml(item.time) + '</small></span><span aria-hidden="true">›</span></button>';
    }).join("") : '<p class="empty-state">No confirmed campaign events are loaded for this month.</p>';

    var first = CAMPAIGN_CONFIG.firstMonth || "2027-01";
    var last = CAMPAIGN_CONFIG.lastMonth || "2027-07";
    document.getElementById("calendar-previous").disabled = monthKey <= first;
    document.getElementById("calendar-next").disabled = monthKey >= last;
    bindCalendarEventButtons();
  }

  function openCampaignEvent(id) {
    var item = campaignEvents().find(function (candidate) { return candidate.id === id; });
    if (!item) return;
    var dialog = document.getElementById("calendar-event-dialog");
    var typeLabels = {practice:"Wednesday Fighters Practice", story:"Story-changing Sunday game", park:"Sunday Park Day", launch:"Academy Launch Campaign", outreach:"Public Outreach", craft:"Crown Qualifications", ceremony:"Community Celebration"};
    document.getElementById("calendar-dialog-type").textContent = typeLabels[item.type] || "Campaign Event";
    document.getElementById("calendar-dialog-title").textContent = item.title || item.game;
    document.getElementById("calendar-dialog-meta").innerHTML = '<span>' + escapeHtml(campaignDate(item.date).toLocaleDateString([], {weekday:"long",month:"long",day:"numeric",year:"numeric"})) + '</span><span>' + escapeHtml(item.time) + '</span><span>' + escapeHtml(item.focus) + '</span>';
    document.getElementById("calendar-dialog-purpose").textContent = item.purpose;
    var sourceLabel = item.type === "practice" ? "Open Course" : (item.sourceLabel || (item.type === "park" || item.type === "story" ? "Open Battle Game" : "Open Plan"));
    document.getElementById("calendar-dialog-actions").innerHTML = '<a class="primary-button link-button" href="' + escapeHtml(item.sourceUrl) + '" target="_blank" rel="noopener">' + escapeHtml(sourceLabel) + ' ↗</a><a class="quiet-button link-button" href="' + escapeHtml(item.calendarUrl) + '" target="_blank" rel="noopener">Open Google Calendar ↗</a>';
    dialog.showModal();
  }

  document.getElementById("calendar-previous").addEventListener("click", function () {
    calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1, 12);
    renderCampaignCalendar();
  });
  document.getElementById("calendar-next").addEventListener("click", function () {
    calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1, 12);
    renderCampaignCalendar();
  });
  document.getElementById("calendar-dialog-close").addEventListener("click", function () {
    document.getElementById("calendar-event-dialog").close();
  });

  function renderPractice() {
    var sessions = activeForgeSessions();
    activePractice = scheduledPractice(sessions);
    if (!activePractice) return;

    var courseIndex = sessions.indexOf(activePractice);
    var next = nextPracticeAfter(activePractice, sessions);
    var trackName = practiceTrack === "rincon" ? "RinCon rehearsal" : "Academy course";
    var timeLabel = activePractice.timeLabel || PRACTICE_CONFIG.timeLabel;
    var previewDays = PRACTICE_CONFIG.previewDays || 7;
    var activeDate = parsePracticeDate(activePractice.date);
    var reviewDate = new Date(activeDate.getTime());
    reviewDate.setDate(reviewDate.getDate() - previewDays);
    var now = new Date();
    var dayDistance = Math.ceil((activeDate.getTime() - now.getTime()) / 86400000);

    document.querySelectorAll("[data-practice-track]").forEach(function (button) {
      var selected = button.dataset.practiceTrack === practiceTrack;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    document.getElementById("practice-label").textContent = "Practice Forge · " + trackName + " " + (courseIndex + 1) + " of " + sessions.length;
    document.getElementById("practice-title").textContent = activePractice.code + " · " + activePractice.title;
    document.getElementById("practice-motto").textContent = activePractice.motto;
    document.getElementById("practice-purpose").textContent = activePractice.purpose;
    document.getElementById("practice-course-link").href = activePractice.sourceUrl;
    document.getElementById("practice-course-link").textContent = (practiceTrack === "rincon" ? "Open Rehearsal Agenda · " : "Open Current Course · ") + activePractice.code + " ↗";
    document.getElementById("practice-meta").innerHTML =
      "<span>" + escapeHtml(formatPracticeDate(activePractice.date, true)) + "</span>" +
      "<span>" + escapeHtml(timeLabel) + "</span>" +
      "<span>" + escapeHtml(activePractice.code) + "</span>" +
      "<span>" + escapeHtml(practiceTrack === "rincon" ? "Convention preparation" : "Wednesday curriculum") + "</span>";

    var reviewStatus = document.getElementById("practice-review-status");
    if (activePractice.date === practiceDateISO(now)) {
      reviewStatus.textContent = "Runs today";
      reviewStatus.className = "status-pill review-open";
    } else if (dayDistance >= 0 && dayDistance <= previewDays) {
      reviewStatus.textContent = "Ready for review";
      reviewStatus.className = "status-pill review-open";
    } else if (dayDistance > previewDays) {
      reviewStatus.textContent = "Scheduled";
      reviewStatus.className = "status-pill";
    } else {
      reviewStatus.textContent = "Reference session";
      reviewStatus.className = "status-pill";
    }
    document.getElementById("practice-track-window").textContent = practiceTrack === "rincon"
      ? "Four rehearsals · September 9–30 · RinCon October 2–4"
      : "Twenty-two Wednesday courses · January 6–June 2";
    document.getElementById("practice-automation-note").textContent = dayDistance > previewDays
      ? "Review window opens " + formatPracticeDate(practiceDateISO(reviewDate), false) + ". You can still open the full agenda now."
      : (practiceTrack === "academy"
        ? "This lesson is inside its seven-day review window. After Wednesday practice, the Forge advances automatically."
        : "This rehearsal is inside its seven-day review window. The next rehearsal advances automatically after Wednesday night.");

    var firstDrills = activePractice.drills.slice(0, 2).join(" and ");
    var laterDrills = activePractice.drills.slice(2).join(", ") || "repeat the primary drill with one correction";
    var phases = activePractice.phases || [
      {id:"prep", title:"6:45 · Preparation — " + PRACTICE_CONFIG.prepMinutes + " minutes", description:"Inspect the field, stage equipment, open the source course, and confirm consent and safety needs."},
      {id:"muster", title:"7:00 · Muster and warm-up — 20 minutes", description:"Welcome fighters, check readiness, review prior fundamentals, and state today's purpose: " + activePractice.purpose},
      {id:"lesson", title:"7:20 · Source lesson — 30 minutes", description:"Teach directly from " + activePractice.code + ". Establish the core concept, then run " + firstDrills + "."},
      {id:"drill", title:"7:50 · Guided drilling — 30 minutes", description:"Continue with " + laterDrills + ". Give one correction at a time and repeat until the behavior becomes clearer."},
      {id:"pressure", title:"8:20 · Field application — 30 minutes", description:activePractice.application},
      {id:"close", title:"8:50 · Passing standard and close — 10 minutes", description:"Observe the listed completion standards, name one success and one next improvement, then read the closing script."},
      {id:"aar", title:"9:00 · Post-practice closeout — " + PRACTICE_CONFIG.closeoutMinutes + " minutes", description:"Account for equipment, record attendance privately, complete the AAR, preserve approved media, and prepare the next course."}
    ];

    document.getElementById("practice-timeline").innerHTML = phases.map(function (phase) {
      var key = practiceTrack + "-" + activePractice.code.toLowerCase() + "-" + phase.id;
      return '<li><label><input type="checkbox" data-practice-check="' + key + '"> <span><b>' +
        escapeHtml(phase.title) + "</b>" + escapeHtml(phase.description) + "</span></label></li>";
    }).join("");

    document.getElementById("practice-standards").innerHTML = activePractice.standards.map(function (standard) {
      return "<li>" + escapeHtml(standard) + "</li>";
    }).join("");
    document.getElementById("practice-cues").innerHTML = activePractice.cues.map(function (cue) {
      return "<span>" + escapeHtml(cue) + "</span>";
    }).join("");
    document.getElementById("practice-opening").textContent = "“" + activePractice.opening + "”";
    document.getElementById("practice-closing").textContent = "“" + activePractice.closing + "”";
    document.getElementById("practice-rotation-title").textContent = practiceTrack === "rincon" ? "September teaching rehearsals" : "January–June Wednesdays";
    document.getElementById("practice-rotation").innerHTML = sessions.map(function (session) {
      var current = session.code === activePractice.code && session.date === activePractice.date ? " active" : "";
      return '<a class="rotation-item' + current + '" href="' + escapeHtml(session.sourceUrl) +
        '" target="_blank" rel="noopener"><b>' + escapeHtml(session.code) + "</b><span>" +
        escapeHtml(formatPracticeDate(session.date, false)) + "</span><small>" +
        escapeHtml(session.title) + "</small></a>";
    }).join("");
    document.getElementById("next-practice").innerHTML = next
      ? '<a href="' + escapeHtml(next.sourceUrl) + '" target="_blank" rel="noopener"><b>' + escapeHtml(next.code + " · " + next.title) + '</b><span>' + escapeHtml(formatPracticeDate(next.date, true)) + '</span><small>Opens automatically after the current Wednesday · view now ↗</small></a>'
      : '<b>End of this loaded track</b><span>' + (practiceTrack === "rincon" ? "The October 1 loadout gate follows these rehearsals." : "F215 closes the planned F100/F200 semester on June 2.") + '</span>';

    var contentEvent = document.getElementById("content-event");
    if (contentEvent && (!contentEvent.value || contentEvent.value === "Academy Fighters Practice" || contentEvent.value.indexOf("F201") === 0)) {
      contentEvent.value = activePractice.code + " · " + activePractice.title;
    }
  }

  document.querySelectorAll("[data-practice-track]").forEach(function (button) {
    button.addEventListener("click", function () {
      practiceTrack = button.dataset.practiceTrack;
      renderPractice();
      bindPracticeChecks();
      toast(practiceTrack === "rincon" ? "RinCon rehearsal track opened." : "Academy Wednesday curriculum opened.");
    });
  });

  function updateClock() {
    var now = new Date();
    document.getElementById("clock").textContent = now.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
    document.getElementById("today").textContent = now.toLocaleDateString([], {weekday:"long",month:"long",day:"numeric",year:"numeric"});
    var session = scheduledPractice();
    var countdown = document.getElementById("countdown");
    var rinconOpen = RINCON_CONFIG.startDate ? campaignDate(RINCON_CONFIG.startDate) : null;
    var rinconClose = RINCON_CONFIG.endDate ? new Date(campaignDate(RINCON_CONFIG.endDate).getTime() + 43200000) : null;
    if (rinconOpen && now < rinconClose) {
      var rinconDistance = rinconOpen.getTime() - now.getTime();
      document.getElementById("next-event-label").textContent = rinconDistance > 0 ? "Next field operation" : "Field operation underway";
      document.getElementById("next-event-course").textContent = RINCON_CONFIG.title;
      document.getElementById("next-event-date").textContent = RINCON_CONFIG.dates + " · " + RINCON_CONFIG.venue;
      if (rinconDistance <= 0) countdown.textContent = "RinCon is underway · open Mission Control";
      else {
        var rinconDays = Math.floor(rinconDistance / 86400000);
        var rinconHours = Math.floor((rinconDistance % 86400000) / 3600000);
        countdown.textContent = rinconDays + " days · " + rinconHours + " hours until move-in";
      }
      return;
    }
    if (!session) {
      countdown.textContent = "No practice course is scheduled";
      return;
    }

    var practiceDate = parsePracticeDate(session.date);
    var distance = practiceDate.getTime() - now.getTime();
    var today = practiceDateISO(now);
    document.getElementById("next-event-label").textContent = session.date === today ? "Today's practice" : "Next practice";
    document.getElementById("next-event-course").textContent = session.code + " · " + session.title;
    document.getElementById("next-event-date").textContent = formatPracticeDate(session.date, true) + " · " + PRACTICE_CONFIG.timeLabel;

    if (distance <= 0 && session.date === today) {
      countdown.textContent = "Practice is underway or complete";
    } else if (distance <= 0) {
      countdown.textContent = "Current rotation complete";
    } else {
      var days = Math.floor(distance / 86400000);
      var hours = Math.floor((distance % 86400000) / 3600000);
      countdown.textContent = days + " days · " + hours + " hours until muster";
    }
  }
  updateClock();
  window.setInterval(updateClock, 30000);

  function renderRinCon() {
    if (!RINCON_CONFIG.title) return;
    document.getElementById("rincon-title").textContent = RINCON_CONFIG.title;
    document.getElementById("rincon-location").textContent = RINCON_CONFIG.dates + " · " + RINCON_CONFIG.venue + " · " + RINCON_CONFIG.location;
    document.getElementById("rincon-status").textContent = RINCON_CONFIG.status;
    document.getElementById("rincon-master-plan").href = RINCON_CONFIG.missionControlUrl;
    document.getElementById("rincon-volunteers").href = RINCON_CONFIG.volunteerSheet;
    document.getElementById("rincon-public-site").href = RINCON_CONFIG.publicSite;

    var now = new Date();
    var opening = campaignDate(RINCON_CONFIG.startDate);
    var closing = new Date(campaignDate(RINCON_CONFIG.endDate).getTime() + 43200000);
    var days = Math.ceil((opening.getTime() - now.getTime()) / 86400000);
    var daysNode = document.getElementById("rincon-days");
    var labelNode = document.getElementById("rincon-countdown-label");
    if (now > closing) { daysNode.textContent = "AAR"; labelNode.textContent = "close the loop and preserve the lesson"; }
    else if (days <= 0) { daysNode.textContent = "NOW"; labelNode.textContent = "RinCon field operation underway"; }
    else { daysNode.textContent = days; labelNode.textContent = days === 1 ? "day until doors open" : "days until doors open"; }

    document.getElementById("rincon-programs").innerHTML = RINCON_CONFIG.programs.map(function (program) {
      return '<article class="program-card"><div class="program-meta"><span>' + escapeHtml(program.badge) + '</span><span>' + escapeHtml(program.status) + '</span></div><h4>' + escapeHtml(program.title) + '</h4><p>' + escapeHtml(program.summary) + '</p><a class="quiet-button link-button" href="' + escapeHtml(program.agendaUrl) + '" target="_blank" rel="noopener">' + escapeHtml(program.action) + ' ↗</a></article>';
    }).join("");

    document.getElementById("rincon-days-list").innerHTML = RINCON_CONFIG.days.map(function (day) {
      return '<div class="watch-day"><b>' + escapeHtml(day.label) + '</b><small>' + escapeHtml(day.hours) + '</small>' + day.blocks.map(function (block) { return '<span>' + escapeHtml(block) + '</span>'; }).join("") + '</div>';
    }).join("");

    document.getElementById("rincon-resources").innerHTML = RINCON_CONFIG.resources.map(function (resource) {
      return '<a class="resource-card" href="' + escapeHtml(resource.url) + '" target="_blank" rel="noopener"><span>' + escapeHtml(resource.kind) + '</span><b>' + escapeHtml(resource.title) + '</b></a>';
    }).join("");

    document.getElementById("rincon-readiness").innerHTML = RINCON_CONFIG.readiness.map(function (item) {
      return '<label class="mission-check"><input type="checkbox" data-rincon-check="' + escapeHtml(item.id) + '" ' + (state.rinconChecks[item.id] ? "checked" : "") + '><span>' + escapeHtml(item.label) + '</span></label>';
    }).join("");
    document.querySelectorAll("[data-rincon-check]").forEach(function (input) {
      input.addEventListener("change", function () {
        state.rinconChecks[input.dataset.rinconCheck] = input.checked;
        saveState(); updateRinConReadiness();
      });
    });

    document.getElementById("rincon-content-shots").innerHTML = RINCON_CONFIG.contentShots.map(function (item) {
      return '<label class="mission-check"><input type="checkbox" data-rincon-shot="' + escapeHtml(item.id) + '" ' + (state.rinconShots[item.id] ? "checked" : "") + '><span>' + escapeHtml(item.label) + '</span></label>';
    }).join("");
    document.querySelectorAll("[data-rincon-shot]").forEach(function (input) {
      input.addEventListener("change", function () {
        state.rinconShots[input.dataset.rinconShot] = input.checked;
        saveState();
      });
    });
    updateRinConReadiness();
  }

  function updateRinConReadiness() {
    var done = RINCON_CONFIG.readiness.filter(function (item) { return state.rinconChecks[item.id]; }).length;
    document.getElementById("rincon-readiness-count").textContent = done + "/" + RINCON_CONFIG.readiness.length;
  }

  document.getElementById("rincon-send-to-foundry").addEventListener("click", function () {
    document.getElementById("content-event").value = "Amtgard at RinCon 2026";
    document.getElementById("content-audience").value = "RinCon visitors, Tucson newcomers, and future Academy cadets";
    document.getElementById("content-cta").value = "Join Obsidian Gate and continue at the Academy launch on January 6, 2027.";
    document.getElementById("content-moment").value = "";
    document.getElementById("content-lesson").value = "";
    showView("content");
    document.getElementById("content-moment").focus();
    toast("RinCon source loaded. Add the true moment and lesson before forging drafts.");
  });

  function integrationUrl(item) {
    return state.integrations[item.id] || item.url || "";
  }

  function renderQuickLinks() {
    var ids = ["rinconSite","rinconVolunteers","courseLibrary","academyResources","reignHandbook","calendar","fighterCoach","scorer","ork","youtube","github"];
    var holder = document.getElementById("quick-links");
    holder.innerHTML = ids.map(function (id) {
      var item = INTEGRATIONS.find(function (candidate) { return candidate.id === id; });
      var url = integrationUrl(item);
      if (!url) {
        return '<button class="quick-link" data-configure-gate="' + item.id + '"><span class="gate-icon">◇</span><b>' + escapeHtml(item.name) + '</b><span>Configure this gate</span></button>';
      }
      return '<a class="quick-link" href="' + escapeHtml(url) + '" target="_blank" rel="noopener"><span class="gate-icon">◆</span><b>' + escapeHtml(item.name) + '</b><span>' + escapeHtml(item.group) + '</span></a>';
    }).join("");
    holder.querySelectorAll("[data-configure-gate]").forEach(function (button) {
      button.addEventListener("click", openSettings);
    });
  }

  function renderQuests() {
    var holder = document.getElementById("quest-list");
    var remaining = state.quests.filter(function (quest) { return !quest.done; }).length;
    document.getElementById("quest-count").textContent = remaining;
    if (!state.quests.length) {
      holder.innerHTML = '<p class="empty-state">The ledger is clear.</p>';
      return;
    }
    holder.innerHTML = state.quests.map(function (quest) {
      return '<div class="quest-item ' + (quest.done ? "done" : "") + '"><input type="checkbox" data-quest-toggle="' + escapeHtml(quest.id) + '" ' + (quest.done ? "checked" : "") + ' aria-label="Complete quest"><span>' + escapeHtml(quest.text) + '</span><button class="quest-delete" data-quest-delete="' + escapeHtml(quest.id) + '" aria-label="Delete quest">×</button></div>';
    }).join("");
    holder.querySelectorAll("[data-quest-toggle]").forEach(function (input) {
      input.addEventListener("change", function () {
        var quest = state.quests.find(function (item) { return item.id === input.dataset.questToggle; });
        if (quest) quest.done = input.checked;
        saveState(); renderQuests();
      });
    });
    holder.querySelectorAll("[data-quest-delete]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.quests = state.quests.filter(function (item) { return item.id !== button.dataset.questDelete; });
        saveState(); renderQuests();
      });
    });
  }

  document.getElementById("quest-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var input = document.getElementById("quest-input");
    var text = input.value.trim();
    if (!text) return;
    state.quests.unshift({id:"q-" + Date.now(),text:text,done:false});
    input.value = "";
    saveState(); renderQuests(); toast("Quest added to the ledger.");
  });

  function renderChronicle() {
    var holder = document.getElementById("chronicle-list");
    if (!state.aars.length) {
      holder.className = "chronicle-list empty-state";
      holder.textContent = "No entries yet. The first honest record begins the archive.";
      return;
    }
    holder.className = "chronicle-list";
    holder.innerHTML = state.aars.slice().reverse().slice(0,5).map(function (entry) {
      return '<div class="chronicle-entry"><b>' + escapeHtml(entry.event) + '</b><span>' + escapeHtml(entry.date) + ' · Next: ' + escapeHtml(entry.next) + '</span></div>';
    }).join("");
  }

  function bindPracticeChecks() {
    document.querySelectorAll("[data-practice-check]").forEach(function (checkbox) {
      checkbox.checked = Boolean(state.practiceChecks[checkbox.dataset.practiceCheck]);
      checkbox.addEventListener("change", function () {
        state.practiceChecks[checkbox.dataset.practiceCheck] = checkbox.checked;
        saveState(); updatePracticeProgress();
      });
    });
    updatePracticeProgress();
  }

  function updatePracticeProgress() {
    var boxes = Array.from(document.querySelectorAll("[data-practice-check]"));
    var complete = boxes.filter(function (box) { return box.checked; }).length;
    var percent = boxes.length ? Math.round(complete / boxes.length * 100) : 0;
    document.querySelector("#practice-progress span").style.width = percent + "%";
    document.getElementById("practice-progress").setAttribute("aria-label", percent + "% complete");
  }
  updatePracticeProgress();

  function aarValues() {
    return {
      event:activePractice ? activePractice.code + " · " + activePractice.title : "Academy Fighters Practice",
      date:new Date().toLocaleString(),
      happened:document.getElementById("aar-happened").value.trim(),
      worked:document.getElementById("aar-worked").value.trim(),
      improve:document.getElementById("aar-improve").value.trim(),
      next:document.getElementById("aar-next").value.trim(),
      story:document.getElementById("aar-story").value.trim()
    };
  }

  document.getElementById("aar-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var entry = aarValues();
    state.aars.push(entry);
    saveState(); renderChronicle();
    event.target.reset();
    toast("AAR sealed in the local Chronicle.");
  });

  document.getElementById("send-to-foundry").addEventListener("click", function () {
    var entry = aarValues();
    document.getElementById("content-event").value = entry.event;
    document.getElementById("content-moment").value = entry.story || entry.happened;
    document.getElementById("content-lesson").value = entry.worked || entry.improve;
    showView("content");
    toast("Field notes carried to the Content Foundry.");
  });

  function forgeDrafts(source) {
    var hashtags = "#AcademyOfMercenaryArts #Amtgard #FoamFighting #DevelopingFighters #BuildingWarlords";
    var safe = "Consent: " + source.consent + ".";
    return {
      facebook:
        source.event + "\n\n" +
        source.moment + "\n\n" +
        "The lesson: " + source.lesson + "\n\n" +
        source.cta + "\n\n" + hashtags + "\n\n" + safe,
      instagram:
        source.moment + "\n\n" +
        "⚔️ " + source.lesson + "\n\n" +
        source.cta + "\n\n" + hashtags + " #LARPTraining",
      youtube:
        "TITLE\n" + source.event + " | Academy Field Lesson\n\nDESCRIPTION\n" +
        source.moment + "\n\nWhat fighters can practice:\n" + source.lesson +
        "\n\n" + source.cta +
        "\n\nChapters and source links: add after review.\n\n" + hashtags + "\n\n" + safe,
      patreon:
        source.event + " — Field Notes\n\n" +
        source.moment + "\n\nWhat we learned\n" + source.lesson +
        "\n\nWhat comes next\n" + source.cta +
        "\n\nSupporter addition: add one drill detail, reflection, or behind-the-scenes image after consent review.\n\n" + safe
    };
  }

  document.getElementById("content-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var source = {
      event:document.getElementById("content-event").value.trim(),
      audience:document.getElementById("content-audience").value.trim(),
      moment:document.getElementById("content-moment").value.trim(),
      lesson:document.getElementById("content-lesson").value.trim(),
      cta:document.getElementById("content-cta").value.trim(),
      consent:document.getElementById("content-consent").value
    };
    state.drafts = forgeDrafts(source);
    state.activeDraft = "facebook";
    saveState(); renderDraft(); toast("Four drafts forged. Human review remains required.");
  });

  function renderDraft() {
    document.querySelectorAll(".draft-tab").forEach(function (button) {
      button.classList.toggle("active", button.dataset.draft === state.activeDraft);
    });
    document.getElementById("draft-output").value = state.drafts[state.activeDraft] || "";
  }

  document.querySelectorAll(".draft-tab").forEach(function (button) {
    button.addEventListener("click", function () {
      state.drafts[state.activeDraft] = document.getElementById("draft-output").value;
      state.activeDraft = button.dataset.draft;
      saveState(); renderDraft();
    });
  });

  document.getElementById("draft-output").addEventListener("input", function (event) {
    state.drafts[state.activeDraft] = event.target.value;
    saveState();
  });

  function copyText(text, message) {
    if (!text) { toast("Nothing is ready to copy."); return; }
    navigator.clipboard.writeText(text).then(function () { toast(message); }).catch(function () {
      var area = document.createElement("textarea");
      area.value = text; document.body.appendChild(area); area.select();
      document.execCommand("copy"); area.remove(); toast(message);
    });
  }

  document.getElementById("copy-draft").addEventListener("click", function () {
    copyText(document.getElementById("draft-output").value, "Draft copied for review.");
  });

  document.getElementById("copy-ai-brief").addEventListener("click", function () {
    var brief =
      "You are the Academy of Mercenary Arts content editor. Preserve factual accuracy, consent, dignity, and the Academy motto: Developing Fighters. Building Warlords. Turn the supplied field notes into concise drafts for Facebook, Instagram, YouTube, and Patreon. Do not invent attendance, achievements, quotes, identities, or outcomes. Mark missing facts. End with one clear invitation. FIELD NOTES:\n\n" +
      document.getElementById("content-moment").value + "\n\nLESSON:\n" +
      document.getElementById("content-lesson").value;
    copyText(brief, "AI editing brief copied.");
  });

  document.getElementById("queue-draft").addEventListener("click", function () {
    var text = document.getElementById("draft-output").value.trim();
    if (!text) { toast("Forge or write a draft first."); return; }
    state.contentQueue.unshift({
      id:"c-" + Date.now(),
      title:document.getElementById("content-event").value.trim() || "Academy field story",
      platform:state.activeDraft,
      stage:"Drafted",
      text:text,
      created:new Date().toLocaleDateString()
    });
    saveState(); renderQueue(); toast("Draft added to the approval queue.");
  });

  function renderQueue() {
    var holder = document.getElementById("content-queue");
    if (!state.contentQueue.length) {
      holder.className = "content-queue empty-state";
      holder.textContent = "Nothing is waiting. Forge a campaign draft when a real moment deserves a wider life.";
      return;
    }
    holder.className = "content-queue";
    holder.innerHTML = state.contentQueue.map(function (item) {
      var options = STAGES.map(function (stage) {
        return '<option ' + (stage === item.stage ? "selected" : "") + '>' + stage + '</option>';
      }).join("");
      return '<div class="queue-item"><div><b>' + escapeHtml(item.title) + '</b><small>' + escapeHtml(item.platform) + ' · added ' + escapeHtml(item.created) + '</small></div><select data-queue-stage="' + escapeHtml(item.id) + '" aria-label="Content stage">' + options + '</select><button class="quest-delete" data-queue-delete="' + escapeHtml(item.id) + '" aria-label="Remove item">×</button></div>';
    }).join("");
    holder.querySelectorAll("[data-queue-stage]").forEach(function (select) {
      select.addEventListener("change", function () {
        var item = state.contentQueue.find(function (candidate) { return candidate.id === select.dataset.queueStage; });
        if (item) item.stage = select.value;
        saveState();
      });
    });
    holder.querySelectorAll("[data-queue-delete]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.contentQueue = state.contentQueue.filter(function (item) { return item.id !== button.dataset.queueDelete; });
        saveState(); renderQueue();
      });
    });
  }

  function renderIntegrations() {
    var holder = document.getElementById("integration-grid");
    holder.innerHTML = INTEGRATIONS.map(function (item) {
      var url = integrationUrl(item);
      var action = url
        ? '<a class="quiet-button link-button" href="' + escapeHtml(url) + '" target="_blank" rel="noopener">Open gate</a>'
        : '<button class="quiet-button" data-configure-gate="' + item.id + '">Add URL</button>';
      return '<article class="integration-card"><span class="status-pill ' + (url ? "" : "missing") + '">' + (url ? "Connected" : "Needs URL") + '</span><div><p class="eyebrow">' + escapeHtml(item.group) + '</p><h3>' + escapeHtml(item.name) + '</h3></div><p>' + escapeHtml(item.description) + '</p>' + action + '</article>';
    }).join("");
    holder.querySelectorAll("[data-configure-gate]").forEach(function (button) {
      button.addEventListener("click", openSettings);
    });
  }

  var dialog = document.getElementById("settings-dialog");
  function openSettings() {
    var fields = document.getElementById("settings-fields");
    fields.innerHTML = INTEGRATIONS.map(function (item) {
      return '<label class="settings-field"><span>' + escapeHtml(item.name) + '</span><input type="url" data-setting-id="' + item.id + '" value="' + escapeHtml(integrationUrl(item)) + '" placeholder="https://…"></label>';
    }).join("");
    dialog.showModal();
  }
  document.getElementById("open-settings").addEventListener("click", openSettings);

  document.getElementById("settings-form").addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelectorAll("[data-setting-id]").forEach(function (input) {
      var original = INTEGRATIONS.find(function (item) { return item.id === input.dataset.settingId; });
      var value = input.value.trim();
      if (value === original.url) delete state.integrations[original.id];
      else state.integrations[original.id] = value;
    });
    saveState(); renderIntegrations(); renderQuickLinks(); dialog.close(); toast("Gatehouse settings saved locally.");
  });

  document.getElementById("export-data").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),state:state}, null, 2)], {type:"application/json"});
    var url = URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.href = url; anchor.download = "academy-os-backup-" + new Date().toISOString().slice(0,10) + ".json";
    document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
    toast("Local Academy OS data exported.");
  });

  document.getElementById("import-data").addEventListener("change", function (event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = JSON.parse(reader.result);
        if (!parsed.state || typeof parsed.state !== "object") throw new Error("Missing state");
        state = Object.assign(clone(defaultState), parsed.state);
        saveState(); initializeRenders(); toast("Local Academy OS data restored.");
      } catch (error) {
        toast("That file is not a valid Academy OS backup.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  });

  function initializeRenders() {
    renderPractice();
    renderRinCon();
    renderCampaignCalendar();
    bindPracticeChecks();
    renderQuickLinks();
    renderQuests();
    renderChronicle();
    renderDraft();
    renderQueue();
    renderIntegrations();
  }

  initializeRenders();

  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    navigator.serviceWorker.register("sw.js").catch(function (error) {
      console.warn("Offline cache registration failed.", error);
    });
  }
}());
