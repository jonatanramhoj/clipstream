import { useRouter } from "next/navigation";

export function VideoNotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <p className="text-gray-400/90 text-sm">Video not found</p>
      <button
        onClick={() => router.back()}
        className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors"
      >
        Back to all videos
      </button>
    </div>
  );
}
