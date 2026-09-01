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
wallpaper_source="$theme_source/backgrounds/academy-command-hall.jpg"
wallpaper_dir="$config_root/omarchy/backgrounds/academy"
wallpaper_dest="$wallpaper_dir/academy-command-hall.jpg"
desktop_dest="$data_root/applications/academy-command-hall.desktop"

if [[ ! -f "$theme_source/colors.toml" ]]; then
  echo "Academy theme files were not found at $theme_source" >&2
  exit 1
fi

if [[ ! -f "$wallpaper_source" ]]; then
  echo "Academy wallpaper was not found at $wallpaper_source" >&2
  exit 1
fi

mkdir -p "$(dirname "$theme_dest")" "$(dirname "$desktop_dest")" "$wallpaper_dir"

if [[ -e "$theme_dest" ]]; then
  backup_path="${theme_dest}.backup.$(date +%Y%m%d-%H%M%S)"
  mv "$theme_dest" "$backup_path"
  echo "Existing Academy theme moved to $backup_path"
fi

cp -R "$theme_source" "$theme_dest"
install -m 0644 "$wallpaper_source" "$wallpaper_dest"
install -m 0644 "$repo_root/omarchy/academy-command-hall.desktop" "$desktop_dest"

if [[ ! -f "$theme_dest/colors.toml" || ! -f "$wallpaper_dest" ]]; then
  echo "Academy theme verification failed after copying files." >&2
  exit 1
fi

if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "$(dirname "$desktop_dest")" >/dev/null 2>&1 || true
fi

echo "Academy theme installed at $theme_dest"
echo "Academy wallpaper installed at $wallpaper_dest"

if command -v omarchy >/dev/null 2>&1; then
  if omarchy theme set academy; then
    echo "Academy color theme applied successfully."
  else
    echo "The theme was copied, but Omarchy did not apply it automatically." >&2
    echo "Run: omarchy theme list | grep -i academy" >&2
    echo "Then run: omarchy theme set academy" >&2
    exit 1
  fi

  if omarchy theme bg set "$wallpaper_dest"; then
    echo "Academy Command Hall wallpaper applied successfully."
  elif command -v omarchy-theme-bg-set >/dev/null 2>&1 && omarchy-theme-bg-set "$wallpaper_dest"; then
    echo "Academy Command Hall wallpaper applied with the compatibility command."
  else
    echo "The wallpaper is installed but could not be selected automatically." >&2
    echo "Press Super + Ctrl + Space and choose academy-command-hall.jpg." >&2
  fi
else
  echo "The Omarchy CLI was not found, so the theme could not be applied automatically." >&2
  echo "After Omarchy is available, run: omarchy theme set academy" >&2
fi

echo "Academy OS command layer installed."
echo "Launch Academy Command Hall from the app launcher."
echo "Re-run this script after pulling updates."
