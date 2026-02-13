type VideoLoadErrorProps = { onRetry: () => void | Promise<unknown> };

export function VideoLoadError({ onRetry }: VideoLoadErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <p className="text-red-400/90 text-sm">Failed to load video</p>
      <button
        onClick={() => onRetry()}
        className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
