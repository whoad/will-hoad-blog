#!/bin/bash

# --- CONFIGURATION ---
SOURCE_DIR="/media/will/tux/gdrive/KingHoad/blog"
DEST_DIR="./content"

# --- EXECUTION ---
echo "Syncing Obsidian vault to Quartz content..."

# -a: archive mode (preserves permissions/timestamps)
# -v: verbose (shows you what is happening)
# --delete: REMOVES files in DEST_DIR that no longer exist in SOURCE_DIR
# --exclude: ignores Obsidian's internal settings and hidden git files
rsync -av --delete \
  --exclude=".obsidian/" \
  --exclude=".git/" \
  --exclude=".trash/" \
  "$SOURCE_DIR/" "$DEST_DIR/"

echo "Sync complete. Ready for 'npx quartz build' or 'npx quartz sync'."