(function () {
  "use strict";

  window.ACADEMY_RINCON_EVENT = {
    version: 1,
    title: "Amtgard at RinCon 2026",
    dates: "October 2–4, 2026",
    startDate: "2026-10-02",
    endDate: "2026-10-04",
    venue: "Casino Del Sol Conference Center",
    location: "Booth near the north-side exit",
    lead: "BlimBlam",
    status: "Program times pending · booth operations confirmed",
    publicSite: "https://blimblam666.github.io/AMTGARD_At_RinCon/",
    volunteerSheet: "https://docs.google.com/spreadsheets/d/1Udlmi7UVqWyJTMsczCREIsUO-GLDS_8btiwl4XsXos0/edit",
    calendarUrl: "https://calendar.google.com/calendar/u/0/r",
    facebookUrl: "https://www.facebook.com/groups/ObsidianGate",
    missionControlUrl: "https://github.com/BlimBlam666/Academy-OS/blob/main/docs/rincon/RINCON_MISSION_CONTROL.md",
    days: [
      {date:"2026-10-02", label:"Friday · Opening Watch", hours:"8:00 AM–7:00 PM", blocks:["8:00–11:00 · move-in and setup · all hands", "11:00–7:00 · booth, beginner information, and controlled demos"]},
      {date:"2026-10-03", label:"Saturday · Full Muster", hours:"9:00 AM–7:00 PM", blocks:["9:00–7:00 · booth, beginner information, and controlled demos", "Scheduled workshop/class slots · pending RinCon confirmation"]},
      {date:"2026-10-04", label:"Sunday · Final Watch", hours:"9:00 AM–5:00 PM", blocks:["9:00–4:00 · booth, beginner information, and controlled demos", "4:00–5:00 · teardown and load-out · all hands"]}
    ],
    programs: [
      {id:"sword", title:"Make an Amtgard Sword", badge:"60–90 minutes", status:"Submitted/planned · time pending", summary:"Build a beginner-friendly padded sword while learning why every component exists and how field inspection protects the game.", agendaUrl:"https://github.com/BlimBlam666/Academy-OS/blob/main/docs/rincon/SWORD_WORKSHOP_AGENDA.md", action:"Open sword agenda"},
      {id:"throwie", title:"Make an Amtgard Throwie", badge:"30–45 minutes", status:"Submitted/planned · time pending", summary:"Build an all-soft thrown weapon, inspect it, then learn fixed-target use and safe retrieval discipline.", agendaUrl:"https://github.com/BlimBlam666/Academy-OS/blob/main/docs/rincon/THROWIE_WORKSHOP_AGENDA.md", action:"Open throwie agenda"},
      {id:"f102", title:"Learn to Fight Amtgard! · F102", badge:"60 minutes", status:"Submitted/planned · time pending", summary:"A complete beginner course in safety, targets, wounds, calls, controlled exchanges, and first supervised fights.", agendaUrl:"https://drive.google.com/file/d/1lFJTxo-GZiwZBei31gRKeZ3ZfUmG2L-T/view", action:"Open instructor agenda"},
      {id:"welcome", title:"Amtgard in 60 Seconds", badge:"Continuous", status:"Booth program", summary:"A clear welcome that shows combat, classes, crafting, service, community, Obsidian Gate, and the January 6 Academy launch.", agendaUrl:"https://github.com/BlimBlam666/Academy-OS/blob/main/docs/rincon/BOOTH_AND_DEMO_PLAYBOOK.md", action:"Open booth playbook"},
      {id:"demos", title:"Combat Demonstration Library", badge:"1–10 minutes", status:"Booth/outdoor program", summary:"Ten small, repeatable demonstrations that staff can match to crowd size, available space, and waiver status.", agendaUrl:"https://github.com/BlimBlam666/Academy-OS/blob/main/docs/rincon/BOOTH_AND_DEMO_PLAYBOOK.md#demo-library", action:"Open demo library"}
    ],
    resources: [
      {title:"RinCon Mission Control", kind:"Master plan", url:"https://github.com/BlimBlam666/Academy-OS/blob/main/docs/rincon/RINCON_MISSION_CONTROL.md"},
      {title:"RinCon Field File Vault", kind:"Google Drive folder", url:"https://drive.google.com/drive/folders/1lCf7NLR_z8rXNngIru_o2OZ6xH4fGjic"},
      {title:"Volunteer Sign-Up", kind:"Live Google Sheet", url:"https://docs.google.com/spreadsheets/d/1Udlmi7UVqWyJTMsczCREIsUO-GLDS_8btiwl4XsXos0/edit"},
      {title:"Staff Teaching System", kind:"Run cards and roles", url:"https://github.com/BlimBlam666/Academy-OS/blob/main/docs/rincon/STAFF_TEACHING_SYSTEM.md"},
      {title:"Materials and Print List", kind:"Pack and print", url:"https://github.com/BlimBlam666/Academy-OS/blob/main/docs/rincon/MATERIALS_AND_PRINT_PLAN.md"},
      {title:"Media and Content Plan", kind:"Capture and publishing", url:"https://github.com/BlimBlam666/Academy-OS/blob/main/docs/rincon/MEDIA_CONTENT_PLAN.md"},
      {title:"AAR and Follow-Up", kind:"Closeout", url:"https://github.com/BlimBlam666/Academy-OS/blob/main/docs/rincon/AAR_AND_FOLLOWUP.md"},
      {title:"Displays 1–5 Print Set", kind:"Printable PDF", url:"https://drive.google.com/file/d/1nnA0XDtKN1xenuA3pJ_8IScGk0nmd_h5/view"},
      {title:"Projector Advertisement", kind:"PNG", url:"https://drive.google.com/file/d/1R1wRKj9NLtqsovi7OaNtlSkYavi0gpRN/view"},
      {title:"Projector Advertisement · Vector", kind:"SVG", url:"https://drive.google.com/file/d/1gKUdRP2y5GPT3ywUScvPA2hTrFrBmgnd/view"},
      {title:"Amtgard at RinCon Site", kind:"Public recruit page", url:"https://blimblam666.github.io/AMTGARD_At_RinCon/"}
    ],
    readiness: [
      {id:"roles", label:"Assign each active block a lead, support, reeve, and content-consent owner"},
      {id:"slots", label:"Enter confirmed workshop/class room times when RinCon publishes them"},
      {id:"waivers", label:"Confirm 2026 waiver, guardian, venue, and combat-space rules"},
      {id:"masters", label:"Build and inspect one sword master and one throwie master"},
      {id:"rehearsal", label:"Run sword, throwie, F102, and 10-minute teaching rehearsals against a timer"},
      {id:"print", label:"Print displays, QR handouts, field cards, inspection tags, and consent markers"},
      {id:"pack", label:"Pack by station: welcome, sword, throwie, combat, inspection, media, closeout"},
      {id:"followup", label:"Prepare the January 6 invitation and 72-hour follow-up message"}
    ],
    contentShots: [
      {id:"wide", label:"Booth wide shot before doors open"},
      {id:"welcome", label:"Greeter delivering the 60-second welcome"},
      {id:"craft", label:"Hands assembling safe foam equipment; no private forms in frame"},
      {id:"inspect", label:"Instructor explaining an inspection point"},
      {id:"f102", label:"F102 stance, target map, or controlled drill"},
      {id:"demo", label:"One complete short demo from opening explanation to reset"},
      {id:"reaction", label:"Consent-cleared participant reaction or quote"},
      {id:"launch", label:"Academy January 6 display and QR call to action"},
      {id:"team", label:"Volunteer team portrait with explicit consent"},
      {id:"close", label:"End-of-day result: builds, attendance estimate, and one lesson"}
    ]
  };
}());
