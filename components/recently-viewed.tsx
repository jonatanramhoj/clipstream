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
                <Link href={`/video/${video.id}`}>
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={300}
                    height={200}
                    className="mb-2 w-full rounded-2xl"
                    unoptimized
                  />
                  <span>{video.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
