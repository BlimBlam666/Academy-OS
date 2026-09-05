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
| February 24, 2027 | F201 · Footwork 101 | [Open](https://drive.google.com/file/d/1G1nnnYGI52_RrJmtDNSTHn6YJ-EJeYJ6/view) |
| March 3, 2027 | F202 · Range 101 | [Open](https://drive.google.com/file/d/1E1YP7Ld2yD1Sc1HcRT8v9wErNERVWWAh/view) |
| March 10, 2027 | F203 · Range Gates | [Open](https://drive.google.com/file/d/19Ds8Jhk_EdImNFkpZXaa9IiVIuMX9aTR/view) |
| March 17, 2027 | F204 · The 45-Degree Entry | [Open](https://drive.google.com/file/d/1STcnqVQP40hlcOPPY5cINF32nKMiamtU/view) |
| March 24, 2027 | F205 · The Lateral Exit | [Open](https://drive.google.com/file/d/1iq8PtGuzuhjzBQ2CVSxP3UqqmdLsjTCc/view) |
| March 31, 2027 | F206 · Half-Steps and Micro-Adjustments | [Open](https://drive.google.com/file/d/1oc-FIQp2TsmkN9z8_KA0mYvolVw0My3m/view) |
| April 7, 2027 | F207 · Balance Under Pressure | [Open](https://drive.google.com/file/d/1lFi4GVguAUsf610EqL_DHCsQqFAvV86-/view) |
| April 14, 2027 | F208 · Basic Blocking | [Open](https://drive.google.com/file/d/1sVSw3vTYCjBdCvGcBT8ikkHAJBNP6sNK/view) |
| April 21, 2027 | F209 · Block-Strike Basics | [Open](https://drive.google.com/file/d/1O0LdzfV2WykFgiqrxV4DswmdEoz284hy/view) |
| April 28, 2027 | F210 · The Three Basic Attacks | [Open](https://drive.google.com/file/d/1Urtr9Lr6F1lqIzqbK1hQeT3If9tZwNCr/view) |
| May 5, 2027 | F211 · Target Selection | [Open](https://drive.google.com/file/d/1vsM3LhBqbD-DNAsB9nM5Cq1l5PUVJ7-u/view) |
| May 12, 2027 | F212 · Recovery After Missing | [Open](https://drive.google.com/file/d/1sa-WfElqU8IAH9q2FO8ZjdMrYfUcjhYr/view) |
| May 19, 2027 | F213 · Fighting While Wounded | [Open](https://drive.google.com/file/d/11rBRKoB3fK9FSSAGNGd7Au1v2EQGHvpa/view) |
| May 26, 2027 | F214 · The First Read | [Open](https://drive.google.com/file/d/1cQwfBVYB1IQlLBFrXwtfviFImfQWyX_3/view) |
| June 2, 2027 | F215 · Beginner Sparring Lab | [Open](https://drive.google.com/file/d/13M9uT2SwRn2YsH3_gJ9JnNgFEaTEiJy3/view) |

## Automation behavior

- `config/practice-schedule.js` is the single schedule source.
- The application computes each Wednesday from `startDate` and `cadenceDays`.
- Before a practice, the Forge shows the nearest upcoming course and marks it **Ready for review** when it enters the seven-day preparation window.
- On the practice date, it continues showing that course through the 7:00–9:00 PM session.
- At 9:00 PM on Wednesday, it advances to the following course automatically so the next agenda is available for the coming week.
- The Command Hall countdown, current course link, objectives, drills, coaching cues, passing standards, scripts, AAR title, and following-course preview update together.
- Checklist completion is namespaced by course, so finishing F104 does not pre-complete F105.

## RinCon rehearsal track

Before the Academy semester, Practice Forge defaults to four convention rehearsals:

| Date | Rehearsal |
|---|---|
| September 9, 2026 | RC-SWORD · Sword Workshop Rehearsal |
| September 16, 2026 | RC-THROWIE · Throwie Workshop Rehearsal |
| September 23, 2026 | F102-RC · Learn to Fight Amtgard! Rehearsal |
| September 30, 2026 | RC-FULL · RinCon Full Program Dress Rehearsal |

The track covers the public workshop flow, inspection, beginner combat, 60-second welcome, demonstration library, recruitment, consent-aware media, reset, and AAR. After RinCon, the Forge defaults to the Academy Wednesday curriculum; both tracks remain manually selectable for reference.

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
