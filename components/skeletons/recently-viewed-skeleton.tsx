export function RecentlyViewedSkeleton() {
  return (
    <div className="mb-8">
      <div className="h-7 w-48 rounded bg-gray-200 animate-pulse dark:bg-gray-700 mb-4" />
      <ul className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i}>
            <div className="mb-2 aspect-3/2 w-full rounded-2xl bg-gray-200 animate-pulse dark:bg-gray-700" />
            <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
          </li>
        ))}
      </ul>
    </div>
  );
}
