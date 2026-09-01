#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID:-$(id -u)}" -eq 0 ]]; then
  echo "Do not run this installer with sudo. Run it as your normal Omarchy user." >&2
  exit 1
fi

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
config_root="${XDG_CONFIG_HOME:-$HOME/.config}"
data_root="${XDG_DATA_HOME:-$HOME/.local/share}"
theme_source="$repo_root/omarchy-theme/academy"
theme_dest="$config_root/omarchy/themes/academy"
desktop_dest="$data_root/applications/academy-command-hall.desktop"

if [[ ! -f "$theme_source/colors.toml" ]]; then
  echo "Academy theme files were not found at $theme_source" >&2
  exit 1
fi

mkdir -p "$(dirname "$theme_dest")" "$(dirname "$desktop_dest")"

if [[ -e "$theme_dest" ]]; then
  backup_path="${theme_dest}.backup.$(date +%Y%m%d-%H%M%S)"
  mv "$theme_dest" "$backup_path"
  echo "Existing Academy theme moved to $backup_path"
fi

cp -R "$theme_source" "$theme_dest"
install -m 0644 "$repo_root/omarchy/academy-command-hall.desktop" "$desktop_dest"

if [[ ! -f "$theme_dest/colors.toml" ]]; then
  echo "Theme verification failed: $theme_dest/colors.toml was not created." >&2
  exit 1
fi

if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "$(dirname "$desktop_dest")" >/dev/null 2>&1 || true
fi

echo "Academy theme installed at $theme_dest"

if command -v omarchy >/dev/null 2>&1; then
  if omarchy theme set academy; then
    echo "Academy theme applied successfully."
  else
    echo "The theme was copied, but Omarchy did not apply it automatically." >&2
    echo "Run: omarchy theme list | grep -i academy" >&2
    echo "Then run: omarchy theme set academy" >&2
    exit 1
  fi
else
  echo "The Omarchy CLI was not found, so the theme could not be applied automatically." >&2
  echo "After Omarchy is available, run: omarchy theme set academy" >&2
fi

echo "Academy OS command layer installed."
echo "Launch Academy Command Hall from the app launcher."
echo "Re-run this script after pulling updates."
