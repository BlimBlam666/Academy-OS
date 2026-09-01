# Wednesday Fundamentals Rotation

## Decision

The first Academy OS practice sequence begins with F104 rather than F101 or F201. Most regular fighters already know the introductory field material; this rotation deliberately refreshes the fundamentals that support later technical work.

## Schedule

The Command Hall derives each date from a January 6, 2027 start date and a seven-day cadence.

| Date | Course | Source |
|---|---|---|
| January 6, 2027 | F104 · The Ready Stance | [Open](https://docs.google.com/document/d/1zn2LPUNqWF2UXeDnhXraTZHR80e1m4IzdJZb5NWphQU/edit) |
| January 13, 2027 | F105 · Basic Guard Positions | [Open](https://docs.google.com/document/d/1p_lXiVOVj7M8l4jLuDRltczfEA0MBfg4tb2YOTrHeSQ/edit) |
| January 20, 2027 | F106 · Clean Shot Mechanics | [Open](https://docs.google.com/document/d/1ptY6sL1QF5eQdwrNYog65AHVDlOKCLEWvnJ4aiC9kKE/edit) |
| January 27, 2027 | F107 · Calling Shots and Taking Deaths | [Open](https://docs.google.com/document/d/1Vd6VZA9eraQGu94sM7rIIW1l9UjmhtwzPZRm2ONTAmE/edit) |
| February 3, 2027 | F108 · First Ditch Survival | [Open](https://docs.google.com/document/d/1wRmdJP_0APZrkOsgZ25wgKucADkryxFFnA_eMud0meM/edit) |
| February 10, 2027 | F110 · Basic Footwork and Movement | [Open](https://docs.google.com/document/d/1XYQIv2avjLjzM5JjakqUYjK5cdShRoMv8Rvm0ZqNF5o/edit) |
| February 17, 2027 | F111 · Basic Drills and Practice Habits | [Open](https://docs.google.com/document/d/1qY4gC2FzTx9M94wlFe2ixLumYldOvLKH6bWXJMpi0X4/edit) |

## Automation behavior

- `config/practice-schedule.js` is the single schedule source.
- The application computes each Wednesday from `startDate` and `cadenceDays`.
- Before a practice, the Forge shows the nearest upcoming course.
- On the practice date, it continues showing that course through the day.
- The following day, it advances to the next course automatically.
- The Command Hall countdown, current course link, objectives, drills, coaching cues, passing standards, scripts, AAR title, and following-course preview update together.
- Checklist completion is namespaced by course, so finishing F104 does not pre-complete F105.

## Adding later courses

Append another course object to the `courses` array in `config/practice-schedule.js`. Its date is automatically assigned to the next seven-day slot. Include the official Drive URL, motto, purpose, drills, cues, standards, scripts, and field application. If a Wednesday must be skipped, change the schedule model deliberately rather than silently shifting historical records.

## Wednesday operating shell

- 6:45–7:00 · preparation
- 7:00–7:20 · muster and warm-up
- 7:20–7:50 · source course
- 7:50–8:20 · guided drilling
- 8:20–8:50 · field application
- 8:50–9:00 · passing standard and close
- 9:00–9:20 · AAR and operational closeout

The Academy source course remains authoritative for its technical teaching. The two-hour shell adds warm-up, repetition, field application, and closeout without changing the source course's completion standard.
