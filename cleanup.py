#!/usr/bin/env python3
import os
import shutil

base_path = "/workspaces/buisness"
items_to_remove = ["client", "server", "start.sh"]

print("🧹 Cleaning up old duplicate folders and files...\n")

for item in items_to_remove:
    full_path = os.path.join(base_path, item)
    if os.path.exists(full_path):
        if os.path.isdir(full_path):
            shutil.rmtree(full_path)
            print(f"✅ Removed directory: {item}/")
        else:
            os.remove(full_path)
            print(f"✅ Removed file: {item}")
    else:
        print(f"⏭️  Already gone: {item}")

print("\n🎉 Cleanup complete!")
print("\n📁 Current root structure:")
for item in sorted(os.listdir(base_path)):
    path = os.path.join(base_path, item)
    if os.path.isdir(path):
        print(f"   📁 {item}/")
    elif item in ["railway.json", "package.json", ".gitignore"]:
        print(f"   📄 {item}")
