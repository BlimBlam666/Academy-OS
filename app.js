(function () {
  "use strict";

  var STORAGE_KEY = "academyOS.phase1.v1";
  var STAGES = ["Captured", "Drafted", "Reviewed", "Scheduled", "Published"];
  var INTEGRATIONS = [
    {id:"drive",name:"Academy Drive Gateway",group:"Knowledge",description:"The Academy's shared Drive entry point and source network.",url:"https://drive.google.com/drive/folders/1bw6dw3yUQCiJUqgSV7lUnwkm0rTHIe6o"},
    {id:"courseLibrary",name:"Academy Course Library",group:"Curriculum",description:"Master curriculum library for fighter, civic, class, ladder, and knighthood tracks.",url:"https://drive.google.com/drive/folders/1WztnlzH92ZBptMBQWhPNRANSnYN4EHBG"},
    {id:"masterIndex",name:"Master Course Index",group:"Curriculum",description:"Authoritative catalog of 162 confirmed F-series and DS-series courses.",url:"https://docs.google.com/document/d/16SvSi0lz-DXJUWytMTI59WJ-RqfCgOunYFQTm7kwyZA/edit"},
    {id:"fighterTrack",name:"Fighter Course Track",group:"Curriculum",description:"F100 through F500 fighter development series.",url:"https://drive.google.com/drive/folders/1x8_Eca7SITmiRkp1lGcU9DbUjrjmuMHR"},
    {id:"f100",name:"F100 Recruit Foundations",group:"Curriculum",description:"Eleven recruit-foundation courses.",url:"https://drive.google.com/drive/folders/1lH4BRvPuKzKZR6VzTRh4qAHiOdQVr9LQ"},
    {id:"f200",name:"F200 Cadet Fundamentals",group:"Curriculum",description:"Fifteen cadet-fundamentals courses, including F201.",url:"https://drive.google.com/drive/folders/1nrMhYEzZjOEvJW6VEzdxbRAFonJ1H-y8"},
    {id:"f201",name:"F201 · Footwork 101",group:"Curriculum",description:"Source course for the January 6 Phase 1 pilot.",url:"https://drive.google.com/file/d/1G1nnnYGI52_RrJmtDNSTHn6YJ-EJeYJ6/view"},
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
      {id:"q-pilot",text:"Prepare the January 6 F201 pilot",done:false}
    ],
    practiceChecks:{},
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

  function updateClock() {
    var now = new Date();
    document.getElementById("clock").textContent = now.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
    document.getElementById("today").textContent = now.toLocaleDateString([], {weekday:"long",month:"long",day:"numeric",year:"numeric"});
    var pilot = new Date(2027, 0, 6, 19, 0, 0);
    var distance = pilot.getTime() - now.getTime();
    var countdown = document.getElementById("countdown");
    if (distance <= 0) {
      countdown.textContent = "Pilot date reached";
    } else {
      var days = Math.floor(distance / 86400000);
      var hours = Math.floor((distance % 86400000) / 3600000);
      countdown.textContent = days + " days · " + hours + " hours until muster";
    }
  }
  updateClock();
  window.setInterval(updateClock, 30000);

  function integrationUrl(item) {
    return state.integrations[item.id] || item.url || "";
  }

  function renderQuickLinks() {
    var ids = ["courseLibrary","masterIndex","academyResources","reignHandbook","calendar","fighterCoach","scorer","ork","youtube","github"];
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

  document.querySelectorAll("[data-practice-check]").forEach(function (checkbox) {
    checkbox.checked = Boolean(state.practiceChecks[checkbox.dataset.practiceCheck]);
    checkbox.addEventListener("change", function () {
      state.practiceChecks[checkbox.dataset.practiceCheck] = checkbox.checked;
      saveState(); updatePracticeProgress();
    });
  });

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
      event:"F201 · Footwork 101",
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
    renderQuickLinks();
    renderQuests();
    renderChronicle();
    renderDraft();
    renderQueue();
    renderIntegrations();
    document.querySelectorAll("[data-practice-check]").forEach(function (checkbox) {
      checkbox.checked = Boolean(state.practiceChecks[checkbox.dataset.practiceCheck]);
    });
    updatePracticeProgress();
  }

  initializeRenders();

  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    navigator.serviceWorker.register("sw.js").catch(function (error) {
      console.warn("Offline cache registration failed.", error);
    });
  }
}());
