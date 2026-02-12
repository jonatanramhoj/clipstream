"use client";
import { Video } from "@/types/video";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { VideoFeedSkeleton } from "@/components/skeletons/video-feed-skeleton";

export function VideoFeed() {
  const { data, isLoading, error, mutate } = useSWR<Video[]>("/api/videos");

  if (isLoading) {
    return <VideoFeedSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-500">Failed to load videos</p>
        <button onClick={() => mutate()} className="btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Video feed</h2>
      <ul className="grid grid-cols-3 gap-6">
        {data?.map((video) => (
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
    </div>
  );
}
