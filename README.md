# Academy OS

A portable command layer for running the Academy of Mercenary Arts: operations, training, knowledge, content production, and the links that hold the organization together.

> Developing Fighters. Building Warlords.

## Phase 1

This repository contains the first working Academy OS pilot:

- **Command Hall** — a medieval-fantasy operations dashboard
- **Practice Forge** — the January 6, 2027 Wednesday Fighters Practice pilot using F201: Footwork 101
- **Content Foundry** — local-first drafting and approval workflow for Academy social content
- **Integration Registry** — authoritative Academy links, editable without storing passwords or tokens
- **Drive Catalog** — four mapped libraries exposing 162 confirmed courses, doctrine, operations, heraldry, and creative assets
- **Academy Omarchy theme** — a dark iron, parchment, thistle, and brass color system with an original Command Hall wallpaper
- **Omarchy bootstrap** — installs the theme and a Command Hall application launcher

## Live Command Hall

The live application is available at:

https://blimblam666.github.io/Academy-OS/

## Install on Omarchy

```bash
cd ~/Work
git clone https://github.com/BlimBlam666/Academy-OS.git
cd Academy-OS
bash scripts/install-omarchy.sh
```

The installer verifies and directly applies the theme with `omarchy theme set academy`, installs the original Academy Command Hall wallpaper, and attempts to select it automatically. Open **Academy Command Hall** from the app launcher.

To receive future updates on the Omarchy machine:

```bash
cd ~/Work/Academy-OS
git pull --ff-only
bash scripts/install-omarchy.sh
```

The hosted Command Hall updates automatically after a successful GitHub Pages deployment.

### If the Academy theme is missing

Run these commands as your normal user—do not use `sudo`:

```bash
test -f ~/.config/omarchy/themes/academy/colors.toml && echo "Academy theme files found"
omarchy theme list | grep -i academy
omarchy theme set academy
```

The theme chooser is also available with `Super + Ctrl + Shift + Space`. Directly setting the theme from the terminal bypasses current menu-indexing problems. Use `Super + Ctrl + Space` to choose among the Academy theme's backgrounds.

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
- `docs/DRIVE_INVENTORY.md` — mapped Drive libraries, authority boundaries, and catalog notes
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
