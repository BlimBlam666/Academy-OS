# Academy OS Project Charter

## North star

Academy OS turns a general-purpose Linux computer into a calm, coherent command environment for developing fighters, running the Academy of Mercenary Arts, preserving institutional knowledge, and producing honest public stories.

It is not a new Linux kernel or a closed operating system. It is a portable operating layer: theme, launch surface, documented workflows, integrations, local tools, and automation that can be installed on a supported Linux base.

## First operator

The Phase 1 operator is the Academy founder and Preceptor. The first operational workflow is Wednesday Fighters Practice. The first course is F201: Footwork 101 on January 6, 2027.

## People served

1. Academy operator — plans, teaches, records, and publishes.
2. Preceptors — deliver consistent courses and improve doctrine.
3. Cadets — receive clear instruction and meaningful progression.
4. Academy collaborators — find the correct source and next action.
5. Future small-business operators — use a generalized edition after the Academy pilot proves the model.

## Problems to solve

- Important links and records are scattered across Drive, calendars, websites, and social platforms.
- Repeated operations rely on memory.
- Practice lessons, AARs, and content production are disconnected.
- AI can create volume without truth, consent, or an approval boundary.
- A beautiful personal setup can become fragile if it is not documented and portable.

## Product principles

- **Action before ornament:** every visual element must support orientation, decision, or motivation.
- **One source of truth:** Drive and existing Academy applications remain authoritative.
- **Local-first records:** drafts, quests, and AARs stay on the operator's device unless deliberately exported.
- **No secret in Git:** passwords, tokens, member records, and private media never enter the public repository.
- **Human command:** AI may draft and organize; a person approves consequential actions and every publication.
- **Portable by design:** workflows and configuration must survive a change of Linux distribution.
- **Recoverable change:** use version control, Omarchy snapshots, exports, and documented rollback.
- **Measure the operation:** record preparation time, closeout time, completion, friction, and the next improvement.

## Phase 1 deliverables

- Academy-themed Omarchy palette
- Command Hall PWA
- Non-secret integration registry
- F201 Wednesday practice runbook
- After-action Chronicle
- Content Foundry with platform drafts and approval queue
- Omarchy installation helper
- GitHub Pages publication workflow
- Project documentation and verification

## Explicit non-goals

Phase 1 will not:

- store credentials or private member data;
- automatically publish to social platforms;
- replace Google Drive as the Academy archive;
- claim official Amtgard authority;
- provide medical, legal, or safety certification;
- become a separately maintained Linux distribution;
- promise that generated text is accurate without review.

## Architecture

### Foundation

Omarchy provides the present desktop foundation. Academy OS remains separable so a later edition can run on an LTS distribution.

### Command layer

A dependency-free static PWA supplies navigation, local records, runbooks, draft generation, exports, and offline access.

### Source layer

- Academy Google Drive: curriculum and Academy records
- Existing Academy apps: operational tools
- GitHub: public code, runbooks, and releases
- Browser local storage: private working state on one device

### Integration layer

Phase 1 links out to authenticated services. Later phases may add narrowly scoped OAuth connectors behind a private backend. No platform token belongs in browser code.

## Phase 1 success measures

After four Wednesday practices:

- Pre-practice preparation stays within 15 minutes.
- Post-practice closeout stays within 20 minutes.
- Every practice receives an AAR within 24 hours.
- At least 80% of the runbook stages are completed or deliberately skipped with a reason.
- At least one consent-safe content package is drafted from each practice.
- No password, token, private roster, or unapproved media reaches the public repository.
- The operator can restore local Command Hall data from an export.

## Product path

### Phase 1 — Academy pilot

Prove one operator, one machine, one recurring workflow.

### Phase 2 — Academy operations

Add calendar feeds, course selection, asset inventory, reusable session templates, private role-based records, and consent-aware media handling.

### Phase 3 — Business OS layer

Extract neutral modules for scheduling, SOP execution, CRM links, content operations, review queues, metrics, and onboarding.

### Phase 4 — Managed offering

Revenue should come first from implementation, workflow design, branded editions, training, support, and managed maintenance. Any redistributed image requires a full review of upstream licenses, trademarks, bundled applications, update responsibilities, and support commitments.

## Decision rule

Do not automate a process merely because it can be automated. Automate it when the process is understood, reversible, measurable, and safer or easier for the human responsible.
