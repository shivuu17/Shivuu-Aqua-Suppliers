#!/bin/bash

echo "🧹 Cleaning up old duplicate folders and files..."

# Remove old client folder
if [ -d "/workspaces/buisness/client" ]; then
  rm -rf /workspaces/buisness/client
  echo "✅ Removed: client/"
fi

# Remove old server folder
if [ -d "/workspaces/buisness/server" ]; then
  rm -rf /workspaces/buisness/server
  echo "✅ Removed: server/"
fi

# Remove old start.sh
if [ -f "/workspaces/buisness/start.sh" ]; then
  rm /workspaces/buisness/start.sh
  echo "✅ Removed: start.sh"
fi

echo "🎉 Cleanup complete!"
echo "Current structure:"
ls -1 /workspaces/buisness | grep -E "^backend$|^frontend$|^railway"
