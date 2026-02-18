export function CommentsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-7 bg-white/10 rounded w-28 mb-4" />
      <div className="w-full flex flex-col">
        <div className="h-[80px] bg-white/10 rounded-xl mb-4" />
        <ul className="space-y-4">
          {[1, 2, 3].map((i) => (
            <li key={i}>
              <div className="flex gap-2 mb-1">
                <div className="h-4 bg-white/10 rounded w-24" />
                <div className="h-4 bg-white/10 rounded w-16" />
              </div>
              <div className="h-4 bg-white/10 rounded w-full max-w-md" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
