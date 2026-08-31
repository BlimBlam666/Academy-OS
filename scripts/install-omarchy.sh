#!/usr/bin/env bash
set -euo pipefail

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

if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "$(dirname "$desktop_dest")" >/dev/null 2>&1 || true
fi

echo "Academy OS command layer installed."
echo "1. Press Super + Space, then choose Style > Theme > Academy."
echo "2. Launch Academy Command Hall from the app launcher."
echo "3. Re-run this script after pulling updates."
