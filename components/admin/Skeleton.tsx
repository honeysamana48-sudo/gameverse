"use client";

export function SkeletonRow({ cols = 5 }: { cols?: number }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-white/5" aria-hidden="true">
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="h-4 bg-white/5 rounded-lg animate-pulse flex-1" />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4" aria-hidden="true">
      <div className="h-6 w-32 bg-white/10 rounded-lg animate-pulse" />
      <div className="h-10 w-20 bg-white/10 rounded-lg animate-pulse" />
      <div className="h-4 w-full bg-white/5 rounded-lg animate-pulse" />
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden" aria-busy="true" role="status">
      <div className="flex gap-4 p-4 bg-white/5">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 bg-white/10 rounded animate-pulse flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} cols={cols} />
      ))}
    </div>
  );
}
