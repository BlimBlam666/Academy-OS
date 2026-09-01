(function () {
  "use strict";

  window.ACADEMY_PRACTICE_SCHEDULE = {
    version: 1,
    timezone: "America/Phoenix",
    startDate: "2027-01-06",
    cadenceDays: 7,
    timeLabel: "7:00–9:00 PM",
    prepMinutes: 15,
    closeoutMinutes: 20,
    courses: [
      {
        code: "F104",
        title: "The Ready Stance",
        sourceUrl: "https://docs.google.com/document/d/1zn2LPUNqWF2UXeDnhXraTZHR80e1m4IzdJZb5NWphQU/edit",
        motto: "Stand ready. Move with purpose.",
        purpose: "Build a stable ready stance, recover to it after action, and use it as the base for defense, attack, and control.",
        drills: ["Build the Statue", "Light Push Test", "Step and Return", "Light Pressure Stance"],
        cues: ["Feet on tracks", "Knees soft", "Eyes up", "Ready, not frozen", "Recover stance"],
        standards: ["Build a safe ready stance", "Step and return in four directions", "Keep posture upright and knees soft", "Recover after a block or target tap"],
        opening: "Fighting starts from the ground. A good stance does not make you invincible, but it gives every skill a place to live.",
        closing: "A ready stance is quiet strength. Stand in a way that lets you move, defend, attack, and return.",
        application: "Run controlled stance-and-recovery exchanges. Reward balance, live guard, and immediate recovery rather than winning."
      },
      {
        code: "F105",
        title: "Basic Guard Positions",
        sourceUrl: "https://docs.google.com/document/d/1p_lXiVOVj7M8l4jLuDRltczfEA0MBfg4tb2YOTrHeSQ/edit",
        motto: "Protect the line. Threaten the line.",
        purpose: "Use basic guards to cover likely lines, threaten action, and recover after movement, defense, or attack.",
        drills: ["Open / Closed Line Walkthrough", "Four Guard Positions", "Slow Line Block", "Block, Return to Guard"],
        cues: ["Close the door", "Move only enough", "Keep feet alive", "Guard is not a pose", "Return ready"],
        standards: ["Demonstrate a neutral guard", "Identify an open and closed line", "Block slow lines without overmoving", "Recover guard after each action"],
        opening: "A guard is not a pose. It protects something, threatens something, and prepares you to move.",
        closing: "A guard makes the opponent solve a problem. Protect the line. Threaten the line. Return ready.",
        application: "Run slow line-reading rounds. Attackers offer clear lanes; defenders close the line with minimal motion and recover."
      },
      {
        code: "F106",
        title: "Clean Shot Mechanics",
        sourceUrl: "https://docs.google.com/document/d/1ptY6sL1QF5eQdwrNYog65AHVDlOKCLEWvnJ4aiC9kKE/edit",
        motto: "Throw clean. Hit clear. Recover ready.",
        purpose: "Throw legal, controlled, readable shots and return safely to guard after every strike.",
        drills: ["Target Naming", "Three-Part Shot", "Readable Partner Taps", "Shot Then Freeze"],
        cues: ["Name it, hit it, recover", "Target first", "Control before speed", "Readable contact", "Guard returns"],
        standards: ["Throw five controlled legal shots", "Recover guard after each shot", "Adjust force from partner feedback", "Explain why clean shots improve the field"],
        opening: "A shot is useful when it is safe, legal, and clear. We are not building panic. We are building control.",
        closing: "Clean shots keep the field safe and give skill a firm foundation. Throw clean. Hit clear. Recover ready.",
        application: "Use one-shot exchanges and controlled target games. Score clarity, legality, force control, and recovery."
      },
      {
        code: "F107",
        title: "Calling Shots and Taking Deaths",
        sourceUrl: "https://docs.google.com/document/d/1Vd6VZA9eraQGu94sM7rIIW1l9UjmhtwzPZRm2ONTAmE/edit",
        motto: "Call clear. Die clean. Keep the field honest.",
        purpose: "Call wounds and deaths clearly, avoid argument loops, and reset with confidence and honor.",
        drills: ["Call With Body", "Light Tap Calls", "Argument Loop Breaker", "Die Clean Reset"],
        cues: ["The receiver owns the call", "Short calls are strong", "Body matches call", "Trust theirs", "Breathe and return"],
        standards: ["Make clear wound and death calls", "Match body response to the call", "Handle disagreement cleanly", "Explain why argument loops harm the field"],
        opening: "A trusted fighter calls clearly, dies cleanly, and does not turn every exchange into a trial.",
        closing: "There is honor in making the game trustworthy. Call clear. Die clean. Return stronger.",
        application: "Run a small game emphasizing audible calls, correct wounded movement, clean deaths, and rapid emotional resets."
      },
      {
        code: "F108",
        title: "First Ditch Survival",
        sourceUrl: "https://docs.google.com/document/d/1wRmdJP_0APZrkOsgZ25wgKucADkryxFFnA_eMud0meM/edit",
        motto: "Survive the first ten minutes. Learn from the next ten.",
        purpose: "Enter a ditch safely, understand its flow, choose one useful job, preserve spacing, and learn from each death.",
        drills: ["Walk the Field", "One Job Entry", "Mini-Ditch With Pauses", "Death Data Reset"],
        cues: ["Do not charge blind", "Pick one job", "Space is life", "Death is data", "One adjustment"],
        standards: ["Explain the local ditch flow", "Enter without blind charging", "Maintain teammate spacing", "Name one adjustment after death", "Complete a controlled mini-ditch round"],
        opening: "Ditch is not a test of whether you are already good. Enter safely, see what is happening, and make one useful choice.",
        closing: "Enter with control, choose one job, die clean, learn quickly, and return.",
        application: "Run a coached ditch at controlled intensity. Pause periodically for positioning questions, then reduce pauses as awareness improves."
      },
      {
        code: "F110",
        title: "Basic Footwork and Movement",
        sourceUrl: "https://docs.google.com/document/d/1XYQIv2avjLjzM5JjakqUYjK5cdShRoMv8Rvm0ZqNF5o/edit",
        motto: "Move well. Stay balanced. Fight with intent.",
        purpose: "Advance, retreat, side step, pivot, and recover balance while preserving useful range and guard.",
        drills: ["Range Walk", "Four-Direction Step", "Side Step and Face", "Range Denial", "One Step, One Shot"],
        cues: ["Small steps", "Feet stay low", "Do not cross", "Guard first", "Step off the line"],
        standards: ["Identify close, medium, and long range", "Move four directions without losing stance", "Side step and pivot to face", "Maintain guard while moving"],
        opening: "The best way to survive a shot is often not to be where the shot lands. Move with purpose, not panic.",
        closing: "Move enough, not more than enough. Stay balanced. Keep the opponent in front of you. Return ready.",
        application: "Run range-control rounds where one fighter enters and the other denies range or angles out before adding one controlled shot."
      },
      {
        code: "F111",
        title: "Basic Drills and Practice Habits",
        sourceUrl: "https://docs.google.com/document/d/1qY4gC2FzTx9M94wlFe2ixLumYldOvLKH6bWXJMpi0X4/edit",
        motto: "Practice one thing. Learn one truth. Repeat.",
        purpose: "Use the learning loop, focused partner drills, short feedback, and mindful repetition to improve one specific skill.",
        drills: ["Learning Loop Micro-Drill", "Basic Block-Strike", "One Correction Round", "Practice Plan Card"],
        cues: ["One skill", "Known shot, known block", "Start slow enough", "One correction", "Notice and adjust"],
        standards: ["Explain drilling versus sparring", "Run the learning loop once", "Perform block-strike safely", "Give one correction and one success", "Name the next training skill"],
        opening: "Fighting gives experience. Drilling gives structure. Practice one thing with attention, feedback, and adjustment.",
        closing: "Do not despise small repetitions. Practice one thing. Learn one truth. Repeat.",
        application: "Turn practice into a drill laboratory. Each pair selects one skill, runs the learning loop, and records one useful adjustment."
      }
    ]
  };
}());
