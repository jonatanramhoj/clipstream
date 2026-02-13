const SKELETON_ITEMS = 6;

export function VideoFeedSkeleton() {
  return (
    <div>
      <div className="h-7 w-32 rounded-lg bg-white/10 animate-pulse mb-4" />
      <ul className="grid grid-cols-3 gap-6">
        {Array.from({ length: SKELETON_ITEMS }).map((_, i) => (
          <li key={i}>
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/5">
              <div className="aspect-3/2 w-full bg-white/10 animate-pulse" />
              <div className="absolute inset-x-0 bottom-0 h-14 bg-white/10 animate-pulse" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
