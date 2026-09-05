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
    forgeSessions: [
      {
        code:"RC-SWORD", date:"2026-09-09", title:"Sword Workshop Rehearsal", timeLabel:"7:00–9:00 PM",
        sourceUrl:"https://github.com/BlimBlam666/Academy-OS/blob/main/docs/rincon/SWORD_WORKSHOP_AGENDA.md",
        motto:"Build safely. Explain clearly. Inspect every blade.",
        purpose:"Rehearse the complete public sword workshop so every instructor can explain the materials, guide a safe build, inspect the result, and invite the participant into Amtgard.",
        drills:["60-second materials explanation", "Instructor model build", "Station coaching rotation", "Inspection and repair handoff"],
        cues:["Explain why", "Cut away from bodies", "One station, one job", "Inspect before use", "End with the invitation"],
        standards:["Deliver the safety briefing clearly", "Complete one timed model build", "Coach without taking over the participant's work", "Inspect and explain every correction", "Give the Obsidian Gate and January 6 invitation"],
        opening:"A safe sword is more than foam and tape. Every layer has a purpose, and every explanation teaches the culture we want newcomers to enter.",
        closing:"The build is complete only when it is inspected, understood, and connected to a welcoming next step.",
        application:"Run one complete workshop at convention pace. Rotate lead, station coach, inspector, and recruiter roles, then record the slowest station and the most common correction.",
        phases:[
          {id:"prep",title:"6:45 · Stage the workshop",description:"Count cores, foam, tape, tools, examples, inspection tags, and eye protection. Build the room exactly as it should appear at RinCon."},
          {id:"brief",title:"7:00 · Safety and teaching brief",description:"Deliver the participant welcome, tool rules, build boundaries, and explanation of why Amtgard equipment is inspected."},
          {id:"model",title:"7:15 · Instructor model build",description:"Complete one narrated sword build while the team watches for unclear language, unsafe movement, and station bottlenecks."},
          {id:"run",title:"7:35 · Full timed workshop",description:"Run the participant flow from selecting materials through construction. Coaches guide with questions and demonstrations rather than taking over."},
          {id:"inspect",title:"8:30 · Inspection and repair",description:"Inspect every practice build, explain each result, and rehearse the repair path for equipment that does not pass."},
          {id:"recruit",title:"8:50 · Recruit handoff",description:"Practice the Obsidian Gate invitation, public-site QR handoff, and January 6 Academy invitation in under one minute."},
          {id:"aar",title:"9:00 · Workshop AAR",description:"Record actual runtime, material use, confusing steps, inspection failures, staffing needs, and one improvement before the full rehearsal."}
        ]
      },
      {
        code:"RC-THROWIE", date:"2026-09-16", title:"Throwie Workshop Rehearsal", timeLabel:"7:00–9:00 PM",
        sourceUrl:"https://github.com/BlimBlam666/Academy-OS/blob/main/docs/rincon/THROWIE_WORKSHOP_AGENDA.md",
        motto:"All soft. Clearly built. Safely thrown.",
        purpose:"Rehearse the all-soft throwie workshop from materials briefing through inspection, fixed-target use, safe retrieval, and recruitment.",
        drills:["All-soft construction explanation", "Timed participant build", "Compression and edge inspection", "Fixed-target throw and retrieval"],
        cues:["No rigid core", "Soft in every direction", "Inspect every edge", "Throw only on command", "Retrieve only when clear"],
        standards:["Explain the all-soft requirement", "Complete the build within the public time window", "Identify and repair unsafe density or edges", "Run a controlled target lane", "Close with the next-step invitation"],
        opening:"A throwie is simple only when every part remains soft, every throw remains controlled, and every retrieval waits for a clear field.",
        closing:"Good crafting makes safe play possible. Good instruction makes safe play repeatable.",
        application:"Run the workshop as a newcomer would experience it: build, inspect, throw at a fixed target, retrieve on command, and receive the invitation to continue.",
        phases:[
          {id:"prep",title:"6:45 · Stage the throwie station",description:"Count fabric, foam, filling, tape or ties, tools, completed examples, inspection tags, targets, and lane markers."},
          {id:"brief",title:"7:00 · All-soft safety brief",description:"Explain legal intent, prohibited rigid materials, safe tool handling, controlled throwing, and retrieval commands."},
          {id:"model",title:"7:15 · Narrated model build",description:"Build one throwie at teaching speed while assistants note unclear steps and likely participant errors."},
          {id:"run",title:"7:30 · Full timed workshop",description:"Run the construction stations with coaches rotating between participants and tracking material use."},
          {id:"inspect",title:"8:10 · Inspection and repair lab",description:"Check softness, density, edges, closures, and overall condition. Rehearse explaining a failed inspection without discouraging the maker."},
          {id:"lane",title:"8:30 · Target lane and retrieval",description:"Teach stance, controlled throws, range boundary, one thrower at a time, and retrieval only after the lane is called clear."},
          {id:"aar",title:"9:00 · Workshop AAR",description:"Record runtime, material quantities, safety corrections, lane staffing, and one improvement for RinCon."}
        ]
      },
      {
        code:"F102-RC", date:"2026-09-23", title:"Learn to Fight Amtgard! Rehearsal", timeLabel:"7:00–9:00 PM",
        sourceUrl:"https://drive.google.com/file/d/1lFJTxo-GZiwZBei31gRKeZ3ZfUmG2L-T/view",
        motto:"Safe first. Clear calls. First fight with confidence.",
        purpose:"Rehearse the complete F102 beginner combat class: safety, legal targets, wounds, deaths, stance, movement, controlled attacks and blocks, then supervised first fights.",
        drills:["Target and wound map", "Ready stance and movement", "Controlled attack and block", "First duel with coaching"],
        cues:["Control before speed", "Call what happened", "Receiver owns the call", "Stop on hold", "No running or chasing"],
        standards:["Deliver the class within 60 minutes", "Teach legal targets and wounds accurately", "Maintain safe spacing and force", "Coach a controlled first exchange", "End with clear ways to continue playing"],
        opening:"Your first fight should teach confidence, not fear. We begin with safety, clear calls, and control; speed can come later.",
        closing:"You now know enough to enter the field safely, learn from each exchange, and continue with Obsidian Gate and the Academy.",
        application:"Run the official F102 agenda with staff acting as first-time participants. Then repeat the core lesson as a ten-minute booth version and compare what must remain unchanged.",
        phases:[
          {id:"prep",title:"6:45 · Build the teaching field",description:"Mark boundaries, stage inspected weapons, prepare waiver and guardian flow, assign instructor, safety reeve, assistants, and recruiter."},
          {id:"welcome",title:"7:00 · Welcome, rules, and targets",description:"Run the opening, safety expectations, hold command, legal target map, wounds, deaths, and clear call language."},
          {id:"movement",title:"7:15 · Stance, grip, and movement",description:"Teach a stable ready position, safe grip, advance, retreat, and recovery without crossing feet or crowding."},
          {id:"combat",title:"7:30 · Controlled attack and defense",description:"Teach one clean attack, one basic block, force calibration, and one-action exchanges with immediate reset."},
          {id:"duels",title:"7:45 · Supervised first fights",description:"Run casual one-on-one or Winner/Loser exchanges only after the required waiver flow. No chaotic melee, running, or chasing."},
          {id:"compressed",title:"8:15 · Ten-minute booth version",description:"Rehearse welcome, targets, grip, movement, clean attack, block, wounds, controlled exchange, first duel, and recruitment handoff against the clock."},
          {id:"aar",title:"8:45 · Reset and class AAR",description:"Inspect equipment, account for participant flow, identify unclear rules, record staffing needs, and name the one correction for the full rehearsal."}
        ]
      },
      {
        code:"RC-FULL", date:"2026-09-30", title:"RinCon Full Program Dress Rehearsal", timeLabel:"7:00–9:00 PM",
        sourceUrl:"https://github.com/BlimBlam666/Academy-OS/blob/main/docs/rincon/STAFF_TEACHING_SYSTEM.md",
        motto:"Welcome clearly. Demonstrate safely. Leave them a next step.",
        purpose:"Run the complete RinCon public experience: booth greeting, Amtgard in 60 Seconds, workshop handoffs, combat demonstrations, F102 compression, inspection, recruitment, consent, and reset.",
        drills:["60-second welcome relay", "Demonstration library rotation", "Program and recruiter handoffs", "Full booth-to-field simulation"],
        cues:["One clear owner", "Name the safety boundary", "Reset before the next crowd", "Consent before capture", "Every path ends with a next step"],
        standards:["Every staff member can deliver the 60-second welcome", "The team can run at least five demonstrations", "Workshop and combat handoffs are clear", "Consent and privacy controls remain visible", "The booth resets within five minutes"],
        opening:"RinCon is not five separate activities. It is one welcoming path from curiosity to a safe first experience and a clear invitation to return.",
        closing:"The operation succeeds when people feel safe, understand what Amtgard offers, and know exactly where to find us next.",
        application:"Run two complete simulated visitor waves, including a busy moment and a safety interruption. Rotate leaders, reset the booth, and complete a final go/no-go review.",
        phases:[
          {id:"prep",title:"6:45 · Full site setup",description:"Build the booth, display, QR, workshop, inspection, combat, media, consent, and recruitment stations from the loadout plan."},
          {id:"welcome",title:"7:00 · Welcome relay",description:"Every greeter delivers Amtgard in 60 Seconds, answers one newcomer question, and hands the visitor to the correct program owner."},
          {id:"demos",title:"7:20 · Demonstration library",description:"Rotate through AMTGARD in One Minute, The Wounded Warrior, Hold the Gate, Three Challengers, First Blood, and other space-appropriate demonstrations."},
          {id:"handoff",title:"7:50 · Workshop and F102 handoffs",description:"Simulate arrivals for sword, throwie, beginner combat, information-only, and community questions without losing track of safety or staffing."},
          {id:"wave",title:"8:10 · Full visitor-wave simulation",description:"Run one ordinary crowd and one busy crowd. Include a hold, equipment failure, minor question escalation, and consent-safe media request."},
          {id:"reset",title:"8:40 · Five-minute reset and go/no-go",description:"Restore every station, count critical materials, identify uncovered roles, and name any condition that must be solved before October 2."},
          {id:"aar",title:"8:50 · Final rehearsal AAR",description:"Record owners and deadlines for the remaining gaps. Confirm the October 1 loadout gate and October 2 opening-watch assignments."}
        ]
      }
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
