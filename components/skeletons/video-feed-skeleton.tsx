const SKELETON_ITEMS = 6;

export function VideoFeedSkeleton() {
  return (
    <div>
      <ul className="grid grid-cols-3 gap-4">
        {Array.from({ length: SKELETON_ITEMS }).map((_, i) => (
          <li key={i}>
            <div className="mb-2 aspect-3/2 w-full rounded-2xl bg-gray-200 animate-pulse dark:bg-gray-700" />
            <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
          </li>
        ))}
      </ul>
    </div>
  );
}
