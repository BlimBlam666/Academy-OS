# Academy OS

A portable command layer for running the Academy of Mercenary Arts: operations, training, knowledge, content production, and the links that hold the organization together.

> Developing Fighters. Building Warlords.

## Phase 1

This repository contains the first working Academy OS pilot:

- **Command Hall** — a medieval-fantasy operations dashboard
- **Practice Forge** — the January 6, 2027 Wednesday Fighters Practice pilot using F201: Footwork 101
- **Content Foundry** — local-first drafting and approval workflow for Academy social content
- **Integration Registry** — authoritative Academy links, editable without storing passwords or tokens
- **Academy Omarchy theme** — a dark iron, parchment, thistle, and brass color system
- **Omarchy bootstrap** — installs the theme and a Command Hall application launcher

## Live Command Hall

After GitHub Pages is enabled, the application will be available at:

https://blimblam666.github.io/Academy-OS/

## Install on Omarchy

```bash
cd ~/Work
git clone https://github.com/BlimBlam666/Academy-OS.git
cd Academy-OS
bash scripts/install-omarchy.sh
```

Then choose **Academy** under `Super + Space → Style → Theme` and open **Academy Command Hall** from the app launcher.

## Privacy and authority

The public repository contains no passwords, OAuth tokens, private member records, or unpublished Academy material. Personal settings, quests, practice notes, AARs, and content drafts remain in that browser's local storage unless explicitly exported.

Authoritative source priority:

1. Academy Google Drive
2. Existing Academy applications and sites
3. Local working notes
4. Generated drafts awaiting human review

The content workflow deliberately stops before publication. A person must review and publish every post.

## Repository map

- `index.html`, `styles.css`, `app.js` — Command Hall application
- `PROJECT_CHARTER.md` — product purpose, guardrails, and roadmap
- `docs/F201_PILOT.md` — explicit Wednesday pilot runbook
- `docs/CONTENT_SYSTEM.md` — content-production operating procedure
- `config/integrations.json` — non-secret integration registry
- `omarchy-theme/academy/` — installable local Omarchy theme
- `scripts/install-omarchy.sh` — reversible local installer
- `.github/workflows/` — verification and GitHub Pages deployment

## Development

The Command Hall is a dependency-free static web application. Open `index.html` directly or serve the repository with any static HTTP server.

```bash
python -m http.server 8080
```

Then visit http://localhost:8080.

## License

The Academy-specific identity, curriculum, and original written content remain the property of their respective owners. Code in this repository is provided under the MIT License; third-party services and linked materials retain their own terms.
