"use client";

import { FollowerPointerCard } from "@/components/ui/following-pointer";

export default function FollowingPointerTest() {
  return (
    <div className="p-8 bg-zinc-900 rounded-lg border border-zinc-700">
      <h3 className="text-white mb-4">Following Pointer Test</h3>
      <FollowerPointerCard title="Test Pointer">
        <div className="w-64 h-32 bg-zinc-800 rounded-lg border border-zinc-600 flex items-center justify-center">
          <span className="text-zinc-300">Hover over this area</span>
        </div>
      </FollowerPointerCard>
    </div>
  );
} 