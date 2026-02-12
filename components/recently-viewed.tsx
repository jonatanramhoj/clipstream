"use client";
import Image from "next/image";
import Link from "next/link";
import { useRecentlyViewed } from "@/stores/recently-viewed";
import { RecentlyViewedSkeleton } from "@/components/skeletons/recently-viewed-skeleton";

export function RecentlyViewed() {
  const hasHydrated = useRecentlyViewed((state) => state.hasHydrated);
  const recentlyViewed = useRecentlyViewed((state) => state.recentlyViewed);

  if (!hasHydrated) return <RecentlyViewedSkeleton />;

  return (
    <div className="mb-8">
      {recentlyViewed.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4">Recently viewed</h2>
          <ul className="grid grid-cols-4 gap-4">
            {recentlyViewed.map((video) => (
              <li key={video.id}>
                <Link href={`/video/${video.id}`} className="group card">
                  <div className="relative overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      width={300}
                      height={200}
                      className="w-full transition duration-200 group-hover:brightness-110"
                      unoptimized
                    />
                    <div className="absolute inset-x-0 bottom-0 py-3 px-4 bg-linear-to-t from-black/80 to-transparent backdrop-blur-sm">
                      <span className="text-sm font-medium text-white/95 line-clamp-2">
                        {video.title}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
